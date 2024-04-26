import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import { AdminCategoryContext } from '../../context/AdminCategoryContext';
import { useNavigate } from 'react-router';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const API_URL = "http://localhost:9090/api/v1/";

const UpdateCategory = () => {

    const {categories} = useContext(AdminCategoryContext);
    const {id} = useParams();
    const [category,setCategory] = useState({});
    const navigate = useNavigate();
    const mySwal = withReactContent(Swal);

    const getCategory = () =>{
        setCategory(categories.filter((category) => category.id == id)[0]);
    }
    
    useEffect(() =>{
        if(categories.length != 0){
            getCategory();
        }
    },[categories]);

    const handleChange = (e) =>{
        setCategory((prevCatg) => ({...prevCatg,[e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.put(API_URL+'book-category/update/' + id,category,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                mySwal.fire({
                    icon:'success',
                    title: 'Success',
                    text: 'Category updated Successfully',
                    timer:2000
                });
                navigate('/all-categories');
            }
        } catch(err){
            mySwal.fire({
                icon:'error',
                title: 'Error',
                text: 'Something went Wrong!',
                timer:2000
            })

        }
    }

    return (
        <div className="card">
             <div className="card-body">
                <h5 className="card-title">Update Category</h5>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            id="name"
                            value={category !== null ? category.name : ""}
                            defaultValue=""
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-main px-3 mx-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCategory;
