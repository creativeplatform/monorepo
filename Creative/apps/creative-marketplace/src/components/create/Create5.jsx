import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import img1 from '../../assets/images/banner/img-banner1.jpg'
import img2 from '../../assets/images/banner/img-banner2.jpg'
import img3 from '../../assets/images/banner/img-banner3.jpg'

Create5.propTypes = {
    
};

function Create5(props) {
    return (
        <section className="tf-section tf-banner-create banner2">
                <div className="tf-container">
                    <div className="row vertical-middle">
                        <div className="col-md-6">
                            <div className="content-banner">
                                <h2 className="wow fadeInUp">Creat and Sell
                                    Your <span>NFTs</span> </h2>
                                <p className="wow fadeInUp">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p>
                                <div className="group-btn wow fadeInUp">
                                    <Link to="/create" className="tf-button style-2 btn-1">Creat Item</Link>
                                    <Link to="/live-auctions-v1" className="tf-button style-3 btn-2">Discover more</Link>
                                </div>
                                <div className="star ani3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                                        <path d="M21 0L26.6719 14.9631L42 20.5L26.6719 26.0369L21 41L15.3281 26.0369L0 20.5L15.3281 14.9631L21 0Z" fill="#C4C4C4"/>
                                        <path d="M21 0L26.6719 14.9631L42 20.5L26.6719 26.0369L21 41L15.3281 26.0369L0 20.5L15.3281 14.9631L21 0Z" fill="#F6CA2A"/>
                                        <path d="M41.5 30L44.606 38.394L53 41.5L44.606 44.606L41.5 53L38.394 44.606L30 41.5L38.394 38.394L41.5 30Z" fill="#EC407A"/>
                                        </svg>
                                </div>
                                <div className="details-1 ani1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="79" height="75" viewBox="0 0 79 75" fill="none">
                                        <g opacity="0.6" filter="url(#filter0_f_971_43088)">
                                        <rect x="20" y="20" width="39" height="35" rx="16" fill="url(#paint0_linear_971_43088)"/>
                                        </g>
                                        <defs>
                                        <filter id="filter0_f_971_43088" x="0" y="0" width="79" height="75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_971_43088"/>
                                        </filter>
                                        <linearGradient id="paint0_linear_971_43088" x1="20" y1="19.838" x2="39.934" y2="63.5355" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stop-color="#2C69D1"/>
                                        <stop offset="1" stop-color="#0ABCF9"/>
                                        </linearGradient>
                                        </defs>
                                        </svg>
                                </div>
                                <div className="details-2 ani2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="68" viewBox="0 0 72 68" fill="none">
                                        <g opacity="0.6" filter="url(#filter0_f_971_43082)">
                                        <rect x="20" y="20" width="32" height="28" rx="2" fill="#F6CA2A"/>
                                        </g>
                                        <defs>
                                        <filter id="filter0_f_971_43082" x="0" y="0" width="72" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_971_43082"/>
                                        </filter>
                                        </defs>
                                        </svg>
                                </div>
                                </div>
                            </div>
                        <div className="col-md-6">
                            <div className="thumb-image">
                                <div className="thumb-1 ani5">
                                    <img src={img1} alt="images" />
                                </div>
                                <div className="thumb-2 ani4">
                                    <img src={img2} alt="images" />
                                </div>
                                <div className="thumb-3 ani5">
                                    <img src={img3} alt="images" />
                                </div>
                                <div className="shape ani3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="825" height="559" viewBox="0 0 825 559" fill="none">
                                        <g opacity="0.6" filter="url(#filter0_f_1_5)">
                                        <rect x="130" y="343" width="32" height="28" rx="2" fill="#F6CA2A" fill-opacity="0.33"/>
                                        </g>
                                        <g opacity="0.6" filter="url(#filter1_f_1_5)">
                                        <rect x="510" y="20" width="20" height="18" rx="2" fill="#48BC65"/>
                                        </g>
                                        <g opacity="0.3" filter="url(#filter2_bf_1_5)">
                                        <rect x="518" y="94" width="237" height="238" rx="16" fill="#EC407A"/>
                                        </g>
                                        <g opacity="0.6" filter="url(#filter3_f_1_5)">
                                        <rect x="519" y="417" width="53" height="47" rx="2" fill="#F6CA2A" fill-opacity="0.33"/>
                                        </g>
                                        <g opacity="0.6" filter="url(#filter4_f_1_5)">
                                        <rect x="148" y="510" width="33" height="29" rx="2" fill="#48BC65"/>
                                        </g>
                                        <g opacity="0.2" filter="url(#filter5_f_1_5)">
                                        <rect x="12" y="205.498" width="82" height="73" rx="16" fill="url(#paint0_linear_1_5)"/>
                                        </g>
                                        <defs>
                                        <filter id="filter0_f_1_5" x="110" y="323" width="72" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1_5"/>
                                        </filter>
                                        <filter id="filter1_f_1_5" x="490" y="0" width="60" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1_5"/>
                                        </filter>
                                        <filter id="filter2_bf_1_5" x="448" y="24" width="377" height="378" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feGaussianBlur in="BackgroundImage" stdDeviation="10"/>
                                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_5"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1_5" result="shape"/>
                                        <feGaussianBlur stdDeviation="35" result="effect2_foregroundBlur_1_5"/>
                                        </filter>
                                        <filter id="filter3_f_1_5" x="499" y="397" width="93" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1_5"/>
                                        </filter>
                                        <filter id="filter4_f_1_5" x="128" y="490" width="73" height="69" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1_5"/>
                                        </filter>
                                        <filter id="filter5_f_1_5" x="0" y="193.498" width="106" height="97" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_1_5"/>
                                        </filter>
                                        <linearGradient id="paint0_linear_1_5" x1="12" y1="205.16" x2="53.3572" y2="296.552" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stop-color="#2C69D1"/>
                                        <stop offset="1" stop-color="#0ABCF9"/>
                                        </linearGradient>
                                        </defs>
                                        </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Create5;