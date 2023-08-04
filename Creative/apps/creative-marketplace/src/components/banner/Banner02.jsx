import React from 'react';
import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';


import shape1 from '../../assets/images/slider/bg-slider.png'
import shape2 from '../../assets/images/slider/bg-slider-4.png'
import img1 from '../../assets/images/product/product26.jpg'
import avt1 from '../../assets/images/author/authorpd14.png'
import avt2 from '../../assets/images/author/authorpd15.png'
import avt3 from '../../assets/images/author/authorpd16.png'

Banner02.propTypes = {
    data : PropTypes.array,
};

function Banner02(props) {
    const {data} = props;
    
    return (
        <section className="tf-slider">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                        <Swiper
                            modules={[Navigation,  Scrollbar, A11y ]}
                            spaceBetween={0}
                            slidesPerView={1}
                            className="slider-home home1"
                            loop= {true}
                        >
                        {
                            data.map(idx => (
                                <SwiperSlide key={idx.id}>
                                    <div className="tf-slider-item style-2">
                                        <div className="content-inner">
                                            <h1 className="heading">
                                                Defind, Coll<span>ect</span> and Sell Sup<span>er</span> Rate NFT  
                                                <img src={shape1} alt="Binasea" />  
                                            </h1>
                                            <p className="sub-heading">{idx.desc}</p>
                                            <div className="btn-slider ">
                                                <Link to="/explore-v1" className="tf-button style-2">Explore now</Link>
                                                <Link to="/create" className="tf-button style-3">Create</Link>
                                            </div>
                                        </div>
                                        <div className="image">
                                            <div className="sc-product style3 ">
                                                <div className="features">
                                                    <div className="product-media">
                                                        <img src={img1} alt="images" />
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="profile-author">
                                                        <Link to="#" className="avatar" data-tooltip="Creator: Daniel Jordan" tabIndex="0"><img src={avt1} alt="images" /></Link>
                                                        <Link to="#" className="avatar" data-tooltip="Creator: Daniel Rose" tabIndex="0"><img src={avt2} alt="images" /></Link>
                                                        <Link to="#" className="avatar" data-tooltip="Creator: Solvador" tabIndex="0"><img src={avt3} alt="images" /></Link>
                                                    </div>
                                                    <div className="details-product">
                                                        <div className="title"> <Link to="/item-details-v1">“The Monkey sad ”</Link> </div>
                                                        <div className="creator"> <Link to="#">{idx.tag}</Link> </div>
                                                    </div>
                                                    <div className="price">
                                                        <div className="subtitle">Current bid</div>
                                                        <div className="cash">{idx.price}</div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <img src={shape2} alt="Binasea" className="img-slider-2" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                                
                            ))
                        }
                    </Swiper>

                            
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Banner02;