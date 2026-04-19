import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import FAQ from '../components/sections/FAQ';
import SEO from '../components/ui/SEO';

const Home = () => {
    return (
        <>
            <SEO 
                descriptionHover="Flowzen Technologies is a high-end digital agency specializing in custom web applications, SaaS platforms, and mobile apps."
                keywords="Flowzen Technologies, Digital Agency, Web Development India, React Developers, SaaS Builders, App Development"
            />
            <Hero />
            <Services />
            <About />
            <WhyChooseUs />
            <FAQ />
        </>
    );
};

export default Home;
