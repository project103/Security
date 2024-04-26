import React from 'react';
import './Home.css';
import Products from '../products/Products';

const Home = () => {

    const scrollOut = () =>{
        window.scrollTo(
          {
            top:700,
            behavior:'smooth'
          }
        );
      }

    return (
    <>
        <div>
            <div className="main-slider" style={{height:'100vh'}} >
                <div className="slider-item">
                    <section className="py-5 text-center container">
                        <div className="row py-lg-5">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <div className="slider-caption my-5">
                                    <span className="lead">Second Hand Book Store</span>
                                    <h1 className="mt-2 mb-5 fs-1" style={{fontSize:'100px'}}>
                                        <span className="text">Second Hand Books </span>
                                    </h1>
                                    <button onClick={scrollOut} className="btn btn-main">Shop Books Now</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <Products />
    </>)
}

export default Home;
