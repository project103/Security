import React from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ProdImage from '../../assets/books/c-book.jpg';
import { CartContext } from '../context/CartContext';
import { LoginContext } from '../context/LoginContext';
import withReactContent from 'sweetalert2-react-content';
import { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


library.add(faShoppingCart);

const API_URL = 'http://localhost:9090/api/v1/cart/';

const ProductCard = ({product}) => {
    const {setCart} = useContext(CartContext);
    const {user} = useContext(LoginContext);
    const MySwal = withReactContent(Swal);
    const productDiscount = ((((product.price - product.sellPrice)/product.price))*100).toFixed(2);
    const navigate = useNavigate();

    const addToCart = async (productId) =>{
        try{
            const response = await axios.post(API_URL + 'add-to-cart',{
                userId:user.id,
                productId:productId,
                quantity:1
            },{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`

                }
            });

            if(response.status === 200){
                if (response.data.tokenCheck === "unknown"){
                    localStorage.removeItem('user-details');
                    localStorage.removeItem('token');
                    navigate('../signin/signin.jsx');
                }
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
        <div className="main-product col-lg-3 col-12 col-md-4 col-sm-4 mb-5">
            <div className="product">
                <div className="product-wrap" style={{maxHeight:'320px !important',borderRadius:'10px'}}>
                    <Link to={"/product/" + product.id }>
                        <img src={product && product.image} className="w-100 my-3" alt="product-img"
                            style={{maxHeight:'320px !important',objectFit:'cover',borderRadius:'5px' }} />
                    </Link>
                </div>
                <span className="onsale">Stock : {product && product.stock} </span>

                <div className="product-hover-overlay">
                    <div onClick={() => addToCart(product.id)}>
                        <FontAwesomeIcon icon="shopping-cart" />
                    </div>
                </div>

                <div className="product-info ">
                    <h2 className="product-title h5 mb-0">
                        <Link to={"/product/" + product.id }>{product && product.name}</Link>
                    </h2>
                    <span>Author: <strong>{product && product.author}</strong> </span><br></br>
                    <span>Category: <strong> {product && product.category.name}</strong></span><br></br>
                    <div className='d-flex justify-content-center align-items-center'>
                        <del className="price font-bold" style={{color: '#fb5c42'}}>
                            <strong>Rs. {product && product.price}.00</strong>
                        </del><br></br>
                        <span className="price" style={{fontSize: '20px'}}>
                           <strong>Rs. {product && product.sellPrice}.00</strong>
                        </span><br></br>
                    </div>
                    <span>Discount:<strong>{productDiscount}</strong> %</span><br></br>
                </div>
            </div>
        </div>)
}

export default ProductCard;