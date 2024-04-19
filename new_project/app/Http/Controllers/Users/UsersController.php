<?php

namespace App\Http\Controllers\Users;
use Illuminate\Support\Facades\Auth;
use App\Models\products\Order; 
use App\Models\User; 
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class UsersController extends Controller
{
    public function myorders(){
    $orders = Order::select()->where('user_id',Auth::user()->id)->get();
    return view ('users.myorders',compact('orders'));
    }
    public function settings(){
    $users = User::find(Auth::user()->id);
    return view ('users.settings',compact('users'));
    }

    public function updatesettings(Request $request, $id) {
        $validatedData  = $request->validate([
             "email" => "required|email|max:40",
             "name" => "required|max:40",
             "image" => "required"
         ]);
 
         $user = User::find($id);
 
         if (!$user) {
             return redirect()->back()->with(['error' => 'User not found']);
         }
 
         if ($request->hasFile('image')) {
             $file = $request->file('image');
             $imageName = time() . 'user.' . $file->getClientOriginalExtension();
             $file->storeAs('public/images', $imageName);
             $relativeImagePath = 'public/images/' . $imageName;
             $imagePath = Storage::url($relativeImagePath);
             $validatedData['image'] = $imagePath; 
         }
 
         // Update only specified fields
         $user->update($validatedData);
 
         return redirect()->route('users.settings')->with(['update' => 'User data updated successfully']);
     }

}
    



// $users->name = $request->input('name');
        // $users->address = $request->input('address');
        // $users->town = $request->input('town');
        // $users->country = $request->input('country');

        // if($request->hasFile('image')){

        //     $file = $request->file('image');
        //     $extension = $file->getClientOriginalExtension();
        //     $filename = time() . '.' . $extension ;
        //     $file->move('assets/user_images/',$filename);
        //     $users->image = $filename;

        // }
        // else{

        //     return redirect()->back();
        //     $users->image = '';
        // }

        // $users->save();
        // $users->update($request->all());