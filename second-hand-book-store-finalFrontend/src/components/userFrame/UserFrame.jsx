import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Home from '../home/Home';
import Cart from '../cart/Cart';
import Dashboard from '../dashboard/Dashboard';
import { LoginContext } from '../context/LoginContext';
import { ProductContext } from '../context/ProductContext';
import { CategoryContext } from '../context/CategoryContext';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Product from '../product/Product';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:9090/api/v1/";

const UserFrame = () => {
  const { user } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const getCart = async () => {
    try {
      const response = await axios.get(API_URL + 'cart/user-id/' + user.id, { headers });
      if (response.status === 200) {
        if (response.data.tokenCheck === "unknown") {
          localStorage.removeItem('user-details');
          localStorage.removeItem('token');
          navigate('../signin/signin.jsx');
        }
        setCart(response.data);
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Opps...',
          text: "Something Went Wrong!"
        });
      }
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: 'error',
        title: 'Opps...',
        text: "Something Went Wrong!"
      });
    }
  };

  const changeByCategory = async (categoryId) => {
    try {
      const response = await axios.get(API_URL + 'books-by-category-id/' + categoryId, { headers });
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Something Went Wrong!"
        });
      }
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something Went Wrong!"
      });
    }
  };

  useEffect(() => {
    if (user !== null) {
      getCart();
    }
  }, [user]);

  return (
    <>
      <ProductContext.Provider value={{ products, setProducts }}>
        <CategoryContext.Provider value={{ categories, setCategories }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <Navbar />
            <Routes>
              <Route path='/' exact element={<Navigate to="/home" />} />
              <Route path='/home' element={<Home />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' exact element={<Home />} />
            </Routes>
            <Footer />
          </CartContext.Provider>
        </CategoryContext.Provider>
      </ProductContext.Provider>
    </>
  );
}

export default UserFrame;
