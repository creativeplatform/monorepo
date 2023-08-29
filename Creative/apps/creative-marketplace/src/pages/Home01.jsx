import React from 'react';
import dataBanner from '../assets/fake-data/data-banner';
import dataCategory from '../assets/fake-data/data-category';
import dataCollection from '../assets/fake-data/data-collection';
import dataCreate from '../assets/fake-data/data-create';
import dataExplore from '../assets/fake-data/data-explore';
import dataHotpick from '../assets/fake-data/data-hotpick';
import dataLiveaution from '../assets/fake-data/data-liveaution';
import dataSeller from '../assets/fake-data/data-topseller';
import Banner01 from '../components/banner/Banner01';
import Category from '../components/category/Category';
import Collection from '../components/collection/Collection';
import Create from '../components/create/Create';
import Explore from '../components/explore/Explore';
import HotPick from '../components/hotpick/HotPick';
import LiveAutions from '../components/liveauctions/LiveAuctions';

import TopSeller from '../components/topseller/TopSeller';


function Home01(props) {

    return (
        <div className="home-1">
            <div id='page'>
                <Banner01 data={dataBanner} />

                <Category data={dataCategory} />

                <LiveAutions data={dataLiveaution} />

                <Create data={dataCreate} />

                <HotPick data={dataHotpick} />

                <Collection data={dataCollection} />

                <TopSeller data={dataSeller} />

                <Explore data={dataExplore} />
            </div>
        </div>

    );
}

export default Home01;