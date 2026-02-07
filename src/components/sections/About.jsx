import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import LearnMoreButton from '../ui/LearnMoreButton';
import SplitText from '../ui/SplitText';
import TiltCard from '../ui/TiltCard';
import ScrollReveal from '../ui/ScrollReveal';

const About = () => {
    const [titleFinished, setTitleFinished] = React.useState(false);

    return (
        <section id="about" className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            {/* Icon */}
                            <span className="text-secondary text-2xl">ⓘ</span>
                            <h3 className="text-lg font-semibold text-secondary uppercase tracking-wide">About Flowzen Technologies</h3>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            <SplitText
                                text="Every great brand deserves a great "
                                className="inline"
                                onAnimationComplete={() => setTitleFinished(true)}
                            />
                            <span className="text-primary">
                                <SplitText text="online presence" className="inline" />
                            </span>.
                        </h2>

                        <div className="space-y-4 text-gray-600 mb-8">
                            <ScrollReveal isVisible={titleFinished}>
                                <p>
                                    At Flowzen Technologies, we craft websites that go beyond design and code. We blend creativity, technology, and strategy to built digital experiences that truly connect with people.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2} isVisible={titleFinished}>
                                <p>
                                    We started with a simple vision: make websites smarter, faster, and more impactful for businesses of all sizes. Today we're helping startups, small businesses, and growing brands turn ideas into engaging platforms.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.4} isVisible={titleFinished}>
                                <p>
                                    For us, it's not just about building websites — it's about building partnerships. We listen, we understand, and we deliver solutions that match your goals.
                                </p>
                            </ScrollReveal>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={titleFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.6 }}
                        >
                            <LearnMoreButton />
                        </motion.div>
                    </motion.div>

                    {/* Image/Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <TiltCard>
                            <div className="relative">
                                {/* Background blob */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white rounded-full shadow-2xl -z-10 opacity-60 filter blur-2xl" />

                                <img
                                    src="/assets/images/about Flowzen Technologies.svg"
                                    alt="Flowzen Team"
                                    className="w-full h-auto object-contain relative z-10"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/assets/images/About Us - Flowzen Technologies.jpeg"; // Fallback
                                    }}
                                />
                            </div>
                        </TiltCard>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
