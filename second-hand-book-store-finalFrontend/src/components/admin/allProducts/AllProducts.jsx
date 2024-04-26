import React, { useContext } from 'react';
import { useEffect } from 'react';
import { AdminProductContext } from '../../context/AdminProductContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProductCard from '../productCard/ProductCard';

const API_URL = 'http://localhost:9090/api/v1/';

const AllProducts = ({getAllProducts}) => {
    const MySwal = withReactContent(Swal);
    const { products, setProducts } = useContext(AdminProductContext);

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(API_URL + 'book/delete/' + id);
            if (response.status === 200) {
                setProducts(products.filter((prod) => prod.id !== id));
                MySwal.fire({
                    icon: 'success',
                    title: 'Delete',
                    text: response.data,
                });
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong's!",
            })
        }
    }

    useEffect(() =>{
        getAllProducts();
    },[])

    return (
        <section className="section" style={{ paddingTop: '10px' }}>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">All Products</h5>
                            {products.length !== 0 ? (
                                products.map((product) => {
                                    return (<ProductCard key={product.id} product={product} deleteProduct={deleteProduct} />)
                                })
                            ) : null}
                        </div>
                    </div>

                </div>
            </div>
        </section>)
}

export default AllProducts;
