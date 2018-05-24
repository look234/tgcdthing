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
    protected $visible = [
        'language',
        'eng_name',
        'release_date',
        'product_type',
    ];

    public function cards() {
        return $this->hasMany('App\Models\Card');
    }
}
