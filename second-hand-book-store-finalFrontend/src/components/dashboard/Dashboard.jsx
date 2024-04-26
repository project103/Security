import React, { useContext } from 'react';
import ProfileDetails from '../profileDetails/ProfileDetails';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const {setUser} = useContext(LoginContext);
    const MySwal = withReactContent(Swal);

    const signOut = () => {
        localStorage.removeItem('user-details');
        setUser({});
        MySwal.fire({
          icon: 'success',
          title: 'Sign Out Successful!',
          text: 'User signed out successfully!',
          timer: 2000
        }).then(() => {
          window.location.href = '/';
        });
      };

    return (
        <section className="user-dashboard page-wrapper">
            <div className="container">
                <div className="row">
                    <h1 className="mb-3 text-center">Dashboard</h1>
                    <div className="col-12 col-md-5 col-sm-12 col-lg-3">
                        <div className="nav flex-column nav-pills">
                            <Link className="nav-link active" to="/dashboard">Account</Link>
                        </div>
                        <div className="nav flex-column nav-pills cursor-pointer">
                            <p onClick={signOut} className="nav-link" style={{cursor:'pointer'}}>Log Out</p>
                        </div>
                    </div>


                    <div className="col-12 col-md-7 col-sm-12 col-lg-9">
                        <ProfileDetails />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard