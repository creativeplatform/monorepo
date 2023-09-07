import React , {useState} from 'react';
import { useContract, useValidDirectListings } from '@thirdweb-dev/react';
import truncateEthAddress from 'truncate-eth-address';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CardModal from '../layouts/CardModal';
import { Link } from 'react-router-dom';

function Explore(props) {

    const { contract } = useContract("0xa71AB8eE65586BB6e305a98B919f1B83e007A946", "marketplace-v3");
    const { data: validDirectListings } = useValidDirectListings(contract, { start: 0, count: 100 });

    const [modalShow, setModalShow] = useState(false);

    // const [dataTab] = useState([
    //     {
    //         id: 1,
    //         type: '3d',
    //         title: '3D MODEL',
    //         item: 0,
    //     },
    //     {
    //         id: 2,
    //         type: 'anime',
    //         title: 'ANIME/MANGA',
    //         item: 4,
    //     },
    //     {
    //         id: 3,
    //         type: 'cyber-punk',
    //         title: 'CYBER PUNK',
    //         item: 2,
    //     },
    //     {
    //         id: 4,
    //         type: 'pixel',
    //         title: 'PIXEL ART',
    //         item: 6,
    //     },
    //     {
    //         id: 5,
    //         type: 'Music',
    //         title: 'MUSIC',
    //         item: 7,
    //     },
    //     {
    //         id: 6,
    //         type: 'Abstract',
    //         title: 'ABSTRACT',
    //         item: 1,
    //     },
    //     {
    //         id: 7,
    //         type: 'Kraken',
    //         title: '2D ARTS',
    //         item: 1,
    //     },

    // ]);
    return (
        <section className="tf-section tf-explore tf-filter tf-center">
                <div className="tf-container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="tf-heading style-2 wow fadeInUp">
                                <h4 className="heading">Explore</h4>
                            </div>
                        </div>
                        <div className="col-md-12">
                        <div className="row tf-filter-container wow fadeInUp">
                            {
                                validDirectListings?.map(idx => (
                                    <div key={idx?.asset?.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                                        <div className="sc-product style3">
                                                            <div className="features">
                                                                <div className="product-media">
                                                                    <img src={idx?.asset?.image} alt="images" />
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <div className="details-product">
                                                                    <div className="title"> <Link to="/item-details">{idx?.title}</Link> </div>
                                                                    <div className="creator"> <Link to="#">{truncateEthAddress(idx?.creatorAddress)}</Link> </div>
                                                                </div>
                                                                <div className="price">
                                                                    <div className="subtitle">Current bid</div>
                                                                    <div className="cash">{idx?.currencyValuePerToken?.displayValue} {idx?.currencyValuePerToken?.symbol}</div>
                                                                </div>
                                                                <div className="profile-author">
                                                                    <Link to="#" className="avatar" data-tooltip="Creator: Daniel Jordan" tabIndex="0"><img src={idx.avt1} alt="images" /></Link>
                                                                    <Link to="#" className="avatar" data-tooltip="Creator: Daniel Rose" tabIndex="0"><img src={idx.avt2} alt="images" /></Link>
                                                                    <Link to="#" className="avatar" data-tooltip="Creator: Solvador" tabIndex="0"><img src={idx.avt3} alt="images" /></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        </div>
                        <div className="col-md-12">
                            <div className="btn-loadmore mt8 wow fadeInUp">
                                <Link to="/explore-v3" className="tf-button loadmore style-4">Load more</Link>
                            </div>
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

export default Explore;