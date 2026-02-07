import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ icon, title, description, className = '' }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`group relative p-[1px] rounded-2xl overflow-hidden h-full transition-[transform,shadow] duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] ${className}`}
        >
            {/* Gradient Border Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            <div className="relative h-full rounded-2xl overflow-hidden isolate-fix">
                {/* Isolated Glass Backdrop */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-md transition-colors duration-500 group-hover:bg-white -z-10 rounded-2xl"></div>

                {/* Content Layer */}
                <div className="relative p-8 h-full flex flex-col items-center text-center antialiased">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform duration-500">
                        {typeof icon === 'string' ? (
                            <img src={icon} alt={title} className="w-10 h-10 object-contain" />
                        ) : (
                            React.createElement(icon, { className: "text-4xl text-blue-600" })
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed opacity-90">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;
