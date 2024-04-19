@extends('layouts.app')

@section('content')

<style>
.btn-5 {
    position: relative;
    display: inline-block;
    color: #E91E63;
    letter-spacing: 0.2em;
    text-decoration: none;
    text-transform: uppercase;
    border: 2px solid #eb2e6df9;
    padding: 12px -40px;
    z-index: 1;
    transition: color 1s, box-shadow 1s;
    width:100px;
    height: 50px;
    overflow: hidden;
}
.btn-5:hover {
    transition-delay: 0s, 1s;
    color: #fff;
    box-shadow:
        0 0 10px #eb2e6df9,
        0 0 20px #eb2e6df9,
        0 0 40px #eb2e6df9,
        0 0 80px #eb2e6df9,
        0 0 160px #eb2e6df9;
}
.btn-5::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50px;
    width: 0;
    height: 100%;
    background: #eb2e6df9;
    transform: skewX(35deg);
    z-index: -1;
    transition: 1s;
}
.btn-5:hover:before {
    width: 100%;
}





</style>

<div id="page-content" class="page-content">
    <div class="banner">
        <div class="jumbotron jumbotron-bg text-center rounded-0" style="margin-top:-25px;background-image: url('{{asset('assets/img/bg-header.jpg')}}');">
            <div class="container">
                <h1 class="pt-5">
                    Checkout
                </h1>
                <p class="lead">
                    Save time and leave the groceries to us.
                </p>
            </div>
        </div>
    </div>

    <section id="checkout">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-7">
                    <h5 class="mb-3">BILLING DETAILS</h5>
                    <!-- Bill Detail of the Page -->
                    <form action="{{route('products.process.checkout')}}" method="post" class="bill-detail">
                        <fieldset>
                            @csrf
                            <div class="form-group row">
                                <div class="col">
                                    <input class="form-control" name="name" placeholder="Name" type="text">
                                </div>
                                <div class="col">
                                    <input class="form-control"  name="last_name" placeholder="Last Name" type="text">
                                </div>
                            </div>
                            {{-- <div class="form-group">
                                <input class="form-control" placeholder="Company Name" type="text">
                            </div> --}}
                            <div class="form-group">
                                <textarea class="form-control" name="address" placeholder="Address"></textarea>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="town" placeholder="Town / City" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="country" placeholder="State / Country" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="zip_code" placeholder="Postcode / Zip" type="text">
                            </div>
                            <div class="form-group row">
                                <div class="col">
                                    <input class="form-control" name="email" placeholder="Email Address" type="email">
                                </div>
                                <div class="col">
                                    <input class="form-control" name="phonenumber" placeholder="Phone Number" type="tel">
                                </div>
                                <div class="col">
                                    <input class="form-control" name="user_id" value={{Auth::user()->id}} type="text">
                                </div>
                                <div class="col">
                                    <input class="form-control" name="price" name="name" value="{{$checkoutsubtotal + 20}}" type="tel">
                                </div>
                            </div>
                          
                            <div class="form-group">
                                <textarea class="form-control" name="order_notes" placeholder="Order Notes"></textarea>
                            </div>
                           
                        </fieldset>
                        <div class="form-group">
                            <button  class="btn-5" name="submit" type="submit">submit</button>                       
                         </div>
                    </form>
                    <!-- Bill Detail of the Page end -->
                </div>
                <div class="col-xs-12 col-sm-5">
                    <div class="holder">
                        <h5 class="mb-3">YOUR ORDER</h5>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th class="text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forEach($cartitems as $cartitems )
                                        <tr>
                                          <td>
                                            {{$cartitems->name}} * {{$cartitems->qty}}
                                          </td>
                                          <td class="text-right">
                                            USD.  {{$cartitems->subtotal}} 
                                          </td>
                                    </tr>
                                   @endforeach
                                </tbody>
                                <tfooter>
                                    <tr>
                                        <td>
                                            <strong>Cart Subtotal</strong>
                                        </td>
                                        <td class="text-right">
                                           USD.{{$checkoutsubtotal}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Shipping</strong>
                                        </td>
                                        <td class="text-right">
                                            USD 20
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>ORDER TOTAL</strong>
                                        </td>
                                        <td class="text-right">
                                            <strong>USD.{{$checkoutsubtotal + 20}}</strong>
                                        </td>
                                    </tr>
                                </tfooter>
                            </table>
                        </div>

                     
                    </div>
                    <p class="text-right mt-3">
                        <input checked="" type="checkbox"> I’ve read &amp; accept the <a href="#">terms &amp; conditions</a>
                    </p>
                    <a href="#" class="btn btn-primary float-right">PROCEED TO CHECKOUT <i class="fa fa-check"></i></a>
                    <div class="clearfix">
                </div>
            </div>
        </div>
    </section>
</div>