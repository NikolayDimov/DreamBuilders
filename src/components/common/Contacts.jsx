import { useState, useEffect } from 'react';
import Topbar from './Topbar';
import emailjs from 'emailjs-com';
import { sendEmail } from '../../utils/emailSend';

import './Contacts.css';


export default function Contacts() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize EmailJS once when the component mounts
    useEffect(() => {
        emailjs.init("zIwYogPUgOzwv3j1A");
    }, []);

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendEmail(username, email, subject, message);
            // Handle success
            console.log('Email sent successfully!');
            setSuccessMessage('Email sent successfully!');
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            // Handle error
            console.error('Error sending email:', error);
            setSuccessMessage('');
            setErrorMessage('Error sending email: ' + error.message);
        }

        // Reset form fields
        setUsername('');
        setEmail('');
        setSubject('');
        setMessage('');
    };


    return (
        <>
            <Topbar />
            {/* Page Header Start */}
            <div className="container-fluid page-header">
                <h1 className="display-3 text-uppercase text-white mb-3">Contact</h1>
                <div className="d-inline-flex text-white">
                    <h6 className="text-uppercase m-0">
                        <a href="">Home</a>
                    </h6>
                    <h6 className="text-white m-0 px-3">/</h6>
                    <h6 className="text-uppercase text-white m-0">Contact</h6>
                </div>
            </div>
            {/* Page Header Start */}
            {/* Contact Start */}
            <div className="container-fluid py-6 px-5">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                    <h1 className="display-5 text-uppercase mb-4">
                        Please <span className="text-primary">Feel Free</span> To Contact Us
                    </h1>
                </div>

                {/* How to change your own map point
                1. Go to Google Maps
                2. Click on your location point
                3. Click "Share" and choose "Embed map" tab
                4. Copy only URL and paste it within the src="" field below */}
                <div className="row gx-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0" style={{ height: 600 }}>
                        <iframe
                            className="w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26882.147424724197!2d27.893652003569535!3d43.200356312673655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a45470426ce059%3A0x4fb83e02611989a2!2sPort%20Varna!5e0!3m2!1sen!2sbg!4v1689868727797!5m2!1sen!2sbg"
                            width="100%"
                            height="400"
                            allowFullScreen=""
                            referrerPolicy="no-referrer-when-downgrade"
                            frameBorder={0}
                            style={{ border: 0 }}
                            aria-hidden="false"
                            tabIndex={0}
                        />
                    </div>

                    <div className="col-lg-5">
                        <div className="contact-form bg-light p-5">
                            <form onSubmit={handleFormSubmit} className="row g-3">
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className="form-control border-0"
                                        placeholder="Your Name"
                                        style={{ height: 55 }}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <input
                                        type="email"
                                        className="form-control border-0"
                                        placeholder="Your Email"
                                        style={{ height: 55 }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className="form-control border-0"
                                        placeholder="Subject"
                                        style={{ height: 55 }}
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <textarea
                                        className="form-control border-0"
                                        rows={4}
                                        style={{ height: 'auto' }}
                                        placeholder="Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">
                                        Send Message
                                    </button>
                                </div>

                                {successMessage && (
                                    <div className="col-12 mt-3 text-success">{successMessage}</div>
                                )}

                                {errorMessage && (
                                    <div className="col-12 mt-3 text-danger">{errorMessage}</div>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Contact End */}
        </>

    );
}