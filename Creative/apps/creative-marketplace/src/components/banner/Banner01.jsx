import React from 'react';
import PropTypes from 'prop-types';
import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from '../../assets/images/slider/bg-slider.png'
import avatar1 from '../../assets/images/slider/1.png'
import avatar2 from '../../assets/images/slider/2.png'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import './styles.scss'
import { Link } from 'react-router-dom';

Banner01.propTypes = {
    data : PropTypes.array,
};

function Banner01(props) {
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
                            data.slice(0,2).map(idx => (
                                <SwiperSlide key={idx.id}>
                                    <div className="tf-slider-item">
                                        <div className="content-inner">
                                            <h1 className="heading">
                                                Create, Tra<span>de &</span> Own the Ne<span>xt Bi</span>g Thing  
                                                <img src={img1} alt="Creative" />  
                                            </h1>
                                            <p className="sub-heading">{idx.desc}</p>
                                            <div className="btn-slider ">
                                                <Link to="/explore-v3" className="tf-button style-2">Explore</Link>
                                                <Link to="/create" className="tf-button style-3">Create</Link>
                                            </div>
                                        </div>
                                        <div className="image">
                                            <div className="img-slider-main ani5"><img src={idx.img} alt="Creative"/></div>
                                            <img src={avatar1} alt="Creative" className="img-slider-2 ani4" />
                                            <img src={avatar2} alt="Creative" className="img-slider-3 ani5" />
                                            
                                            <div className="current-bid ">
                                                <div className="title">Current bid</div>
                                                <div className="price">{idx.price}</div>
                                            </div>
                                            <div className="card-infor ani5">
                                                <img src={idx.avt} alt="Creative" />
                                                <div className="inner ">
                                                    <h6 className="name">{idx.name}</h6>
                                                    <p className="author">{idx.tag}</p>
                                                </div>
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

export default Banner01;