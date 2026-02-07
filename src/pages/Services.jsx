import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import NeumorphismButton from '../components/ui/NeumorphismButton';
import LearnMoreButton from '../components/ui/LearnMoreButton';
import CallUsButton from '../components/ui/CallUsButton';
import TiltCard from '../components/ui/TiltCard';
import SplitText from '../components/ui/SplitText';
import ScrollReveal from '../components/ui/ScrollReveal';
import { FaCheckCircle } from 'react-icons/fa';

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

const ServicesPage = () => {
    const [heroFinished, setHeroFinished] = React.useState(false);
    const [expertiseFinished, setExpertiseFinished] = React.useState(false);

    const sections = [
        {
            title: "Web Development",
            description: "Custom web applications built with modern technologies and best practices.",
            keyFeatures: [
                "Responsive Design", "Content Management Systems",
                "Progressive Web Apps", "API Development & Integration",
                "E-commerce Solutions", "Performance Optimization"
            ],
            technologies: ["React.js", "Tailwind CSS", "Next.js", "HTML/CSS/JS"],
            image: "/assets/images/Webp/Our_Services.webp",
            reverse: false
        },
        {
            title: "UI/UX Design",
            description: "User-centered design that creates intuitive and engaging digital experiences.",
            keyFeatures: [
                "User Research & Analysis", "Usability Testing",
                "Wireframing & Prototyping", "Design Systems",
                "Visual Design & Branding", "Mobile App Design"
            ],
            technologies: ["Figma", "Adobe XD/Sketch"],
            image: "/assets/images/Webp/UI_UX_Design_New.webp",
            reverse: true
        },
        {
            title: "Security & Maintenance",
            description: "Comprehensive security solutions and ongoing maintenance services.",
            keyFeatures: [
                "Security Audits", "Backup Solutions",
                "SSL Certificates", "Performance Monitoring",
                "Regular Updates", "Bug Fixes & Patches"
            ],
            image: "/assets/images/Webp/Security and maintanance.webp",
            reverse: false
        },
        {
            title: "IoT Projects",
            description: "Innovative Internet of Things solutions that connect devices and transform data into actionable insights.",
            keyFeatures: [
                "Smart Device Integration", "Real-time Data Analytics",
                "Cloud Connectivity", "Sensor Networks",
                "Automation Systems", "Remote Monitoring"
            ],
            image: "/assets/images/Webp/IoT_Projects.webp",
            reverse: true
        }
    ];

    return (
        <div className="bg-white font-sans text-gray-800">
            {/* Hero Section */}
            <section className="pt-32 pb-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        <SplitText
                            text="Our Services"
                            onAnimationComplete={() => setHeroFinished(true)}
                        />
                    </h1>
                    <ScrollReveal isVisible={heroFinished}>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            At Flowzen Technologies, we deliver modern web solutions that blend creativity, performance, and reliability. Here’s how we can help your business grow online:
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
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2"
                >
                    <TiltCard>
                        <img
                            src="/assets/images/Webp/Our_Services.webp"
                            alt="Our Services"
                            className="w-full h-auto max-w-lg mx-auto object-contain"
                            decoding="async"
                        />
                    </TiltCard>
                </motion.div>
            </section>

            {/* Expertise Section */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        <SplitText
                            text="Our Expertise"
                            onAnimationComplete={() => setExpertiseFinished(true)}
                        />
                    </h2>
                    <ScrollReveal isVisible={expertiseFinished}>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We specialize in building solutions that are not only visually appealing but also strategically designed for success.
                        </p>
                    </ScrollReveal>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={expertiseFinished ? "visible" : "hidden"}
                    className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {[
                        { title: "Web Apps", desc: "Complex web applications built for scale and speed." },
                        { title: "E-Commerce", desc: "Feature-rich online stores that drive sales." },
                        { title: "UI/UX Design", desc: "User-centered design that delights your audience." },
                        { title: "IoT Solutions", desc: "Innovative edge-to-cloud connectivity solutions." }
                    ].map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <TiltCard>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Service Sections */}
            <div className="space-y-0 bg-gray-50/50">
                {sections.map((section, index) => (
                    <section key={index} className={`py-20 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center gap-16 ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                                    <SplitText text={section.title} />
                                </h2>
                                <ScrollReveal>
                                    <p className="text-gray-600 leading-relaxed">{section.description}</p>
                                </ScrollReveal>

                                <div className="space-y-2">
                                    <h4 className="font-bold text-gray-800 text-sm">Key Features:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {section.keyFeatures.map((feature, i) => (
                                            <ScrollReveal key={i} delay={i * 0.05} y={10}>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            </ScrollReveal>
                                        ))}
                                    </div>
                                </div>

                                {section.technologies && (
                                    <div className="space-y-3 pt-4">
                                        <h4 className="font-bold text-gray-800 text-sm">Technologies:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {section.technologies.map((tech, i) => (
                                                <ScrollReveal key={i} delay={i * 0.05} y={5}>
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                                        {tech}
                                                    </span>
                                                </ScrollReveal>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6">
                                    <NeumorphismButton>Book Now</NeumorphismButton>
                                </div>
                            </motion.div>

                            {/* Image Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="w-full md:w-1/2"
                            >
                                <TiltCard>
                                    <div className="bg-white rounded-3xl shadow-lg h-64 md:h-96 w-full flex items-center justify-center text-gray-300 relative overflow-hidden border border-gray-100">
                                        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 ${index % 2 === 0 ? 'bg-purple-200' : 'bg-blue-200'}`}></div>
                                        <div className={`absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-20 ${index % 2 === 0 ? 'bg-blue-200' : 'bg-purple-200'}`}></div>

                                        <img
                                            src={section.image}
                                            alt={section.title}
                                            className="relative z-10 max-w-full max-h-full object-contain"
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                e.target.style.display = 'none'; // Hide broken image
                                                e.target.parentElement.innerHTML += `<span class='text-lg'>${section.title} Illustration</span>`;
                                            }}
                                        />
                                    </div>
                                </TiltCard>
                            </motion.div>
                        </div>
                    </section>
                ))}
            </div>

            {/* CTA */}
            <div className="py-24 bg-gray-50 text-center border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        <SplitText text="Have a Project in Mind?" />
                    </h3>
                    <ScrollReveal>
                        <p className="text-gray-500 mb-8">Let's build something amazing together.</p>
                    </ScrollReveal>
                    <div className="flex justify-center">
                        <CallUsButton onClick={() => window.location.href = 'mailto:infoinvaderssih@gmail.com'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
