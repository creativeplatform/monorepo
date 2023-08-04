import React , {useState} from 'react';
// import PropTypes from 'prop-types';
import { FreeMode, Thumbs, Autoplay   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import img from '../../assets/images/banner/glr-2.jpg';
import img1 from '../../assets/images/banner/glr-1.jpg';
import { Link } from 'react-router-dom';

// Artis.propTypes = {
    
// };

function Artis() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [dataThumb] = useState([
        {
            id: 1,
            img: img,
            title :'Hakunamatata',
            price : '100 ETH'
        },
        {
            id: 2,
            img: img,
            title :'Hakunamatata',
            price : '100 ETH'
        },
        {
            id: 3,
            img: img,
            title :'Hakunamatata',
            price : '100 ETH'
        },
        {
            id: 4,
            img: img,
            title :'Hakunamatata',
            price : '100 ETH'
        },
    ])
    const [dataThumbmain] = useState([
        {
            id: 1,
            img: img1,
            title :'Hakunamatata',

        },
        {
            id: 2,
            img: img1,
            title :'Hakunamatata',

        },
        {
            id: 3,
            img: img1,
            title :'Hakunamatata',

        },
        {
            id: 4,
            img: img1,
            title :'Hakunamatata',

        },
    ])
    return (
        <section className="tf-section tf-artis collection-carousel2">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading style-4 mb63 wow fadeInUp">
                                <h3 className="heading">Best Aritst</h3>
                                <a className="button" href="/explore-v1">EXPLORE MORE</a>
                            </div>
                        </div>
                        <div className="col-md-12 wow fadeInUp">
                        <Swiper
                            loop={true}
                            grabCursor={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: true,
                              }}

                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Autoplay, FreeMode, Thumbs ]}
                            className="slideThumb"
                        >
                            {
                                dataThumb.map(idx => (
                                    <SwiperSlide key={idx.id}>
                                        <div className="content-thumb">
                                            <div className="avt">
                                                <img src={idx.img} alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>{idx.title}</h4>
                                                <h5>{idx.price}</h5>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                           
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={30}
                            slidesPerView={'auto'}
                            freeMode={true}
                            watchSlidesProgress={true}
                            
                            modules={[FreeMode, Thumbs]}
                            className="slideThumbMain"
                        >
                            
                           {
                            dataThumbmain.map(idx => (
                                <SwiperSlide key={idx.id}>
                                    <div className="content-glr">
                                        <img src={idx.img} alt="images" />
                                        <Link to="#">{idx.title}</Link>
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

export default Artis;