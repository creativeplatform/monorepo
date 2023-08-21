import React , {useState} from 'react';
//import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import img from '../assets/images/background/thumb-pagetitle.jpg'
import avt from '../assets/images/author/author-db.jpg'

import img1 from '../assets/images/product/product4.jpg'
import img2 from '../assets/images/product/product5.jpg'
import img3 from '../assets/images/product/product6.jpg'
import img4 from '../assets/images/product/product7.jpg'
import img5 from '../assets/images/product/product8.jpg'
import img6 from '../assets/images/product/product9.jpg'
import icon1 from '../assets/images/svg/icon-wallet-1.svg'
import icon2 from '../assets/images/svg/icon-wallet-2.svg'
import icon3 from '../assets/images/svg/icon-wallet-3.svg'
import icon4 from '../assets/images/svg/icon-wallet-4.svg'
import icon5 from '../assets/images/svg/icon-wallet-5.svg'
import icon6 from '../assets/images/svg/icon-wallet-6.svg'
import icon7 from '../assets/images/svg/icon-wallet-7.svg'
import icon8 from '../assets/images/svg/icon-wallet-8.svg'
import avt1 from '../assets/images/author/history-at1.jpg'
import avt2 from '../assets/images/author/history-at2.jpg'
import avt3 from '../assets/images/author/history-at3.jpg'
import avt4 from '../assets/images/author/history-at4.jpg'
import avt5 from '../assets/images/author/history-at5.jpg'
import avt6 from '../assets/images/author/history-at6.jpg'
import avtf1 from '../assets/images/author/author-follow1.jpg'
import avtf2 from '../assets/images/author/author-follow2.jpg'
import avtf3 from '../assets/images/author/author-follow3.jpg'
import avtf4 from '../assets/images/author/author-follow4.jpg'
import avtf5 from '../assets/images/author/author-follow3.jpg'
import avtf6 from '../assets/images/author/author-follow4.jpg'
import imgp1 from '../assets/images/product/product27.jpg'
import imgp2 from '../assets/images/product/product4.jpg'
import imgp3 from '../assets/images/product/product5.jpg'
import imgp4 from '../assets/images/product/product9.jpg'
import imgp5 from '../assets/images/product/product10.jpg'
import imgp6 from '../assets/images/product/product11.jpg'
import imgp7 from '../assets/images/product/product6.jpg'
import avtp1 from '../assets/images/author/avt-fv1.jpg'
import avtp2 from '../assets/images/author/avt-fv2.jpg'
import avtp3 from '../assets/images/author/avt-fv3.jpg'
import avtp4 from '../assets/images/author/avt-fv4.jpg'
import avtp5 from '../assets/images/author/avt-fv5.jpg'
import avtp6 from '../assets/images/author/avt-fv6.jpg'
import avtp7 from '../assets/images/author/avt-fv7.jpg'

Dashboard.propTypes = {
    
};

function Dashboard(props) {
    const [dataWallet] = useState([
        {
            id: 1,
            img: icon1,
            cate: '',
            title: 'Meta Mask',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 2,
            img: icon2,
            cate: 'none',
            title: 'Bitski',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 3,
            img: icon3,
            cate: '',
            title: 'Wallet Connect',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 4,
            img: icon4,
            cate: 'none',
            title: 'Coin Base',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 5,
            img: icon5,
            cate: '',
            title: 'Authereum',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 6,
            img: icon6,
            cate: '',
            title: 'Kaikas',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 7,
            img: icon7,
            cate: 'none',
            title: 'Torus',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 8,
            img: icon8,
            cate: '',
            title: 'Fortmatic',
            text : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
    ])
    const [dataAuthor] = useState([
        {
            id: 1,
            avt: avtf1,
            name: 'Lucy Neal',
            item: '64'
        },
        {
            id: 2,
            avt: avtf2,
            name: 'Leopold Hum',
            item: '64'
        },
        {
            id: 3,
            avt: avtf3,
            name: 'Hazel Middleton',
            item: '64'
        },
        {
            id: 4,
            avt: avtf4,
            name: 'Rosemary Welch',
            item: '64'
        },
        {
            id: 5,
            avt: avtf5,
            name: 'Rosemary Welch',
            item: '64'
        },
        {
            id: 6,
            avt: avtf6,
            name: 'Hazel Middleton',
            item: '64'
        },
    ])
    return (
        <div>

            <section class="tf-page-title ">    
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumbs">
                                <li><Link to="/">Home</Link></li>
                                <li>Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>  
                <div class="container-fluid">
                    <div class="row">
                        <div class="thumb-pagetitle">
                            <img src={img} alt="images" />
                        </div>
                    </div>
                </div>                  
            </section>

            <section className="tf-dashboard tf-tab">
                <div className="tf-container">
                    <Tabs className='dashboard-filter'>
                        <div className="row ">                 
                            <div className="col-xl-3 col-lg-12 col-md-12">
                                <div className="dashboard-user">
                                    <div className="dashboard-infor">
                                        <div className="avatar">
                                            <img src={avt} alt="images" />
                                        </div>
                                        <div className="name">Francisco Maia</div>
                                        <div className="pax"><i className="fab fa-ethereum"></i>0x59485…82590</div>
                                        <div className="description">
                                            8,888 NFTs of beautiful, Asian women painstakingly-crafted where even the most intricate
                                        </div>
                                        <ul className="social-item">
                                            <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                            <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        </ul>
                                    </div>
                                            <TabList className='filter-menuu menu-tab'>

                                                    <Tab><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path className="svg-fill" d="M17.3722 6.47085C17.7995 7.0155 17.3282 7.70964 16.6359 7.70964H2.66602C2.11373 7.70964 1.66602 7.26192 1.66602 6.70964V5.3513C1.66602 3.31797 3.31602 1.66797 5.34935 1.66797H7.28268C8.64102 1.66797 9.06602 2.10964 9.60768 2.83464L10.7744 4.38464C11.0327 4.7263 11.066 4.76797 11.5493 4.76797H13.8744C15.2932 4.76797 16.5581 5.43348 17.3722 6.47085Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M17.3194 8.95704C17.8704 8.95704 18.3175 9.40269 18.3194 9.95365L18.3327 13.8739C18.3327 16.3323 16.3327 18.3323 13.8743 18.3323H6.12435C3.66602 18.3323 1.66602 16.3323 1.66602 13.8739V9.95724C1.66602 9.40496 2.11372 8.95725 2.666 8.95724L17.3194 8.95704Z" fill="#EC407A"/>
                                                </svg> Inventory</Tab>
                                                <Tab><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path className="svg-fill" d="M18.3329 9.14297V10.8596C18.3329 11.318 17.9662 11.693 17.4995 11.7096H15.8662C14.9662 11.7096 14.1412 11.0513 14.0662 10.1513C14.0162 9.6263 14.2162 9.13464 14.5662 8.79297C14.8745 8.4763 15.2995 8.29297 15.7662 8.29297H17.4995C17.9662 8.30964 18.3329 8.68464 18.3329 9.14297Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M17.0587 12.9596H15.867C14.2837 12.9596 12.9503 11.768 12.817 10.2513C12.742 9.38464 13.0587 8.51797 13.692 7.9013C14.2253 7.3513 14.967 7.04297 15.767 7.04297H17.0587C17.3003 7.04297 17.5003 6.84297 17.4753 6.6013C17.292 4.5763 15.9503 3.19297 13.9587 2.95964C13.7587 2.9263 13.5503 2.91797 13.3337 2.91797H5.83366C5.60033 2.91797 5.37533 2.93464 5.15866 2.96797C3.03366 3.23464 1.66699 4.81797 1.66699 7.08464V12.918C1.66699 15.218 3.53366 17.0846 5.83366 17.0846H13.3337C15.667 17.0846 17.2753 15.6263 17.4753 13.4013C17.5003 13.1596 17.3003 12.9596 17.0587 12.9596ZM10.8337 8.1263H5.83366C5.49199 8.1263 5.20866 7.84297 5.20866 7.5013C5.20866 7.15964 5.49199 6.8763 5.83366 6.8763H10.8337C11.1753 6.8763 11.4587 7.15964 11.4587 7.5013C11.4587 7.84297 11.1753 8.1263 10.8337 8.1263Z" fill="#EC407A"/>
                                                </svg> Wallet</Tab>
                                                <Tab><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path className="svg-fill" d="M14.4916 13.0583L11.1249 10H8.86657L5.4999 13.0583C4.55823 13.9083 4.2499 15.2167 4.70823 16.4C5.16657 17.575 6.28323 18.3333 7.54157 18.3333H12.4499C13.7166 18.3333 14.8249 17.575 15.2832 16.4C15.7416 15.2167 15.4332 13.9083 14.4916 13.0583ZM11.5166 15.1167H8.48323C8.16657 15.1167 7.91657 14.8583 7.91657 14.55C7.91657 14.2417 8.1749 13.9833 8.48323 13.9833H11.5166C11.8332 13.9833 12.0832 14.2417 12.0832 14.55C12.0832 14.8583 11.8249 15.1167 11.5166 15.1167Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M15.2919 3.6013C14.8335 2.4263 13.7169 1.66797 12.4585 1.66797H7.54188C6.28355 1.66797 5.16688 2.4263 4.70855 3.6013C4.25855 4.78464 4.56688 6.09297 5.50855 6.94297L8.87521 10.0013H11.1335L14.5002 6.94297C15.4335 6.09297 15.7419 4.78464 15.2919 3.6013ZM11.5169 6.0263H8.48355C8.16688 6.0263 7.91688 5.76797 7.91688 5.45964C7.91688 5.1513 8.17522 4.89297 8.48355 4.89297H11.5169C11.8335 4.89297 12.0835 5.1513 12.0835 5.45964C12.0835 5.76797 11.8252 6.0263 11.5169 6.0263Z" fill="#EC407A"/>
                                                </svg> History</Tab>
                                                <Tab><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path className="svg-fill" d="M14.6089 6.4763C14.5505 6.46797 14.4922 6.46797 14.4339 6.4763C13.1422 6.43464 12.1172 5.3763 12.1172 4.0763C12.1172 2.7513 13.1922 1.66797 14.5255 1.66797C15.8505 1.66797 16.9339 2.74297 16.9339 4.0763C16.9255 5.3763 15.9005 6.43464 14.6089 6.4763Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M17.3257 12.2503C16.3923 12.8753 15.084 13.1087 13.8757 12.9503C14.1923 12.267 14.359 11.5087 14.3673 10.7087C14.3673 9.87534 14.184 9.08367 13.834 8.392C15.0673 8.22534 16.3757 8.45867 17.3173 9.08367C18.634 9.95034 18.634 11.3753 17.3257 12.2503Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M5.36745 6.4763C5.42578 6.46797 5.48411 6.46797 5.54245 6.4763C6.83411 6.43464 7.85911 5.3763 7.85911 4.0763C7.85911 2.74297 6.78411 1.66797 5.45078 1.66797C4.12578 1.66797 3.05078 2.74297 3.05078 4.0763C3.05078 5.3763 4.07578 6.43464 5.36745 6.4763Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M5.45794 10.7088C5.45794 11.5172 5.63294 12.2838 5.94961 12.9755C4.77461 13.1005 3.54961 12.8505 2.64961 12.2588C1.33294 11.3838 1.33294 9.95883 2.64961 9.08383C3.54128 8.48383 4.79961 8.24216 5.98294 8.37549C5.64128 9.07549 5.45794 9.86716 5.45794 10.7088Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M10.1 13.225C10.0333 13.2167 9.95833 13.2167 9.88333 13.225C8.35 13.175 7.125 11.9167 7.125 10.3667C7.13333 8.78333 8.40833 7.5 10 7.5C11.5833 7.5 12.8667 8.78333 12.8667 10.3667C12.8583 11.9167 11.6417 13.175 10.1 13.225Z" fill="#EC407A"/>
                                                <path className="svg-fill" d="M7.39102 14.9492C6.13268 15.7909 6.13268 17.1742 7.39102 18.0076C8.82435 18.9659 11.1743 18.9659 12.6077 18.0076C13.866 17.1659 13.866 15.7826 12.6077 14.9492C11.1827 13.9909 8.83268 13.9909 7.39102 14.9492Z" fill="#EC407A"/>
                                                </svg> Following</Tab>
                                                <Tab><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path className="svg-fill" d="M13.1493 1.66797H6.84935C3.69935 1.66797 2.91602 2.50964 2.91602 5.86797V15.2513C2.91602 17.468 4.13268 17.993 5.60768 16.4096L5.61602 16.4013C6.29935 15.6763 7.34102 15.7346 7.93268 16.5263L8.77435 17.6513C9.44935 18.543 10.541 18.543 11.216 17.6513L12.0577 16.5263C12.6577 15.7263 13.6993 15.668 14.3827 16.4013C15.866 17.9846 17.0743 17.4596 17.0743 15.243V5.86797C17.0827 2.50964 16.2993 1.66797 13.1493 1.66797ZM12.291 8.95964H7.70768C7.36602 8.95964 7.08268 8.6763 7.08268 8.33464C7.08268 7.99297 7.36602 7.70964 7.70768 7.70964H12.291C12.6327 7.70964 12.916 7.99297 12.916 8.33464C12.916 8.6763 12.6327 8.95964 12.291 8.95964Z" fill="#EC407A"/>
                                                </svg> Favorites</Tab>
                                                <Tab><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path className="svg-fill" d="M16.2586 4.8763L11.3086 2.01797C10.5003 1.5513 9.50026 1.5513 8.68359 2.01797L3.74193 4.8763C2.93359 5.34297 2.43359 6.20964 2.43359 7.1513V12.8513C2.43359 13.7846 2.93359 14.6513 3.74193 15.1263L8.69193 17.9846C9.50026 18.4513 10.5003 18.4513 11.3169 17.9846L16.2669 15.1263C17.0753 14.6596 17.5753 13.793 17.5753 12.8513V7.1513C17.5669 6.20964 17.0669 5.3513 16.2586 4.8763ZM10.0003 6.11797C11.0753 6.11797 11.9419 6.98464 11.9419 8.05964C11.9419 9.13464 11.0753 10.0013 10.0003 10.0013C8.92526 10.0013 8.05859 9.13464 8.05859 8.05964C8.05859 6.99297 8.92526 6.11797 10.0003 6.11797ZM12.2336 13.8846H7.76693C7.09193 13.8846 6.70026 13.1346 7.07526 12.5763C7.64193 11.7346 8.74193 11.168 10.0003 11.168C11.2586 11.168 12.3586 11.7346 12.9253 12.5763C13.3003 13.1263 12.9003 13.8846 12.2336 13.8846Z" fill="#EC407A"/>
                                                </svg> Account Setting</Tab>
                
                                            
                                        </TabList>
                                    
     
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                                <div className="dashboard-content inventory content-tab">
                                        <TabPanel>
                                            <div className="inner-content inventory">
                                        <h4 className="title-dashboard">Inventory</h4>
                                        <div className="table-ranking top">
                                            <div className="title-ranking">
                                                <div className="col-rankingg"><Link to="#">Name</Link></div>
                                                <div className="col-rankingg"><Link to="#">Category</Link></div>
                                                <div className="col-rankingg"><Link to="#">Blockchain</Link></div>
                                                <div className="col-rankingg"><Link to="#">Bid</Link></div>
                                                <div className="col-rankingg"><Link to="#">Views</Link></div>
                                                <div className="col-rankingg"><Link to="#">Auction</Link></div>
                                            </div>
                                        </div>
                                        <div className="table-ranking ">
                                            <div className="content-ranking">
                                                <div className="col-rankingg"><div className="image"><img src={img1} alt="Binasea" /></div></div>
                                                <div className="col-rankingg">Art</div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7619 0V8.13257L5.74624 10.8216L11.7619 8.13418V15.1949L4.89084 11.204L4.89062 11.2041L4.8907 11.2039L4.89062 11.2038L4.89077 11.2038L11.7619 0ZM11.7637 0L18.6357 11.2038L18.6359 11.2038L18.6359 11.2039L18.6359 11.2041L18.6357 11.204L11.7637 15.1949V8.13418L17.7802 10.8216L11.7637 8.13257V0ZM11.7626 16.4746V22.0005L4.88672 12.4844L11.7626 16.4746ZM11.7637 22.0005V16.4736L18.6359 12.4844L11.7637 22.0005Z" fill="#6B8CEF"/>
                                                    </svg>Ethereum</div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="col-rankingg">4,915</div>
                                                <div className="col-rankingg nofication"> <i className="fas fa-circle"></i> Running</div>
                                                <div className="col-rankingg dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg"><div className="image"><img src={img2} alt="Binasea" /></div></div>
                                                <div className="col-rankingg">Photography</div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <g clipPath="url(#clip0_2202_134581)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1684 0.967074C11.5544 0.690158 10.8241 0.711542 10.2133 0.986319C9.35057 1.34387 8.48287 1.68816 7.61524 2.03242C6.94437 2.29861 6.27353 2.56478 5.60509 2.83706C5.47747 2.89018 5.34671 2.93943 5.21546 2.98886C4.74977 3.16426 4.27805 3.34192 3.9192 3.70309C3.57336 4.07456 3.38669 4.55139 3.20262 5.02161C3.16418 5.11981 3.12585 5.21772 3.0862 5.31433C2.59336 6.4803 2.10528 7.64835 1.61703 8.8168C1.49907 9.0991 1.3811 9.38141 1.26305 9.66373C1.22694 9.74834 1.18912 9.83257 1.15125 9.91691C1.01111 10.229 0.870242 10.5428 0.8125 10.8837V11.5444C0.817735 11.5871 0.825132 11.6491 0.832727 11.7126C0.841853 11.7891 0.851264 11.8678 0.857555 11.9186L0.929852 11.9325C1.05184 12.2803 1.1973 12.6185 1.34268 12.9565C1.40334 13.0975 1.46398 13.2385 1.5229 13.3802C1.63995 13.6417 1.74898 13.9069 1.85803 14.1722C1.95007 14.3961 2.04212 14.62 2.139 14.8417C2.27416 15.1514 2.40273 15.4642 2.53132 15.7771C2.61405 15.9784 2.69679 16.1798 2.7813 16.3803C2.94161 16.7278 3.09249 17.0795 3.22975 17.4366C3.46969 18.1476 3.88043 18.8255 4.56568 19.1655C5.1032 19.359 5.63862 19.56 6.15413 19.8113L6.41084 19.8369L6.42132 19.915C7.42929 20.2699 8.41736 20.6805 9.40018 21.0996C9.45257 21.1124 9.5584 21.137 9.61079 21.1488C9.825 21.2445 10.0412 21.3338 10.2575 21.4232C10.4253 21.4925 10.5932 21.5618 10.7602 21.6342C11.5062 21.77 12.2145 21.492 12.882 21.183C13.1639 21.0477 13.4574 20.9421 13.7509 20.8365C14.0279 20.7369 14.3049 20.6372 14.5721 20.5126C14.5941 20.5055 14.6259 20.4947 14.6588 20.4835C14.6997 20.4697 14.7423 20.4552 14.7701 20.4463C15.8389 20.0005 16.917 19.575 18.0004 19.1633C18.4017 18.9228 18.7978 18.6213 18.9896 18.1722C19.3663 17.3313 19.7199 16.4795 20.0736 15.6277C20.2136 15.2903 20.3537 14.9529 20.4952 14.6161C20.6496 14.2119 20.8249 13.8158 21.0002 13.4197C21.2867 12.7724 21.5733 12.125 21.7683 11.4418V11.0954C21.5159 10.2348 21.1596 9.41477 20.8032 8.59468C20.5928 8.11063 20.3825 7.62654 20.1935 7.13406C20.011 6.72911 19.8432 6.31731 19.6755 5.90556C19.4292 5.30087 19.183 4.69629 18.89 4.11365C18.569 3.50366 17.911 3.24976 17.3084 3.01726C17.2699 3.00239 17.2316 2.98762 17.1936 2.97284C16.285 2.60487 15.3736 2.24322 14.462 1.88153C13.697 1.57799 12.932 1.27443 12.1684 0.967074ZM8.71521 5.9249C9.20348 5.54748 9.79653 5.33472 10.3938 5.21925C11.8355 4.99579 13.3737 5.23742 14.6394 5.99761C14.9202 6.15905 15.2167 6.34616 15.3592 6.65622C15.6317 7.22823 15.178 8.00338 14.5441 7.99161C14.2389 8.03363 13.9816 7.87381 13.7301 7.71754C13.6552 7.67099 13.5807 7.62475 13.5057 7.58426C12.635 7.05823 11.583 6.85615 10.5876 7.05074C10.0951 7.16728 9.65717 7.51904 9.48114 8.00979C9.41409 8.38614 9.39942 8.83305 9.66556 9.13777C9.99036 9.55346 10.4983 9.72566 10.9806 9.88912C11.049 9.91233 11.117 9.93537 11.1838 9.95889C11.4494 10.0367 11.7199 10.107 11.9914 10.1775C12.9913 10.4371 14.004 10.7 14.828 11.3584C15.5395 11.8845 15.8905 12.8008 15.8517 13.6818C15.8842 14.6739 15.4525 15.6747 14.6803 16.2852C13.8431 16.9566 12.7544 17.2047 11.7066 17.178C10.2418 17.2047 8.79799 16.6925 7.60455 15.8415C7.32375 15.6416 7.03456 15.3529 7.04084 14.9776C7.00103 14.4323 7.51549 13.9341 8.04358 13.9694C8.33991 13.9678 8.57124 14.1468 8.79847 14.3227C8.87655 14.3831 8.95415 14.4432 9.03374 14.4954C10.0155 15.2 11.2613 15.4951 12.4464 15.3133C12.8362 15.2321 13.2291 15.076 13.4973 14.7648C13.9877 14.2751 13.9804 13.3471 13.4261 12.9098C12.8338 12.4604 12.1007 12.281 11.3927 12.1078C11.3579 12.0993 11.3232 12.0908 11.2886 12.0823C11.244 12.0705 11.1993 12.0587 11.1544 12.0469C10.0924 11.7675 8.97439 11.4734 8.16407 10.6752C7.61503 10.1257 7.39185 9.32487 7.42957 8.55614C7.38033 7.52973 7.89584 6.51188 8.71521 5.9249Z" fill="#7310C1"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.92521 5.02941C11.3644 4.80485 12.8997 5.04767 14.1632 5.81162C14.4435 5.97386 14.7395 6.16189 14.8817 6.47349C15.1536 7.04832 14.7008 7.82731 14.068 7.81549C13.6727 7.87029 13.3578 7.58341 13.0315 7.40612C12.1624 6.87749 11.1123 6.67441 10.1187 6.86996C9.62713 6.98708 9.18994 7.34058 9.01423 7.83376C8.94729 8.21197 8.93265 8.66109 9.19831 8.96732C9.56856 9.44438 10.1773 9.60232 10.7138 9.7925C11.9553 10.1589 13.3055 10.3577 14.3514 11.199C15.0616 11.7276 15.412 12.6484 15.3733 13.5338C15.4057 14.5309 14.9748 15.5366 14.204 16.1501C13.3683 16.8249 12.2816 17.0741 11.2357 17.0473C9.77355 17.0741 8.33231 16.5595 7.14103 15.7042C6.86073 15.5033 6.57206 15.2132 6.57834 14.836C6.53859 14.2881 7.05213 13.7874 7.57926 13.8228C7.9767 13.8207 8.257 14.1462 8.56763 14.3514C9.54764 15.0595 10.7912 15.3561 11.9741 15.1734C12.3632 15.0918 12.7554 14.9349 13.0232 14.6222C13.5126 14.1301 13.5053 13.1975 12.952 12.758C12.3318 12.2842 11.5568 12.109 10.8184 11.9264C9.71917 11.6341 8.54253 11.3483 7.69954 10.5124C7.15149 9.96012 6.92871 9.15535 6.96637 8.38281C6.91721 7.35132 7.43179 6.32843 8.24968 5.73855C8.73707 5.35927 9.32905 5.14545 9.92521 5.02941Z" fill="#FEFEFE"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_2202_134581">
                                                    <rect width="22" height="22" fill="white" transform="translate(0.761719)"/>
                                                    </clipPath>
                                                    </defs>
                                                    </svg>Stellite</div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="col-rankingg">4,915</div>
                                                <div className="col-rankingg"> </div>
                                                <div className="col-rankingg dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg"><div className="image"><img src={img3} alt="Binasea" /></div></div>
                                                <div className="col-rankingg">Art</div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path d="M13.2819 22C11.8098 22 10.7378 21.622 10.0641 20.8659C9.39134 20.1102 9.05451 19.2952 9.05451 18.4217C9.05451 18.1024 9.11307 17.8337 9.23052 17.6152C9.34515 17.3999 9.51139 17.2214 9.71225 17.0985C9.91571 16.9724 10.1661 16.9096 10.4638 16.9096C10.7614 16.9096 11.0115 16.9724 11.2153 17.0985C11.4187 17.2244 11.5793 17.3969 11.6966 17.6152C11.814 17.8337 11.8727 18.1024 11.8727 18.4217C11.8727 18.8082 11.7867 19.1229 11.6145 19.3667C11.442 19.6103 11.2386 19.7697 11.0037 19.8457C11.2076 20.1477 11.5285 20.3619 11.9668 20.4879C12.4052 20.6225 12.8435 20.6896 13.2819 20.6896C13.8924 20.6896 14.4443 20.5132 14.9376 20.1606C15.4307 19.8075 15.7949 19.2869 16.0298 18.5981C16.2647 17.9094 16.3821 17.128 16.3821 16.2542C16.3821 15.3051 16.2527 14.4942 15.9946 13.8225C15.7438 13.1421 15.3721 12.638 14.8788 12.3103C14.4007 11.9874 13.8468 11.8171 13.2819 11.8191C12.9059 11.8191 12.4366 11.9871 11.8727 12.3232L10.8393 12.8775V12.3232L15.4895 5.67021H9.05451V12.5748C9.05451 13.1462 9.17195 13.6166 9.40684 13.9863C9.64172 14.356 10.0017 14.5407 10.4874 14.5407C10.8626 14.5407 11.2231 14.4064 11.5676 14.1372C11.9144 13.8659 12.216 13.5338 12.4599 13.155C12.4912 13.0788 12.5304 13.0243 12.5774 12.9907C12.6195 12.9507 12.6737 12.9285 12.73 12.9279C12.816 12.9279 12.9177 12.9741 13.0354 13.0667C13.145 13.2007 13.1998 13.3562 13.1998 13.5326C13.1863 13.6514 13.1666 13.7692 13.1408 13.8856C12.8749 14.524 12.5068 15.0111 12.0371 15.347C11.5797 15.6791 11.0394 15.8548 10.4874 15.8512C9.09367 15.8512 8.13055 15.5571 7.59837 14.9694C7.06619 14.381 6.79993 13.5829 6.79993 12.5752V5.67021H3.51172V4.38475H6.79993V1.46182L6.0484 0.654721V0H8.23246L9.05419 0.453375V4.38475L17.5561 4.35975L18.4018 5.26682L13.188 10.8614C13.5037 10.7263 13.8361 10.6415 14.1745 10.6093C14.7381 10.6093 15.3721 10.8026 16.0767 11.1891C16.7892 11.567 17.3372 12.0881 17.7205 12.7512C18.1042 13.4066 18.3507 14.0367 18.4605 14.6414C18.5779 15.2465 18.6367 15.7838 18.6367 16.2542C18.6367 17.3297 18.4251 18.329 18.0026 19.2535C17.5799 20.1772 16.9379 20.8659 16.0767 21.3197C15.2155 21.7734 14.2838 22 13.2819 22Z" fill="#2C7DF7"/>
                                                    </svg>Tezos</div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="col-rankingg">4,915</div>
                                                <div className="col-rankingg nofication"> <i className="fas fa-circle"></i> Running</div>
                                                <div className="col-rankingg dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg"><div className="image"><img src={img4} alt="Binasea" /></div></div>
                                                <div className="col-rankingg">Art</div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 5.65275C15.2277 5.65275 14.5905 6.29113 14.5905 7.07865V8.21954H19.2162V12.5686H14.5193V14.4223C14.5193 17.848 11.7474 20.625 8.32802 20.625C4.90869 20.625 2.13672 17.848 2.13672 14.4223C2.13672 10.9966 4.90869 8.21954 8.32802 8.21954H10.3206V7.07865C10.3206 3.92866 12.8695 1.375 16.0138 1.375H21.3867V5.65275H16.0138ZM10.3203 8.25586V12.5694H14.519V8.25586H10.3203ZM6.40625 14.423C6.40625 13.3598 7.26655 12.498 8.32767 12.498H10.2492V14.423C10.2492 15.4862 9.38889 16.348 8.32767 16.348C7.26655 16.348 6.40625 15.4862 6.40625 14.423Z" fill="#03DB80"/>
                                                    </svg>Flow</div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="col-rankingg">4,915</div>
                                                <div className="col-rankingg"></div>
                                                <div className="col-rankingg dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg"><div className="image"><img src={img5} alt="Binasea" /></div></div>
                                                <div className="col-rankingg">Collections</div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.0938 4.46826V0.515625C19.6588 1.96675 22.7579 6.20623 22.7621 10.9983C22.7538 15.7862 19.6546 20.0172 15.0938 21.4684V17.5326C17.5522 16.2797 19.0976 13.7572 19.0976 10.9983C19.0934 8.2395 17.548 5.72112 15.0938 4.46826ZM0.761719 10.9974C0.765907 6.20952 3.86928 1.97425 8.4301 0.527344V4.45888C5.97169 5.70753 4.42629 8.23434 4.42629 10.9932C4.43048 13.752 5.97588 16.2704 8.4301 17.5232V21.4759C3.86509 20.0247 0.761719 15.7895 0.761719 10.9974Z" fill="#3D92EF"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7591 0C10.9508 0.00421839 10.1467 0.101241 9.35938 0.282632V4.07918C10.13 3.80499 10.9425 3.66578 11.7591 3.66156C12.5758 3.66578 13.3883 3.80499 14.1589 4.07497V0.274195C13.3716 0.097023 12.5674 0.00421839 11.7591 0ZM11.7591 7.16797C10.8838 7.16797 10.0378 7.47169 9.35938 8.02008V13.9807C10.0378 14.5291 10.888 14.8328 11.7591 14.8328C12.6345 14.8328 13.4804 14.5291 14.1589 13.9807V8.02008C13.4804 7.47169 12.6345 7.16797 11.7591 7.16797ZM11.767 18.3395C12.5836 18.3353 13.3961 18.1961 14.1667 17.9219V21.7184C13.3794 21.8998 12.5753 21.9968 11.767 22.0011C10.9587 21.9968 10.1545 21.9083 9.36719 21.7269V17.9261C10.1378 18.1961 10.9503 18.3353 11.767 18.3395Z" fill="#81BFFF"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.35938 9.99983C10.1509 9.89859 10.955 9.84797 11.7633 9.84375C12.5716 9.84797 13.3757 9.89859 14.1631 9.99561V21.7354C13.3757 21.8366 12.5716 21.8873 11.7633 21.8915C10.955 21.8873 10.1467 21.8366 9.35938 21.7396V9.99983Z" fill="#81BFFF"/>
                                                    </svg>IO Coin</div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="col-rankingg">4,915</div>
                                                <div className="col-rankingg nofication"> <i className="fas fa-circle"></i> Running</div>
                                                <div className="col-rankingg dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg"><div className="image"><img src={img6} alt="Binasea" /></div></div>
                                                <div className="col-rankingg">Photography</div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 5.65275C15.2277 5.65275 14.5905 6.29113 14.5905 7.07865V8.21954H19.2162V12.5686H14.5193V14.4223C14.5193 17.848 11.7474 20.625 8.32802 20.625C4.90869 20.625 2.13672 17.848 2.13672 14.4223C2.13672 10.9966 4.90869 8.21954 8.32802 8.21954H10.3206V7.07865C10.3206 3.92866 12.8695 1.375 16.0138 1.375H21.3867V5.65275H16.0138ZM10.3203 8.25586V12.5694H14.519V8.25586H10.3203ZM6.40625 14.423C6.40625 13.3598 7.26655 12.498 8.32767 12.498H10.2492V14.423C10.2492 15.4862 9.38889 16.348 8.32767 16.348C7.26655 16.348 6.40625 15.4862 6.40625 14.423Z" fill="#03DB80"/>
                                                    </svg>Flow</div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="col-rankingg">4,915</div>
                                                <div className="col-rankingg nofication"> <i className="fas fa-circle"></i> Running</div>
                                                <div className="col-rankingg dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="table-btn">
                                                <Link to="#">Load more</Link>
                                            </div>
                                        </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="inner-content wallet">
                                                <h4 className="title-dashboard">Connect Wallet</h4>
                                                <div className="wallet-list">
                                                    {
                                                        dataWallet.map(idx => (
                                                            <div key={idx.id} className="tf-wallet">
                                                                <div className="icon">
                                                                    <img src={idx.img} alt="Binasea" />
                                                                    <span className={`label ${idx.cate}`}>BETA</span>
                                                                </div>
                                                                <h6 className="title"><Link to="#"> {idx.title}</Link></h6>
                                                                <p className="content">{idx.text} </p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                    </TabPanel>
                                        <TabPanel><div className="inner-content history">
                                        <h4 className="title-dashboard">History</h4>
                                        <div className="history-filter">
                                            <div className="history-content">
                                                <div className="inner tf-filter-container">
                                                    <div className="history-details tf-loadmore 3d">
                                                        <div className="authorr">
                                                            <div className="avatar">
                                                                <img src={avt1} alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <Link to="#" className="name">Kayle Jr. Brown</Link>
                                                                <div className="description">started following <Link to="#">Grey Peep</Link> </div>
                                                                <div className="date">
                                                                    <span className="time">16:24</span>
                                                                    <span><i className="fas fa-circle"></i></span>
                                                                    <span className="month">20/05/2022</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="category-filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path className="fill-svg" d="M17.9163 14.7012V15.1262C17.9163 15.7429 17.708 16.3346 17.3247 16.8096C17.183 16.9929 16.9497 17.0846 16.708 17.0846H14.4747C14.8163 16.493 14.9997 15.8179 14.9997 15.1262V14.7012C14.9997 13.5012 14.558 12.3931 13.808 11.5514C13.8663 11.5347 13.9163 11.5013 13.9663 11.4763C14.3497 11.2597 14.8247 11.193 15.2747 11.3014C16.8247 11.693 17.9163 13.0845 17.9163 14.7012ZM12.083 2.91797C11.8163 2.91797 11.558 2.94305 11.308 3.00138C12.2997 3.90972 12.9163 5.21797 12.9163 6.66797C12.9163 8.11797 12.2997 9.42622 11.308 10.3346C11.558 10.3929 11.8163 10.418 12.083 10.418C14.1497 10.418 15.833 8.73464 15.833 6.66797C15.833 4.6013 14.1497 2.91797 12.083 2.91797ZM7.91634 2.91797C5.84967 2.91797 4.16634 4.6013 4.16634 6.66797C4.16634 8.73464 5.84967 10.418 7.91634 10.418C9.98301 10.418 11.6663 8.73464 11.6663 6.66797C11.6663 4.6013 9.98301 2.91797 7.91634 2.91797ZM11.108 11.3014C10.958 11.268 10.8163 11.2513 10.6663 11.2513C10.358 11.2513 10.058 11.3263 9.79968 11.4763C9.21635 11.793 8.56634 11.9514 7.91634 11.9514C7.26634 11.9514 6.62468 11.793 6.04968 11.4847C5.77468 11.3347 5.46634 11.2513 5.15801 11.2513C5.02468 11.2513 4.89966 11.268 4.77466 11.293C3.19132 11.6597 2.08301 13.0679 2.08301 14.7012V15.1262C2.08301 15.7429 2.29136 16.3346 2.67469 16.8096C2.81636 16.9929 3.04968 17.0846 3.29135 17.0846H12.5413C12.783 17.0846 13.0163 16.9929 13.158 16.8096C13.5413 16.3346 13.7497 15.7429 13.7497 15.1262V14.7012C13.7497 13.0845 12.658 11.693 11.108 11.3014Z" fill="white"/>
                                                                </svg>
                                                                Following
                                                        </div>
                                                    </div>
                                                    <div className="history-details tf-loadmore 3d anime">
                                                        <div className="authorr">
                                                            <div className="avatar">
                                                                <img src={avt2} alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <Link to="#" className="name">Baby Girl 3D Model</Link>
                                                                <div className="description">purchased by <Link to="#">Monica Johnson</Link>  for 4.00 ETH  </div>
                                                                <div className="date">
                                                                    <span className="time">16:24</span>
                                                                    <span><i className="fas fa-circle"></i></span>
                                                                    <span className="month">20/05/2022</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="category-filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path className="fill-svg" d="M14.167 2.91797H5.83366C3.33366 2.91797 1.66699 4.16797 1.66699 7.08464V12.918C1.66699 15.8346 3.33366 17.0846 5.83366 17.0846H14.167C16.667 17.0846 18.3337 15.8346 18.3337 12.918V7.08464C18.3337 4.16797 16.667 2.91797 14.167 2.91797ZM14.5587 7.99297L11.9503 10.0763C11.4003 10.518 10.7003 10.7346 10.0003 10.7346C9.30033 10.7346 8.59199 10.518 8.05033 10.0763L5.44199 7.99297C5.17533 7.7763 5.13366 7.3763 5.34199 7.10964C5.55866 6.84297 5.95033 6.79297 6.21699 7.00964L8.82533 9.09297C9.45866 9.6013 10.5337 9.6013 11.167 9.09297L13.7753 7.00964C14.042 6.79297 14.442 6.83464 14.6503 7.10964C14.867 7.3763 14.8253 7.7763 14.5587 7.99297Z" fill="white"></path>
                                                                </svg>
                                                                Purchase
                                                        </div>
                                                    </div>
                                                    <div className="history-details tf-loadmore 3d pixel">
                                                        <div className="authorr">
                                                            <div className="avatar">
                                                                <img src={avt3} alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <Link to="#" className="name">Cyber Punk Gaming</Link>
                                                                <div className="description">bidded by <Link to="#">Monica Johnson</Link> for 4.00 ETH </div>
                                                                <div className="date">
                                                                    <span className="time">16:24</span>
                                                                    <span><i className="fas fa-circle"></i></span>
                                                                    <span className="month">20/05/2022</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="category-filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                                <path className="fill-svg" d="M8.46156 1.67192C8.45896 1.59571 8.37592 1.54636 8.31071 1.58587C5.47538 3.30391 5.50003 7.54287 5.53416 8.38458C5.53704 8.45557 5.46906 8.5043 5.40526 8.47303C5.05493 8.30135 4.14825 7.70609 4.08693 6.12407C4.08397 6.04776 4.00162 5.99931 3.93612 6.03858C2.27758 7.03286 1.16699 8.85521 1.16699 10.875C1.16699 13.9816 3.77866 16.5 7.00033 16.5C10.222 16.5 12.8337 13.9816 12.8337 10.875C12.8336 6.37319 8.5888 5.3961 8.46156 1.67192Z" fill="white" stroke="white" strokeWidth="1.5"/>
                                                                </svg> Bids
                                                        </div>
                                                    </div>
                                                    <div className="history-details tf-loadmore 3d cyber">
                                                        <div className="authorr">
                                                            <div className="avatar">
                                                                <img src={avt4} alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <Link to="#" className="name">Cyber Punk Gaming</Link>
                                                                <div className="description"><Link to="#">Monica Johnson</Link> offered for 4.00 ETH </div>
                                                                <div className="date">
                                                                    <span className="time">16:24</span>
                                                                    <span><i className="fas fa-circle"></i></span>
                                                                    <span className="month">20/05/2022</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="category-filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path className="fill-svg" d="M14.9257 8.93146H12.3507V2.93146C12.3507 1.53146 11.5924 1.24812 10.6674 2.29812L10.0007 3.05646L4.35908 9.47312C3.58408 10.3481 3.90908 11.0648 5.07574 11.0648H7.65074V17.0648C7.65074 18.4648 8.40907 18.7481 9.33407 17.6981L10.0007 16.9398L15.6424 10.5231C16.4174 9.64812 16.0924 8.93146 14.9257 8.93146Z" fill="white"/>
                                                                </svg> Offers
                                                        </div>
                                                    </div>
                                                    <div className="history-details tf-loadmore 3d cyber music">
                                                        <div className="authorr">
                                                            <div className="avatar">
                                                                <img src={avt5} alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <Link to="#" className="name">Cyber Punk Gaming</Link>
                                                                <div className="description">liked by <Link to="#">Monica Johnson</Link> for 4.00 ETH </div>
                                                                <div className="date">
                                                                    <span className="time">16:24</span>
                                                                    <span><i className="fas fa-circle"></i></span>
                                                                    <span className="month">20/05/2022</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="category-filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path className="fill-svg" d="M3.05262 11.0112L7.8241 16.0398C9.00708 17.2866 10.9936 17.2866 12.1766 16.0398L16.948 11.0112C18.7955 9.06416 18.7955 5.90735 16.948 3.96029C15.1005 2.01323 12.1051 2.01324 10.2576 3.9603C10.1178 4.10771 9.88288 4.10771 9.743 3.9603C7.8955 2.01324 4.90012 2.01324 3.05262 3.96029C1.20512 5.90735 1.20512 9.06416 3.05262 11.0112Z" fill="white"/>
                                                                </svg> Likes
                                                        </div>
                                                    </div>
                                                    <div className="history-details tf-loadmore 3d cyber pixel">
                                                        <div className="authorr">
                                                            <div className="avatar">
                                                                <img src={avt6} alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <Link to="#" className="name">Cyber Punk Gaming</Link>
                                                                <div className="description">bidded by <Link to="#">Monica Johnson</Link>  for 4.00 ETH </div>
                                                                <div className="date">
                                                                    <span className="time">16:24</span>
                                                                    <span><i className="fas fa-circle"></i></span>
                                                                    <span className="month">20/05/2022</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="category-filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                                <path className="fill-svg" d="M8.46156 1.67192C8.45896 1.59571 8.37592 1.54636 8.31071 1.58587C5.47538 3.30391 5.50003 7.54287 5.53416 8.38458C5.53704 8.45557 5.46906 8.5043 5.40526 8.47303C5.05493 8.30135 4.14825 7.70609 4.08693 6.12407C4.08397 6.04776 4.00162 5.99931 3.93612 6.03858C2.27758 7.03286 1.16699 8.85521 1.16699 10.875C1.16699 13.9816 3.77866 16.5 7.00033 16.5C10.222 16.5 12.8337 13.9816 12.8337 10.875C12.8336 6.37319 8.5888 5.3961 8.46156 1.67192Z" fill="white" stroke="white" strokeWidth="1.5"/>
                                                                </svg> Bids
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table-btn">
                                                    <Link to="#">Load more</Link>
                                                </div>
                                            </div>
                                            <div className="history-sidebar">
                                                <div className="history-search">
                                                    <form action="#" method="get" role="search" className="search-form"><input type="search" id="s" className="search-field" placeholder="Search Keyword..." name="s" title="Search for" required /><button className="search search-submit" type="submit" title="Search"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <mask id="mask0_2202_135862"  maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="15">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.33301 1.33203H14.1484V13.8645H1.33301V1.33203Z" fill="white" stroke="white"/>
                                                        </mask>
                                                        <g mask="url(#mask0_2202_135862)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.7411 2.2972C4.75189 2.2972 2.31999 4.67474 2.31999 7.59793C2.31999 10.5211 4.75189 12.8993 7.7411 12.8993C10.7297 12.8993 13.1615 10.5211 13.1615 7.59793C13.1615 4.67474 10.7297 2.2972 7.7411 2.2972ZM7.74109 13.8645C4.20773 13.8645 1.33301 11.0532 1.33301 7.59793C1.33301 4.14261 4.20773 1.33203 7.74109 1.33203C11.2744 1.33203 14.1485 4.14261 14.1485 7.59793C14.1485 11.0532 11.2744 13.8645 7.74109 13.8645Z" fill="#B9B8BB"/>
                                                        <path d="M7.7411 1.7972C4.48641 1.7972 1.81999 4.38805 1.81999 7.59793H2.81999C2.81999 4.96143 5.01737 2.7972 7.7411 2.7972V1.7972ZM1.81999 7.59793C1.81999 10.8077 4.48634 13.3993 7.7411 13.3993V12.3993C5.01745 12.3993 2.81999 10.2345 2.81999 7.59793H1.81999ZM7.7411 13.3993C10.9952 13.3993 13.6615 10.8077 13.6615 7.59793H12.6615C12.6615 10.2345 10.4641 12.3993 7.7411 12.3993V13.3993ZM13.6615 7.59793C13.6615 4.38809 10.9952 1.7972 7.7411 1.7972V2.7972C10.4641 2.7972 12.6615 4.96139 12.6615 7.59793H13.6615ZM7.74109 13.3645C4.47328 13.3645 1.83301 10.7666 1.83301 7.59793H0.833008C0.833008 11.3399 3.94217 14.3645 7.74109 14.3645V13.3645ZM1.83301 7.59793C1.83301 4.42929 4.47322 1.83203 7.74109 1.83203V0.832031C3.94224 0.832031 0.833008 3.85593 0.833008 7.59793H1.83301ZM7.74109 1.83203C11.0089 1.83203 13.6485 4.42922 13.6485 7.59793H14.6485C14.6485 3.856 11.54 0.832031 7.74109 0.832031V1.83203ZM13.6485 7.59793C13.6485 10.7667 11.0088 13.3645 7.74109 13.3645V14.3645C11.5401 14.3645 14.6485 11.3398 14.6485 7.59793H13.6485Z" fill="#B9B8BB"/>
                                                        </g>
                                                        <mask id="mask1_2202_135862"  maskUnits="userSpaceOnUse" x="10" y="10" width="6" height="6">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3604 11.4375H14.6661V14.6642H11.3604V11.4375Z" fill="white" stroke="white"/>
                                                        </mask>
                                                        <g mask="url(#mask1_2202_135862)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.1727 14.6642C14.0471 14.6642 13.9207 14.6173 13.824 14.5233L11.5053 12.2622C11.3125 12.0737 11.3118 11.7681 11.5046 11.5795C11.6967 11.3897 12.0093 11.391 12.2027 11.5783L14.5215 13.84C14.7142 14.0285 14.7149 14.3335 14.5221 14.522C14.4261 14.6173 14.2991 14.6642 14.1727 14.6642Z" fill="#B9B8BB"/>
                                                        <path d="M14.1727 14.6642C14.0471 14.6642 13.9207 14.6173 13.824 14.5233L11.5053 12.2622C11.3125 12.0737 11.3118 11.7681 11.5046 11.5795C11.6967 11.3897 12.0093 11.391 12.2027 11.5783L14.5215 13.84C14.7142 14.0285 14.7149 14.3335 14.5221 14.522C14.4261 14.6173 14.2991 14.6642 14.1727 14.6642" stroke="#B9B8BB"/>
                                                        </g>
                                                        </svg></button></form>
                                                </div>
                                                <div className="remove-filter">
                                                    <span className="label">Filter</span>
                                                    <span className="reset">Reset</span>
                                                </div>
                                                <ul className="filter-menu">
                                                    <li className="active"><Link to="#" data-filter=".3d"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path className="fill-svg" d="M14.167 2.91797H5.83366C3.33366 2.91797 1.66699 4.16797 1.66699 7.08464V12.918C1.66699 15.8346 3.33366 17.0846 5.83366 17.0846H14.167C16.667 17.0846 18.3337 15.8346 18.3337 12.918V7.08464C18.3337 4.16797 16.667 2.91797 14.167 2.91797ZM14.5587 7.99297L11.9503 10.0763C11.4003 10.518 10.7003 10.7346 10.0003 10.7346C9.30033 10.7346 8.59199 10.518 8.05033 10.0763L5.44199 7.99297C5.17533 7.7763 5.13366 7.3763 5.34199 7.10964C5.55866 6.84297 5.95033 6.79297 6.21699 7.00964L8.82533 9.09297C9.45866 9.6013 10.5337 9.6013 11.167 9.09297L13.7753 7.00964C14.042 6.79297 14.442 6.83464 14.6503 7.10964C14.867 7.3763 14.8253 7.7763 14.5587 7.99297Z" fill="white"/>
                                                        </svg> Purchase</Link></li>
                                                    <li><Link to="#" data-filter=".anime"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path className="fill-svg" d="M3.05262 11.0112L7.8241 16.0398C9.00708 17.2866 10.9936 17.2866 12.1766 16.0398L16.948 11.0112C18.7955 9.06416 18.7955 5.90735 16.948 3.96029C15.1005 2.01323 12.1051 2.01324 10.2576 3.9603C10.1178 4.10771 9.88288 4.10771 9.743 3.9603C7.8955 2.01324 4.90012 2.01324 3.05262 3.96029C1.20512 5.90735 1.20512 9.06416 3.05262 11.0112Z" fill="white"/>
                                                        </svg> Likes</Link></li>
                                                    <li><Link to="#" data-filter=".cyber"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                        <path className="fill-svg" d="M8.46156 1.67192C8.45896 1.59571 8.37592 1.54636 8.31071 1.58587C5.47538 3.30391 5.50003 7.54287 5.53416 8.38458C5.53704 8.45557 5.46906 8.5043 5.40526 8.47303C5.05493 8.30135 4.14825 7.70609 4.08693 6.12407C4.08397 6.04776 4.00162 5.99931 3.93612 6.03858C2.27758 7.03286 1.16699 8.85521 1.16699 10.875C1.16699 13.9816 3.77866 16.5 7.00033 16.5C10.222 16.5 12.8337 13.9816 12.8337 10.875C12.8336 6.37319 8.5888 5.3961 8.46156 1.67192Z" fill="white" stroke="white" strokeWidth="1.5"/>
                                                        </svg> Bids</Link></li>
                                                    <li><Link to="#" data-filter=".pixel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path className="fill-svg" d="M17.9163 14.7012V15.1262C17.9163 15.7429 17.708 16.3346 17.3247 16.8096C17.183 16.9929 16.9497 17.0846 16.708 17.0846H14.4747C14.8163 16.493 14.9997 15.8179 14.9997 15.1262V14.7012C14.9997 13.5012 14.558 12.3931 13.808 11.5514C13.8663 11.5347 13.9163 11.5013 13.9663 11.4763C14.3497 11.2597 14.8247 11.193 15.2747 11.3014C16.8247 11.693 17.9163 13.0845 17.9163 14.7012ZM12.083 2.91797C11.8163 2.91797 11.558 2.94305 11.308 3.00138C12.2997 3.90972 12.9163 5.21797 12.9163 6.66797C12.9163 8.11797 12.2997 9.42622 11.308 10.3346C11.558 10.3929 11.8163 10.418 12.083 10.418C14.1497 10.418 15.833 8.73464 15.833 6.66797C15.833 4.6013 14.1497 2.91797 12.083 2.91797ZM7.91634 2.91797C5.84967 2.91797 4.16634 4.6013 4.16634 6.66797C4.16634 8.73464 5.84967 10.418 7.91634 10.418C9.98301 10.418 11.6663 8.73464 11.6663 6.66797C11.6663 4.6013 9.98301 2.91797 7.91634 2.91797ZM11.108 11.3014C10.958 11.268 10.8163 11.2513 10.6663 11.2513C10.358 11.2513 10.058 11.3263 9.79968 11.4763C9.21635 11.793 8.56634 11.9514 7.91634 11.9514C7.26634 11.9514 6.62468 11.793 6.04968 11.4847C5.77468 11.3347 5.46634 11.2513 5.15801 11.2513C5.02468 11.2513 4.89966 11.268 4.77466 11.293C3.19132 11.6597 2.08301 13.0679 2.08301 14.7012V15.1262C2.08301 15.7429 2.29136 16.3346 2.67469 16.8096C2.81636 16.9929 3.04968 17.0846 3.29135 17.0846H12.5413C12.783 17.0846 13.0163 16.9929 13.158 16.8096C13.5413 16.3346 13.7497 15.7429 13.7497 15.1262V14.7012C13.7497 13.0845 12.658 11.693 11.108 11.3014Z" fill="white"/>
                                                        </svg>
                                                        Following</Link></li>
                                                    <li><Link to="#" data-filter=".music"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path className="fill-svg" d="M14.9257 8.93146H12.3507V2.93146C12.3507 1.53146 11.5924 1.24812 10.6674 2.29812L10.0007 3.05646L4.35908 9.47312C3.58408 10.3481 3.90908 11.0648 5.07574 11.0648H7.65074V17.0648C7.65074 18.4648 8.40907 18.7481 9.33407 17.6981L10.0007 16.9398L15.6424 10.5231C16.4174 9.64812 16.0924 8.93146 14.9257 8.93146Z" fill="white"/>
                                                        </svg> Offers </Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div></TabPanel>
                                        <TabPanel><div className="inner-content follow">
                                        <h4 className="title-dashboard">Following</h4>
                                        <div className="content-follow">
                                            {
                                                dataAuthor.map(idx => (
                                                    <div key={idx.id} className="card-author">
                                                        <div className="avatar">
                                                            <img src={idx.avt} alt="images" />
                                                        </div>
                                                        <div className="name"> <Link to="#">{idx.name}</Link> </div>
                                                        <div className="details">
                                                            <span>{idx.item}</span> Items
                                                        </div>
                                                        <Link to="#" className="btn-follow">Following</Link>
                                                        <Link to="#" className="option"><i className="fas fa-ellipsis-h"></i></Link>
                                                    </div>
                                                ))
                                            }
    
                                            <div className="table-btn">
                                                <Link to="#">Load more</Link>
                                            </div>
                                        </div>
                                    </div></TabPanel>
                                        <TabPanel><div className="inner-content inventory favorite">
                                        <h4 className="title-dashboard">Favorirtes</h4>
                                        <div className="table-ranking top">
                                            <div className="title-ranking">
                                                <div className="col-rankingg"><Link to="#">Name</Link></div>
                                                <div className="col-rankingg"><Link to="#">Blockchain</Link></div>
                                                <div className="col-rankingg"><Link to="#">Author</Link></div>
                                                <div className="col-rankingg"><Link to="#">Price</Link></div>
                                            </div>
                                        </div>
                                        <div className="table-ranking ">
                                            <div className="content-ranking">
                                                <div className="col-rankingg">
                                                    <div className="box-product-favorite">
                                                        <Link to="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#EC407A"/>
                                                            </svg></Link>
                                                        <div className="image"><img src={imgp7} alt="Binasea" /></div>  
                                                        <Link to="#" className="name">Sweet Baby #1</Link>  
                                                    </div>
                                                </div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 5.65275C15.2277 5.65275 14.5905 6.29113 14.5905 7.07865V8.21954H19.2162V12.5686H14.5193V14.4223C14.5193 17.848 11.7474 20.625 8.32802 20.625C4.90869 20.625 2.13672 17.848 2.13672 14.4223C2.13672 10.9966 4.90869 8.21954 8.32802 8.21954H10.3206V7.07865C10.3206 3.92866 12.8695 1.375 16.0138 1.375H21.3867V5.65275H16.0138ZM10.3203 8.25586V12.5694H14.519V8.25586H10.3203ZM6.40625 14.423C6.40625 13.3598 7.26655 12.498 8.32767 12.498H10.2492V14.423C10.2492 15.4862 9.38889 16.348 8.32767 16.348C7.26655 16.348 6.40625 15.4862 6.40625 14.423Z" fill="#03DB80"/>
                                                    </svg>Flow</div>
                                                <div className="col-rankingg"><div className="author-pd">
                                                    <div className="avatar">
                                                        <img src={avtp1} alt="images" />
                                                    </div>
                                                    <Link to="#" className="name">Fabian Johnson</Link>
                                                </div></div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg">
                                                    <div className="box-product-favorite">
                                                        <Link to="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#EC407A"/>
                                                            </svg></Link>
                                                        <div className="image"><img src={imgp1} alt="Binasea" /></div>  
                                                        <Link to="#" className="name">Doug Ortega #1</Link>  
                                                    </div>
                                                </div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path d="M13.2819 22C11.8098 22 10.7378 21.622 10.0641 20.8659C9.39134 20.1102 9.05451 19.2952 9.05451 18.4217C9.05451 18.1024 9.11307 17.8337 9.23052 17.6152C9.34515 17.3999 9.51139 17.2214 9.71225 17.0985C9.91571 16.9724 10.1661 16.9096 10.4638 16.9096C10.7614 16.9096 11.0115 16.9724 11.2153 17.0985C11.4187 17.2244 11.5793 17.3969 11.6966 17.6152C11.814 17.8337 11.8727 18.1024 11.8727 18.4217C11.8727 18.8082 11.7867 19.1229 11.6145 19.3667C11.442 19.6103 11.2386 19.7697 11.0037 19.8457C11.2076 20.1477 11.5285 20.3619 11.9668 20.4879C12.4052 20.6225 12.8435 20.6896 13.2819 20.6896C13.8924 20.6896 14.4443 20.5132 14.9376 20.1606C15.4307 19.8075 15.7949 19.2869 16.0298 18.5981C16.2647 17.9094 16.3821 17.128 16.3821 16.2542C16.3821 15.3051 16.2527 14.4942 15.9946 13.8225C15.7438 13.1421 15.3721 12.638 14.8788 12.3103C14.4007 11.9874 13.8468 11.8171 13.2819 11.8191C12.9059 11.8191 12.4366 11.9871 11.8727 12.3232L10.8393 12.8775V12.3232L15.4895 5.67021H9.05451V12.5748C9.05451 13.1462 9.17195 13.6166 9.40684 13.9863C9.64172 14.356 10.0017 14.5407 10.4874 14.5407C10.8626 14.5407 11.2231 14.4064 11.5676 14.1372C11.9144 13.8659 12.216 13.5338 12.4599 13.155C12.4912 13.0788 12.5304 13.0243 12.5774 12.9907C12.6195 12.9507 12.6737 12.9285 12.73 12.9279C12.816 12.9279 12.9177 12.9741 13.0354 13.0667C13.145 13.2007 13.1998 13.3562 13.1998 13.5326C13.1863 13.6514 13.1666 13.7692 13.1408 13.8856C12.8749 14.524 12.5068 15.0111 12.0371 15.347C11.5797 15.6791 11.0394 15.8548 10.4874 15.8512C9.09367 15.8512 8.13055 15.5571 7.59837 14.9694C7.06619 14.381 6.79993 13.5829 6.79993 12.5752V5.67021H3.51172V4.38475H6.79993V1.46182L6.0484 0.654721V0H8.23246L9.05419 0.453375V4.38475L17.5561 4.35975L18.4018 5.26682L13.188 10.8614C13.5037 10.7263 13.8361 10.6415 14.1745 10.6093C14.7381 10.6093 15.3721 10.8026 16.0767 11.1891C16.7892 11.567 17.3372 12.0881 17.7205 12.7512C18.1042 13.4066 18.3507 14.0367 18.4605 14.6414C18.5779 15.2465 18.6367 15.7838 18.6367 16.2542C18.6367 17.3297 18.4251 18.329 18.0026 19.2535C17.5799 20.1772 16.9379 20.8659 16.0767 21.3197C15.2155 21.7734 14.2838 22 13.2819 22Z" fill="#2C7DF7"></path>
                                                    </svg>Tezos</div>
                                                <div className="col-rankingg"><div className="author-pd">
                                                    <div className="avatar">
                                                        <img src={avtp2} alt="images" />
                                                    </div>
                                                    <Link to="#" className="name">Polly Walters</Link>
                                                </div></div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg">
                                                    <div className="box-product-favorite">
                                                        <Link to="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#EC407A"/>
                                                            </svg></Link>
                                                        <div className="image"><img src={imgp2} alt="Binasea" /></div>  
                                                        <Link to="#" className="name">Vincent Welch #1</Link>  
                                                    </div>
                                                </div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7619 0V8.13257L5.74624 10.8216L11.7619 8.13418V15.1949L4.89084 11.204L4.89062 11.2041L4.8907 11.2039L4.89062 11.2038L4.89077 11.2038L11.7619 0ZM11.7637 0L18.6357 11.2038L18.6359 11.2038L18.6359 11.2039L18.6359 11.2041L18.6357 11.204L11.7637 15.1949V8.13418L17.7802 10.8216L11.7637 8.13257V0ZM11.7626 16.4746V22.0005L4.88672 12.4844L11.7626 16.4746ZM11.7637 22.0005V16.4736L18.6359 12.4844L11.7637 22.0005Z" fill="#6B8CEF"></path>
                                                    </svg>Ethereum</div>
                                                <div className="col-rankingg"><div className="author-pd">
                                                    <div className="avatar">
                                                        <img src={avtp3} alt="images" />
                                                    </div>
                                                    <Link to="#" className="name">Basil Slater</Link>
                                                </div></div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg">
                                                    <div className="box-product-favorite">
                                                        <Link to="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#EC407A"/>
                                                            </svg></Link>
                                                        <div className="image"><img src={imgp3} alt="Binasea" /></div>  
                                                        <Link to="#" className="name">Alec Alvarado #1</Link>  
                                                    </div>
                                                </div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 5.65275C15.2277 5.65275 14.5905 6.29113 14.5905 7.07865V8.21954H19.2162V12.5686H14.5193V14.4223C14.5193 17.848 11.7474 20.625 8.32802 20.625C4.90869 20.625 2.13672 17.848 2.13672 14.4223C2.13672 10.9966 4.90869 8.21954 8.32802 8.21954H10.3206V7.07865C10.3206 3.92866 12.8695 1.375 16.0138 1.375H21.3867V5.65275H16.0138ZM10.3203 8.25586V12.5694H14.519V8.25586H10.3203ZM6.40625 14.423C6.40625 13.3598 7.26655 12.498 8.32767 12.498H10.2492V14.423C10.2492 15.4862 9.38889 16.348 8.32767 16.348C7.26655 16.348 6.40625 15.4862 6.40625 14.423Z" fill="#03DB80"/>
                                                    </svg>Flow</div>
                                                <div className="col-rankingg"><div className="author-pd">
                                                    <div className="avatar">
                                                        <img src={avtp4} alt="images" />
                                                    </div>
                                                    <Link to="#" className="name">Mirabelle Maldonado</Link>
                                                </div></div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg">
                                                    <div className="box-product-favorite">
                                                        <Link to="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#EC407A"/>
                                                            </svg></Link>
                                                        <div className="image"><img src={imgp4} alt="Binasea" /></div>  
                                                        <Link to="#" className="name">Baz Fletcher #1</Link>  
                                                    </div>
                                                </div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path d="M13.2819 22C11.8098 22 10.7378 21.622 10.0641 20.8659C9.39134 20.1102 9.05451 19.2952 9.05451 18.4217C9.05451 18.1024 9.11307 17.8337 9.23052 17.6152C9.34515 17.3999 9.51139 17.2214 9.71225 17.0985C9.91571 16.9724 10.1661 16.9096 10.4638 16.9096C10.7614 16.9096 11.0115 16.9724 11.2153 17.0985C11.4187 17.2244 11.5793 17.3969 11.6966 17.6152C11.814 17.8337 11.8727 18.1024 11.8727 18.4217C11.8727 18.8082 11.7867 19.1229 11.6145 19.3667C11.442 19.6103 11.2386 19.7697 11.0037 19.8457C11.2076 20.1477 11.5285 20.3619 11.9668 20.4879C12.4052 20.6225 12.8435 20.6896 13.2819 20.6896C13.8924 20.6896 14.4443 20.5132 14.9376 20.1606C15.4307 19.8075 15.7949 19.2869 16.0298 18.5981C16.2647 17.9094 16.3821 17.128 16.3821 16.2542C16.3821 15.3051 16.2527 14.4942 15.9946 13.8225C15.7438 13.1421 15.3721 12.638 14.8788 12.3103C14.4007 11.9874 13.8468 11.8171 13.2819 11.8191C12.9059 11.8191 12.4366 11.9871 11.8727 12.3232L10.8393 12.8775V12.3232L15.4895 5.67021H9.05451V12.5748C9.05451 13.1462 9.17195 13.6166 9.40684 13.9863C9.64172 14.356 10.0017 14.5407 10.4874 14.5407C10.8626 14.5407 11.2231 14.4064 11.5676 14.1372C11.9144 13.8659 12.216 13.5338 12.4599 13.155C12.4912 13.0788 12.5304 13.0243 12.5774 12.9907C12.6195 12.9507 12.6737 12.9285 12.73 12.9279C12.816 12.9279 12.9177 12.9741 13.0354 13.0667C13.145 13.2007 13.1998 13.3562 13.1998 13.5326C13.1863 13.6514 13.1666 13.7692 13.1408 13.8856C12.8749 14.524 12.5068 15.0111 12.0371 15.347C11.5797 15.6791 11.0394 15.8548 10.4874 15.8512C9.09367 15.8512 8.13055 15.5571 7.59837 14.9694C7.06619 14.381 6.79993 13.5829 6.79993 12.5752V5.67021H3.51172V4.38475H6.79993V1.46182L6.0484 0.654721V0H8.23246L9.05419 0.453375V4.38475L17.5561 4.35975L18.4018 5.26682L13.188 10.8614C13.5037 10.7263 13.8361 10.6415 14.1745 10.6093C14.7381 10.6093 15.3721 10.8026 16.0767 11.1891C16.7892 11.567 17.3372 12.0881 17.7205 12.7512C18.1042 13.4066 18.3507 14.0367 18.4605 14.6414C18.5779 15.2465 18.6367 15.7838 18.6367 16.2542C18.6367 17.3297 18.4251 18.329 18.0026 19.2535C17.5799 20.1772 16.9379 20.8659 16.0767 21.3197C15.2155 21.7734 14.2838 22 13.2819 22Z" fill="#2C7DF7"></path>
                                                    </svg>Tezos</div>
                                                <div className="col-rankingg"><div className="author-pd">
                                                    <div className="avatar">
                                                        <img src={avtp5} alt="images" />
                                                    </div>
                                                    <Link to="#" className="name">Roderick Boyd</Link>
                                                </div></div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg">
                                                    <div className="box-product-favorite">
                                                        <Link to="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#EC407A"/>
                                                            </svg></Link>
                                                        <div className="image"><img src={imgp5} alt="Binasea" /></div>  
                                                        <Link to="#" className="name">Bert Moore #1</Link>  
                                                    </div>
                                                </div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7619 0V8.13257L5.74624 10.8216L11.7619 8.13418V15.1949L4.89084 11.204L4.89062 11.2041L4.8907 11.2039L4.89062 11.2038L4.89077 11.2038L11.7619 0ZM11.7637 0L18.6357 11.2038L18.6359 11.2038L18.6359 11.2039L18.6359 11.2041L18.6357 11.204L11.7637 15.1949V8.13418L17.7802 10.8216L11.7637 8.13257V0ZM11.7626 16.4746V22.0005L4.88672 12.4844L11.7626 16.4746ZM11.7637 22.0005V16.4736L18.6359 12.4844L11.7637 22.0005Z" fill="#6B8CEF"></path>
                                                    </svg>Ethereum</div>
                                                <div className="col-rankingg"><div className="author-pd">
                                                    <div className="avatar">
                                                        <img src={avtp6} alt="images" />
                                                    </div>
                                                    <Link to="#" className="name">Lucy Neal</Link>
                                                </div></div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="content-ranking">
                                                <div className="col-rankingg">
                                                    <div className="box-product-favorite">
                                                        <Link to="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#EC407A"/>
                                                            </svg></Link>
                                                        <div className="image"><img src={imgp6} alt="Binasea" /></div>  
                                                        <Link to="#" className="name">Oriel Binder #1</Link>  
                                                    </div>
                                                </div>
                                                <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                    <path d="M13.2819 22C11.8098 22 10.7378 21.622 10.0641 20.8659C9.39134 20.1102 9.05451 19.2952 9.05451 18.4217C9.05451 18.1024 9.11307 17.8337 9.23052 17.6152C9.34515 17.3999 9.51139 17.2214 9.71225 17.0985C9.91571 16.9724 10.1661 16.9096 10.4638 16.9096C10.7614 16.9096 11.0115 16.9724 11.2153 17.0985C11.4187 17.2244 11.5793 17.3969 11.6966 17.6152C11.814 17.8337 11.8727 18.1024 11.8727 18.4217C11.8727 18.8082 11.7867 19.1229 11.6145 19.3667C11.442 19.6103 11.2386 19.7697 11.0037 19.8457C11.2076 20.1477 11.5285 20.3619 11.9668 20.4879C12.4052 20.6225 12.8435 20.6896 13.2819 20.6896C13.8924 20.6896 14.4443 20.5132 14.9376 20.1606C15.4307 19.8075 15.7949 19.2869 16.0298 18.5981C16.2647 17.9094 16.3821 17.128 16.3821 16.2542C16.3821 15.3051 16.2527 14.4942 15.9946 13.8225C15.7438 13.1421 15.3721 12.638 14.8788 12.3103C14.4007 11.9874 13.8468 11.8171 13.2819 11.8191C12.9059 11.8191 12.4366 11.9871 11.8727 12.3232L10.8393 12.8775V12.3232L15.4895 5.67021H9.05451V12.5748C9.05451 13.1462 9.17195 13.6166 9.40684 13.9863C9.64172 14.356 10.0017 14.5407 10.4874 14.5407C10.8626 14.5407 11.2231 14.4064 11.5676 14.1372C11.9144 13.8659 12.216 13.5338 12.4599 13.155C12.4912 13.0788 12.5304 13.0243 12.5774 12.9907C12.6195 12.9507 12.6737 12.9285 12.73 12.9279C12.816 12.9279 12.9177 12.9741 13.0354 13.0667C13.145 13.2007 13.1998 13.3562 13.1998 13.5326C13.1863 13.6514 13.1666 13.7692 13.1408 13.8856C12.8749 14.524 12.5068 15.0111 12.0371 15.347C11.5797 15.6791 11.0394 15.8548 10.4874 15.8512C9.09367 15.8512 8.13055 15.5571 7.59837 14.9694C7.06619 14.381 6.79993 13.5829 6.79993 12.5752V5.67021H3.51172V4.38475H6.79993V1.46182L6.0484 0.654721V0H8.23246L9.05419 0.453375V4.38475L17.5561 4.35975L18.4018 5.26682L13.188 10.8614C13.5037 10.7263 13.8361 10.6415 14.1745 10.6093C14.7381 10.6093 15.3721 10.8026 16.0767 11.1891C16.7892 11.567 17.3372 12.0881 17.7205 12.7512C18.1042 13.4066 18.3507 14.0367 18.4605 14.6414C18.5779 15.2465 18.6367 15.7838 18.6367 16.2542C18.6367 17.3297 18.4251 18.329 18.0026 19.2535C17.5799 20.1772 16.9379 20.8659 16.0767 21.3197C15.2155 21.7734 14.2838 22 13.2819 22Z" fill="#2C7DF7"></path>
                                                    </svg>Tezos</div>
                                                <div className="col-rankingg"><div className="author-pd">
                                                    <div className="avatar">
                                                        <img src={avtp7} alt="images" />
                                                    </div>
                                                    <Link to="#" className="name">Hazel Middleton</Link>
                                                </div></div>
                                                <div className="col-rankingg">0.45 Flow</div>
                                                <div className="dot"><Link to="#"><i className="fas fa-ellipsis-h"></i></Link></div>
                                            </div>
                                            <div className="table-btn">
                                                <Link to="#">Load more</Link>
                                            </div>
                                        </div>
                                    </div></TabPanel>
                                        <TabPanel><div className="inner-content profile">
                                        <h4 className="title-dashboard">Edit Profile</h4>
                                        <form action="#" className="form-edit-profile">
                                            <div className="user-profile">
                                                <div className="title">Contact details</div>
                                                <fieldset>
                                                    <h6>Full Name</h6>
                                                    <input type="text" placeholder="Francisco Maia" required />
                                                </fieldset>
                                                <fieldset>
                                                    <h6>Gender</h6>
                                                    <input type="text" placeholder="Female" required />
                                                </fieldset>
                                                <fieldset>
                                                    <h6>Date of birth</h6>
                                                    <input type="text" placeholder="January 24, 1983" required />
                                                </fieldset>
                                            </div>
                                            <div className="user-profile">
                                                <div className="title">Contact details</div>
                                                <fieldset>
                                                    <h6>Email Address</h6>
                                                    <input type="text" placeholder="Francisco Maia" required />
                                                </fieldset>
                                                <fieldset>
                                                    <h6>Gender</h6>
                                                    <input type="text" placeholder="seb.bennett@gmail.com" required />
                                                </fieldset>
                                                <fieldset>
                                                    <h6>Address</h6>
                                                    <input type="text" placeholder="83222 Dicki View, South Pasqualeview, RI 79216-3100" required />
                                                </fieldset>
                                            </div>
                                            <button className="btn-form" type="submit">
                                                Update Settings
                                            </button>
                                        </form>
                                    </div></TabPanel>
                                    
                                    
                                    
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </Tabs> 
                    
                </div>
            </section>
            
        </div>
    );
}

export default Dashboard;