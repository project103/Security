<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\products\Product; 
use App\Models\products\category; 
use App\Models\products\Cart;
use App\Models\products\Order;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;


class ProductController extends Controller
{
    public function singleCategory ($id){

      $products = Product::select()->orderBy('id','desc')->where('category_id',$id)->get();

      return view ('products.singlecategory',compact('products'));

    }

    public function singleProduct($id){
      
      $itemproduct = Product::find($id);
      $relatedproducts = Product::where('category_id',$itemproduct->category_id)->where('id', '!=', $id)
      ->get();

      if(isset(auth::user()->id)){
      $checkincart = Cart::where('pro_id',$id)->where('user_id',Auth::user()->id)->count();
      return view ('products.singleproduct',compact('itemproduct','relatedproducts','checkincart'));
      }
      else{
        return view ('products.singleproduct',compact('itemproduct','relatedproducts'));

      }
    }

    public function shop(){
       $categories=category::select()->orderBy('id','desc')->get();

       $mostwanted=Product::select()->orderBy('name','desc')->take(5)->get();  

       $vegetables=Product::select()->where('category_id','=',6)->orderBy('id','desc')->take(5)->get();
       $meats=Product::select()->where('category_id','=',1)->orderBy('id','desc')->take(5)->get();
       $fishs=Product::select()->where('category_id','=',2)->orderBy('id','desc')->take(5)->get();
       $fruits=Product::select()->where('category_id','=',5)->orderBy('id','desc')->take(5)->get();

       return view ('products.shop',compact('categories','mostwanted','vegetables','meats','fishs','fruits'));


    }

    public function addtocart(Request $request){
      $addcart = Cart::create([
          "name" => $request->name,
          "price" => $request->price,   
          "image" => $request->image,   
          "qty" => $request->qty,   
          "pro_id" => $request->pro_id,   
          "user_id" => Auth::user()->id,
          "subtotal" =>$request->qty * $request->price
      ]);
  
      if($addcart){
          // Increment cart quantity in session
          $cartQuantity = Session::get('cart_quantity');
          $cartQuantity += $request->qty;
          Session::put('cart_quantity', $cartQuantity);
  
          return Redirect::route("single.product",$request->pro_id)->with(['success' => 'the item added to cart successfully']);
      }
  }
    public function cart(){

      
      $cartproducts = Cart::select()->where('user_id',Auth::user()->id)->get();
    
      
      $subtotal = Cart::select()->where('user_id',Auth::user()->id)->sum('subtotal');
      return view('products.cart',compact('cartproducts','subtotal'));


    }

    public function deletecart($id){
      $deletecart = Cart::find($id);
      $qtyToDelete = $deletecart->qty;
      $deletecart->delete();
        
      if($deletecart){
          // Decrement cart quantity in session
          $cartQuantity = Session::get('cart_quantity', 0);
          $cartQuantity -= $qtyToDelete;
          $cartQuantity = max(0, $cartQuantity); // Ensure quantity doesn't go negative
          Session::put('cart_quantity', $cartQuantity);
  
          return Redirect::route("products.cart")->with(['delete' => 'the item deleted from the cart successfully']);
      }
  }

    public function preparecheckout(Request $request){
        $price = $request->price;

        $value= Session::put('value', $price);

       $newprice = Session::get($value);
       if($newprice > 0 ){
        return Redirect::route("products.checkout");
       }
        

    }
    public function checkout(){
      $cartitems = Cart::select()->where('user_id',Auth::user()->id)->get();
      $checkoutsubtotal = Cart::select()->where('user_id',Auth::user()->id)->sum('subtotal');
     return view ('products.checkout',compact('cartitems','checkoutsubtotal'));
        

    }
    public function processcheckout(Request $request){
      $processcheckout= Order::create([
        "name" => $request->name,
        "last_name" => $request->last_name, 
        "address" => $request->address,  
        "town" => $request->town,   
        "country" => $request->country,   
        "zip_code" => $request->zip_code,   
        "email" => $request->email,   
        "phonenumber" => $request->phonenumber,   
        "price" => $request->price,   
        "user_id" => Auth::user()->id,
        "order_notes" =>$request->order_notes
     ]);

     $value= Session::put('value', $request->price);

       $newprice = Session::get($value);


     if($processcheckout){
      return Redirect::route ('products.pay');

     }
        

    }

    public function paywithpaypal(){
       return view ('products.pay');
    }

    public function success (){
      $deleteitemsfromcart = Cart::where('user_id', Auth::user()->id)->delete();
    
      if($deleteitemsfromcart){
          // Reset cart quantity to 0 in session
          Session::put('cart_quantity', 0);
    
          // Clear other session data if needed
          Session::forget('value');
    
          return view ('products.success');
      }
  }
}
    
