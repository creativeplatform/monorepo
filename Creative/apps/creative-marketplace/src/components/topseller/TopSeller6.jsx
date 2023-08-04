import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

TopSeller6.propTypes = {
    
};

function TopSeller6(props) {
    const {data} = props;
    return (
        <section className="tf-section tf-top-seller">
                    <div className="tf-container">
                        <div className="row wow fadeInUp">

                            <div className="col-md-12">
                                <div className="tf-heading style-4 mb44 mb-wr">
                                    <h3 className="heading mb-bt-20">Top Creator Of Day</h3>
                                    <a className="button" href="/explore-v1">EXPLORE MORE </a>
                                </div>
                            </div>

                            {
                                data.slice(0,12).map(idx => (
                                    <div key={idx.id} className="col-xl-3 col-lg-4 col-md-6">                             
                                        <div className="tf-author style-3">
                                            <span className="number">{idx.id}</span>
                                            <div className="image">
                                                <img src={idx.avt} alt="Binasea" />
                                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z" fill="#EC407A"/>
                                                    <path d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z" fill="white"/>
                                                </svg>  
                                            </div>
                                            <div className="content">
                                                <div className="title">
                                                    <Link to="#">{idx.name}</Link>
                                                </div>
                                                <div className="price">
                                                    <span className="price-eth">{idx.price}</span>
                                                </div>
                                            </div>
                                        </div>                      
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
    );
}

export default TopSeller6;