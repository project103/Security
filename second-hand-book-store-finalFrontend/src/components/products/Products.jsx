import React, { useContext, useEffect } from 'react';
import Category from '../category/Category';
import ProductCard from '../productCard/ProductCard';
import { ProductContext } from '../context/ProductContext';
import { CategoryContext } from '../context/CategoryContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './Products.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9090/api/v1/';

const Products = () => {
    const { products, setProducts } = useContext(ProductContext);
    const { categories, setCategories } = useContext(CategoryContext);
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const getCategories = async () => {
        try {
            const response = await axios.get(API_URL + 'book-categories', {headers});
            if (response.status === 200) {
                if (response.data.tokenCheck === "unknown") {
                    localStorage.removeItem('user-details');
                    localStorage.removeItem('token');
                    navigate('../signin/signin.jsx');
                }
                setCategories(response.data);
            }
        } catch (err) {
            console.error(err);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong!"
            });
        }
    };

    const getAllProducts = async () => {
        try {
            const response = await axios.get(API_URL + 'books', {headers});
            if (response.status === 200) {
                if (response.data.tokenCheck === "unknown") {
                    localStorage.removeItem('user-details');
                    localStorage.removeItem('token');
                    navigate('../signin/signin.jsx');
                }
                setProducts(response.data);
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something went wrong!"
                });
            }
        } catch (err) {
            console.error(err);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong!"
            });
        }
    };

    useEffect(() => {
        getAllProducts();
        getCategories();
    }, []);

    return (
        <section className="products-shop section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-3">
                        <section className="widget widget-sizes mb-2">
                            <div className="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#categoryItem" aria-expanded="false" aria-controls="categoryItem">
                                            <h5 className="d-block text-left-sm mb-2">
                                                Shop By Categories
                                            </h5>
                                        </button>
                                    </h2>
                                    <div id="categoryItem" className="accordion-collapse collapse my-3 show" >
                                        <div className='col container my-2' onClick={getAllProducts} >
                                            <div className="col justify-content-center align-items-center">
                                                <div className="col-lg-12 col-sm-12 col-md-4 category-container">
                                                    <div className="item-info text-center" >
                                                        <p className="mb-0 py-3 category-name"
                                                            style={{ cursor: 'pointer', fontSize: '20px', color: 'black' }}>
                                                            All Books
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {categories && (categories.map(category => (<Category key={category.id} category={category} />)))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="col-md-9 col-12 mb-2">
                        <div className="row align-items-center">
                            <div className="col-lg-12 mb-lg-0">
                                <div className="section-title">
                                    <h2 className="d-block text-left-sm mb-2">
                                        Shop the Second Hand Books
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {products && products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {products.length === 0 && (<h2 className='text-center my-3' style={{ color: '#dd4b39' }}>Product Not Found!</h2>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
