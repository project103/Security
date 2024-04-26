import React, { useContext } from 'react';
import './Category.css';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:8080/api/v1/';

const Category = ({ category }) => {
    const { setProducts } = useContext(ProductContext);
    const MySwal = withReactContent(Swal);

    const changeByCategory = async (categoryId) => {
        const response = await axios.get(API_URL + 'books-by-category-id/' + categoryId);
        if (response.status === 200) {
            setProducts(response.data);
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Opps...',
                text: "Something went's Wrong!"
            });
        }
    }
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
        </div>)
}

export default Category;