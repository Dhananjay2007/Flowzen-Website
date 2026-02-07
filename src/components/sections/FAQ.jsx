import React from 'react';
import Accordion from '../ui/Accordion';
import { motion } from 'framer-motion';
import SplitText from '../ui/SplitText';
import TiltCard from '../ui/TiltCard';

const faqData = [
    {
        question: 'How long does it take to build a website?',
        answer: 'The timeline varies depending on the complexity of the project. A standard business website typically takes 2-4 weeks, while more complex e-commerce or web applications can take 6-10 weeks.',
    },
    {
        question: 'Will my website be mobile-friendly?',
        answer: 'Yes! We follow a mobile-first approach. All our websites are fully responsive and optimized to look great on devices of all sizes, from smartphones to large desktop screens.',
    },
    {
        question: 'Do you provide website maintenance after launch?',
        answer: 'Absolutely. We offer various maintenance packages to ensure your website stays secure, up-to-date, and performing optimally. We handle backups, security checks, and content updates.',
    },
    {
        question: 'How much does a website cost?',
        answer: 'Pricing depends on your specific needs and features. We offer competitive pricing packages and can provide a custom quote after discussing your requirements. Contact us for a free consultation!',
    },
];

const FAQ = () => {
    const [titleFinished, setTitleFinished] = React.useState(false);

    return (
        <section id="contact" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Illustration Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 flex justify-center"
                    >
                        <TiltCard>
                            <img
                                src="/assets/images/FAQ.png"
                                alt="FAQ Illustration"
                                className="max-w-md w-full h-auto object-contain drop-shadow-lg"
                            />
                        </TiltCard>
                    </motion.div>

                    {/* Accordion Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
                            <SplitText
                                text="Frequently Asked Questions"
                                onAnimationComplete={() => setTitleFinished(true)}
                            />
                        </h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={titleFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Accordion items={faqData} />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;
