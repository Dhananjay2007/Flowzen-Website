import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight, FaSearch } from 'react-icons/fa';
import Button from '../components/ui/Button';
import ReadMoreButton from '../components/ui/ReadMoreButton';
import SplitText from '../components/ui/SplitText';
import TiltCard from '../components/ui/TiltCard';
import ScrollReveal from '../components/ui/ScrollReveal';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};

const Blogs = () => {
    const [heroFinished, setHeroFinished] = React.useState(false);
    const blogPosts = [
        {
            id: 1,
            title: "The Future of Web Development: Trends to Watch in 2024",
            excerpt: "Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.",
            author: "Flowzen Team",
            date: "Feb 5, 2024",
            readTime: "5 min read",
            category: "Web Development",
            image: "/assets/images/blog-placeholder-1.jpg",
            featured: true
        },
        {
            id: 2,
            title: "UI/UX Design Best Practices for Modern Applications",
            excerpt: "Learn how to create intuitive and engaging user experiences that keep your audience coming back.",
            author: "Flowzen Team",
            date: "Jan 28, 2024",
            readTime: "7 min read",
            category: "Design",
            image: "/assets/images/blog-placeholder-2.jpg",
            featured: false
        },
        {
            id: 3,
            title: "Security First: Protecting Your Web Applications",
            excerpt: "Essential security practices every developer should implement to safeguard their applications.",
            author: "Flowzen Team",
            date: "Jan 20, 2024",
            readTime: "6 min read",
            category: "Security",
            image: "/assets/images/blog-placeholder-3.jpg",
            featured: false
        },
        {
            id: 4,
            title: "IoT Integration: Building Connected Experiences",
            excerpt: "Discover how IoT is transforming digital experiences and how to integrate it into your projects.",
            author: "Flowzen Team",
            date: "Jan 15, 2024",
            readTime: "8 min read",
            category: "IoT",
            image: "/assets/images/blog-placeholder-4.svg",
            featured: false
        },
        {
            id: 5,
            title: "Performance Optimization: Making Your Site Lightning Fast",
            excerpt: "Practical tips and techniques to dramatically improve your website's loading speed and performance.",
            author: "Flowzen Team",
            date: "Jan 10, 2024",
            readTime: "6 min read",
            category: "Performance",
            image: "/assets/images/blog-placeholder-5.svg",
            featured: false
        },
        {
            id: 6,
            title: "The Rise of Progressive Web Apps (PWAs)",
            excerpt: "Why PWAs are becoming the standard for modern web applications and how to build one.",
            author: "Flowzen Team",
            date: "Jan 5, 2024",
            readTime: "7 min read",
            category: "Web Development",
            image: "/assets/images/blog-placeholder-6.svg",
            featured: false
        }
    ];

    const categories = ["All", "Web Development", "Design", "Security", "IoT", "Performance"];
    const [selectedCategory, setSelectedCategory] = React.useState("All");

    const filteredPosts = selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="bg-white font-sans text-gray-800">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-purple-50 to-violet-50 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        <SplitText
                            text="Insights, Trends & Tech Stories"
                            onAnimationComplete={() => setHeroFinished(true)}
                        />
                    </h1>
                    <ScrollReveal isVisible={heroFinished}>
                        <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
                            Explore our latest thoughts on web development, design innovation, and digital strategy.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Blog Feed */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                                    ? "bg-primary text-white shadow-md shadow-purple-200"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={heroFinished ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredPosts.map((post) => (
                            <motion.div key={post.id} variants={itemVariants}>
                                <TiltCard>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full flex flex-col group">
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary">
                                                {post.category}
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                                <span className="flex items-center gap-1"> {post.date}</span>
                                                <span className="flex items-center gap-1"> {post.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                                <span className="text-xs font-semibold text-gray-900 flex items-center gap-2">
                                                    {post.author}
                                                </span>
                                                <ReadMoreButton onClick={() => alert("Full blog post coming soon! We're putting the finishing touches on this article.")} />
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Blogs;
