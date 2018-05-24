<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;

class CardController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function search(Request $request) {
        //$card = new Card;

        return Card::where([
            ['game_id', '=', 1],
            ['language', '=', 'jpn'],
            ])
            //->where('printed_name', 'like', '%' . $request->input('search') . '%')
            //->orWhere('card_number', 'like', $request->input('search') . '%')
            ->with('attributes')
            ->with('images')
            ->with('texts')
            ->with('sets')
            ->with('game')
            //->with('events')
            //->with('artists')
            ->get();
    }

    public function searchWithFilters(Request $request) {
        $pageSize = $request->input('pageSize');
        $page = $request->input('page') + 1;

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $sortedColumnName = 'printed_name';
        $sortDirection = 'asc';

        if ($request->has('sorted') && is_array($request->input('sorted'))
            && !empty($request->input('sorted'))) {
            $rawSorted = $request->input('sorted');

            foreach($rawSorted as $key => $value) {
                $sortedColumnName = $value['id'];
                $sortDirection = ($value['desc'] ? 'desc' : 'asc');
            }
        }

        $filters = [];
        $setFilters = [];
        $nameFilters = [];

        if ($request->has('filtered') && is_array($request->input('filtered'))
            && !empty($request->input('filtered'))) {
            $rawFilters = $request->input('filtered');
            foreach($rawFilters as $key => $value) {
//                if ($value['id'] === 'printed_name') {
//                    $nameFilters[] = ['name', 'like', '%' . $value['value'] . '%'];
//                } else
                    if ($value['id'] === 'set') {
                    $setFilters[] = ['eng_name', 'like', '%' . $value['value'] . '%'];
                } else {
                    $filters[] = [$value['id'], 'like', '%' . $value['value'] . '%'];
                }
            }
        }

        $cards = Card::where($filters)->orderBy($sortedColumnName, $sortDirection);

        if (!empty($setFilters)) {
//            $cards->load(['sets' => function ($query) use ($setFilters) {
//                $query->where($setFilters);
//            }]);
            //$cards->doesntHave('sets');
            //$cards->with('sets')->having('sets.eng_name', 'like', '%Week%');
            $cards->with('sets')->whereHas('sets', function ($query) use ($setFilters) {
                $query->where($setFilters);
            });
        } else {
            $cards->with('sets');
        }

//        if (!empty($nameFilters)) {
//            $cards->with('names')->whereHas('names', function ($query) use ($nameFilters) {
//                $query->where($nameFilters);
//            });
//        } else {
            $cards->with('names');
        //}


        return $cards->with('attributes', 'images', 'texts', 'game')->paginate($pageSize);
    }
}
