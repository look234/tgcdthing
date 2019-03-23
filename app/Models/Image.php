<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'language',
        'image_type',
        'dimension',
        'image_name',
    ];

    protected $fillable = [
        'card_id',
        'game_id',
        'language',
        'image_type',
        'dimension',
        'image_name',
    ];

    public function cards()
    {
        return $this->belongsToMany('App\Models\Card');
    }
}
