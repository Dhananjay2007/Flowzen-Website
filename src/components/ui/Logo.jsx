import React from 'react';

const Logo = ({ className, src = "/assets/images/logo/Flowzen_Logo_Final.png", ...props }) => {
    return (
        <img
            src={src}
            alt="Flowzen Logo"
            className={className}
            {...props}
        />
    );
};

export default Logo;
