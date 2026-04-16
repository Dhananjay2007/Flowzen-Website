import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from '../firebase/firestore';
import { FaCheck, FaArrowRight, FaArrowLeft, FaDollarSign, FaRupeeSign, FaEuroSign, FaPoundSign, FaPaperPlane } from 'react-icons/fa';

const currencies = [
    { code: 'USD', symbol: '$', rate: 1, icon: <FaDollarSign /> },
    { code: 'INR', symbol: '₹', rate: 83, icon: <FaRupeeSign /> },
    { code: 'EUR', symbol: '€', rate: 0.92, icon: <FaEuroSign /> },
    { code: 'GBP', symbol: '£', rate: 0.78, icon: <FaPoundSign /> }
];

const stepsConfig = [
    {
        id: 'type',
        question: 'What kind of project are we building?',
        options: [
            { label: 'Website / Landing Page', priceOffset: 500 },
            { label: 'E-commerce Store', priceOffset: 1200 },
            { label: 'Custom Web Application', priceOffset: 1500 },
            { label: 'Mobile App (iOS/Android)', priceOffset: 2000 }
        ]
    },
    {
        id: 'design',
        question: 'What is the current status of your design?',
        options: [
            { label: 'I have complete designs', priceOffset: 0 },
            { label: 'I need basic UI/UX design', priceOffset: 400 },
            { label: 'I need full branding & design', priceOffset: 800 }
        ]
    },
    {
        id: 'timeline',
        question: 'What is your intended timeline?',
        options: [
            { label: 'Flexible / Exploring', priceOffset: 0 },
            { label: 'Standard (1-2 Months)', priceOffset: 200 },
            { label: 'ASAP Sprint (< 1 Month)', priceOffset: 800 }
        ]
    }
];

const ProjectEstimator = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [currency, setCurrency] = useState(currencies[0]);
    
    // Odometer state for effect
    const [displayMin, setDisplayMin] = useState(0);
    const [displayMax, setDisplayMax] = useState(0);
    
    // Lead Form State
    const [leadForm, setLeadForm] = useState({ firstName: '', email: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const calculateEstimate = () => {
        let totalUSD = 0;
        Object.keys(selections).forEach(stepId => {
            const step = stepsConfig.find(s => s.id === stepId);
            if (step) {
                const option = step.options.find(o => o.label === selections[stepId]);
                if (option) totalUSD += option.priceOffset;
            }
        });
        
        const minUSD = totalUSD * 0.9;
        const maxUSD = totalUSD * 1.15;
        return {
            min: Math.round((minUSD * currency.rate) / 100) * 100,
            max: Math.round((maxUSD * currency.rate) / 100) * 100
        };
    };

    const estimate = calculateEstimate();
    const isCalculatingStep = currentStep === stepsConfig.length;

    // Odometer Effect Trigger
    useEffect(() => {
        if (isCalculatingStep && !submitted) {
            let startMin = 0;
            let startMax = 0;
            const duration = 1000;
            const increment = 20; // 50hz
            let elapsed = 0;

            const targetMin = estimate.min;
            const targetMax = estimate.max;

            const interval = setInterval(() => {
                elapsed += increment;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = progress * (2 - progress);
                
                setDisplayMin(Math.floor(startMin + (targetMin - startMin) * easeProgress));
                setDisplayMax(Math.floor(startMax + (targetMax - startMax) * easeProgress));

                if (progress === 1) clearInterval(interval);
            }, increment);

            return () => clearInterval(interval);
        }
    }, [isCalculatingStep, submitted, currency]);

    const handleSelect = (stepId, optionLabel) => {
        setSelections(prev => ({ ...prev, [stepId]: optionLabel }));
    };

    const nextStep = () => {
        if (currentStep < stepsConfig.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const breakdown = stepsConfig.map(s => `${s.question}: ${selections[s.id] || 'Not specified'}`).join(' | ');
            
            const payload = {
                firstName: leadForm.firstName,
                lastName: '(Direct Order)',
                email: leadForm.email,
                phone: leadForm.phone,
                message: `[LOCKED ESTIMATE] Range: ${currency.symbol}${estimate.min.toLocaleString()} - ${currency.symbol}${estimate.max.toLocaleString()}.\n\nBreakdown: ${breakdown}`,
                services: [selections['type'] || 'Custom Estimate Project']
            };

            await submitContactForm(payload);
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("Failed to submit request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.3 } }
    };

    return (
        <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-32 px-4 relative overflow-hidden font-sans antialiased text-gray-900">
            <SEO 
                title="Live Project Estimator" 
                descriptionHover="Instantly calculate the cost of your custom web application or mobile app with our dynamic pricing calculator."
                keywords="SaaS pricing, Agency Cost Calculator, Flowzen Project Estimate, Mobile App Cost"
            />
            {/* Cinematic Background Flares (Light Mode) */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-100/50 to-transparent opacity-80 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-purple-100/50 to-transparent opacity-80 rounded-tr-full pointer-events-none" />

            <div className="w-full max-w-4xl relative z-10 flex flex-col items-center">
                
                {/* Header & Controls */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
                    <div className="text-center sm:text-left">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
                            Project Estimator
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Outline your requirements to instantly calculate your investment.</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                        {currencies.map(c => (
                            <button
                                key={c.code}
                                onClick={() => setCurrency(c)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-all duration-300 ${
                                    currency.code === c.code 
                                        ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {c.code}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Glassmorphic Container (Light Mode) */}
                <div className="w-full bg-white/80 backdrop-blur-2xl border border-gray-100 shadow-[0_20px_60px_rgba(124,58,237,0.08)] rounded-[2rem] overflow-hidden relative">
                    
                    {/* Progress Bar overlay at top edge */}
                    {!submitted && (
                        <div className="absolute top-0 left-0 w-full bg-gray-100 h-1">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / (stepsConfig.length)) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    )}

                    <div className="p-8 sm:p-12 md:p-16 min-h-[500px] flex flex-col justify-center relative">
                        <AnimatePresence mode="wait">
                            
                            {submitted ? (
                                /* SUCCESS STATE */
                                <motion.div 
                                    key="success"
                                    variants={cardVariants}
                                    initial="hidden" animate="visible" exit="exit"
                                    className="text-center py-8"
                                >
                                    <div className="w-24 h-24 bg-green-100 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                                        <FaCheck className="text-4xl text-green-500 relative z-10" />
                                    </div>
                                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Order Locked In <span className="text-green-500">✓</span></h2>
                                    <p className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed mb-10">
                                        Your estimate is saved and securely transmitted to our engineering team. We will review the specs and reach out immediately.
                                    </p>
                                    <button 
                                        onClick={() => navigate('/')}
                                        className="group inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-violet-600 transition-colors bg-gray-50 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-100"
                                    >
                                        Return to Dashboard <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>

                            ) : !isCalculatingStep ? (
                                /* QUIZ STEPS */
                                <motion.div 
                                    key={`step-${currentStep}`}
                                    variants={cardVariants}
                                    initial="hidden" animate="visible" exit="exit"
                                    className="flex flex-col h-full"
                                >
                                    <div className="mb-10 text-center sm:text-left">
                                        <p className="inline-block px-3 py-1 bg-violet-100 text-violet-700 border border-violet-200 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                            Phase 0{currentStep + 1}
                                        </p>
                                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight drop-shadow-sm">
                                            {stepsConfig[currentStep].question}
                                        </h2>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                                        {stepsConfig[currentStep].options.map((opt) => {
                                            const isSelected = selections[stepsConfig[currentStep].id] === opt.label;
                                            return (
                                                <button
                                                    key={opt.label}
                                                    onClick={() => {
                                                        handleSelect(stepsConfig[currentStep].id, opt.label);
                                                        setTimeout(nextStep, 350); 
                                                    }}
                                                    className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 transform-gpu overflow-hidden ${
                                                        isSelected
                                                        ? 'border-violet-500 bg-violet-50 shadow-[0_10px_20px_rgba(124,58,237,0.1)] -translate-y-1'
                                                        : 'border-gray-200 bg-white hover:bg-gray-50 hover:-translate-y-1 hover:border-violet-300 shadow-sm'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center relative z-10">
                                                        <span className={`text-lg font-semibold ${isSelected ? 'text-violet-700' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                                            {opt.label}
                                                        </span>
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                            isSelected ? 'border-violet-500 bg-violet-500' : 'border-gray-300'
                                                        }`}>
                                                            {isSelected && <FaCheck className="text-white text-[10px]" />}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                                        <button 
                                            onClick={prevStep}
                                            className={`flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed opacity-0 pointer-events-none' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 relative z-20'}`}
                                        >
                                            <FaArrowLeft /> Understood, Go Back
                                        </button>
                                        <button 
                                            onClick={nextStep}
                                            disabled={!selections[stepsConfig[currentStep].id]}
                                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all relative z-20 ${
                                                selections[stepsConfig[currentStep].id] 
                                                ? 'bg-gray-900 text-white hover:bg-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:scale-105'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            Continue <FaArrowRight />
                                        </button>
                                    </div>
                                </motion.div>

                            ) : (
                                /* FINAL RESULT & LEAD CAPTURE STEP */
                                <motion.div 
                                    key="result"
                                    variants={cardVariants}
                                    initial="hidden" animate="visible" exit="exit"
                                    className="flex flex-col w-full"
                                >
                                    <div className="text-center mb-10">
                                        <p className="text-violet-600 font-bold uppercase tracking-widest text-sm mb-4 inline-flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" /> Live Calculation Ready
                                        </p>
                                        <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_rgba(124,58,237,0.08)] relative overflow-hidden group">
                                            {/* Shimmer sweep effect */}
                                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-violet-50 to-transparent skew-x-12 group-hover:animate-[shimmer_2s_infinite]" />
                                            
                                            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Estimated Scope Total</p>
                                            <h2 className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-violet-500 drop-shadow-sm">
                                                {currency.symbol}{displayMin.toLocaleString()} <span className="text-3xl text-gray-300 font-medium px-2">—</span> {currency.symbol}{displayMax.toLocaleString()}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Place Order Mechanics */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to proceed?</h3>
                                        <p className="text-gray-500 text-sm mb-6">Enter your details and place your order directly. It will be securely locked into our system.</p>

                                        <form onSubmit={handleSubmitOrder} className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <input 
                                                        type="text" required
                                                        value={leadForm.firstName}
                                                        onChange={e => setLeadForm({...leadForm, firstName: e.target.value})}
                                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 font-medium shadow-sm" 
                                                        placeholder="Full Name"
                                                    />
                                                </div>
                                                <div>
                                                    <input 
                                                        type="email" required
                                                        value={leadForm.email}
                                                        onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 font-medium shadow-sm" 
                                                        placeholder="Email Address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <input 
                                                        type="tel" required
                                                        value={leadForm.phone}
                                                        onChange={e => setLeadForm({...leadForm, phone: e.target.value})}
                                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 font-medium shadow-sm" 
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                                <button 
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-extrabold transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(124,58,237,0.3)] border border-transparent"
                                                >
                                                    {isSubmitting ? (
                                                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    ) : (
                                                        <>Place Order Securely <FaPaperPlane className="text-sm opacity-80" /></>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                        <div className="mt-6 flex justify-center border-t border-gray-200 pt-6">
                                             <button 
                                                onClick={prevStep}
                                                className="text-gray-500 hover:text-primary transition-colors text-sm font-semibold flex items-center gap-2"
                                            >
                                                <FaArrowLeft /> Recalculate Scope
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
};

export default ProjectEstimator;
