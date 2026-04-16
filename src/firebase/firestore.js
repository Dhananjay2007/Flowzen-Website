import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

/**
 * Save a contact form submission to Firestore.
 * @param {Object} data - form fields
 */
export const submitContactForm = async (data) => {
    // Generate a simple order number e.g. FZ-10293
    const orderNumber = `FZ-${Math.floor(10000 + Math.random() * 90000)}`;

    const docRef = await addDoc(collection(db, 'contacts'), {
        ...data,
        status: 'Pending',
        orderNumber: orderNumber,
        read: false,
        createdAt: serverTimestamp(),
    });
    return { id: docRef.id, orderNumber };
};
