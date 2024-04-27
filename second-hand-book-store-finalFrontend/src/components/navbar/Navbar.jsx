import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faShoppingCart, faSignOut } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faShoppingCart, faSignOut);

const Navbar = () => {
  const { setUser } = useContext(LoginContext);
  const { cart } = useContext(CartContext);
  const MySwal = withReactContent(Swal);
  const [totalItem, setTotalItem] = useState(0);

  const signOut = () => {
    localStorage.removeItem('user-details');
    localStorage.removeItem('token');
    setUser({});
    MySwal.fire({
      icon: 'success',
      title: 'Sign Out Successful!',
      text: 'User signed out successfully!',
      timer: 2000
    }).then(() => {
      window.location.href = '/';
    });
  };

  const scrollOut = () =>{
    window.scrollTo(
      {
        top:700,
        behavior:'smooth'
      }
    );
  }

  useEffect(() => {
    if (cart !== null) {
      let totalItemAmount = 0;
      cart.cartItems?.forEach(item => {
        totalItemAmount += item.quantity;
      });
      setTotalItem(totalItemAmount);
    }
  }, [cart]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation" id="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand font-weight-bold" to="/">
          <h2>E-Shop</h2>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar"
          aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={scrollOut}>Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={scrollOut}>Books</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/dashboard" className="nav-link dropdown-toggle" id="navbarDropdown5" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Account
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                <li>
                  <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="top-menu list-inline mb-0 d-lg-block px-3" id="top-menu">
            <li className="list-inline-item px-3">
              <Link to="/cart" className="nav-link" style={{position:'relative'}}>
                <span className='px-2' style={{
                    position:'absolute',
                    top:'-5px',
                    right:'-10px',
                    borderRadius:'50%',
                    background:'#fff',
                    color:'#ec5b48'}}>{totalItem}</span>
                <FontAwesomeIcon icon="shopping-cart" />
              </Link>
            </li>
            <li className="list-inline-item">
              <button onClick={signOut} className="btn btn-link nav-link">
                <FontAwesomeIcon icon="sign-out" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
