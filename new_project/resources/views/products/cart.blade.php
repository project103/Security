@extends('layouts.app')

@section('content')
<style>
.neons {
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    color: #eb2e6df9;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: 14px;
    overflow: hidden;
    transition: 0.2s;
}



.neons:hover {
    color: #c0237c;
    background: #f1eeeff9;
    box-shadow: 0 0 9px #d0c8cbf9, 0 0 9px #ed6290f9, 0 0 10px #a5365bf9;
    transition-delay: 1s;
}

.neons span {
    position: absolute;
    display: block;
}




.neons span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #84787cf9);
}



.neons:hover span:nth-child(1) {
    left: 100%;
    transition: 1s;
}


.neons span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #84787cf9);
}

.neons:hover span:nth-child(3) {
    right: 100%;
    transition: 1s;
    transition-delay: 0.5s;
}



.neons span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #84787cf9);
}

.neons:hover span:nth-child(2) {
    top: 100%;
    transition: 1s;
    transition-delay: 0.25s;
}



.neons span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #84787cf9);
}

.neons:hover span:nth-child(4) {
    bottom: 100%;
    transition: 1s;
    transition-delay: 0.75s;
}
</style>



<div id="page-content" class="page-content">
    <div class="banner">
        <div class="jumbotron jumbotron-bg text-center rounded-0" style="margin-top:-25px;background-image: url('{{asset('assets/img/bg-header.jpg')}}');">
            <div class="container">
                <h1 class="pt-5">
                    Your Cart
                </h1>
                <p class="lead">
                    Save time and leave the groceries to us.
                </p>
            </div>
        </div>
    </div>
    <div class="container mt-5" >
        @if (\Session::has('delete'))
         <div class="alert alert-success">
               <p>{!! \Session::get('delete') !!}</p>
         </div>
        @endif
     </div>
    <section id="cart">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th width="10%"></th>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th width="15%">Quantity</th>
                                    {{-- <th width="15%">Update</th> --}}
                                    <th>Subtotal</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forEach($cartproducts as $cartproduct)
                                <tr>
                                    <td>
                                        <img src="{{asset('assets/img/'.$cartproduct->image.'')}}" width="60">
                                    </td>
                                    <td>
                                        {{$cartproduct->name}}<br>
                                        <small>1000g</small>
                                    </td>
                                    <td>
                                      USD.{{$cartproduct->price}}
                                    </td>
                                    <td>
                                                 {{$cartproduct->qty}}                          
                                    </td>
                                    
                                    <td>
                                        USD.{{$cartproduct->price * $cartproduct->qty }}
                                    </td>
                                    <td>
                                        <a href="{{route('products.delete.cart',$cartproduct->id)}}" class="text-danger"><i class="fa fa-times"></i></a>
                                    </td>
                                </tr>
                                @endforeach
                              
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col">
                    <a class="neons" href="{{route('products.shop')}}">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Continue Shopping
                      </a>
                </div>
                <div class="col text-right">
               
                    <div class="clearfix"></div>
                    <h6 class="mt-3">Total: USD.{{$subtotal}}</h6>
                    @if ($subtotal > 0)
                        <form action="{{route('products.prepare.checkout')}}" method="post">
                           @csrf
                           <input name="price" value="{{$subtotal}}" type="hidden">
                           <button type="submit"  class="btn btn-lg btn-primary">Checkout <i class="fa fa-long-arrow-right"></i></button>
                       </form>
                       @else
                        <p class="alert alert-success">you have no products in your cart , you can't checkout yet  </p>
                       @endif
                </div>
            </div>
        </div>
    </section>
</div>

@endsection