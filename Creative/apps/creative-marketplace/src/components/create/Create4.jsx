import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import img from '../../assets/images/banner/thumb-banner.png'

Create4.propTypes = {
    
};

function Create4(props) {
    return (
        <section className="tf-section tf-banner-create" >
                <div className="tf-container">
                    <div className="row vertical-middle">
                        <div className="col-md-6">
                            <div className="thumb-banner">
                                <div className="shape1 ani4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="255" viewBox="0 0 20 255" fill="none">
                                        <path d="M1.04052 17.3472L10.0151 0C11.2529 2.21454 18.6826 16.7979 18.9896 17.3472C19.9181 19.0082 21.2692 25.3321 17.4423 29.8963C13.7287 34.3254 8.15831 36.1708 2.89733 30.2654C-1.18999 25.6774 -0.0941967 19.8078 1.04052 17.3472Z" fill="#EC407A"/>
                                        <circle r="3" transform="matrix(1 0 0 -1 9.5 227.5)" fill="#EC407A" stroke="#EC407A"/>
                                        <circle r="3" transform="matrix(1 0 0 -1 9.5 251.5)" fill="#EC407A" stroke="#EC407A"/>
                                        <line y1="-1" x2="152" y2="-1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 9 205)" stroke="#EC407A" strokeWidth="2"/>
                                        </svg>
                                </div>
                                <div className="thumb">
                                    <img src={img} alt="images" />
                                </div>
                                <div className="shape2 ani5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="272" viewBox="0 0 48 272" fill="none">
                                        <line x1="24" y1="44" x2="24" y2="196" stroke="#E33B3B" strokeWidth="2"/>
                                        <path d="M24 209L30.4822 231.992L48 240.5L30.4822 249.008L24 272L17.5178 249.008L0 240.5L17.5178 231.992L24 209Z" fill="#E33B3B"/>
                                        <circle cx="23.5" cy="27.5" r="3.5" fill="#E33B3B"/>
                                        <circle cx="23.5" cy="3.5" r="3.5" fill="#E33B3B"/>
                                        </svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="content-banner">
                                <div className="company "><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="20" fill="#EC407A"/>
                                    <path d="M12.8814 20.2451L20.4834 8C21.5319 9.5632 27.8252 19.8573 28.0853 20.2451C28.8718 21.4176 30.0163 25.8815 26.7747 29.1033C23.629 32.2297 18.9106 33.5323 14.4542 29.3638C10.992 26.1252 11.9202 21.982 12.8814 20.2451Z" fill="white"/>
                                    </svg> cesea
                                </div>
                                <h2 className="wow fadeInUp">Create and Sell nFT with Cesea</h2>
                                <p className="wow fadeInUp">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel</p>
                                <div className="group-btn wow fadeInUp">
                                    <Link to="/create" className="tf-button style-2 btn-1">Create Item</Link>
                                    <Link to="/item-details-v1" className="tf-button style-3 btn-2">Sell Item</Link>
                                </div>
                                <div className="shape ani4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="176" height="143" viewBox="0 0 176 143" fill="none">
                                        <path d="M77.3294 126.162C55.2085 124.134 9.25963 110.354 2.43137 71.4571C0.743732 62.3166 4.23102 40.7095 31.6813 27.4047" stroke="#EC407A" strokeWidth="3"/>
                                        <path d="M98.7243 15.9962C120.845 18.0242 166.794 31.8045 173.622 70.7011C175.31 79.8416 171.823 101.449 144.372 114.753" stroke="#E33B3B" strokeWidth="3"/>
                                        <path d="M42.074 15.4582L50.5959 0.701185C51.713 2.61761 58.4014 15.2279 58.6785 15.7033C59.5164 17.1407 60.6862 22.5834 57.0882 26.4461C53.5967 30.1945 48.4203 31.7013 43.6282 26.5641C39.9052 22.573 40.9932 17.5533 42.074 15.4582Z" fill="#EC407A"/>
                                        <path d="M110.5 101.492L113.805 116.179L123.24 121.734L113.645 127.009L109.908 141.592L106.604 126.905L97.1689 121.35L106.763 116.075L110.5 101.492Z" fill="#E33B3B"/>
                                        </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Create4;