import React , {useState} from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import icon1 from '../../assets/images/icon/rain1.svg'
import icon2 from '../../assets/images/icon/rain2.svg'
import icon3 from '../../assets/images/icon/dai.svg'
import CardModal from '../layouts/CardModal';

LiveAuction4.propTypes = {
    data : PropTypes.array,
};

function LiveAuction4(props) {
    const [modalShow, setModalShow] = useState(false);
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
        <section className="tf-section tf-hot-auction tf-filter">
                <div className="tf-container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="tf-heading style-3 mb23 wow fadeInUp">
                                <h3 className="heading">Hot Auction</h3>
                                <p className="sub-heading">The most creative creator - Based on the last 30 days </p>
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
                                            Recently create    
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
                                            <div className="row tf-filter-container wow fadeInUp">
                                                {
                                                    data.slice(idx.item, 14).map(idx => (
                                                        <div key={idx.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d cyber">
                                                            <div className="sc-product style1">
                                                                <div className="top">
                                                                    <Link to="/item-details-v1" className="tag">{idx.title}</Link>
                                                                    <div className="wish-list">
                                                                        <Link to="#" className="heart-icon"></Link>
                                                                    </div>
                                                                </div>
                                                                <div className="features">
                                                                    <div className="product-media">
                                                                        <img src={idx.img} alt="images" />
                                                                    </div>
                                                                    <div className="featured-countdown">
                                                                        <span className="js-countdown" data-timer="55555" data-labels=" ,  h , m , s "></span>
                                                                    </div>
                                                                    <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                                    <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                                                </div>
                                                                <div className="bottom">
                                                                    <div className="details-product">
                                                                        <div className="author">
                                                                            <div className="avatar">
                                                                                <img src={idx.avt} alt="images" />
                                                                            </div>
                                                                            <div className="content">
                                                                                <div className="position">Creator</div>
                                                                                <div className="name"> <Link to="#">Magnus Perry</Link></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="current-bid">
                                                                            <div className="subtitle">Current bid</div>
                                                                            <div className="price">
                                                                                <span className="cash">5 DAI</span><span className="icon"><img src={icon3} alt="images" /></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <Link to="#" onClick={() => setModalShow(true)} data-toggle="modal" data-target="#popup_bid" className="tf-button"> <span className="icon-btn-product"></span> Place Bid</Link>
                                                                    </div>
                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            
                                            </div>
                                        </TabPanel>
                                    ))
                                }
                                

                            </Tabs> 

                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="btn-loadmore wow fadeInUp">
                            <Link to="/explore-v1" className="tf-button style-8 loadmore">Explore More <i className="fas fa-long-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>

                <CardModal 
                show={modalShow}
                onHide={() => setModalShow(false)} 
            />
            </section>
    );
}

export default LiveAuction4;