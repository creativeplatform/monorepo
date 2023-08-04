import React from 'react';
//import PropTypes from 'prop-types';
import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';

TopSeller5.propTypes = {
    
};

function TopSeller5(props) {
    const {data} = props;
    return (
        <section className="tf-section tf-top-seller">
                <div className="tf-container">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="tf-heading mb44 wow fadeInUp" >
                                <h3 className="heading">Top Creator Of Day</h3>
                            </div>
                        </div>
                        <div className="col-md-12">
                        <Swiper
                            modules={[Navigation,  Scrollbar, A11y ]}
                            spaceBetween={30}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    },
                                    500: {
                                        slidesPerView: 2,
                                        },
                                767: {
                                    slidesPerView: 3,
                                },
                                991: {
                                    slidesPerView: 4,
                                },
                                1300: {
                                    slidesPerView: 6,
                                },
                            }}
                            className="author"
                            // navigation
                            loop= {true}
                        >
                        {
                            data.slice(12,18).map(idx => (
                                <SwiperSlide key={idx.id}>
                                    <div className="slider-item">
                                            <div className="tf-author style-4">
                                                <img src={idx.avt} alt="Binasea" />
                                                <div className="title">
                                                    <Link to="#">{idx.name}</Link>
                                                </div>
                                                <div className="price">
                                                    <div className="icon">
                                                        <div className="number-icon">{idx.numb}</div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 0L18.6619 3.72998L23.8168 2.86475L24.5869 8.03475L29.2658 10.3647L26.85 15L29.2658 19.6353L24.5869 21.9653L23.8168 27.1353L18.6619 26.27L15 30L11.3381 26.27L6.18322 27.1353L5.41315 21.9653L0.734152 19.6353L3.15 15L0.734152 10.3647L5.41315 8.03475L6.18322 2.86475L11.3381 3.72998L15 0Z" fill="#EC407A"/>
                                                        </svg>
                                                    </div>
                                                        <span className="price-eth">{idx.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                </SwiperSlide>
                                
                            ))
                        }
                    </Swiper>

                        </div>
                        <div className="col-md-12">
                            <div className="btn-loadmore mt12 wow fadeInUp">
                                <Link to="/ranking" className="tf-button style-2 loadmore">Ranking</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default TopSeller5;