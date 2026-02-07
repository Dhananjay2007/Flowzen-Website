import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import LearnMoreButton from '../components/ui/LearnMoreButton';
import CallUsButton from '../components/ui/CallUsButton';
import SplitText from '../components/ui/SplitText';
import TiltCard from '../components/ui/TiltCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { FaUserTie, FaRocket, FaLightbulb, FaHandshake } from 'react-icons/fa';

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

const AboutUs = () => {
    const [heroFinished, setHeroFinished] = React.useState(false);
    const [whoWeAreFinished, setWhoWeAreFinished] = React.useState(false);
    const [foundationFinished, setFoundationFinished] = React.useState(false);
    const [teamFinished, setTeamFinished] = React.useState(false);

    const teamMembers = [
        { name: 'Dhananjay R S', role: 'Founder & CEO', desc: 'Driving vision, strategy, and growth for Flowzen.' },
        { name: 'Raghul M', role: 'Lead Developer', desc: 'Turning complex ideas into seamless code.' },
        { name: 'Vishnu Bharathi S', role: 'UI/UX Designer', desc: 'Designs clean and user friendly interfaces.' },
        { name: 'Jeevithiran PV', role: 'Associate Developer', desc: 'Assists in coding and feature development.' },
    ];

    return (
        <div className="bg-white font-sans text-gray-800">
            {/* Hero Section */}
            <section className="pt-32 pb-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2"
                >
                    <TiltCard>
                        <div className="w-full h-auto flex items-center justify-center">
                            <img src="/assets/images/About_Us_Hero_New.png" alt="About Us Hero" className="max-w-full h-auto object-contain" />
                        </div>
                    </TiltCard>
                </motion.div>
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        <SplitText
                            text="About Us – Flowzen Technologies"
                            onAnimationComplete={() => setHeroFinished(true)}
                        />
                    </h1>
                    <ScrollReveal isVisible={heroFinished}>
                        <p className="text-lg text-gray-500">
                            Your trusted partner in building a strong digital presence.
                        </p>
                    </ScrollReveal>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={heroFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.2 }}
                    >
                        <LearnMoreButton />
                    </motion.div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <span className="text-primary text-2xl"><FaUserTie /></span>
                            <SplitText
                                text="Who We Are"
                                onAnimationComplete={() => setWhoWeAreFinished(true)}
                            />
                        </h2>
                        <ScrollReveal isVisible={whoWeAreFinished}>
                            <p className="text-gray-600 leading-relaxed">
                                At Flowzen Technologies, we believe every business deserves a strong digital presence. We're a passionate team of developers and designers dedicated to building websites that are not only visually stunning but also powerful, scalable, and future-ready.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal isVisible={whoWeAreFinished} delay={0.2}>
                            <p className="text-gray-600 leading-relaxed">
                                What started as a vision to make website development simpler, smarter, and more impactful has grown into a mission of helping startups, small businesses, and enterprises build their digital identity with confidence.
                            </p>
                        </ScrollReveal>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2"
                    >
                        <TiltCard>
                            <img src="/assets/images/Who_we_are_new.png" alt="Who We Are" className="w-full h-auto max-w-md mx-auto object-contain" />
                        </TiltCard>
                    </motion.div>
                </div>
            </section>

            {/* Foundation (Mission, Vision, Values) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">
                            <SplitText
                                text="Our Foundation: Mission, Vision & Values"
                                onAnimationComplete={() => setFoundationFinished(true)}
                            />
                        </h2>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={foundationFinished ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: FaRocket, title: "Our Mission", desc: "To empower businesses with scalable, high-performance digital solutions that drive growth." },
                            { icon: FaLightbulb, title: "Our Vision", desc: "To be the global standard for innovation in web development and user experience design." },
                            { icon: FaHandshake, title: "Our Values", desc: "Integrity, Innovation, and Client-Centricity are at the heart of everything we do." }
                        ].map((item, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <TiltCard>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-blue-200 p-8 rounded-xl shadow-sm text-left h-full flex flex-col"
                                    >
                                        <div className="mb-4 text-blue-600 text-2xl bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                                            <item.icon className="text-sm" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us section (inline) */}
            <div className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2"
                    >
                        <TiltCard>
                            <div className="w-full h-auto flex items-center justify-center">
                                <img src="/assets/images/Why Choose US.svg" alt="Why Choose Us" className="max-w-full h-auto object-contain" />
                            </div>
                        </TiltCard>
                    </motion.div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                            <SplitText text="Why Choose Us" className="inline" /> <span className="text-primary text-2xl">?</span>
                        </h2>
                        <ScrollReveal>
                            <p className="text-gray-600 italic font-medium">
                                Because at Flowzen, you're not just getting a website you're gaining a digital partner. We listen, understand, and deliver solutions that help your brand stand out and grow in today's competitive world.
                            </p>
                        </ScrollReveal>
                        <LearnMoreButton />
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <section id="team" className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-block p-3 rounded-full bg-blue-50 mb-4 animate-bounce">
                            <FaUserTie className="text-primary text-2xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            <SplitText
                                text="Our Team"
                                onAnimationComplete={() => setTeamFinished(true)}
                            />
                        </h2>
                        <ScrollReveal isVisible={teamFinished}>
                            <p className="text-gray-500 mt-2">Our team combines creativity, technology, and strategy to turn ideas into powerful digital solutions.</p>
                        </ScrollReveal>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={teamFinished ? "visible" : "hidden"}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <TiltCard>
                                    <div className="bg-blue-200 p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 h-full">
                                        <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4 border-4 border-white shadow-sm overflow-hidden">
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                    <FaUserTie className="text-3xl" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                        <p className="text-gray-700 text-xs font-semibold mb-3">{member.role}</p>
                                        <p className="text-gray-600 text-xs leading-relaxed opacity-80">{member.desc}</p>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Updated Footer CTA */}
            <div className="py-12 bg-gray-50 text-center border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        <SplitText text="Have any Questions" />
                    </h3>
                    <ScrollReveal>
                        <p className="text-gray-500 mb-6 text-sm">Contact Us anytime</p>
                    </ScrollReveal>
                    <div className="flex justify-center">
                        <CallUsButton onClick={() => window.location.href = 'mailto:infoinvaderssih@gmail.com'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
