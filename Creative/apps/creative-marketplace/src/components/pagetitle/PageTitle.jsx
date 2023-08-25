import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss'

// PageTitle.propTypes = {
    
// };

function PageTitle(props) {
    //const {sub} = props;
    const {title} = props;
    //const {none} = props;
    return (
        <section className="tf-page-title">    
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">

                            <ul className="breadcrumbs">
                                <li><Link to="/">Home</Link></li>
                                <li>{title}</li>
                            </ul>

                            <h4 className="page-title-heading">{title}</h4>
                   
                        </div>
                    </div>
                </div>                    
            </section>
    );
}

export default PageTitle;