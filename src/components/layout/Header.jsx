import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import EncryptButton from '../ui/EncryptButton';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About us', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Blogs', href: '/blogs' },
    ];

    const handleContactClick = () => {
        setIsOpen(false);
        // If on home page, scroll to contact
        if (location.pathname === '/') {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate home then scroll (simple version)
            window.location.href = '/#contact';
        }
    };

    return (
        <header
            className={`fixed z-50 transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 ${scrolled
                ? 'top-4 w-[95%] max-w-7xl bg-white/80 backdrop-blur-lg shadow-xl border border-white/20 py-2 rounded-3xl'
                : 'top-0 w-full max-w-[100vw] bg-transparent py-6 rounded-none'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-500">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className={`transition-all duration-500 ease-in-out ${scrolled ? 'h-[64px] md:h-[72px]' : 'h-[80px] md:h-[96px]'}`}>
                        <Logo className="h-full w-auto object-contain" />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary relative group ${location.pathname === link.href ? 'text-primary' : 'text-gray-700'}`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <EncryptButton
                        targetText="Contact Us"
                        onClick={handleContactClick}
                        className="text-xs"
                    />
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <AnimatedHamburgerButton active={isOpen} onClick={() => setIsOpen(!isOpen)} />
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-medium hover:text-primary transition-colors ${location.pathname === link.href ? 'text-primary' : 'text-gray-700'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-2">
                                <EncryptButton
                                    targetText="Contact Us"
                                    onClick={handleContactClick}
                                    className="w-full justify-center"
                                />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

const AnimatedHamburgerButton = ({ active, onClick }) => {
    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <motion.button
                initial={false}
                animate={active ? "open" : "closed"}
                onClick={onClick}
                className="relative h-10 w-10 rounded-full bg-gray-800/0 transition-colors hover:bg-gray-800/10"
            >
                <motion.span
                    variants={VARIANTS.top}
                    className="absolute h-0.5 w-6 bg-gray-800"
                    style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
                />
                <motion.span
                    variants={VARIANTS.middle}
                    className="absolute h-0.5 w-6 bg-gray-800"
                    style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
                />
                <motion.span
                    variants={VARIANTS.bottom}
                    className="absolute h-0.5 w-3 bg-gray-800"
                    style={{
                        x: "-50%",
                        y: "50%",
                        bottom: "35%",
                        left: "calc(50% + 6px)",
                    }}
                />
            </motion.button>
        </MotionConfig>
    );
};

const VARIANTS = {
    top: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            top: ["35%", "50%", "50%"],
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            top: ["50%", "50%", "35%"],
        },
    },
    middle: {
        open: {
            rotate: ["0deg", "0deg", "-45deg"],
        },
        closed: {
            rotate: ["-45deg", "0deg", "0deg"],
        },
    },
    bottom: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            bottom: ["35%", "50%", "50%"],
            left: "50%",
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            bottom: ["50%", "50%", "35%"],
            left: "calc(50% + 6px)",
        },
    },
};

export default Header;
