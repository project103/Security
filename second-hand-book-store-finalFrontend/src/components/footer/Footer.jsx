import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
        <div className="row">
                <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
                <div className="footer-widget" style={{color:'#fb5c42'}}>
                        <h4 className="mb-4">Ecom</h4>
                        <p className="lead">The best platform for shop the second hand books</p>
                        
                        <div className="">
                            <p className="mb-0"><strong>Location : </strong>Gondia Maharashtra ,INDIA</p>
                            <p><strong>Support Email : </strong> support@email.com</p>
                        </div>
                </div>
                </div>
    
                <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                    <div className="footer-widget">
                    <h4 className="mb-4" style={{color:'#fb5c42'}}>Category</h4>
                    <ul className="pl-0 list-unstyled mb-0">
                    <li><a href="#">Fashon Books</a></li>
                    <li><a href="#">Horro Books</a></li>
                    <li><a href="#">Adventure Books</a></li>
                    <li><a href="#">Love Books</a></li>
                    <li><a href="#">Biography Books</a></li>
                    </ul>
                </div>
                </div>
    
                <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                    <div className="footer-widget">
                    <h4 className="mb-4" style={{color:'#fb5c42'}}>Useful Link</h4>
                    <ul className="pl-0 list-unstyled mb-0">
                    <li><a href="#">News &amp; Tips</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Our Shop</a></li>
                    <li><a href="#">Contact Us</a></li>
                    </ul>
                        </div>
                </div>


                <div className="col-md-6 col-lg-3 col-sm-6  text-sm-left text-center">
                    <div className="footer-widget">
                    <h4 className="mb-4" style={{color:'#fb5c42'}}>Contact</h4>
                    <ul className="pl-0 list-unstyled mb-5">
                    <li className="d-lg-flex justify-content-between">Email : &nbsp;<span>aditya@gmail.com</span></li>
                    <li className="d-lg-flex justify-content-between">Mobile No :<span>+911231234567</span></li>
                    <li className="d-lg-flex justify-content-between">Fax :<span>+01 7852463248</span></li>
                    </ul>
    
                    <h6 style={{color:'#fb5c42'}}>Created By Abdallah mohamed</h6>
                </div>
                </div>

            </div>
        </div>
    </footer>)
}

export default Footer