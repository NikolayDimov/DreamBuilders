import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { sendEmail } from '../../../../utils/emailSend';


export default function Appointment() {
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
            // console.log('Email sent successfully!');
            setSuccessMessage('Email sent successfully!');
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            // Handle error
            // console.error('Error sending email:', error);
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
        <div className="container-fluid py-6 px-5">
            <div className="row gx-5">
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <div className="mb-4">
                        <h1 className="display-5 text-uppercase mb-4">
                            Request A <span className="text-primary">Call Back</span>
                        </h1>
                    </div>
                    <p className="mb-5">
                        If you want to connect with us. If you like some project and find it really cool. If want more information for some existing house project.
                        If You're having trouble creating your new project.
                        Just get in touch with us, and we'll provide you with details about the project and pricing.
                    </p>
                </div>
                <div className="col-lg-6">
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
    );
}