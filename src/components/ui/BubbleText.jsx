import React from 'react';
import styles from './bubble.module.css';

const BubbleText = ({ text, className = "" }) => {
    return (
        <span className={`inline ${className}`} style={{ whiteSpace: 'normal' }}>
            {text.split("").map((child, idx) => (
                <span
                    className={styles.hoverText}
                    key={idx}
                >
                    {child === " " ? " " : child}
                </span>
            ))}
        </span>
    );
};

export default BubbleText;
