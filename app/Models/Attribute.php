<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'language',
        'attribute_type',
        'attribute_name',
    ];

    public function cards()
    {
        return $this->belongsToMany('App\Models\Card');
    }
}
