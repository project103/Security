@extends('layouts.admin')
@section('content')


<div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-5 d-inline">Update Categories</h5>
          <form method="POST" action="{{route('orders.update',$order->id)}}">
            <!-- Email input -->
            @csrf
            <p>Current Status is <b>{{$order->status}}</b></p>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Select Order Status</label>
                <select name="status" class="form-control" id="exampleFormControlSelect1">
                  <option>--Select Order Status--</option>
                  <option value="Processing">Processing</option>
                  <option value="Deliverd">Deliverd</option>
                  {{-- <option value="2026">2026</option> --}}
                  {{-- <option value="2027">2027</option> --}}
  
                </select>
            </div>
            
            {{-- <div class="form-outline mb-4 mt-4">
              <label>Image</label>

              <input type="file" value="{{$category->image}}"  name="image" id="form2Example1" class="form-control" placeholder="image" />
            </div> --}}

  
            <!-- Submit button -->
            <button type="submit" name="submit" class="btn btn-primary  mb-4 text-center">update</button>

      
          </form>

        </div>
      </div>
    </div>
  </div>
  @endsection