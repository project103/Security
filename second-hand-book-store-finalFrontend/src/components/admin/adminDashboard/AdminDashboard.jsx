import React,{useState,useEffect} from 'react';
import './AdminDashboard.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import axios from 'axios';
import { Routes,Route } from 'react-router';

import AllProducts from '../allProducts/AllProducts';
import AllCategories from '../allCategories/AllCategories';
import AddProduct from '../addProduct/AddProduct';
import AdminHeader from '../adminHeader/AdminHeader';
import AddCategory from '../addCategory/AddCategory';
import UpdateProduct from '../updateProduct/UpdateProduct';
import { AdminProductContext } from '../../context/AdminProductContext';
import { AdminCategoryContext } from '../../context/AdminCategoryContext';
import UpdateCategory from '../updateCategory/UpdateCategory';

const API_URL = "http://localhost:8080/api/v1/";

const AdminDashboard = () => 
{
    const MySwal = withReactContent(Swal);
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);

    const getCategories = async () =>{
        const response = await axios.get(API_URL + 'book-categories');
        if(response.status === 200){
            setCategories(response.data);
        }
        else{
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went's Worng!",
            });
        }
    }
    
    const getAllProducts = async () =>{
        const response = await axios.get(API_URL + 'books');
        if(response.status == 200){
            setProducts(response.data);
        }
        else{
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong's",
            })
        }
    }

    useEffect(() => {
        getAllProducts();
        getCategories();
    }, []);
    
    return (
        <>
            <AdminProductContext.Provider value={{products,setProducts}}>
                <AdminCategoryContext.Provider value={{categories,setCategories}}>
                    <AdminHeader />
                    <main id="main" className="main">
                        <Routes>
                            <Route path="/" exact element={<AllProducts getAllProducts={getAllProducts} />}/>
                            <Route path="/add-product" element={<AddProduct />}/>
                            <Route path="/update-product/:id" element={<UpdateProduct />}/>
                            <Route path="/all-categories" element={<AllCategories getCategories={getCategories} />}/>
                            <Route path="/add-category" element={<AddCategory />}/>
                            <Route path="/update-category/:id" element={<UpdateCategory />}/>
                            <Route path="*" element={<AllProducts getAllProducts={getAllProducts} />}/>
                        </Routes>
                    </main>
                </AdminCategoryContext.Provider>
            </AdminProductContext.Provider>
        </>
    )
}

export default AdminDashboard;
