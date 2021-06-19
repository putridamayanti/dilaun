<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    public function products() {
        return $this->hasMany(ProductService::class, 'service_id', 'id');
    }
}
