import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faSignOutAlt, faPlus, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import './AdminHeader.css';

library.add(faBars, faSignOutAlt, faPlus);

const AdminHeader = () => {
    const { user, setUser } = useContext(LoginContext);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const signOut = (e) => {
        localStorage.removeItem('user-details');
        setUser({});
        MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: "Admin Logout Successfully!"
        });
        window.location.href = '/';
    }

    return (
        <div>
            <nav id="header" className="header navbar navbar-expand-sm fixed-top bg-white px-3">
                
                    <Link to="/" className="navbar-brand">
                        <span className="d-lg-block">E-Shop</span>
                    </Link>

                <div className='navbar-toggler' type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} />
                </div>

                <div className="collapse navbar-collapse bg-white py-3 my-3 px-3" id='navbarSupportedContent'>
                    <ul className='sidebar-nav d-sm-none'>
                        <li className="nav-item">
                            <Link className="nav-link " to="/">
                                <FontAwesomeIcon icon={faFolderPlus} />
                                <span className='px-2'>All Books</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/add-product">
                                <FontAwesomeIcon icon={faPlus} />
                                <span className='px-2'>Add Book</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/all-categories">
                                <FontAwesomeIcon icon={faFolderPlus} />
                                <span className="px-2">All Categories</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/add-category">
                                <FontAwesomeIcon icon={faPlus} />
                                <span className="px-2">Add Category</span>
                            </Link>
                        </li>
                    </ul>

                    <nav className="header-nav ms-auto">
                        <ul className="d-flex align-items-center">
                            <li className="nav-item dropdown pe-3">

                                <a className="nav-link nav-profile d-flex align-items-center px-3" href="#" data-bs-toggle="dropdown">
                                    <span className="d-md-block dropdown-toggle ps-2">{user && user.name}</span>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                    <li className="dropdown-header">
                                        <h6>{user && user.name}</h6>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <button className="dropdown-item d-flex align-items-center" onClick={signOut}>
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <span className='px-3'>Sign Out</span>
                                        </button>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </nav>
                </div>
            </nav>

            <aside id="sidebar collapse navbar-collapse" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link " to="/">
                            <FontAwesomeIcon icon={faFolderPlus} />
                            <span className='px-2'>All Books</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/add-product">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className='px-2'>Add Book</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/all-categories">
                            <FontAwesomeIcon icon={faFolderPlus} />
                            <span className="px-2">All Categories</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/add-category">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="px-2">Add Category</span>
                        </Link>
                    </li>
                </ul>

            </aside>
        </div>
    )
}

export default AdminHeader
