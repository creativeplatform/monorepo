import React , {useState} from 'react';
import { useContract, useValidDirectListings } from '@thirdweb-dev/react';
import truncateEthAddress from 'truncate-eth-address';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Spinner from 'react-bootstrap/Spinner';
import CardModal from '../layouts/CardModal';
import { Link } from 'react-router-dom';

function Explore(props) {

    const { contract } = useContract("0xa71AB8eE65586BB6e305a98B919f1B83e007A946", "marketplace-v3");
    const { data: validDirectListings, isLoading } = useValidDirectListings(contract, { start: 0, count: 100 });

    const [modalShow, setModalShow] = useState(false);

    return (
        <section className="tf-section tf-explore tf-filter tf-center">
            <div className="tf-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tf-heading style-2 wow fadeInUp">
                            <h4 className="heading">Explore</h4>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {isLoading 
                            ? <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="light" role={'status'}><span className="visually-hidden">Loading...</span></Spinner>
                            </div> 
                            : <div className="row tf-filter-container wow fadeInUp">
                                {validDirectListings?.map(idx => (
                                    <div key={idx?.asset?.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                                        <div className="sc-product style3">
                                            <div className="features">
                                                <div className="product-media">
                                                    <img src={idx?.asset?.image} alt="images" />
                                                </div>
                                            </div>
                                            <div className="content">
                                                <div className="details-product">
                                                    <div className="title"><Link to="/item-details-v1">{idx?.asset?.name}</Link></div>
                                                    <div className="creator"><Link to="#">{truncateEthAddress(idx?.creatorAddress)}</Link></div>
                                                </div>
                                                <div className="price">
                                                    <div className="subtitle">Current bid</div>
                                                    <div className="cash">{`${idx?.currencyValuePerToken?.displayValue}${idx?.currencyValuePerToken?.symbol}`}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                              </div>
                        }
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