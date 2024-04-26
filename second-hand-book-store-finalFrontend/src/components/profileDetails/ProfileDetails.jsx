import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './ProfileDetails.css';

const API_URL = 'http://localhost:9090/api/v1/user/'
const ProfileDetails = () => {
    const [updatedUser,setUpdatedUser] = useState({});
    const [emailValid,setEmailValid] = useState(true);
    const {user,setUser} = useContext(LoginContext);
    const MySwal = withReactContent(Swal);

    useEffect(() =>{
        if(user){
            setUpdatedUser(user);
        }
    },[user]);

    const handleChange = (e) =>{
        setUpdatedUser((prevProp) => ({...prevProp,[e.target.name]:e.target.value}));
        if(e.target.name === 'email'){
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(emailValid){
                const response = await axios.put(API_URL + 'update/' + user.id,updatedUser,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                if(response.status === 200){
                    setUser(response.data);
                    localStorage.removeItem('user-details');
                    localStorage.setItem('user-details',JSON.stringify(response.data));
                    MySwal.fire({
                        icon:'success',
                        title:'User Updated!',
                        text:'User is Updated!',
                        timer:3000
                    })
                }
            } else{
                MySwal.fire({
                    icon:'error',
                    title:'Opps...',
                    text:'Email is Not Valid',
                    timer:3000
                })
            }
        } catch (err){
            MySwal.fire({
                icon:'error',
                title:'Opps...',
                text:err.response.data.message,
                timer:3000
            })
        }
    } 
    return (
        <div className="col-12 col-md-7 col-sm-12 col-lg-9">
            <div className="tab-pane fade show active" id="settings" role="tabpanel" >
                <div className="acccount-settings">
                    <h4 className="mb-4">Account information</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor='name'>Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter Name"
                                defaultValue={updatedUser.name}
                                onChange={handleChange} 
                                required/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor='email'>Email</label>
                            <input 
                                type="email" 
                                className={`form-control ${!emailValid ?'notValid':null}`} 
                                placeholder="Enter Email"
                                id="email"
                                name="email"
                                defaultValue={updatedUser.email}
                                onChange={handleChange}
                                required
                                 />
                                {!emailValid && <p style={{color:'#dd4b39'}}>Email Is Not Valid</p>}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor='phoneNo'>Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                name="phoneNo"
                                id="phoneNo"
                                defaultValue={updatedUser.phoneNo}
                                onChange={handleChange} 
                                required/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor='address'>Address</label>
                            <textarea
                                name="address"
                                type="text"
                                className="form-control"
                                placeholder="therichposts@gmail.com"
                                id="address"
                                defaultValue={updatedUser.address}
                                onChange={handleChange}
                                >
                            </textarea>
                        </div>
                        <button type='submit' className="btn btn-dark my-3">Save Changes</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default ProfileDetails