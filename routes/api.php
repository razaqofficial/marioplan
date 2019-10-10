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

Route::post('create-project','HomeController@createProject')->name('create.project');
Route::get('projects-list','HomeController@allProjects')->name('projects.list');
Route::get('find-project/{project_id}','HomeController@findProject');
Route::get('like/project/{project_id}','HomeController@likeProject');
Route::get('notifications','HomeController@getNotifications');


Route::group(['namespace' => 'Api'], function(){
    Route::post('login','AuthController@login');
    Route::get('me','AuthController@me');
    Route::get('logout','AuthController@logout');
    Route::post('signup','AuthController@signUp');

});
