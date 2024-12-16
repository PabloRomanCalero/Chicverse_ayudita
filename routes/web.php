<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DescuentoController;
use App\Http\Controllers\FollowersController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\mediaController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Admin
Route::get('/admin', function () {
    if (Auth::user()->is_admin) {
        return view('admin.admin');
    } else {
        abort(403, 'Unauthorized action.');
    }
})->name('admin')->middleware('auth');

Route::get('/', function () {return view('inicio');})->name('inicio');
Route::get('/tienda', function () {return view('tienda');})->name('tienda');
Route::get('/carrito', function () {return view('carrito.carrito');})->name('carrito');
Route::get('/politicas-de-privacidad', function () {return view('extras.politicas');})->name('politicas');
Route::get('/contacto', function () {return view('extras.contacto');})->name('contacto');
Route::get('/mapa-web', function () {return view('extras.mapa_web');})->name('mapa-web');

//Login y registro
Route::get('/registro',[LoginController::class,'formRegistro'])->name('registro');
Route::post('/registro',[LoginController::class,'registro']);
Route::get('/login',[LoginController::class,'formLogin'])->name('login');
Route::post('/login',[LoginController::class,'login']);
Route::post('/logout',[LoginController::class,'logout'])->name('logout')->middleware('auth');
Route::get('/cuenta',[LoginController::class,'cuenta'])->name('cuenta')->middleware('auth');

//Media
Route::get('/mediaForm',[mediaController::class,'formMedia'])->name('formMedia')->middleware('auth');
Route::post('/mediaUpload',[mediaController::class,'uploadMedia'])->name('uploadMedia')->middleware('auth');

//Address
Route::get('/AddressForm',[AddressController::class,'formAddress'])->name('formAddress')->middleware('auth');
Route::post('/AddressFormCreated',[AddressController::class,'store'])->name('crearDireccion')->middleware('auth');

//Profile
Route::post('/profilePhoto',[UserController::class,'profilePhoto'])->name('profilePhoto');
Route::delete('/deleteUser',[UserController::class,'deleteUser'])->name('deleteUser');
Route::get('api/users/viewUser',[App\Http\Controllers\Api\UserController::class,'viewUser'])->middleware('api');
Route::get('api/media/mediaLogedUser',[App\Http\Controllers\Api\mediaController::class,'mediaLogedUser'])->middleware('api');
Route::get('api/product/mediaProduct/{product_id}',[App\Http\Controllers\Api\ProductController::class,'mediaProduct'])->middleware('api');

//Inicio
Route::get('api/media/exceptMedia',[App\Http\Controllers\Api\mediaController::class,'userExceptMedia'])->middleware('api');
Route::put('api/media/likesByMedia',[App\Http\Controllers\Api\mediaController::class,'likesByMedia'])->middleware('auth', 'api');
Route::post('api/comments/createComment',[App\Http\Controllers\Api\CommentController::class,'createComment'])->middleware('auth', 'api');
Route::post('api/comments/mediaComments',[App\Http\Controllers\Api\CommentController::class,'mediaComments'])->middleware('api');
Route::get('api/users/viewUserMedia/{user_id}',[App\Http\Controllers\Api\UserController::class,'viewUserMedia'])->middleware('api');
Route::post('/searchedUser',[UserController::class,'showSearchedUser'])->name('searchedUser');
Route::post('api/crearDescuento',[App\Http\Controllers\Api\DescuentoController::class,'verificarLikesDescuento'])->middleware('api');
Route::get('api/users/getRandomUsers',[App\Http\Controllers\Api\UserController::class,'getRandomUsers'])->middleware('api');


//SearchedUser
Route::post('api/followers/followUser',[App\Http\Controllers\Api\FollowersController::class,'followUser'])->name('followUser')->middleware('auth');
Route::delete('api/followers/unfollowUser',[App\Http\Controllers\Api\FollowersController::class,'unfollowUser'])->name('unfollowUser')->middleware('auth');
Route::post('api/followers/getFollowers/{userId}',[App\Http\Controllers\Api\FollowersController::class,'getFollowers'])->name('getFollowers')->middleware('auth');
Route::get('api/media/mediaSearchedUser/{user_id}',[App\Http\Controllers\Api\mediaController::class,'mediaSearchedUser'])->middleware('api');

//Tienda
Route::get('api/products/{sex}/{category}',[App\Http\Controllers\Api\ProductController::class,'productCategorySex'])->middleware('api');
Route::get('api/image/product/{product_id}',[App\Http\Controllers\Api\ImageController::class,'productImage'])->middleware('api');

//Product
Route::get('/product-info/{id}', [ProductController::class,'show']);
Route::get('api/product/{product_id}',[App\Http\Controllers\Api\ProductController::class,'getProductById'])->middleware('api');

//Tallas
Route::put('api/tallas/stockUpdate',[App\Http\Controllers\Api\TallaController::class,'updatestock'])->middleware('api');
Route::post('api/tallas/tallasOfProduct',[App\Http\Controllers\Api\TallaController::class,'tallasOfProduct'])->middleware('api');
Route::post('api/tallas/{product_id}/getStockOfTalla/{size}',[App\Http\Controllers\Api\TallaController::class,'getStockOfTalla'])->middleware('api');

//ORDERS-ORDERSLINE
Route::get('api/orders/cart',[App\Http\Controllers\Api\OrderController::class,'orderCart'])->middleware('api');
Route::get('/showOrders', [OrderController::class,'showOrders'])->name('showOrders')->middleware('auth');


Route::get('api/users/getUserIdLogged',[App\Http\Controllers\Api\UserController::class,'getUserIdLogged'])->middleware('api');



Route::get('api/users/getRandomUsers',[App\Http\Controllers\Api\UserController::class,'getRandomUsers'])->middleware('api');
Route::get('api/users/getUserIdLogged',[App\Http\Controllers\Api\UserController::class,'getUserIdLogged'])->middleware('api');
Route::post('api/tallas/tallasOfProduct',[App\Http\Controllers\Api\TallaController::class,'tallasOfProduct'])->middleware('api');
Route::post('api/tallas/{product_id}/getStockOfTalla/{size}',[App\Http\Controllers\Api\TallaController::class,'getStockOfTalla'])->middleware('api');

//API RESOURCES
Route::apiResource('api/users',App\Http\Controllers\Api\UserController::class)->middleware('api');
Route::apiResource('api/products',App\Http\Controllers\Api\ProductController::class)->middleware('api');
Route::apiResource('api/images',App\Http\Controllers\Api\ImageController::class)->middleware('api');
Route::apiResource('api/media',App\Http\Controllers\Api\mediaController::class)->middleware('api');
Route::apiResource('api/orders',App\Http\Controllers\Api\OrderController::class)->middleware('api');
Route::apiResource('api/orderLines',App\Http\Controllers\Api\OrderLineController::class)->middleware('api');
Route::apiResource('api/addresses',App\Http\Controllers\Api\AddressController::class)->middleware('api');
Route::apiResource('api/descuentos',App\Http\Controllers\Api\DescuentoController::class)->middleware('api');
Route::apiResource('api/tallas',App\Http\Controllers\Api\TallaController::class)->middleware('api');
Route::apiResource('api/comments',App\Http\Controllers\Api\CommentController::class)->middleware('api');
Route::apiResource('api/followers',App\Http\Controllers\Api\FollowersController::class)->middleware('api');





