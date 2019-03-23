<?php
/**
 * Created by PhpStorm.
 * User: Oreh
 * Date: 3/8/2019
 * Time: 8:02 PM
 */

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Aws\S3\S3Client;
use Aws\Credentials\Credentials;
use App\Models\Card;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;


class ImageController
{
    private $s3;

    public function __construct()
    {
        $credentials = new Credentials(env('AWS_KEY'), env('AWS_SECRET'));
        $this->s3 = new S3Client([
            'version' => 'latest',
            'region' => env('AWS_REGION'),
            'credentials' => $credentials,
            'verify' => false,
            'http' => ['verify' => false],
            'client_defaults' => ['verify' => false],
            'ssl.certificate_authority' => false
        ]);
    }

    public function getUnsortedFolders(Request $request, $piece1 = null, $piece2 = null, $piece3 = null, $piece4 = null, $piece5 = null, $piece6 = null)
    {
        $pieces = [$piece1, $piece2, $piece3, $piece4, $piece5, $piece6];

        $prefixPieces = "";
        foreach ($pieces as $piece) {
            if (!empty($piece)) {
                $prefixPieces .= $piece . "/";
            }
        }

        $result = $this->s3->listObjects([
            "Bucket" => env('AWS_BUCKET'),
            "Delimiter" => "/",
            "Prefix" => "unsorted/" . $prefixPieces
        ]);

        return $result['CommonPrefixes'];
    }

    public function getUnsortedResources(Request $request, $piece1 = null, $piece2 = null, $piece3 = null, $piece4 = null, $piece5 = null, $piece6 = null)
    {
        $pieces = [$piece1, $piece2, $piece3, $piece4, $piece5, $piece6];

        $prefixPieces = "";
        foreach ($pieces as $piece) {
            if (!empty($piece)) {
                $prefixPieces .= $piece . "/";
            }
        }

        $results = $this->s3->getPaginator('ListObjects', [
            'Bucket' => env('AWS_BUCKET'),
            "Delimiter" => "/",
            "Prefix" => "unsorted/" . $prefixPieces
        ]);
        foreach ($results as $result) {
            $output = $result['Contents'];
            break;
        }

        return $output;
    }

    public function get(Request $request)
    {
        $results = $this->s3->getPaginator('ListObjects', [
            'Bucket' => env('AWS_BUCKET')
        ]);

        $result = $this->s3->listObjects([
            "Bucket" => env('AWS_BUCKET'),
            "Delimiter" => "/",
            "Prefix" => "unsorted/"
        ]);
        $files = $result->getPath('Contents');
//        foreach ($result['CommonPrefixes'] as $object)
//        {
//            echo $object['Prefix'];
//        }

        // $output = $result['Contents'];
        foreach ($results as $result) {
            $output = $result['Contents'];
            break;
//            foreach ($result['Contents'] as $object) {
//                echo $object['Key'] . "\n";
//            }
        }

        return $result['CommonPrefixes'];
    }

    public function store(Request $request)
    {
        $response = 'Nope';

        $path = $request->input('s3Path');
        $result = $this->s3->getObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $path
        ]);
        $file = $result['Body']; //file_get_contents(str_replace(' ','+', 'https://s3-' . env('AWS_REGION') . '.amazonaws.com/' . env('AWS_BUCKET') . '/' . $path));
        $extension = preg_replace("#\?.*#", "", pathinfo($path, PATHINFO_EXTENSION));
        // $hash = hash_file('md5', $file);
        $temp_path = storage_path() . '/' . uniqid() . '.' . $extension;
        file_put_contents($temp_path, $file);

        $this->storeImage($request, $temp_path, $extension, 'raw');

        exec("convert " . $temp_path . " -deskew 40% -fuzz 25% -trim +repage " . $temp_path);
        exec("convert " . $temp_path . " -crop `convert " . $temp_path . " -morphology Close Disk -trim -format '%[fx:w]x%[fx:h]+%[fx:page.x]+%[fx:page.y]' info:` +repage " . $temp_path);
        exec("convert " . $temp_path . " -strip " . $temp_path);
        $this->storeImage($request, $temp_path, $extension,'raw_cropped');

        $image_size = getimagesize($temp_path);
        $dimensions = [
            1000,
            750,
            500,
            250,
            100,
        ];

        foreach ($dimensions as $dimension) {
            if ($image_size[0] >= $dimension) {
                exec("convert " . $temp_path . " -filter Lanczos -quality 95 -resize " . $dimension . " " . $temp_path);
                $this->storeImage($request, $temp_path, $extension, $dimension);
            }
        }

        unlink($temp_path);

        return '';
    }

    private function buildImagePath($series_id, $language, $dimension)
    {
        return 'cards/' . $series_id . '/' . $language . '/' . $dimension;
    }

    private function storeImage($request, $temp_path, $extension, $dimension)
    {
        $bucket_path = $this->buildImagePath($request->input('gameId'), $request->input('language'), $dimension);
        $hash = hash_file('md5', $temp_path);
        $key = $bucket_path . '/' . $hash . '.' . $extension;

        $result = $this->s3->putObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $key,
            'Body' => file_get_contents($temp_path),
            'ACL' => 'public-read',
            'http' => ['verify' => false],
            'client_defaults' => ['verify' => false],
            'ssl.certificate_authority' => false
        ]);

        $image = new Image;

        $image->card_id = $request->input('cardId');
        $image->game_id = $request->input('gameId');
        $image->image_type = $request->input('imageType');
        $image->language = $request->input('language');
        $image->dimension = $dimension;
        $image->image_name = $key;

        $image->save();

        $card = Card::find($request->input('cardId'));

//        $comment = $card->images()->attach([
//            'cardId' => $request->input('cardId'),
//        'gameId' => $request->input('gameId'),
//        'imageType' => $request->input('imageType'),
//        'language' => $request->input('language'),
//        'dimension' => $dimension,
//        'image_name' => $key,
//        ]);

        $card->images()->attach([$image->id]);

//        $id = DB::table('images')->insertGetId(
//            [
//                'cardId' => $request->input('cardId'),
//                'gameId' => $request->input('gameId'),
//                'imageType' => $request->input('imageType'),
//                'language' => $request->input('language'),
//                'dimension' => $dimension,
//                'image_name' => $result['ObjectURL'],
//                'updated_at' => 'NOW()',
//            ]
//        );

//        $id = DB::table('card_image')->insertGetId(
//            [
//                'cardId' => $request->input('cardId'),
//                'image_id' => $image->id,
//            ]
//        );


        return $bucket_path;
    }
}