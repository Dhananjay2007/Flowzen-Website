import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_aq0hjvj';
const PUBLIC_KEY = '2Gv2thijZmSqozYOU';

// TEMPLATE FOR CONTACT FORM SUBMIT (INITIAL CONFIRMATION)
const SUBMIT_TEMPLATE_ID = 'template_zoixubt';

// TEMPLATE FOR ADMIN ACTIONS
const ADMIN_TEMPLATE_ID = 'template_13ep9ht'; 

/**
 * Helper to send the initial confirmation email to the user 
 * right after they submit the contact form.
 */
export const sendSubmitConfirmationEmail = async (formDetails, orderNumber) => {
    const templateParams = {
        to_name: `${formDetails.firstName} ${formDetails.lastName}`,
        to_email: formDetails.email,
        order_number: orderNumber || 'N/A',
        status_message: `Thank you for reaching out! We have received your request and our team will get back to you shortly.`,
        submitted_message: formDetails.message || 'N/A',
        services_requested: formDetails.services?.length ? formDetails.services.join(', ') : 'None specified',
    };

    try {
        const response = await emailjs.send(SERVICE_ID, SUBMIT_TEMPLATE_ID, templateParams, {
            publicKey: PUBLIC_KEY,
        });
        console.log('Confirmation Email sent successfully!', response.status, response.text);
        return true;
    } catch (error) {
        console.error('Failed to send confirmation email:', error);
        return false;
    }
}

/**
 * Helper to send status update emails from the Admin Dashboard.
 */
export const sendOrderEmail = async (contact, action) => {
    let statusPhrase = '';
    let messageForUpdate = '';
    let nextSteps = '';
    
    switch (action) {
        case 'Accepted':
            statusPhrase = 'accepted.';
            messageForUpdate = "Great news! We have formally accepted your request and our team will begin working on it shortly. We will keep you updated on the progress.";
            nextSteps = "Our team will reach out to you within 24 hours to coordinate project details and next steps.";
            break;
        case 'Waitlisted':
            statusPhrase = 'waitlisted.';
            messageForUpdate = "Thank you for choosing us. We are currently experiencing high volume, so we have placed your request on our priority waitlist.";
            nextSteps = "We will notify you immediately as soon as a slot opens up to start your project.";
            break;
        case 'Finished':
            statusPhrase = 'completed!';
            messageForUpdate = "Your order/request is now complete! Thank you for choosing Flowzen Technologies. Please let us know if you have any questions or need further assistance.";
            nextSteps = "We have marked this project as finished and delivered. We hope you love the final results!";
            break;
        case 'Rejected':
            statusPhrase = 'rejected.';
            messageForUpdate = "Unfortunately, we are unable to fulfill your request at this time.";
            nextSteps = "After careful review, we cannot proceed with your order. If you have any questions or alternative projects in mind, please don't hesitate to reach us.";
            break;
        default:
            return false;
    }

    const templateParams = {
        to_name: `${contact.firstName} ${contact.lastName}`,
        to_email: contact.email,
        time: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        status_message: statusPhrase,
        Message_for_update: messageForUpdate,
        order_number: contact.orderNumber || 'N/A',
        services_requested: contact.services?.length ? contact.services.join(', ') : 'General Inquiry',
        next_steps: nextSteps
    };

    console.log("PAYLOAD SENT TO EMAILJS:", templateParams);

    try {
        const response = await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, {
            publicKey: PUBLIC_KEY,
        });
        console.log(`${action} Email sent successfully!`, response.status, response.text);
        return true;
    } catch (error) {
        console.error(`Failed to send ${action} email:`, error);
        return false;
    }
};
