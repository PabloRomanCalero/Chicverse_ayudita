<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function orderLines()
    {
        return $this->belongsToMany(orderLine::class);
    }
    public function media()
    {
        return $this->belongsToMany(media::class);
    }
    public function tallas()
    {
        return $this->hasMany(tallas::class);
    }
}
