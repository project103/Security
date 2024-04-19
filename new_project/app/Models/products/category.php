<?php

namespace App\Models\products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    use HasFactory;
    protected $table = "categories";

    protected $fillable = [
         "name",
         "image",
         "icon"
    ];

    public $timestamp = true;
}
