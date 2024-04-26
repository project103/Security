import React,{useEffect} from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { AdminProductContext } from '../../context/AdminProductContext';
import { AdminCategoryContext } from '../../context/AdminCategoryContext';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL =  "http://localhost:9090/api/v1/";

const UpdateProduct = () => 
{
    const {products} = useContext(AdminProductContext);
    const {categories} = useContext(AdminCategoryContext);
    
    const {id} = useParams();
    const [product,setProduct] = useState({
      name:'',
      image:'',
      author:'',
      description:'',
      price:0,
      sellPrice:0,
      stock:0,
      categoryId:null
      });

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const getProduct = () =>{
        const selectedProduct = products.filter((prod) => prod.id == id)[0];
        setProduct({
          name:selectedProduct.name,
          image:selectedProduct.image,
          author:selectedProduct.author,
          description:selectedProduct.description,
          price:selectedProduct.price,
          sellPrice:selectedProduct.sellPrice,
          stock:selectedProduct.stock,
          categoryId:selectedProduct.category.id
        })
      }
      
    useEffect(() => {
      if(products.length !== 0){
        getProduct();
      }
    }, [products,categories]);

    
    const handleChange = (e) =>{
      setProduct((prevState) => ({...prevState,[e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      console.log('update Product : ',product);
      try{
        const response = await axios.put(API_URL + 'book/update/'+id,product,{
          headers:{
            'Content-Type':'application/json'
          }
        });
        console.log(response);
        if(response.status === 200){
          MySwal.fire({
            icon:'success',
            title:'Success',
            text:"Product Updated Successfully",
            timer:2000
          });
          navigate('/');
        }
      } catch(err){
        MySwal.fire({
          icon:'error',
          title:'Error',
          text:"Something went's Wrong!"
        });
      }
    }

    return (
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Product</h5>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name"
                    name="name"
                    value={product.name}
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
                      value={product.image}
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
                    value={product.author}
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
                    value={product.description}
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
                    value={+product.price}
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
                    value={+product.sellPrice}
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
                    value={product.stock} 
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
                      <option defaultValue={''}>Choose Categories</option>
                      {categories.length !== 0 && (
                        categories.map((category =>{
                          return (<option 
                            key={category.id} 
                            value={+category.id}
                            selected={ product.categoryId !== 0 ? (product.categoryId === category.id ? true :false):false }
                            >{category.name}</option>);
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

export default UpdateProduct
