import React, { useContext } from 'react';
import './Category.css';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9090/api/v1/';

const Category = ({ category }) => {
    const { setProducts } = useContext(ProductContext);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const changeByCategory = async (categoryId) => {
        try {
            const authToken = localStorage.getItem('token'); // Assuming you're storing the token in local storage

            const headers = {
                Authorization: `Bearer ${authToken}`,
            };

            const response = await axios.get(API_URL + 'books-by-category-id/' + categoryId, { headers });
            
            if (response.status === 200) {
                if (response.data.tokenCheck === "unknown") {
                    localStorage.removeItem('user-details');
                    localStorage.removeItem('token');
                    navigate('../signin/signin.jsx');
                }
                setProducts(response.data);
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something went wrong!"
                });
            }
        } catch (error) {
            console.error('Error fetching books by category:', error);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong!"
            });
        }
    };

    return (
        <div className='col container mb-2' onClick={() => changeByCategory(category.id)}>
            <div className="col justify-content-center align-items-center">
                <div className="col-lg-12 col-sm-12 col-md-4 category-container">
                    <div className="item-info text-center" >
                        <p className="mb-1 py-3 category-name"
                            style={{ cursor: 'pointer', fontSize: '20px', color: 'black' }}>
                            {category && category.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
