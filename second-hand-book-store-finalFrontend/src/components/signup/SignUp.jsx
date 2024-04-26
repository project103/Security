import React, { useState } from 'react';
import './SignUp.css';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/user/"
const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNo: '',
    address: '',
    password: '',
    vpassword: ''
  });

  const [emailValid,setEmailValid] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    if(e.target.name === "email"){
      console.log("hello world");
        if (e.target.value === "") {
          setEmailValid(true);
        } else {
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setEmailValid(true);
          } else {
            setEmailValid(false);
          }
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userDetails.password !== userDetails.vpassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password Not Match!',
        })
      } else if(emailValid) {
        const response = await axios.post(API_URL + 'sign-up', userDetails, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Register Successful',
            text: 'user register successfull!',
          })
          navigate('/sign-in');
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Email Not Valid',
          text: 'Email is not Valid!',
        })
      }
    } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went Wrong!',
        })

      }
    }

  return (
    <div className="account section signup-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="login-form border p-5 shadow">
              <div className="text-center heading">
                <h2>Sign Up</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control shadow-sm"
                    placeholder="Enter Name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control shadow-sm ${!emailValid ?'notValid':null}`}
                    placeholder="Enter Email"
                    value={userDetails.email}
                    onChange={handleChange}
                    required />
                    {!emailValid && (<p style={{color:'#dd4b39'}}>Email Not Valid</p>)}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="phoneNo">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNo"
                    className="form-control shadow-sm"
                    placeholder="Enter Mobile Number"
                    value={userDetails.phoneNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control shadow-sm"
                    placeholder="Enter Address"
                    value={userDetails.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control shadow-sm"
                    placeholder="Enter Password"
                    value={userDetails.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="#">Confirm Password</label>
                  <input
                    type="password"
                    name="vpassword"
                    id="vpassword"
                    className="form-control shadow-sm"
                    placeholder="Confirm Password"
                    value={userDetails.vpassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type='submit' className="btn btn-main mt-3 btn-block">Signup</button>
              </form>
              <div>
                <p className="lead mt-2">Already have an account?
                  <Link to="/sign-in"> Login now</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default SignUp