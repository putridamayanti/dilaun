<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'App\Http\Controllers\Api\AuthController@login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('user', 'App\Http\Controllers\Api\UserController');
    Route::resource('service', 'App\Http\Controllers\Api\ServiceController');
    Route::resource('product', 'App\Http\Controllers\Api\ProductController');
    Route::resource('order', 'App\Http\Controllers\Api\OrderController');
});
