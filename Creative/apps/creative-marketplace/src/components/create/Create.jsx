import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Create.propTypes = {
    data : PropTypes.array,
};

function Create(props) {
    const {data} = props;
    return (
        <section className="tf-section tf-create-and-sell">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading style-2 mb40 wow fadeInUp">
                                <h4 className="heading">Create And Sell NFTs</h4>
                            </div>
                        </div>
                        {
                            data.map(idx =>(
                                <div className="col-lg-3 col-md-6" key={idx.id}>
                                    <div className="tf-create wow fadeInUp"  data-wow-delay="0.2s">
                                        <div className="icon">
                                            <img src={idx.img} alt="creative" />
                                        </div>
                                        <h6 className="title"><Link to="#">{idx.heading}</Link></h6>
                                        <p className="content">{idx.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </section>
    );
}

export default Create;