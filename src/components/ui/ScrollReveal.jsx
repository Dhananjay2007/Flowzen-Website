import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    y = 20,
    once = true,
    staggerChildren = 0.1,
    isVisible = true
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            viewport={{ once, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
                staggerChildren
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
