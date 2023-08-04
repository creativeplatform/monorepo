import React , {useState} from 'react';
//import PropTypes from 'prop-types';
import icon1 from '../assets/images/svg/icon-create-5.svg'
import icon2 from '../assets/images/svg/icon-create-6.svg'
import icon3 from '../assets/images/svg/icon-create-3.svg'
import icon4 from '../assets/images/svg/icon-create-7.svg'
import icon5 from '../assets/images/svg/icon-create-8.svg'
import icon6 from '../assets/images/svg/icon-create-9.svg'
import { Link } from 'react-router-dom';

HelpCenter.propTypes = {
    
};

function HelpCenter(props) {
    const [dataHelp] = useState([
        {
            id: 1,
            icon: icon1,
            title: 'Getting Started',
            text: 'Learn how to create an account, set up your wallet, and what you can do on BinaSea',
            link: '#'
        },
        {
            id: 2,
            icon: icon2,
            title: 'Creating',
            text: 'Learn how to create an account, set up your wallet, and what you can do on BinaSea',
            link: '#'
        },
        {
            id: 3,
            icon: icon3,
            title: 'Buying',
            text: 'Learn how to create an account, set up your wallet, and what you can do on BinaSea',
            link: '#'
        },
        {
            id: 4,
            icon: icon4,
            title: 'Selling',
            text: 'Learn how to create an account, set up your wallet, and what you can do on BinaSea',
            link: '#'
        },
        {
            id: 5,
            icon: icon5,
            title: 'Partner',
            text: 'Learn how to create an account, set up your wallet, and what you can do on BinaSea',
            link: '#'
        },
        {
            id: 6,
            icon: icon6,
            title: 'Developers',
            text: 'Learn how to create an account, set up your wallet, and what you can do on BinaSea',
            link: '#'
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
                                <li>Help Center</li>
                            </ul>
                   
                        </div>
                    </div>
                </div>                    
            </section>
                
            <section className="tf-help-center">
                <div className="tf-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-12">
                            <div className="tf-heading style-5">
                                <h4 className="heading">How Can We Help You?</h4>
                                <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Laborum Obcaecati Dignissimos Quae Quo Ad Iste Ipsum Officiis Deleniti Asperiores Sit. </p>
                            </div>

                            <form action="#" className="help-center-form">
                                <input type="text" placeholder="Enter Question..." required="" />
                                <button><i className="fas fa-search"></i></button>
                            </form>

                            <h4 className="heading-help">Recent Questions</h4>

                            <div className="tf-create-wrap">

                                {
                                    dataHelp.map(idx => (
                                        <div key={idx.id} className="tf-create style-2">
                                            <div className="icon">
                                                <img src={idx.icon} alt="Creative" />
                                            </div>
                                            <h6 className="title"><Link to="#"> {idx.title}</Link></h6>
                                            <p className="content">{idx.text}</p>
                                            <div className="button">
                                                <Link to={idx.link} className="tf-button">View more<i className="fal fa-long-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            
                               
        
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default HelpCenter;