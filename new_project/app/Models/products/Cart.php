<?php

namespace App\Models\products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = "cart";

    protected $fillable = [
         "name",
         "image",
         "pro_id",
         "user_id",
         "qty",
         "price",
         "subtotal"

    ];

    public $timestamp = true;
}
