import axios from 'axios';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AdminCategoryContext } from '../../context/AdminCategoryContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash,faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash,faPenToSquare);

const API_URL = "http://localhost:8080/api/v1/";

const AllCategories = ({getCategories}) => {

    const MySwal = withReactContent(Swal);
    const { categories, setCategories } = useContext(AdminCategoryContext);

    useEffect(() => {
        getCategories();
    }, []);

    const deleteCategory = async (id) => {
        const response = await axios.delete(API_URL + 'book-category/delete/' + id);
        if (response.status === 200) {
            setCategories(categories.filter((cate) => cate.id !== id));
            MySwal.fire({
                icon: 'success',
                title: 'Delete',
                text: response.data,
            });
        }
        else {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went's Worng!",
            });
        }
    }

    useEffect(() =>{

    },[]);

    return (
        <section className="section" style={{ paddingTop: '10px' }}>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card" style={{minHeight:'90vh'}}>
                        <div className="card-body">
                            <h5 className="card-title">All Categories</h5>
                            <div className="container row">
                                { categories.length !== 0 && (
                                        categories.map(category => {
                                            return (
                                                <div key={category.id} className="card mx-1" style={{width: '17rem'}}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{category.name}</h5>
                                                        <Link
                                                        style={{marginRight:'10px'}}
                                                         to={"/update-category/" + category.id} className="btn btn-main text-white">
                                                            <FontAwesomeIcon icon={faPenToSquare} /> update</Link>
                                                        <button className="btn btn-dark" onClick={() => deleteCategory(category.id)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete</button>
                                                    </div>
                                                </div>)
                                        })
                                    )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AllCategories;
