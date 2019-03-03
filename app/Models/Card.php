<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'id',
        'language',
        'card_number',
        'printed_name',
        'edition',
        'rarity',
        'foil',
        'foil_type',
        'parallel',
        'parallel_type',
        'stamped',
        'stamps',
        'artist',
        'copyright',
        'raw_data',
        //'artists',
        'attributes',
        //'companies',
        //'events',
        'game',
        'images',
        'sets',
        'texts',
        'names',
    ];

    public function artists()
    {
        return $this->belongsToMany('App\Models\Artist');
    }

    public function names()
    {
        return $this->belongsToMany('App\Models\Name');
    }

    public function attributes()
    {
        return $this->belongsToMany('App\Models\Attribute');
    }

    public function companies()
    {
        return $this->belongsTo('App\Models\Company');
    }

    public function events()
    {
        return $this->belongsToMany('App\Models\Event');
    }

    public function game()
    {
        return $this->belongsTo('App\Models\Game');
    }

    public function images()
    {
        return $this->hasMany('App\Models\Image');
    }

    public function sets()
    {
        return $this->belongsToMany('App\Models\Set');
    }

    public function texts()
    {
        return $this->belongsToMany('App\Models\Text');
    }

//    public function getCardAttributes()
//    {
//        return $this->attributes['attributes'] = $this->attributes();
//    }
}