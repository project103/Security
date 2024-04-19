@extends('layouts.admin')

@section('content')


<div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
            <div class="card-body">
                <div class="container" >
                    @if (\Session::has('update'))
                     <div class="alert alert-success">
                           <p>{!! \Session::get('update') !!}</p>
                     </div>
                    @endif
                 </div>
          <h5 class="card-title mb-4 d-inline">Orders</h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">first name</th>
                <th scope="col">last name</th>
                <th scope="col">email</th>
                <th scope="col">country</th>
                <th scope="col">status</th>
                <th scope="col">price</th>
                <th scope="col">address</th>
                <th scope="col">date</th>
                <th scope="col">update</th>
              </tr>
            </thead>
            <tbody>
                @foreach($allorders as $allorder)
              <tr>
                <th scope="row">{{$allorder->id}}</th>
                <td>{{$allorder->name}}</td>
                <td>{{$allorder->last_name}}</td>
                <td>{{$allorder->email}}</td>
                <td>{{$allorder->country}}</td>
                <td>{{$allorder->status}} </td>
                <td>${{$allorder->price}}</td>
                <td>{{$allorder->address}}</td>
                <td>{{$allorder->created_at}}</td>
                <td>                
                    <a href="{{route('orders.edit',$allorder->id)}}" class="btn btn-warning text-white mb-4 text-center">update status</a>
                </td>
               
              </tr>
              @endforeach
            
            </tbody>
          </table> 
        </div>
      </div>
    </div>
  </div>

  @endsection