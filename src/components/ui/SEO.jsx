import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    descriptionHover, 
    keywords, 
    type = 'website',
    image = '/assets/images/New/WEBP/Hero_section.webp' // Fallback rich preview image
}) => {
    const siteName = 'Flowzen-Technologies';
    const description = descriptionHover || "Building modern, user-friendly websites and powerful mobile applications to turn ideas into impactful digital experiences.";
    
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords || 'Web Development, App Agency, Custom Software, React, Firebase, High-End SaaS, India Developers, Flowzen Technologies'} />
            <meta name="robots" content="index, follow" />

            {/* OpenGraph (Link previews for LinkedIn/WhatsApp) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title ? `${title} | ${siteName}` : siteName} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter / X Meta Tags (Large cards) */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} | ${siteName}` : siteName} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            
            {/* Theme Color for mobile browsers */}
            <meta name="theme-color" content="#7c3aed" />
        </Helmet>
    );
};

export default SEO;
