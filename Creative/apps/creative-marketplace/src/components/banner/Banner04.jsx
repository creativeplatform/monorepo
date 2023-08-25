import React from 'react';
//import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';

Banner04.propTypes = {
    
};

function Banner04(props) {
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
                            className="slider-home"
                            loop= {true}
                        >
                        {
                            data.slice(2,4).map(idx => (
                                <SwiperSlide key={idx.id}>
                                    <div className="tf-slider-item style-4">
                                                <div className="content-inner">
                                                    <h1 className="heading">
                                                        {idx.heading}
                                                    </h1>
                                                    <p className="sub-heading">{idx.desc}</p>
                                                    <form action="#">
                                                        <div id="item_category" className="dropdown">
                                                            <Link to="#" className="btn-selector nolink "><div className="icon"><i className="fab fa-ethereum"></i></div>ETH</Link>
                                                        </div>
                                                        <div className="search-form">
                                                            <input type="text" placeholder="Search keyword..." required="" />
                                                        <Link to='' className="btn-search"><i className="icon-fl-search-filled"></i></Link>
                                                        </div>
                                                    </form>
                                                    <div className="btn-slider ">
                                                        <Link to="/explore-v1" className="tf-button style-2">Explore <i className="fas fa-long-arrow-right"></i></Link>
                                                    </div>
                                                </div>
                                                <div className="image">
                                                    <div className="ani4"><img src={idx.img} alt="Binasea" /></div>
                                                
                                                    <div className="card-countdown">
                                                        <h4>Auction Ending In:</h4>
                                                        <span className="js-countdown countdown style-3" data-timer="55555" data-labels=" ,  h , min , s "></span>
                                                    </div>
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

export default Banner04;