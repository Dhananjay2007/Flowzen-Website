import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ icon: Icon, title, description, className = '' }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`bg-blue-50/50 p-8 rounded-2xl border border-blue-100/50 shadow-sm hover:shadow-xl transition-all duration-300 group ${className}`}
        >
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
                {description}
            </p>
        </motion.div>
    );
};

export default Card;
