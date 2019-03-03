<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Set extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
//    protected $visible = [
//        'id',
//        'language',
//        'eng_name',
//        'release_date',
//        'product_type',
//        'cards',
//        'cards_count',
//        'sets_count',
//        'game',
//        'parent_sets',
//        'child_sets'
//    ];

    public function cards()
    {
        return $this->belongsToMany('App\Models\Card');
        // This limits the returned values.
        // return $this->belongsToMany('App\Models\Card')->select(['card_id', 'card_number']);
    }

    public function parent_sets()
    {
        return $this->belongsToMany('App\Models\Set', 'set_set', 'child_id', 'parent_id')->withPivot('quantity');
    }

    public function child_sets()
    {
        return $this->belongsToMany('App\Models\Set', 'set_set', 'parent_id', 'child_id')->withPivot('quantity');
    }

    public function game()
    {
        return $this->belongsTo('App\Models\Game');
    }
}
