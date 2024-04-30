import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProdImg from '../../assets/books/c-book.jpg';
import { CartContext } from '../context/CartContext';
import { LoginContext } from '../context/LoginContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:9090/api/v1/cart/";

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(LoginContext);
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const DecreaseQuantity = async (productId) => {
        try {
            const response = await axios.put(API_URL + `descrease-quantity/${productId}/${user.id}`, null, { headers: headers });
            if (response.status === 200) {
                if (response.data.tokenCheck === "unknown") {
                    localStorage.removeItem('user-details');
                    localStorage.removeItem('token');
                    navigate('../signin.jsx');
                }
                setCart(response.data);
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Opps...',
                text: 'Something went Wrong!',
                timer: 2000
            })
        }
    }

    const IncreaseQuantity = async (productId) => {
        try {
            const response = await axios.put(API_URL + `increase-quantity/${productId}/${user.id}`, null, { headers: headers });
            if (response.status === 200) {
                if (response.data.tokenCheck === "unknown") {
                    navigate('../signin/signin.jsx');
                }

                setCart(response.data);
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Opps...',
                text: err.response.data.message,
                timer: 2000
            })
        }
    }

    const RemoveProduct = async (productId) => {
        try {
            const response = await axios.delete(API_URL + `remove-book/${productId}/${user.id}`, { headers: headers });
            if (response.status === 200) {
                if (response.data.tokenCheck === "unknown") {
                    navigate('../signin/signin.jsx');
                }
                setCart(response.data);
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Opps...',
                text: err.response.data.message,
                timer: 2000
            })
        }
    }

    return (
        <section className="cart shopping page-wrapper">
            <div className="container">
                <h1 className="text-center">Cart</h1>
                <div className="row justify-content-center">
                    <div className="row justify-content-end">
                        <div className="col-lg-4">
                            <div className="cart-info card p-4 mt-4">
                                <h4 className="mb-4">Cart totals</h4>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between pb-2">
                                        <h5>Total</h5>
                                        <span>Rs. {cart && cart.totalPrice}.00</span>
                                    </li>
                                </ul>
                                <Link to="/" className='btn btn-main'>Back To Home</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="product-list">
                            <div className="cart-form">
                                <table className="table shop_table shop_table_responsive cart" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail">Images</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-price">Sell Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-remove"> </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {(cart && cart.cartItems) ? (
                                            cart.cartItems.map(item => {
                                                return (
                                                    <tr className="cart_item">
                                                        <td className="product-thumbnail" data-title="Thumbnail">
                                                            <Link to={'/product/' + item.product.id}>
                                                                <img src={item.product && item.product.image}
                                                                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                                                            </Link>
                                                        </td>

                                                        <td className="product-name" data-title="Product">
                                                            <Link to={'/product/' + item.product.id}>{item.product.name}</Link>
                                                        </td>

                                                        <td className="product-price" data-title="Price">
                                                            <span className="amount"><span className="currencySymbol">
                                                                <pre wp-pre-tag-3=""></pre>
                                                            </span>Rs. {item.product.price}.00</span>
                                                        </td>
                                                        <td className="product-price" data-title="Sell Price">
                                                            <span className="amount"><span className="currencySymbol">
                                                                <pre wp-pre-tag-3=""></pre>
                                                            </span>Rs. {item.product.sellPrice}.00</span>
                                                        </td>
                                                        <td className="product-quantity " data-title="Quantity">
                                                            <div className='d-flex'>
                                                                <button className='btn btn-main' onClick={() => DecreaseQuantity(item.product.id)}>-</button>
                                                                <div className="quantity">
                                                                    <label className="sr-only">Quantity</label>
                                                                    <input
                                                                        type="number"
                                                                        id="qty"
                                                                        className="input-text qty text"
                                                                        step="1"
                                                                        min="1"
                                                                        value={item.quantity}
                                                                        title="Qty"
                                                                        size="4"
                                                                        disabled />
                                                                </div>
                                                                <button className='btn btn-main' onClick={() => IncreaseQuantity(item.product.id)}>+</button>
                                                            </div>
                                                        </td>
                                                        <td className="product-subtotal" data-title="Total">
                                                            <span className="amount">
                                                                <span className="currencySymbol">
                                                                    <pre wp-pre-tag-3=""></pre>
                                                                </span>Rs. {item.product.sellPrice * item.quantity}.00</span>
                                                        </td>
                                                        <td className="product-remove" data-title="Remove">
                                                            <button onClick={() => RemoveProduct(item.product.id)}
                                                                className="btn btn-main" >
                                                                ×
                                                            </button>
                                                        </td>
                                                    </tr>)
                                            })) : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart
