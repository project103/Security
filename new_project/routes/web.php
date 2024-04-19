<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminController;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/about', [App\Http\Controllers\HomeController::class, 'about'])->name('about');
Route::get('/contact', [App\Http\Controllers\HomeController::class, 'contact'])->name('contact');

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
 Route::get('products/category/{id}', [App\Http\Controllers\ProductController::class, 'singleCategory'])->name('single.category');
 Route::get('products/single-category/{id}', [App\Http\Controllers\ProductController::class, 'singleProduct'])->name('single.product');
 Route::get('products/shop', [App\Http\Controllers\ProductController::class, 'shop'])->name('products.shop');


 //cart
 Route::post('products/add-cart', [App\Http\Controllers\ProductController::class, 'addtocart'])->name('products.add.cart');
 Route::get('products/cart', [App\Http\Controllers\ProductController::class, 'cart'])->name('products.cart')->middleware('auth:web');
 Route::get('products/delete-cart/{id}', [App\Http\Controllers\ProductController::class, 'deletecart'])->name('products.delete.cart');
//checkout

Route::post('products/prepare-checkout', [App\Http\Controllers\ProductController::class, 'preparecheckout'])->name('products.prepare.checkout');
Route::get('products/checkout', [App\Http\Controllers\ProductController::class, 'checkout'])->name('products.checkout')->middleware('check.for.price');
Route::post('products/checkout', [App\Http\Controllers\ProductController::class, 'processcheckout'])->name('products.process.checkout')->middleware('check.for.price');
Route::get('products/pay', [App\Http\Controllers\ProductController::class, 'paywithpaypal'])->name('products.pay')->middleware('check.for.price');
Route::get('products/success', [App\Http\Controllers\ProductController::class, 'success'])->name('products.success')->middleware('check.for.price');
///users pages
Route::get('products/myorders', [App\Http\Controllers\Users\UsersController::class, 'myorders'])->name('users.myorders')->middleware('auth:web');
Route::get('products/settings', [App\Http\Controllers\Users\UsersController::class, 'settings'])->name('users.settings')->middleware('auth:web');
Route::post('products/settings/{id}', [App\Http\Controllers\Users\UsersController::class, 'updatesettings'])->name('users.update.settings')->middleware('auth:web');

//admin panel

Route::get('admin/login', [App\Http\Controllers\Admins\AdminController::class, 'viewlogin'])->name('view.login');
Route::post('admin/login', [App\Http\Controllers\Admins\AdminController::class, 'checklogin'])->name('check.login');
Route::get('admin/index', [App\Http\Controllers\Admins\AdminController::class, 'index'])->name('admins.dashboard')->middleware('auth:admin');
Route::get('admin/all-admins', [App\Http\Controllers\Admins\AdminController::class, 'displayadmins'])->name('admins.all')->middleware('auth:admin');
Route::get('admin/create-admins', [App\Http\Controllers\Admins\AdminController::class, 'createadmins'])->name('admins.create')->middleware('auth:admin');
Route::post('admin/store-admins', [App\Http\Controllers\Admins\AdminController::class, 'storeadmins'])->name('admins.store')->middleware('auth:admin');
// categories

Route::get('admin/all-categories', [App\Http\Controllers\Admins\AdminController::class, 'allcategories'])->name('categories.all')->middleware('auth:admin');
Route::get('admin/create-categories', [App\Http\Controllers\Admins\AdminController::class, 'createcategory'])->name('categories.create')->middleware('auth:admin');
Route::post('admin/create-categories', [App\Http\Controllers\Admins\AdminController::class, 'storecategory'])->name('categories.store')->middleware('auth:admin');
Route::get('admin/edit-categories/{id}', [App\Http\Controllers\Admins\AdminController::class, 'editcategory'])->name('categories.edit')->middleware('auth:admin');
Route::post('admin/update-categories/{id}', [App\Http\Controllers\Admins\AdminController::class, 'updatecategory'])->name('categories.update')->middleware('auth:admin');
Route::get('admin/delete-categories/{id}', [App\Http\Controllers\Admins\AdminController::class, 'deletecategory'])->name('categories.delete')->middleware('auth:admin');

//products
Route::get('admin/all-products/', [App\Http\Controllers\Admins\AdminController::class, 'displayproducts'])->name('products.all')->middleware('auth:admin');
Route::get('admin/create-products/', [App\Http\Controllers\Admins\AdminController::class, 'createproducts'])->name('products.create')->middleware('auth:admin');
Route::post('admin/store-products/', [App\Http\Controllers\Admins\AdminController::class, 'storeproducts'])->name('products.store')->middleware('auth:admin');
Route::get('admin/delete-products/{id}', [App\Http\Controllers\Admins\AdminController::class, 'deleteproducts'])->name('products.delete')->middleware('auth:admin');


//orders
Route::get('admin/all-orders/', [App\Http\Controllers\Admins\AdminController::class, 'displayorders'])->name('orders.all')->middleware('auth:admin');
Route::get('admin/edit-orders/{id}', [App\Http\Controllers\Admins\AdminController::class, 'editorders'])->name('orders.edit')->middleware('auth:admin');
Route::post('admin/update-orders/{id}', [App\Http\Controllers\Admins\AdminController::class, 'updateorders'])->name('orders.update')->middleware('auth:admin');
