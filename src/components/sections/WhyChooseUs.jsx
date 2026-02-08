import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaLightbulb, FaHandshake } from 'react-icons/fa';
import Card from '../ui/Card';
import TiltCard from '../ui/TiltCard';
import SplitText from '../ui/SplitText';

const features = [
    {
        icon: '/assets/images/Icons/Custom_Website.png',
        title: 'Tailored & Impactful Websites',
        description: 'Every business is unique — and so is every website we build. We craft custom solutions properly designed to reflect your brand and deliver real results.',
    },
    {
        icon: '/assets/images/Icons/Creative_Meets_Technology.png',
        title: 'Creative Meets Technology',
        description: 'We blend stunning UI/UX with powerful functionality. The result? Websites that don\'t just look good but perform flawlessly.',
    },
    {
        icon: '/assets/images/Icons/Long_term_partnership.png',
        title: 'Long-Term Partnership',
        description: 'Our job doesn\'t end at launch. With reliable support and updates, we ensure your website stays secure, fast, and future-ready.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    },
};

const WhyChooseUs = () => {
    const [titleFinished, setTitleFinished] = React.useState(false);

    return (
        <section id="why-choose-us" className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                        >
                            <img src="/assets/images/New/WEBP/icon/Why_us_icon.webp" alt="Why us" className="w-full h-full object-contain p-3" />
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <SplitText
                                text="Why Flowzen"
                                onAnimationComplete={() => setTitleFinished(true)}
                            />
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={titleFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.6 }}
                            className="text-gray-600"
                        >
                            We don't just build websites, we build trust, growth, and long-term impact.
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={titleFinished ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <TiltCard>
                                <Card {...feature} className="bg-blue-50/50" />
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
