import React , {useState, useEffect} from 'react';

import { Navigation, Scrollbar, A11y , Pagination   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContract, useValidEnglishAuctions } from "@thirdweb-dev/react";
import truncateEthAddress from 'truncate-eth-address';

import Spinner from 'react-bootstrap/Spinner';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import CardModal from '../layouts/CardModal';

import icon1 from '../../assets/images/icon/rain1.svg'
import icon2 from '../../assets/images/icon/rain2.svg'
import icon3 from '../../assets/images/icon/dai.svg'
import { Link } from 'react-router-dom';

// LiveAuctions.propTypes = {
//     data : PropTypes.array,
// };

function LiveAuctions(props) {
    const [modalShow, setModalShow] = useState(false);
    const [timeLefts, setTimeLefts] = useState({}); // Store countdowns for each auction

    const { contract } = useContract("0xa71AB8eE65586BB6e305a98B919f1B83e007A946", "marketplace-v3");
    const { data: validEnglishAuctions, isLoading } = useValidEnglishAuctions(contract, { start: 0, count: 100 });

    function formatTime(timeLeft = {}) {
        const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timeLeft;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
    
        if(days > 0) {
            return `${days}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
        }
        return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
    }

    useEffect(() => {
        let localTimers = {};
    
        validEnglishAuctions?.forEach(idx => {
            const endDate = new Date(idx.endTimeInSeconds * 1000);
            
            function updateCountdown() {
                const now = new Date();
                const difference = endDate - now;
    
                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
                    setTimeLefts(prevTimeLefts => ({
                        ...prevTimeLefts,
                        [idx.id]: { days, hours, minutes, seconds }
                    }));
    
                    localTimers[idx.id] = setTimeout(updateCountdown, 1000);
                }
            }
    
            updateCountdown();
        });
    
        // Cleanup function
        return () => {
            Object.values(localTimers).forEach(timerId => clearTimeout(timerId));
        }
    }, [validEnglishAuctions]);

    return (
       
            <section className="tf-section tf-live-auction visible-sw">
                <div className="tf-container">
                {isLoading 
                    ? <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="light" role={'status'}><span className="visually-hidden">Loading...</span></Spinner>
                    </div> 
                    :
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading mb40 wow fadeInUp">
                                <h4 className="heading">Live Auctions</h4>
                                <a className="button" href="/live-auctions-v2">Explore<i className="fal fa-long-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-12 wow fadeInUp">

                        <Swiper
                            modules={[Navigation,  Scrollbar, A11y , Pagination ]}
                            spaceBetween={30}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    },
                                767: {
                                    slidesPerView: 2,
                                },
                                991: {
                                    slidesPerView: 3,
                                },
                                1300: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="live-auction visible"
                            navigation
                            loop= {false}
                            pagination={{
                                clickable: true,
                            }}
                        >
                        {
                            validEnglishAuctions?.map(idx => (
                                    <SwiperSlide key={idx?.id}>
                                    <div className="slider-item">
                                            <div className="sc-product style1">
                                                <div className="top">
                                                    <Link to="/item-details-v1" className="tag">{idx?.asset?.name}</Link>
                                                    <div className="wish-list">
                                                        <Link to="#" className="heart-icon"></Link>
                                                    </div>
                                                </div>
                                                <div className="features">
                                                    <div className="product-media">
                                                        <img src={idx?.asset?.image} alt="images" />
                                                    </div>
                                                    <div className="featured-countdown">
                                                        <span className="js-countdown" data-timer={idx?.endTimeInSeconds} data-labels="d, h, m, s ">
                                                        {timeLefts[idx?.id] ? formatTime(timeLefts[idx?.id]) : "Loading..."}
                                                        </span>
                                                    </div>
                                                    <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                    <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                                </div>
                                                <div className="bottom">
                                                    <div className="details-product">
                                                        <div className="author">
                                                            {/* <div className="avatar">
                                                                <img src={idx?.} alt="images" />
                                                            </div> */}
                                                            <div className="content">
                                                                <div className="position">Creator</div>
                                                                <div className="name"> <Link to="/item-details-v1">{truncateEthAddress(idx?.creatorAddress)}</Link></div>
                                                            </div>
                                                        </div>
                                                        <div className="current-bid">
                                                            <div className="subtitle">Current bid</div>
                                                            <div className="price">
                                                                <span className="cash">{idx?.minimumBidCurrencyValue?.displayValue} {idx?.minimumBidCurrencyValue?.symbol}</span><span className="icon"><img src={icon3} alt="images" /></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-button">
                                                        <Link to='' onClick={() => setModalShow(true)} data-toggle="modal" data-target="#popup_bid" className="tf-button"> <span className="icon-btn-product"></span> Place Bid</Link>
                                                    </div>
                
                                                </div>
                                            </div>
                                        </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                        </div>
                    </div>
                    }
                </div>
                <CardModal 
                    show={modalShow}
                    onHide={() => setModalShow(false)} 
                />
            </section>
    );
}

export default LiveAuctions;