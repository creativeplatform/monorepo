import React , {useState} from 'react';
//import PropTypes from 'prop-types';

import img1 from '../assets/images/ranking/ranking-1.png'
import img2 from '../assets/images/ranking/ranking-2.png'
import img3 from '../assets/images/ranking/ranking-3.png'
import img4 from '../assets/images/ranking/ranking-4.png'

import { Link } from 'react-router-dom';

Ranking.propTypes = {
    
};

function Ranking(props) {

    const [dataRanking] = useState([
        {
            id: 1,
            img: img1,
            name :' Abstraction',
            volume: '12,4353',
            h: '+3456%',
            d: '-564%',
            price: '12,4353 DAI',
            owners: '3.3k',
            assets:'23k'
        },
        {
            id: 2,
            img: img2,
            name :' Abstraction',
            volume: '12,4353',
            h: '+3456%',
            d: '-564%',
            price: '12,4353 DAI',
            owners: '3.3k',
            assets:'23k'
        },
        {
            id: 3,
            img: img3,
            name :' Abstraction',
            volume: '12,4353',
            h: '+3456%',
            d: '-564%',
            price: '12,4353 DAI',
            owners: '3.3k',
            assets:'23k'
        },
        {
            id: 4,
            img: img4,
            name :' Abstraction',
            volume: '12,4353',
            h: '+3456%',
            d: '-564%',
            price: '12,4353 DAI',
            owners: '3.3k',
            assets:'23k'
        },
        {
            id: 5,
            img: img1,
            name :' Abstraction',
            volume: '12,4353',
            h: '+3456%',
            d: '-564%',
            price: '12,4353 DAI',
            owners: '3.3k',
            assets:'23k'
        },
        {
            id: 6,
            img: img2,
            name :' Abstraction',
            volume: '12,4353',
            h: '+3456%',
            d: '-564%',
            price: '12,4353 DAI',
            owners: '3.3k',
            assets:'23k'
        },
    ])
    return (
        <div>

<section className="tf-page-title ">    
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">

                            <ul className="breadcrumbs">
                                <li><Link to="/">Home</Link></li>
                                <li>Ranking</li>
                            </ul>
                            <h4 className="page-title-heading">Ranking</h4>
                        </div>
                    </div>
                </div>                    
            </section>

            <section className="tf-ranking tf-filter overflow-d">
                <div className="tf-container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="top-menu">
                                <ul className="filter-menu">
                                    <li className="active"><Link to="#" data-filter=".3d">3D MODEL</Link></li>
                                    <li><Link to="#" data-filter=".anime">ANIME/MANGA</Link></li>
                                    <li><Link to="#" data-filter=".cyber">CYBER PUNK</Link></li>
                                    <li><Link to="#" data-filter=".pixel">PIXEL ART </Link></li>
                                    <li><Link to="#" data-filter=".music">MUSIC </Link></li>
                                    <li><Link to="#" data-filter=".abstract">ABSTRACT </Link></li>
                                    <li><Link to="#" data-filter=".2d">2D ARTS </Link></li>
                                </ul>
                                <div id="item_category" className="dropdown">
                                    <Link to="#" className="btn-selector nolink ">Last 7 days</Link>
                                    <ul >
                                        <li><span>Last 3 days</span></li>
                                        <li className="active"><span>Last 7 days</span></li>
                                        <li><span>Last 14 days</span></li>
                                        <li><span>Last 21 days</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-ranking">
                        <div className="title-ranking">
                            <div className="col-ranking">#</div>
                            <div className="col-ranking">Collection</div>
                            <div className="col-ranking">Volume</div>
                            <div className="col-ranking">24h %</div>
                            <div className="col-ranking">7d %</div>
                            <div className="col-ranking">Floor Price</div>
                            <div className="col-ranking">Owners</div>
                            <div className="col-ranking">Assets</div>
                        </div>
                    </div>
                    <div className="table-ranking tf-filter-container">

                        {
                            dataRanking.map(idx => (
                                <div key={idx.id} className="content-ranking tf-loadmore 3d anime music">
                                    <div className="col-ranking">{idx.id}</div>
                                    <div className="col-ranking"><div className="image"><img src={idx.img} alt="Binasea" /><div className="icon"><i className="fas fa-check"></i></div></div> {idx.name}</div>
                                    <div className="col-ranking">{idx.volume}</div>
                                    <div className="col-ranking">{idx.h}</div>
                                    <div className="col-ranking">{idx.d}</div>
                                    <div className="col-ranking">{idx.price}</div>
                                    <div className="col-ranking">{idx.owners}</div>
                                    <div className="col-ranking">{idx.assets}</div>
                                </div>
                            ))
                        }
                        
                        
                    </div>
                    <div className="col-md-12">
                        <div className="tf-pagination">
                            <Link to="#" className="tf-button active">1-25</Link>
                            <Link to="#" className="tf-button">25-35</Link>
                            <Link to="#" className="tf-button ">35-50</Link>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default Ranking;