<?php

namespace App\Models\products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;


    protected $table = "orders";

    protected $fillable = [
         "name",
         "last_name",
         "address",
         "town",
         "country",
         "zip_code",
         "email",
         "phonenumber",
         "price",
         "user_id",
         "order_notes",
         "status",
    
    ];
}
