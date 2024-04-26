import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AdminCategoryContext } from '../../context/AdminCategoryContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 

const API_URL = "http://localhost:9090/api/v1/";

const AddCategory = () => 
{
    const mySwal = withReactContent(Swal);

    const {setCategories} = useContext(AdminCategoryContext);

    const [categoryDetail,setCategoryDetail] = useState({
        name:''
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setCategoryDetail((prevData) => ({...prevData,[e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(API_URL+'book-category/create',categoryDetail);
            if(response.status === 200){
                console.log(response.data);
                setCategories((prevState) => ([...prevState,response.data]));
                mySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text:"Category is created!",
                })
                navigate('/all-categories');
            }
        } catch(err){
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong's",
            })
        }
    }  

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add Category</h5>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="inputName5" className="form-label">Category Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            id="inputName5"
                            value={categoryDetail.name}
                            onChange={handleChange} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-main px-3 mx-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddCategory
