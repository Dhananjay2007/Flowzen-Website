import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaLinkedinIn,
    FaInstagram,
    FaCheckSquare,
    FaRegSquare,
} from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { submitContactForm } from '../../firebase/firestore';
import { sendSubmitConfirmationEmail } from '../../utils/email';

const SERVICES = [
    'Web Development',
    'UI/UX Design',
    'Security & Maintenance',
    'IoT Projects',
];

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const ContactForm = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });
    const [selected, setSelected] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggle = (service) =>
        setSelected((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { id, orderNumber } = await submitContactForm({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                message: form.message,
                services: selected,
            });
            
            // Trigger the auto-reply email template using EmailJS
            sendSubmitConfirmationEmail({ ...form, services: selected }, orderNumber);
            
            setSubmitted(true);
        } catch (err) {
            console.error('Firestore error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen bg-white overflow-hidden">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.span
                        custom={0}
                        variants={fadeUp}
                        className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-600 mb-4"
                    >
                        Get in touch
                    </motion.span>
                    <motion.h1
                        custom={1}
                        variants={fadeUp}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
                    >
                        Contact our team
                    </motion.h1>
                    <motion.p
                        custom={2}
                        variants={fadeUp}
                        className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Got a project idea or want to scale your digital presence? We&apos;re here to help.
                        <br className="hidden sm:block" />
                        Chat with our friendly team 24/7 and get onboarded in less than 5 minutes.
                    </motion.p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-start">

                    {/* ── LEFT: Form ── */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-24 gap-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
                                    <MdSend className="text-violet-600 text-3xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Message sent!</h2>
                                <p className="text-gray-500 max-w-sm">
                                    Thanks for reaching out. Our team will get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' }); setSelected([]); }}
                                    className="mt-2 text-violet-600 font-semibold underline underline-offset-4 text-sm hover:text-violet-800 transition-colors"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name row */}
                                <motion.div custom={0} variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-gray-700">First name</label>
                                        <input
                                            id="cf-firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            placeholder="First name"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-gray-700">Last name</label>
                                        <input
                                            id="cf-lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            placeholder="Last name"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </motion.div>

                                {/* Email */}
                                <motion.div custom={1} variants={fadeUp} className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        id="cf-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@company.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    />
                                </motion.div>

                                {/* Phone */}
                                <motion.div custom={2} variants={fadeUp} className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Phone number</label>
                                    <input
                                        id="cf-phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 00000 00000"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    />
                                </motion.div>

                                {/* Message */}
                                <motion.div custom={3} variants={fadeUp} className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        id="cf-message"
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="Leave us a message..."
                                        value={form.message}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition resize-none"
                                    />
                                </motion.div>

                                {/* Services checkboxes */}
                                <motion.div custom={4} variants={fadeUp}>
                                    <p className="text-sm font-medium text-gray-700 mb-3">Services</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {SERVICES.map((service) => {
                                            const checked = selected.includes(service);
                                            return (
                                                <button
                                                    key={service}
                                                    type="button"
                                                    onClick={() => toggle(service)}
                                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left
                                                        ${checked
                                                            ? 'border-violet-500 bg-violet-50 text-violet-700'
                                                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-violet-300 hover:bg-violet-50/50'
                                                        }`}
                                                >
                                                    {checked
                                                        ? <FaCheckSquare className="text-violet-600 text-base shrink-0" />
                                                        : <FaRegSquare className="text-gray-400 text-base shrink-0" />
                                                    }
                                                    {service}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>

                                {/* Submit */}
                                <motion.div custom={5} variants={fadeUp}>
                                    <button
                                        id="cf-submit"
                                        type="submit"
                                        disabled={loading}
                                        className="relative w-full overflow-hidden rounded-xl bg-gray-900 text-white font-semibold py-4 text-sm tracking-wide transition-all duration-300 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Send message
                                                <MdSend className="transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                    {error && (
                                        <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
                                    )}
                                </motion.div>
                            </form>
                        )}
                    </motion.div>

                    {/* ── RIGHT: Contact Info ── */}
                    <motion.div
                        className="space-y-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Chat with us */}
                        <motion.div custom={0} variants={fadeUp}>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Chat with us</h3>
                            <p className="text-gray-500 text-sm mb-4">Speak to our friendly team via live chat.</p>
                            <ul className="space-y-2.5">
                                <li>
                                    <a
                                        href="https://wa.me/919999999999"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-violet-600 transition-colors group"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                                            <FaWhatsapp className="text-green-600 group-hover:text-violet-600 transition-colors" />
                                        </span>
                                        Message us on WhatsApp
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:infoinvaderssih@gmail.com"
                                        className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-violet-600 transition-colors group"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                                            <FaEnvelope className="text-violet-600" />
                                        </span>
                                        Shoot us an email
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/flowzentechnologies"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-violet-600 transition-colors group"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                                            <FaLinkedinIn className="text-blue-600 group-hover:text-violet-600 transition-colors" />
                                        </span>
                                        Connect on LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.instagram.com/flowzentechnologies"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-violet-600 transition-colors group"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                                            <FaInstagram className="text-pink-500 group-hover:text-violet-600 transition-colors" />
                                        </span>
                                        Follow on Instagram
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Call us */}
                        <motion.div custom={1} variants={fadeUp}>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Call us</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                Call our team Mon–Sat from 9am to 6pm IST.
                            </p>
                            <a
                                href="tel:+919999999999"
                                className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-violet-600 transition-colors group"
                            >
                                <span className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                                    <FaPhone className="text-violet-600 text-xs" />
                                </span>
                                +91 99999 99999
                            </a>
                        </motion.div>

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Visit us / Online */}
                        <motion.div custom={2} variants={fadeUp}>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Find us online</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                Browse our portfolio and case studies.
                            </p>
                            <a
                                href="https://www.flowzentechnologies.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-violet-600 transition-colors group"
                            >
                                <span className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                                    <FaMapMarkerAlt className="text-violet-600 text-xs" />
                                </span>
                                www.flowzentechnologies.com
                            </a>
                        </motion.div>

                        {/* Decorative gradient card */}
                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            className="rounded-2xl p-6 text-white overflow-hidden relative"
                            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
                        >
                            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                            <p className="text-sm font-semibold mb-1 opacity-80 tracking-wide uppercase">Response time</p>
                            <p className="text-3xl font-extrabold mb-2">&lt; 24 hrs</p>
                            <p className="text-sm opacity-75 leading-relaxed">
                                We take pride in responding fast. Most enquiries get a reply within a few hours.
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ContactForm;
