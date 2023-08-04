import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

TopSeller4.propTypes = {
    data : PropTypes.array,
};

function TopSeller4(props) {

    const {data} = props;
    return (
        <section className="tf-section tf-top-seller">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading style-3 mb40 wow fadeInUp">
                                <h3 className="heading">Top Creators</h3>
                                <p className="sub-heading">The most creative creator - Based on the last 30 days </p>
                            </div>
                        </div>
                         {
                            data.slice(0,12).map(idx => (
                                <div key={idx.id} className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="tf-author-wrap">
                                        <span className="number">{idx.id}.</span>
                                        <div className="tf-author">
                                            <div className="image">
                                                <img src={idx.avt} alt="Binasea" />
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 0L8.57908 2.1401L11.1145 1.33688L11.1341 3.99642L13.6574 4.83688L12.11 7L13.6574 9.16312L11.1341 10.0036L11.1145 12.6631L8.57908 11.8599L7 14L5.42092 11.8599L2.8855 12.6631L2.86592 10.0036L0.342604 9.16312L1.89 7L0.342604 4.83688L2.86592 3.99642L2.8855 1.33688L5.42092 2.1401L7 0Z" fill="#F9E10B"/>
                                                    <path d="M8.63376 5.33347C8.71124 5.25971 8.81434 5.21893 8.92131 5.21974C9.02828 5.22055 9.13075 5.26288 9.2071 5.33781C9.28346 5.41273 9.32771 5.51439 9.33054 5.62132C9.33337 5.72826 9.29454 5.83211 9.22226 5.91097L7.02776 8.65547C6.99002 8.69611 6.94448 8.72873 6.89385 8.75137C6.84322 8.77401 6.78855 8.78621 6.7331 8.78724C6.67764 8.78826 6.62256 8.7781 6.57112 8.75735C6.51969 8.7366 6.47297 8.70569 6.43376 8.66647L4.97846 7.21117C4.93793 7.1734 4.90542 7.12786 4.88288 7.07726C4.86033 7.02666 4.84821 6.97204 4.84723 6.91666C4.84625 6.86127 4.85644 6.80625 4.87719 6.75489C4.89794 6.70353 4.92882 6.65687 4.96799 6.6177C5.00716 6.57853 5.05382 6.54765 5.10518 6.5269C5.15654 6.50615 5.21156 6.49597 5.26695 6.49694C5.32233 6.49792 5.37695 6.51004 5.42755 6.53259C5.47815 6.55513 5.52369 6.58764 5.56146 6.62817L6.71316 7.77932L8.62331 5.34557C8.62675 5.34133 8.63042 5.33729 8.63431 5.33347H8.63376Z" fill="#191820"/>
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
                                
                                </div>
                            ))
                         }

                    </div>
                </div>
            </section>
    );
}

export default TopSeller4;