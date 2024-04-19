@extends('layouts.app')

@section('content')


<div id="page-content" class="page-content">
    {{-- <style>
        .item {
            opacity: 0;
            filter: blur(5px);
            transform: translateY(100%);
            transition: all 1s ease;
        }

        .show {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
        }
    </style> --}}
    <div class="banner">
        <div class="jumbotron jumbotron-bg text-center rounded-0" style="margin-top:-25px;background-image: url('{{asset('assets/img/bg-header.jpg')}}');">
            <div class="container">
                <h1 class="pt-5">
                    Shopping Page
                </h1>
                <p class="lead">
                    Save time and leave the groceries to us.
                </p>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="shop-categories owl-carousel mt-5">
                    @foreach($categories as $category)
                    <div class="item">
                        <a href="{{route('single.category',$category->id)}}">
                            <div class="media d-flex align-items-center justify-content-center">
                                <span class="d-flex mr-2"><i class="sb-bistro-{{$category->icon}}"></i></span>
                                <div class="media-body">
                                    <h5>{{$category->name}}</h5>
                                    <p>Freshly Harvested Veggies From  Growers</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    @endforeach
                    
                </div>
            </div>
        </div>
    </div>

    <section id="most-wanted">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="title">Most Wanted</h2>
                    <div class="product-carousel owl-carousel">
                        @foreach($mostwanted as $most)
                        <div class="item">
                            <div class="card card-product">
                                <div class="card-ribbon">
                                    <div class="card-ribbon-container right">
                                        <span class="ribbon ribbon-primary">SPECIAL</span>
                                    </div>
                                </div>
                                <div class="card-badge">
                                    <div class="card-badge-container left">
                                        <span class="badge badge-primary">
                                            Until {{$most->exp_date}}
                                        </span>
                                        <span class="badge badge-primary">
                                            20% OFF
                                        </span>
                                    </div>
                                    <img src="{{asset('assets/img/'.$most->image.'')}}" alt="Card image 2" class="card-img-top">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="{{route('single.product',$most->id)}}">{{$most->name}}</a>
                                    </h4>
                                    <div class="card-price">
                                        {{-- <span class="discount">Rp. 300.000</span> --}}
                                        <span class="reguler">USD. {{$most->price}}</span>
                                    </div>
                                    <a href="{{route('single.product',$most->id)}}" class="btn btn-block btn-primary">
                                        Display Details
                                    </a>

                                </div>
                            </div>
                        </div>


                        @endforeach
                      
                    
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="vegetables" class="gray-bg">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="title">Vegetables</h2>
                    <div class="product-carousel owl-carousel">
                        @foreach($vegetables as $vegetable)
                        <div class="item">
                            <div class="card card-product">
                                <div class="card-ribbon">
                                    <div class="card-ribbon-container right">
                                        <span class="ribbon ribbon-primary">SPECIAL</span>
                                    </div>
                                </div>
                                <div class="card-badge">
                                    <div class="card-badge-container left">
                                        <span class="badge badge-primary">
                                            Until {{$vegetable->exp_date}}
                                        </span>
                                        <span class="badge badge-primary">
                                            20% OFF
                                        </span>
                                    </div>
                                    <img src="{{asset('assets/img/'.$vegetable->image.'')}}" alt="Card image 2" class="card-img-top">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="{{route('single.product',$vegetable->id)}}">{{$vegetable->name}}</a>
                                    </h4>
                                    <div class="card-price">
                                        {{-- <span class="discount">Rp. 300.000</span> --}}
                                        <span class="reguler">USD. {{$vegetable->price}}</span>
                                    </div>
                                    <a href="{{route('single.product',$vegetable->id)}}" class="btn btn-block btn-primary">
                                        Display Details
                                    </a>

                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="meats">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="title">Meats</h2>
                    <div class="product-carousel owl-carousel">
                    @foreach($meats as $meat)
                        <div class="item">
                            <div class="card card-product">
                                <div class="card-ribbon">
                                    <div class="card-ribbon-container right">
                                        <span class="ribbon ribbon-primary">SPECIAL</span>
                                    </div>
                                </div>
                                <div class="card-badge">
                                    <div class="card-badge-container left">
                                        <span class="badge badge-primary">
                                            Until {{$meat->exp_date}}
                                        </span>
                                        <span class="badge badge-primary">
                                            20% OFF
                                        </span>
                                    </div>
                                    <img src="{{asset('assets/img/'.$meat->image.'')}}" alt="Card image 2" class="card-img-top">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="{{route('single.product',$meat->id)}}">{{$meat->name}}</a>
                                    </h4>
                                    <div class="card-price">
                                        {{-- <span class="discount">Rp. 300.000</span> --}}
                                        <span class="reguler">USD. {{$meat->price}}</span>
                                    </div>
                                    <a href="{{route('single.product',$meat->id)}}" class="btn btn-block btn-primary">
                                        Display Details
                                    </a>

                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="fishes" class="gray-bg">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="title">Fishes</h2>
                    <div class="product-carousel owl-carousel">
                        @foreach($fishs as $fish)
                        <div class="item">
                            <div class="card card-product">
                                <div class="card-ribbon">
                                    <div class="card-ribbon-container right">
                                        <span class="ribbon ribbon-primary">SPECIAL</span>
                                    </div>
                                </div>
                                <div class="card-badge">
                                    <div class="card-badge-container left">
                                        <span class="badge badge-primary">
                                            Until {{$fish->exp_date}}
                                        </span>
                                        <span class="badge badge-primary">
                                            20% OFF
                                        </span>
                                    </div>
                                    <img src="{{asset('assets/img/'.$fish->image.'')}}" alt="Card image 2" class="card-img-top">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="{{route('single.product',$fish->id)}}">{{$fish->name}}</a>
                                    </h4>
                                    <div class="card-price">
                                        {{-- <span class="discount">Rp. 300.000</span> --}}
                                        <span class="reguler">USD. {{$fish->price}}</span>
                                    </div>
                                    <a href="{{route('single.product',$fish->id)}}" class="btn btn-block btn-primary">
                                        Display Details
                                    </a>

                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="fruits">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="title">Fruits</h2>
                    <div class="product-carousel owl-carousel">
                        @foreach($fruits as $fruit)
                        <div class="item">
                            <div class="card card-product">
                                <div class="card-ribbon">
                                    <div class="card-ribbon-container right">
                                        <span class="ribbon ribbon-primary">SPECIAL</span>
                                    </div>
                                </div>
                                <div class="card-badge">
                                    <div class="card-badge-container left">
                                        <span class="badge badge-primary">
                                            Until {{$fruit->exp_date}}
                                        </span>
                                        <span class="badge badge-primary">
                                            20% OFF
                                        </span>
                                    </div>
                                    <img src="{{asset('assets/img/'.$fruit->image.'')}}" alt="Card image 2" class="card-img-top">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="{{route('single.product',$fruit->id)}}">{{$fruit->name}}</a>
                                    </h4>
                                    <div class="card-price">
                                        {{-- <span class="discount">Rp. 300.000</span> --}}
                                        <span class="reguler">USD. {{$fruit->price}}</span>
                                    </div>
                                    <a href="{{route('single.product',$fruit->id)}}" class="btn btn-block btn-primary">
                                        Display Details
                                    </a>

                                </div>
                            </div>
                        </div>
                        @endforeach
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
   {{-- <script>



const observer = new IntersectionObserver((entries)=>{
entries.forEach((entry) => {
    console.log(entry)
    if(entry.isIntersecting){
        entry.target.classList.add('show');

    }
    else{
        entry.target.classList.remove('show');
        // entry.target.classList.remove('product-carousel');
}
});



});

const hiddenElements = document.querySelectorAll('.item');
hiddenElements.forEach((e1)=> observer.observe(e1));
</script>    --}}

@endsection

