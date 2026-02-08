import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import VantaBirds from '../ui/VantaBirds';
import LearnMoreButton from '../ui/LearnMoreButton';
import SplitText from '../ui/SplitText';
import TiltCard from '../ui/TiltCard';

import styles from '../ui/bubble.module.css';

import ScrollReveal from '../ui/ScrollReveal';

import BubbleText from '../ui/BubbleText';

const Hero = () => {
    const [titleFinished, setTitleFinished] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setTitleFinished(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-transparent">
            <VantaBirds />
            {/* Background Decor (Optional) */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent -z-10 opacity-50 rounded-bl-full transform translate-x-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">

                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        <SplitText
                            text="Turning Ideas into "
                            className="inline"
                            delay={40}
                            onAnimationComplete={() => {
                                // Fallback just in case, though the second part is usually the trigger
                            }}
                        />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary inline mt-2">
                            <BubbleText
                                text="Impactful Digital Experiences"
                            />
                        </span>
                    </h1>

                    <ScrollReveal isVisible={titleFinished}>
                        <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                            Building modern, user-friendly websites that turn ideas into powerful digital experiences.
                        </p>
                    </ScrollReveal>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={titleFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        <LearnMoreButton onClick={() => window.scrollTo({ top: document.getElementById('services').offsetTop, behavior: 'smooth' })} />
                    </motion.div>
                </div>

                {/* Hero Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-lg"
                    >
                        <TiltCard>
                            {/* Main Illustration */}
                            <img
                                src="/assets/images/New/WEBP/Hero_section.webp"
                                alt="Digital Experiences Illustration"
                                className="w-full h-auto object-contain drop-shadow-xl"
                                decoding="async"
                            />
                        </TiltCard>

                        {/* Floating Elements (Decorative) */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-20 h-20 bg-purple-100 rounded-full blur-xl opacity-70 -z-10"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-70 -z-10"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
