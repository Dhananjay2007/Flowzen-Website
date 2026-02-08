import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import LearnMoreButton from '../ui/LearnMoreButton';
import { FaArrowRight } from 'react-icons/fa';

const stages = [
    {
        id: 0,
        image: '/assets/images/New/WEBP/Why_Choose_US.webp',
        title: 'Why Flowzen',
        description: "We don’t just build websites — we design and develop high-performance web platforms and practical IoT solutions that help businesses grow with confidence. By focusing on reliability, scalability, and long-term value, we build trust through solutions that continue to perform well beyond launch.",
    },
    {
        id: 1,
        image: '/assets/images/New/WEBP/Our_Promises.webp',
        title: 'Our Promises',
        points: [
            { label: 'Quality', text: 'High-performance, detail-oriented solutions.' },
            { label: 'Innovation', text: 'Future-ready digital identities.' },
            { label: 'Reliability', text: 'Consistent support and clear communication.' },
            { label: 'Integrity', text: 'Transparency and honest partnerships.' }
        ],
    },
    {
        id: 2,
        image: '/assets/images/New/WEBP/Why_we_Better.webp',
        title: 'Why We Are Better',
        points: [
            { label: 'Expert Team', text: 'Skilled professionals with deep technical expertise.' },
            { label: 'Speed', text: 'Rapid development without compromising quality.' },
            { label: 'Scalability', text: 'Solutions that grow with your business.' },
            { label: 'Support', text: '24/7 dedicated assistance for all your needs.' }
        ],
    }
];

const WhyChooseUsAbout = () => {
    const containerRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);
    const [activeStage, setActiveStage] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Continuous feedback mappings
    // Ensure something is ALWAYS moving or scaling

    // Background Parallax (Immersion)
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Image transitions (Lead the motion)
    const img1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
    const img2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const img3Opacity = useTransform(scrollYProgress, [0.55, 0.7, 1.0], [0, 1, 1]);

    const img1Scale = 1;
    const img2Scale = 1;
    const img3Scale = 1;

    // Text transitions (Follow the motion)
    const text1Opacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.85], [0, 1, 1, 0]);
    const text3Opacity = useTransform(scrollYProgress, [0.65, 0.8, 1.0], [0, 1, 1]);

    const text1Y = useTransform(scrollYProgress, [0, 0.4, 0.5], [0, 0, -400]);
    const text2Y = useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.85], [500, 0, 0, -400]);
    const text3Y = useTransform(scrollYProgress, [0.65, 0.8, 1.0], [500, 0, 0]);

    // Image Y transforms (Dramatic lead slide)
    const img1Y = useTransform(scrollYProgress, [0, 0.3, 0.4], [0, 0, -400]);
    const img2Y = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.7], [500, 0, 0, -400]);
    const img3Y = useTransform(scrollYProgress, [0.55, 0.7, 1.0], [500, 0, 0]);



    const handleNextStage = () => {
        setActiveStage((prev) => (prev + 1) % stages.length);
    };

    const renderContent = (stageIndex, isStacked = false) => {
        const stage = stages[stageIndex];
        return (
            <div className={`space-y-6 ${isStacked ? 'max-w-xl' : ''}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {stage.title}
                </h2>
                {stage.description && (
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {stage.description}
                    </p>
                )}
                {stage.points && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                        {stage.points.map((point, idx) => (
                            <div key={idx} className="space-y-1">
                                <h4 className="font-bold text-primary text-base md:text-lg">{point.label}</h4>
                                <p className="text-gray-500 text-xs md:text-sm">{point.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // REDUCED MOTION FALLBACK: Stacked Layout
    if (shouldReduceMotion) {
        return (
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="space-y-32">
                        {stages.map((stage, idx) => (
                            <div key={idx} className={`flex flex-col md:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="w-full md:w-1/2">
                                    <img src={stage.image} alt={stage.title} className="w-full h-auto object-contain max-h-[400px]" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    {renderContent(idx, true)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isMobile) {
        const stage = stages[activeStage];
        return (
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-10">
                        <div className="w-full relative h-[300px] flex items-center justify-center">
                            <motion.img
                                key={stage.image}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={stage.image}
                                className="max-w-full h-full object-contain"
                            />
                        </div>
                        <div className="w-full text-center">
                            <motion.div
                                key={activeStage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {renderContent(activeStage)}
                            </motion.div>
                            <div className="mt-10 flex justify-center">
                                <LearnMoreButton onClick={handleNextStage}>
                                    <span className="flex items-center gap-2 justify-center">
                                        Learn More <FaArrowRight className="text-sm" />
                                    </span>
                                </LearnMoreButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Visual Anchor: Immersive Background */}
                <motion.div
                    style={{ scale: bgScale, opacity: bgOpacity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none"
                />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                        {/* Image Column */}
                        <div className="w-full md:w-1/2 relative h-[450px] md:h-[550px]">
                            <motion.div
                                style={{ opacity: img1Opacity, scale: img1Scale, y: img1Y }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <img src={stages[0].image} alt="Why Flowzen" className="max-w-full h-full object-contain drop-shadow-2xl" />
                            </motion.div>

                            <motion.div
                                style={{ opacity: img2Opacity, scale: img2Scale, y: img2Y }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <img src={stages[1].image} alt="Our Promises" className="max-w-full h-full object-contain drop-shadow-2xl" />
                            </motion.div>

                            <motion.div
                                style={{ opacity: img3Opacity, scale: img3Scale, y: img3Y }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <img src={stages[2].image} alt="Why Better" className="max-w-full h-full object-contain drop-shadow-2xl" />
                            </motion.div>
                        </div>

                        {/* Text Column */}
                        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                            <motion.div
                                style={{ opacity: text1Opacity, y: text1Y }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                {renderContent(0)}
                            </motion.div>

                            <motion.div
                                style={{ opacity: text2Opacity, y: text2Y }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                {renderContent(1)}
                            </motion.div>

                            <motion.div
                                style={{ opacity: text3Opacity, y: text3Y }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                {renderContent(2)}
                            </motion.div>
                        </div>

                    </div>
                </div>


            </div>
        </section>
    );
};

export default WhyChooseUsAbout;
