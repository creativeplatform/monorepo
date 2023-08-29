import React from 'react';
import PropTypes from 'prop-types';


import { Navigation, Scrollbar, A11y , Autoplay   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import './styles.scss'
import { Link } from 'react-router-dom';

Category.propTypes = {
    data : PropTypes.array,
};

function Category(props) {

    const {data} = props;
    return (
        <section className="tf-section tf-category">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading mb40 wow fadeInUp">
                                <h4 className="heading">All Categories</h4>
                            </div>
                        </div>
                        <div className="col-md-12 wow fadeInUp">
                        <Swiper
                            modules={[Navigation,  Scrollbar, A11y, Autoplay ]}
                            spaceBetween={20}
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
                            }}
                            className="product-category"
                            loop= {true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: true,
                              }}
                        >
                        {
                            data.map(idx => (
                                <SwiperSlide key={idx.id}>
                                    <div className="tf-product-category">
                                        <img src={idx.img} alt="Binasea" />
                                        <div className="category"><Link to="#">{idx.title}</Link></div>
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

export default Category;