import React, { useContext, useState } from 'react';
import './SignIn.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9090/api/v1/user/';

const SignIn = () => {
    const {setUser} = useContext(LoginContext);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
          const response = await axios.post(API_URL + 'sign-in',{email,password},{
            headers:{
              'Content-Type':'application/json',

            }
          });
          if(response.status === 200){
            localStorage.setItem('user-details',JSON.stringify(response.data));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            setUser(response.data);

            MySwal.fire({
              icon:'success',
              title:'Success',
              text:`${response.data.role} is Sign In Successfully!`,
              timer:2000
            });
            navigate('/');
          }
        } catch(err){
          MySwal.fire({
            icon:'error',
            title:'Error',
            text:"Email or Password are Not Match!",
            timer:2000
          })
          setEmail('');
          setPassword('');
        }
    }

  return (
    <div className="account section signin-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="login-form border p-5 shadow">
            <div className="text-center heading">
              <h2>Sign In</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email"
                    id="email"
                    className="form-control shadow-sm" 
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required/>
              </div>
              <div className="form-group">
                <label htmlFor="#">Password</label>
                <input 
                    type="password" 
                    name="password"
                    id="password"
                    className="form-control shadow-sm" 
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required/> 
              </div>
              <button type="submit" className="btn btn-main mt-3 btn-block">Login</button>
            </form>
            <div>
                <p className="lead mt-2">Don’t have an account? 
                <Link to='/sign-up'>Create a account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default SignIn;