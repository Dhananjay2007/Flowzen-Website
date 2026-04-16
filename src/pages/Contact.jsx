import React from 'react';
import ContactForm from '../components/sections/ContactForm';
import SEO from '../components/ui/SEO';

const Contact = () => {
    return (
        <>
            <SEO 
                title="Contact Us" 
                descriptionHover="Get in touch with Flowzen Technologies. Whether you need a quote, have a question, or want to partner up, we are just a message away."
                keywords="Contact Flowzen, Lead Generation, Indian Web Agency, Hire Developers India"
            />
            <ContactForm />
        </>
    );
};

export default Contact;
