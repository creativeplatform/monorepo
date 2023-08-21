import React , {useState} from 'react';
// import PropTypes from 'prop-types';

import { Accordion } from 'react-bootstrap-accordion';
import { Link } from 'react-router-dom';
import data from '../assets/fake-data/data-hotpick'
import icon1 from '../assets/images/icon/rain1.svg'
import icon2 from '../assets/images/icon/rain2.svg'
import icon3 from '../assets/images/icon/dai.svg'
import CardModal from '../components/layouts/CardModal';


// Faqs.propTypes = {
    
// };

function Faqs(props) {
    const [modalShow, setModalShow] = useState(false);

    const [dataFaq] = useState([
        {
            id: 1,
            title: 'What Is MiNFT ?',
            text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sapien, lacus vitae sapien nulla amet risus nunc. Faucibus nunc, egestas quis semper porttitor. Fermentum magna commodo sodales curabitur. Pharetra, gravida nunc aliquam dolor id magna eu orci. Porttitor magna nulla est amet dolor ultricies egestas gravida. Nulla pellentesque convallis ligula placerat consectetur tortor, lobortis velit risus.'
        },
        {
            id: 2,
            title: 'How We Can Buy And Invest NFT ?',
            text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sapien, lacus vitae sapien nulla amet risus nunc. Faucibus nunc, egestas quis semper porttitor. Fermentum magna commodo sodales curabitur. Pharetra, gravida nunc aliquam dolor id magna eu orci. Porttitor magna nulla est amet dolor ultricies egestas gravida. Nulla pellentesque convallis ligula placerat consectetur tortor, lobortis velit risus.'
        },
        {
            id: 3,
            title: 'Why We Should Choose Binasea ?',
            text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sapien, lacus vitae sapien nulla amet risus nunc. Faucibus nunc, egestas quis semper porttitor. Fermentum magna commodo sodales curabitur. Pharetra, gravida nunc aliquam dolor id magna eu orci. Porttitor magna nulla est amet dolor ultricies egestas gravida. Nulla pellentesque convallis ligula placerat consectetur tortor, lobortis velit risus.'
        },
        {
            id: 4,
            title: 'How Secure Is This Token ?',
            text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sapien, lacus vitae sapien nulla amet risus nunc. Faucibus nunc, egestas quis semper porttitor. Fermentum magna commodo sodales curabitur. Pharetra, gravida nunc aliquam dolor id magna eu orci. Porttitor magna nulla est amet dolor ultricies egestas gravida. Nulla pellentesque convallis ligula placerat consectetur tortor, lobortis velit risus.'
        },
        {
            id: 5,
            title: 'How Quickly Can I Get Customer Support?',
            text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sapien, lacus vitae sapien nulla amet risus nunc. Faucibus nunc, egestas quis semper porttitor. Fermentum magna commodo sodales curabitur. Pharetra, gravida nunc aliquam dolor id magna eu orci. Porttitor magna nulla est amet dolor ultricies egestas gravida. Nulla pellentesque convallis ligula placerat consectetur tortor, lobortis velit risus.'
        },
    ])
    return (
        <div>

        <section className="tf-page-title style-2">    
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">

                            <ul className="breadcrumbs">
                                <li><Link to="/">Home</Link></li>
                                <li>FAQs</li>
                            </ul>
                   
                        </div>
                    </div>
                </div>                    
            </section>
                
            <section className="tf-faq">
                <div className="tf-container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="tf-heading style-5">
                                <h4 className="heading">Frequently Questions</h4>
                                <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Laborum Obcaecati Dignissimos Quae Quo Ad Iste Ipsum Officiis Deleniti Asperiores Sit. </p>
                            </div>
                            <div className="tf-accordion">
                                {
                                    dataFaq.map(idx => (
                                        <Accordion key={idx.id} title={idx.title} className='tf-toggle-title h6'>
                                            <p className="toggle-content">{idx.text} </p>
                                        </Accordion>
                                    ))
                                }
                             
                                                    
                            </div> 
                        </div>
                    </div>
                </div>
            </section >
                
            <section className='tf-explore-more'>
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading center">
                                <h4 className="heading">Explore More</h4>
                            </div>
                        </div>

                        {
                                    data.slice(0,4).map(idx =>(
                                        <div key={idx.id}  className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ">
                                            <div className="sc-product style2">
                                            <div className="top">
                                                <Link to="/item-details-v1" className="tag">{idx.title}</Link>
                                                <div className="wish-list">
                                                    <Link to="#" className="heart-icon"></Link>
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <div className="details-product">
                                                    <div className="author">
                                                        <div className="avatar">
                                                            <img src={idx.avt} alt="images" />
                                                        </div>
                                                        <div className="content">
                                                            <div className="position">Creator</div>
                                                            <div className="name"> <Link to="#">{idx.create}</Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="features">
                                                <div className="product-media">
                                                    <img src={idx.img} alt="images" />
                                                </div>
                                                <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                            </div>
                                            <div className="bottom-style2">
                                                <div className="price">
                                                    <div className="icon"><img src={icon3} alt="images" /></div>
                                                    <div className="content">
                                                        <div className="name">DAI</div>
                                                        <div className="cash">{idx.price}</div>
                                                    </div>
                                                </div>
                                                <div className="product-button">
                                                    <Link to="#" onClick={() => setModalShow(true)} data-toggle="modal" data-target="#popup_bid" className="tf-button"> Purchase</Link>
                                                </div>
                                            </div>
            
                                        </div>
                                        </div>
                                        
                                    ))
                                }

                    </div>
                </div>

                <CardModal 
                show={modalShow}
                onHide={() => setModalShow(false)} 
            />
            </section>
            
        </div>
    );
}

export default Faqs;