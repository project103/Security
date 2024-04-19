
@extends('layouts.app')

@section('content')


<div id="page-content" class="page-content">
    <div class="banner">
        <div class="jumbotron jumbotron-bg text-center rounded-0" style="margin-top:-25px;background-image: url('{{asset('assets/img/bg-header.jpg')}}');">
            <div class="container">
                <h1 class="pt-5">
                    Settings
                </h1>
                <p class="lead">
                    Update Your Account Info
                </p>
            </div>
        </div>
    </div>
    <div class="container mt-5" >
        @if (\Session::has('update'))
         <div class="alert alert-success">
               <p>{!! \Session::get('update') !!}</p>
         </div>
        @endif
     </div>

    <section id="checkout">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xs-12 col-sm-6">
                    <h5 class="mb-3">ACCOUNT DETAILS</h5>
                    <!-- Bill Detail of the Page -->
                    <form action="{{route('users.update.settings',$users->id)}}" method="post" class="bill-detail" enctype="multipart/form-data">
                       @csrf
                        <fieldset>
                            <div class="form-group row">
                                
                                <div class="col">
                                    <input class="form-control" name="name" value="{{$users->name}}"  placeholder="Full Name" type="text">
                                </div>
                               
                            </div>
                           
                            <div class="form-group">
                                <textarea class="form-control" name="address" value="{{$users->address}}" placeholder="Address"></textarea>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="town" value="{{$users->town}}" placeholder="Town / City" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="country" value="{{$users->country}}" placeholder="State / Country" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="zip_code" value="{{$users->zip_code}}" placeholder="Postcode / Zip" type="text">
                            </div>
                            <div class="form-group row">
                                <div class="col">
                                    <input class="form-control" name="email" value="{{$users->email}}" placeholder="Email Address" type="email">
                                </div>
                                <div class="col">
                                    <input class="form-control" name="phonenumber" value="{{$users->phonenumber}}" placeholder="Phone Number" type="tel">
                                </div>
                            </div>

                             <div class="form-outline mb-4 mt-4">
                                <label>Image</label>
                
                                <input type="file" name="image" id="form2Example1" class="form-control" placeholder="image" />
                            </div> 
                
                          
                            <div class="form-group text-right">
                                <button type="submit" name="submit" class="btn btn-primary">UPDATE</button>
                                <div class="clearfix">
                            </div>
                        </fieldset>
                    </form>
                    <!-- Bill Detail of the Page end -->
                </div>
            </div>
        </div>
    </section>
</div>
@endsection