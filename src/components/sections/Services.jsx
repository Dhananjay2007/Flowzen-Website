import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush, FaShoppingCart, FaTools } from 'react-icons/fa';
import Card from '../ui/Card';
import TiltCard from '../ui/TiltCard';

const servicesData = [
    {
        icon: '/assets/images/Icons/Web_apps.png',
        title: 'Custom Website Development',
        description: 'We build seamless, high-performance websites tailored to your business needs, from portfolios to complex web applications.',
    },
    {
        icon: '/assets/images/Icons/UI-UX-design.png',
        title: 'UI/UX Design',
        description: 'Engaging, user-friendly designs that combine functionality with aesthetics. We ensure every website is visually stunning.',
    },
    {
        icon: '/assets/images/Icons/iot-solution.png',
        title: 'IoT Solutions',
        description: 'Build smart, connected systems with edge computing and real-time data monitoring.',
    },
    {
        icon: '/assets/images/Icons/Website_Maintenace_Support.png',
        title: 'Website Maintenance & Support',
        description: 'Stay worry-free with our ongoing support. We handle updates, security, and performance monitoring to keep your website running smoothly.',
    },
];

import SplitText from '../ui/SplitText';
import ScrollReveal from '../ui/ScrollReveal';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
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

const Services = () => {
    const [titleFinished, setTitleFinished] = React.useState(false);

    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60 -z-10" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            {/* Icon placeholder or small logo */}
                            <span className="text-2xl">🛠️</span>
                        </div>
                    </motion.div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        <SplitText
                            text="Our Services"
                            onAnimationComplete={() => setTitleFinished(true)}
                        />
                    </h2>
                    <ScrollReveal isVisible={titleFinished}>
                        <p className="text-gray-600">
                            Professional website development services to help your business grow and stand out online.
                        </p>
                    </ScrollReveal>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={titleFinished ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {servicesData.map((service, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <TiltCard>
                                <Card {...service} />
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
