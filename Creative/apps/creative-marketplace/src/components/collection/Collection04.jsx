import React , {useState} from 'react';
//import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Dropdown } from 'react-bootstrap';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';

Collection04.propTypes = {
    
};

function Collection04(props) {
    const {data} = props;

    const [dataTab] = useState([
        {
            id: 1,
            title: '3D MODEL',
            item: 6,
        },
        {
            id: 2,
            title: 'ANIME/MANGA',
            item: 11,
        },
        {
            id: 3,
            title: 'CYBER PUNK',
            item: 9,
        },
        {
            id: 4,
            title: 'PIXEL ART',
            item: 15,
        },
        {
            id: 5,
            title: 'MUSIC',
            item: 9,
        },
        {
            id: 6,
            title: 'ABSTRACT',
            item: 10,
        },
        {
            id: 7,
            title: '2D ARTS',
            item: 12,
        },

    ]);
    return (
        <section className="tf-section tf-top-collection tf-filter">
                <div className="tf-container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="tf-heading style-3 mb28 wow fadeInUp">
                                <h3 className="heading">Top Collection</h3>
                                <p className="sub-heading">The most well-known Collection - Based on the last 30 days  </p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Tabs>
                                <div className="d-flex justify-content-between mb-wr">
                                    <TabList>
                                        {
                                            dataTab.map(idx => (
                                                <Tab key={idx.id}>{idx.title}</Tab>
                                            ))
                                        }
                                        
                                    </TabList>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" className=''>
                                            SORT BY    
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <li><span>Recently Listed</span></li>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <li className="active"><span>Recently Created</span></li>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <li><span>Recently Sold</span></li>
                                        </Dropdown.Item>
                                        
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    
            
                                </div>

                                {
                                        dataTab.map(idx => (
                                            <TabPanel key={idx.id}>
                                                <div className="row ">
                                <div className="col-md-12">
    
                                    <Swiper
                                        modules={[Navigation,  Scrollbar, A11y ]}
                                        spaceBetween={30}
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 1,
                                                },
                                            767: {
                                                slidesPerView: 2,
                                            },
                                            1300: {
                                                slidesPerView: 3,
                                            },
                                        }}
                                        className="collection-over swiper-container"

                                        loop= {true}
                                    >
                                    {
                                        data.slice(0,4).map(idx => (
                                            <SwiperSlide key={idx.id}>
                                                <div className="slider-item">
                                                        <div className="sc-product style1 collection collection2">
                                                            <div className="top">
                                                                <div className="content">
                                                                    <div className="author-cl">
                                                                        <img src={idx.avt} alt="images" />
                                                                    </div>
                                                                    <div className="inner">
                                                                        <Link to="#" className="name">{idx.name}</Link>
                                                                        <div className="create">created by <Link to="#">MariaBrownie@1123</Link></div>
                                                                    </div>
                                                                </div>
                                                                <div className="wish-list">
                                                                    <Link to="#" className="heart-icon"></Link>
                                                                </div>
                                                            </div>
                                                            <Link to="#">
                                                                <div className="thumb-collection">
                                                                    <div className="left-thumb">
                                                                        <img src={idx.img1} alt="images" />
                                                                    </div>
                                                                    <div className="right-thumb">
                                                                        <div className="top-cl">
                                                                            <img src={idx.img2} alt="images" />
                                                                        </div>
                                                                        <div className="bottom-cl">
                                                                            <img src={idx.img3} alt="images" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                            </SwiperSlide>
                                            
                                        ))
                                    }
                                    </Swiper>
                                </div>
                                <div className="col-md-12">
                                    <Swiper
                                        modules={[Navigation,  Scrollbar, A11y ]}
                                        spaceBetween={30}
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 1,
                                                },
                                            767: {
                                                slidesPerView: 2,
                                            },
                                            1300: {
                                                slidesPerView: 3,
                                            },
                                        }}
                                        className="collection-over swiper-container"
                                        loop= {true}
                                    >
                                    {
                                        data.slice(0,4).map(idx => (
                                            <SwiperSlide key={idx.id}>
                                                <div className="slider-item">
                                                        <div className="sc-product style1 collection collection2">
                                                            <div className="top">
                                                                <div className="content">
                                                                    <div className="author-cl">
                                                                        <img src={idx.avt} alt="images" />
                                                                    </div>
                                                                    <div className="inner">
                                                                        <Link to="#" className="name">{idx.name}</Link>
                                                                        <div className="create">created by <Link to="#">MariaBrownie@1123</Link></div>
                                                                    </div>
                                                                </div>
                                                                <div className="wish-list">
                                                                    <Link to="#" className="heart-icon"></Link>
                                                                </div>
                                                            </div>
                                                            <Link to="#">
                                                                <div className="thumb-collection">
                                                                    <div className="left-thumb">
                                                                        <img src={idx.img1} alt="images" />
                                                                    </div>
                                                                    <div className="right-thumb">
                                                                        <div className="top-cl">
                                                                            <img src={idx.img2} alt="images" />
                                                                        </div>
                                                                        <div className="bottom-cl">
                                                                            <img src={idx.img3} alt="images" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                            </SwiperSlide>
                                            
                                        ))
                                    }
                                    </Swiper>
                                </div>
                                </div>
                                            </TabPanel>
                                        ))
                                    }


                                
                                

                            </Tabs> 
                        </div>
                    </div>

                   
                </div>
            </section>
    );
}

export default Collection04;