<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tallas extends Model
{

    public function product()
    {
        return $this->belongsTo(product::class);
    }

    use HasFactory;
}
