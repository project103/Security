<?php

namespace App\Http\Controllers\Admins;
use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

use App\Models\Admin\Admin; // Import the Admin model
use App\Models\products\Product; // Import the Admin model
use App\Models\products\Order; // Import the Admin model
use App\Models\products\category; // Import the Admin model

use Illuminate\Support\Facades\File;

 // Import the Admin model
class AdminController extends Controller
{
    public function viewlogin(){
       return view ('admins.login');

    }
    public function checklogin(Request $request){
        $remember_me = $request->has('remember_me') ? true : false;

        if (auth()->guard('admin')->attempt(['email' => $request->input("email"), 'password' => $request->input("password")], $remember_me)) {
            
            return redirect() -> route('admins.dashboard');
        }
        return redirect()->back()->with(['error' => 'error logging in']);

    }
    public function index(){
        $productcount = Product::select()->count();
        $categorycount = category::select()->count();
        $ordercount = Order::select()->count();
        $admincount = Admin::select()->count();
        return view ('admins.index',compact('productcount','categorycount','ordercount','admincount'));
    }
    public function displayadmins(){
        
        $alladmins= Admin::all();
        return view ('admins.alladmins',compact('alladmins'));
    }
    public function createadmins(){
        return view ('admins.createadmins');
    }
    public function storeadmins(Request $request){
        $storeadmins= Admin::create([
          "email"=>$request->email,
          "name"=>$request->name,
          "password"=> Hash::make($request->password)

        ]);
        if($storeadmins){
            return Redirect::route ('admins.all')->with(['success'=>'admin created successfully']);   
         }
}


public function allcategories(){
    $allcategories = category::select()->orderBy('id','desc')->get();
    return view ('admins.allcategories',compact('allcategories'));
}
public function createcategory(){
    
    return view ('admins.createcategory');
}
public function storecategory(Request $request){
    $destinationpath = 'assets/img/';
    $myimage = $request->image->getClientOriginalName();
    $request->image->move(public_path($destinationpath),$myimage);

    $storecategory= category::create([
        "icon"=>$request->icon,
        "name"=>$request->name,
        "image"=>$myimage

      ]);
      if($storecategory){
          return Redirect::route ('categories.all')->with(['success'=>'category created successfully']);   
       }
}
public function editcategory($id){
    $category = category::find($id);
   return view ('admins.editcategory',compact('category'));
}

public function updatecategory(Request $request , $id){
       $category = category::find($id);
       $category->update($request->all());
      if($category){
          return Redirect::route ('categories.all')->with(['update'=>'category updated successfully']);   
       }
}
public function deletecategory($id){
       $category = category::find($id);

       if(File::exists(public_path('assets/img/' . $category->image))){
           File::delete(public_path('assets/img/' . $category->image));
       }else{

       }
           
       $category->delete();
      if($category){
          return Redirect::route ('categories.all')->with(['delete'=>'category deleted successfully']);   
       }
}
    public function displayproducts(){
        $allproducts = Product::select()->orderBy('id','desc')->get();
        return view ('admins.allproducts',compact('allproducts'));
    }
        
    public function createproducts(){
        $allcategories = category::all();
        return view ('admins.createproducts', compact('allcategories'));
    }

    public function storeproducts(Request $request){
        $destinationpath = 'assets/img/';
        $myimage = $request->image->getClientOriginalName();
        $request->image->move(public_path($destinationpath),$myimage);
    
        $storeproducts= Product::create([
            "price"=>$request->price,
            "name"=>$request->name,
            "description"=>$request->description,
            "category_id"=>$request->category_id,
            "exp_date"=>$request->exp_date,
            "image"=>$myimage
    
          ]);
          if($storeproducts){
              return Redirect::route ('products.all')->with(['success'=>'product created successfully']);   
           }
    }

    public function deleteproducts($id){
        $product = Product::find($id);
 
        if(File::exists(public_path('assets/img/' . $product->image))){
            File::delete(public_path('assets/img/' . $product->image));
        }else{
 
        }
            
        $product->delete();
       if($product){
           return Redirect::route ('products.all')->with(['delete'=>'category deleted successfully']);   
        }
 }

 public function displayorders(){
    $allorders = Order::select()->orderBy('id','desc')->get();
    return view ('admins.allorders',compact('allorders'));
}

public function editorders($id){
    $order = Order::find($id);
   return view ('admins.editorders',compact('order'));
}

public function updateorders(Request $request , $id){
    $order = Order::find($id);
    $order->update($request->all());
   if($order){
       return Redirect::route ('orders.all')->with(['update'=>'category updated successfully']);   
    }
}

}