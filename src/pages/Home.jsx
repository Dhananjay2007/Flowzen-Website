import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import FAQ from '../components/sections/FAQ';

const Home = () => {
    return (
        <>
            <Hero />
            <Services />
            <About />
            <WhyChooseUs />
            <FAQ />
        </>
    );
};

export default Home;
