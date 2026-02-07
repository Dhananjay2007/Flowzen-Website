import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import Logo from '../ui/Logo';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="block mb-6 group">
                            <Logo
                                src="/assets/images/logo/Footer_logo.png"
                                className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300 origin-left"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering businesses with innovative web solutions and cutting-edge technology.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Company</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#team" className="hover:text-primary transition-colors">Our Team</a></li>
                            <li><a href="#careers" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-primary" />
                                <a href="mailto:infoinvaderssih@gmail.com" className="hover:text-white">infoinvaderssih@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaGlobe className="text-primary" />
                                <a href="https://www.flowzentechnologies.com" className="hover:text-white">www.flowzentechnologies.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
                            <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                            <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Flowzen Technologies. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white text-sm">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white text-sm">
                            <FaTwitter />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white text-sm">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white text-sm">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
