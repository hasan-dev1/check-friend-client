import React from 'react';
import HomeBanner from '../HomeBanner/HomeBanner';
import Services from '../Services/Services';
import Upanddown from '../upanddown/Upanddown';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <Services></Services>
            <Upanddown></Upanddown>
        </div>
    );
};

export default Home;