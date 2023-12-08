import { useState } from "react";

export function useEmailFormError() {
    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        subject: "",
        messageText: "",
    });

    const validateUsername = (username) => {
        let isUsernameValid = true;

        if (username === "") {
            setFormErrors((errors) => ({ ...errors, username: "Username is required" }));
            isUsernameValid = false;
        } else if (username.length < 2) {
            setFormErrors((errors) => ({ ...errors, username: "Username must be at least 2 characters long" }));
            isUsernameValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, username: "" }));
        }

        return isUsernameValid;
    };

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isEmailValid = true;

        if (email === "") {
            setFormErrors((errors) => ({ ...errors, email: "Email is required" }));
            isEmailValid = false;
        } else if (!emailRegex.test(email)) {
            setFormErrors((errors) => ({ ...errors, email: "Provide a valid email address" }));
            isEmailValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, email: "" }));

            return isEmailValid;
        }
    }

    const validateSubject = (subject) => {
        let isSubjectValid = true;

        if (subject === "") {
            setFormErrors((errors) => ({ ...errors, subject: "Subject is required" }));
            isSubjectValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, subject: "" }));
        }

        return isSubjectValid;
    };

    const validateMessage = (messageText) => {
        let isMessageValid = true;

        if (messageText === "") {
            setFormErrors((errors) => ({ ...errors, messageText: "Please add some text" }));
            isMessageValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, messageText: "" }));
        }

        return isMessageValid;
    };

    const getBlurHandlers = (emailsValues) => {
        return {
            handleNameBlur: () => validateUsername(emailsValues.username),
            handleEmailBlur: () => validateEmail(emailsValues.email),
            handleSubjectBlur: () => validateSubject(emailsValues.subject),
            handleMessageBlur: () => validateMessage(emailsValues.messageText),
        };
    };

    return {
        formErrors,
        validateUsername,
        validateEmail,
        validateSubject,
        validateMessage,
        getBlurHandlers,
    };
}
