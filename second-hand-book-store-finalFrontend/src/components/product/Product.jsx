import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/v1/';
const Product = () => {
    const {user} = useContext(LoginContext);
    const {setCart} = useContext(CartContext);
    const [product, setProduct] = useState({});
    const [quantity,setQuantity] = useState(1);
    const { id } = useParams();
    const MySwal = withReactContent(Swal);

    const getProduct = async () => {
        try {
            const response = await axios.get(API_URL + 'book/' + id);
            if (response.status === 200) {
                setProduct(response.data);
            }

        } catch (err) {
            MySwal.fire({
                icon:'error',
                title: "Something Went's Wrong!",
                timer: 2000
            })
        }
    }

    useEffect(() => {
        getProduct();
    }, []);


    const addToCart = async (productId,totalQuantity) =>{
        try{
            const response = await axios.post(API_URL + 'cart/add-to-cart',{
                userId:user.id,
                productId:productId,
                quantity:totalQuantity
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            console.log(response);
            if(response.status === 200){
                setCart(response.data);
                MySwal.fire({
                    icon:'success',
                    title:'Success',
                    text:'Book is added to Cart successfully'
                })
            }
        } catch(err){
            console.log(err);
            MySwal.fire({
                icon:'error',
                title:'Opps...',
                text:err.response.data.message,
                timer:2000
            })
        }
    }

    return (
        <section className="single-product">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="single-product-slider">
                            <div className="carousel slide" data-ride="carousel" id="single-product-slider">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={product && product.image} alt="" className="img-fluid" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="single-product-details mt-5 mt-lg-0">
                            <h2>{product && product.name}</h2>
                            <div className="sku_wrapper mb-4">
                                Author : <span className="text-muted">{product && product.author} </span>
                            </div>
                            <hr></hr>

                            <h3 className="product-price">
                                <del style={{color:'#fb5c42'}}>Rs. {product && product.price}.00</del> &nbsp; Rs. {product && product.sellPrice}.00
                            </h3>

                            <div className="sku_wrapper mb-4">
                                Discount : <span className="text-muted">{product && ((((product.price - product.sellPrice)/product.price))*100).toFixed(2)}%</span>
                            </div>
                            <div className="sku_wrapper mb-4">
                                Stocks: <span className="text-muted"> <strong>{product && product.stock}</strong> items left</span>
                            </div>

                            <div className="products-meta mt-4">
                                <div className="product-category d-flex align-items-center">
                                    <span className="font-weight-bold text-capitalize">Categories : <b>{product && product.category && product.category.name}</b></span>
                                </div>
                            </div>

                            <p className="product-description my-4">{product && product.description}</p>

                            <div className="cart">
                                <div className="quantity d-flex align-items-center">
                                    <input type="number"
                                        className="input-text w-25 qty text-center form-control mr-3"
                                        style={{ width: '50px', marginRight: '10px' }}
                                        name="quantity"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        title="Qty" />
                                    <button onClick={() => addToCart(product.id,quantity)} className="btn btn-main">Add to cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 py-3">
                            <Link to="/" className='btn btn-main'>Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>)

}

export default Product