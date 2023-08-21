import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import avt1 from '../assets/images/author/author-login-1.png'
import avt2 from '../assets/images/author/author-login-2.png'

Login.propTypes = {
    
};

function Login(props) {
    return (
        <div>

<section className="tf-page-title style-2">    
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">

                            <ul className="breadcrumbs">
                                <li><Link to="/blog-v2">Home</Link></li>
                                <li>Login</li>
                            </ul>
                   
                        </div>
                    </div>
                </div>                    
            </section>
                
            <section className="tf-login">
                <div className="tf-container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="tf-heading style-5">
                                <h4 className="heading">Creat, Sell Or Collect Digital Item</h4>
                                <p className="sub-heading">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-12">
                            <div className="tf-account-wrap">
                                <div className="tf-account">
                                    <div className="button-close"><i className="fas fa-times"></i></div>
                                    <div className="image">
                                        <img src={avt1} alt="Binasea" />
                                    </div>
                                    <h6 className="name"><Link to="#">Len Simon</Link></h6>
                                </div>
                                <div className="tf-account active">
                                    <div className="button-close"><i className="fas fa-times"></i></div>
                                    <div className="image">
                                        <img src={avt2} alt="Binasea" />
                                    </div>
                                    <h6 className="name"><Link to="#">Dexter Silva</Link></h6>
                                </div>
                                <div className="tf-account add-item">
                                    <div className="button-add"><i className="fas fa-plus"></i></div>

                                    <h6 className="name">Add account</h6>
                                </div>
                            </div>
                            
                            <form action="#" id="contactform">
                                <div className="title-login">Or login with account</div>
                                <fieldset><input id="name" name="name" tabindex="1" aria-required="true" required="" type="text" placeholder="User name" /></fieldset>
                               <fieldset className="mb24"> <input id="showpassword" name="password" tabindex="2" aria-required="true"  type="password" placeholder="Password" required="" />
                                <span className="btn-show-pass "><i className="far fa-eye-slash"></i></span></fieldset>
                                <div className="forgot-pass-wrap">
                                    <label>Remember for 30 days
                                        <input type="checkbox" />
                                        <span className="btn-checkbox"></span>
                                    </label>
                                    <a className="forgot-pass" href="/login">Fogot password?</a>
                                </div>
                                <div className="title-login">Or login with social</div>
                                <div className="button-gg"><Link to="#" ><i className="fab fa-facebook"></i>Facebook</Link></div>
                                <div className="button-gg mb31"><Link to="#" ><i className="fab fa-google"></i>Google</Link>
                                </div>
                                <button className="submit" type="submit">Login</button>
                            </form>
                        
                            
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default Login;