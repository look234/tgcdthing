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

Route::get('/image', 'ImageController@get');
Route::get('/image/unsorted/folder/{piece1?}/{piece2?}/{piece3?}/{piece4?}/{piece5?}/{piece6?}', 'ImageController@getUnsortedFolders');
Route::get('/image/unsorted/resource/{piece1?}/{piece2?}/{piece3?}/{piece4?}/{piece5?}/{piece6?}', 'ImageController@getUnsortedResources');
Route::post('/image/unsorted/link/', 'ImageController@store');

Route::get('/card/{id}', 'CardController@get')->where('id', '[0-9]+');

Route::get('/card/related', 'CardController@getRelatedByName');

Route::post('/card/search/fancy', 'CardController@searchWithFilters');

Route::get('/set/{id}', 'SetController@get');

Route::post('/set/search/fancy', 'SetController@searchWithFilters');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
