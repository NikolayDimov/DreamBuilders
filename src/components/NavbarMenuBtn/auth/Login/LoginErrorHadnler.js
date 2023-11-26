import { useState } from 'react';

export function useLoginFormError() {
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isEmailValid = true;
        setFormErrors((errors) => ({ ...errors, email: '' }));

        if (email === '') {
            setFormErrors((errors) => ({ ...errors, email: 'Email is required' }));
            isEmailValid = false;
        }
        if (!emailRegex.test(email)) {
            setFormErrors((errors) => ({ ...errors, email: 'Provide a valid email address' }));
            isEmailValid = false;
        }

        return isEmailValid;
    };

    function validatePassword(password) {
        let isPasswordValid = true;
        setFormErrors((errors) => ({ ...errors, password: '' }));

        if (password === '') {
            setFormErrors((errors) => ({ ...errors, password: 'Password from the list' }));
            isPasswordValid = false;
        }

        if (pass.length < 6 || pass.length > 12) {
            setFormErrors((errors) => ({ ...errors, password: 'Password must be between 6 and 12 characters long' }));
            isPasswordValid = false;
        }

        return isPasswordValid;
    };



    return {
        formErrors,
        validateEmail,
        validatePassword,
    };
}
