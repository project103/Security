import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AdminCategoryContext } from '../../context/AdminCategoryContext';
import { AdminProductContext } from '../../context/AdminProductContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import { useNavigate } from 'react-router';

const API_URL = "http://localhost:9090/api/v1/";

const AddProduct = () => 
{
  const MySwal = withReactContent(Swal);

  const {categories} = useContext(AdminCategoryContext);
  
  const {setProducts} = useContext(AdminProductContext);

  const navigate = useNavigate();

  const [productDetails,setProductDetails] = useState({
    name:'',
    image:'',
    author:'',
    description:'',
    price:0,
    sellPrice:0,
    stock:0,
    categoryId:null
  });

  const handleChange = (e) =>{
    setProductDetails((prevState) =>({...prevState,[e.target.name]:e.target.value}));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(API_URL + 'book/create',productDetails);
      // if(response.status === 200){
        
      //   setProducts((prevProducts)=> ([...prevProducts,response.data]));
      //   MySwal.fire({
      //     icon:'success',
      //     title:'Success',
      //     text: "Product is Created!",
      //   });
      //   navigate('/');
      // }
      if(response.status === 200){
        if (response.data.tokenCheck === "unknown"){
            localStorage.removeItem('user-details');
            localStorage.removeItem('token');
            navigate('../signin/signin.jsx');
        }
        setProducts((prevProducts)=> ([...prevProducts,response.data]));
        MySwal.fire({
          icon:'success',
          title:'Success',
          text: "Product is Created!",
        });
        navigate('/');
    }
    
    
    
    } catch(err){
      MySwal.fire({
        icon:'error',
        title:'Opps...',
        text: "Something went Wrong!",
      });
    }
  }


  return (
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Product</h5>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name"
                    name="name"
                    value={productDetails.name}
                    onChange={handleChange}
                    required
                     />
                </div>
                <div className="col-md-6">
                  <label htmlFor="image" className="form-label">Product Image</label>
                  <input 
                      type="text"
                      name="image"
                      id="image"
                      className="form-control" 
                      value={productDetails.image}
                      onChange={handleChange} 
                      required
                      />
                </div>
                <div className="col-md-6">
                  <label htmlFor="author" className="form-label">Author</label>
                  <input 
                    type="text"
                    name="author" 
                    className="form-control" 
                    id="author" 
                    value={productDetails.author}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="col-12">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Enter Description" 
                    onChange={handleChange}
                    value={productDetails.description}
                    ></textarea>
                </div>
                <div className="col-6">
                  <label htmlFor="inputAddress2" className="form-label">Price</label>
                  <input 
                    type="number"
                    name="price"
                    id="price" 
                    className="form-control" 
                    placeholder="Price"
                    value={productDetails.price}
                    onChange={handleChange}
                    required
                     />
                </div>
                <div className="col-6">
                  <label htmlFor="sellPrice" className="form-label">Sell Price</label>
                  <input 
                    type="number"
                    name="sellPrice"
                    id="sellPrice" 
                    className="form-control" 
                    placeholder="Sell Price"
                    value={productDetails.sellPrice}
                    onChange={handleChange}
                    required
                     />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stock" className="form-label">Stock</label>
                  <input 
                    type="text"
                    name="stock"
                    id="stock"
                    className="form-control"
                    value={productDetails.stock} 
                    onChange={handleChange}
                    required
                     />
                </div>

                <div className="col-md-6">
                  <label htmlFor="categoryId" className="form-label">Category</label>
                  <select 
                    id="categoryId" 
                    name="categoryId" 
                    className="form-select" 
                    style={{height:'50px'}}
                    onChange={handleChange}
                    required>
                      <option selected>Choose Categories</option>
                      {categories.length !== 0 && (
                        categories.map((category =>{
                          return (<option key={category.id} value={category.id}>{category.name}</option>);
                        }))
                      ) }
                  </select>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-main px-3 mx-3">Submit</button>
                </div>

              </form>
            </div>
        </div>
    )
}

export default AddProduct;
