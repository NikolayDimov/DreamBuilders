import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { sendEmail } from '../../../utils/emailSend';
import { useEmailFormError } from '../../../utils/emailErrorHandler';

export default function EmailForm() {
    const [emailFormValues, setEmailFormValues] = useState({
        username: '',
        email: '',
        subject: '',
        messageText: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Error Validator
    const {
        formErrors,
        validateUsername,
        validateEmail,
        validateSubject,
        validateMessage,
        getBlurHandlers,
    } = useEmailFormError();

    const {
        handleNameBlur,
        handleEmailBlur,
        handleSubjectBlur,
        handleMessageBlur,
    } = getBlurHandlers(emailFormValues);

    const emailChangeHandler = (e) => {
        setEmailFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    // Initialize EmailJS once when the component mounts
    useEffect(() => {
        emailjs.init("zIwYogPUgOzwv3j1A");
    }, []);

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            let isUsernameValid = validateUsername(emailFormValues.username);
            let isEmailvalid = validateEmail(emailFormValues.email);
            let isSubjectValid = validateSubject(emailFormValues.subject);
            let isMessagetextValid = validateMessage(emailFormValues.messageText);

            if (!isUsernameValid || !isEmailvalid || !isSubjectValid || !isMessagetextValid) {
                console.log(`Values can no be empty strings`);
            } else {
                await sendEmail(
                    emailFormValues.username,
                    emailFormValues.email,
                    emailFormValues.subject,
                    emailFormValues.messageText
                );
                // Handle success
                console.log('Email sent successfully!');
                setSuccessMessage('Email sent successfully!');
                setErrorMessage(''); // Clear any previous error messages
            }
        } catch (error) {
            // Handle error
            console.error('Error sending email:', error);
            setSuccessMessage('');
            setErrorMessage('Error sending email: ' + error.message);
        }

        // Reset form fields
        setEmailFormValues({
            username: '',
            email: '',
            subject: '',
            messageText: '',
        });
    };

    return (
        <form onSubmit={handleFormSubmit} noValidate className="row g-3">
            <div className="col-12">
                <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Your Name"
                    style={{ height: 55 }}
                    name="username"
                    value={emailFormValues.username}
                    onChange={(e) => emailChangeHandler(e)}
                    onBlur={handleNameBlur}
                />
                {formErrors.username && <p className='error'>{formErrors.username}</p>}
            </div>
            <div className="col-12">
                <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Your Email"
                    style={{ height: 55 }}
                    name="email"
                    value={emailFormValues.email}
                    onChange={(e) => emailChangeHandler(e)}
                    onBlur={handleEmailBlur}
                />
                {formErrors.email && <p className='error'>{formErrors.email}</p>}
            </div>
            <div className="col-12">
                <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Subject"
                    style={{ height: 55 }}
                    name="subject"
                    value={emailFormValues.subject}
                    onChange={(e) => emailChangeHandler(e)}
                    onBlur={handleSubjectBlur}
                />
                {formErrors.subject && <p className='error'>{formErrors.subject}</p>}
            </div>
            <div className="col-12">
                <textarea
                    className="form-control border-0"
                    rows={4}
                    style={{ height: 'auto' }}
                    placeholder="Message"
                    name="messageText"
                    value={emailFormValues.messageText}
                    onChange={(e) => emailChangeHandler(e)}
                    onBlur={handleMessageBlur}
                />
                {formErrors.messageText && <p className='error'>{formErrors.messageText}</p>}
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
    );
}
