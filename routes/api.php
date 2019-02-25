<?php

use Illuminate\Http\Request;

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
Route::post('/card/search', 'CardController@search');

Route::get('/card/{id}', 'CardController@get')->where('id', '[0-9]+');;

Route::get('/card/related', 'CardController@getRelatedByName');

Route::post('/card/search/fancy', 'CardController@searchWithFilters');

Route::get('/set/{id}', 'SetController@get');

Route::post('/set/search/fancy', 'SetController@searchWithFilters');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
