import { useState } from 'react';
import { values } from './Register'

export function useRegsterFormError() {
    const { value_pass } = values.password;

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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

    function validateConfirmPassword(confirmPassword) {
        let isConfirmPassword = true;
        setFormErrors((errors) => ({ ...errors, confirmPassword: '' }));

        if (confirmPass === '') {
            setFormErrors((errors) => ({ ...errors, confirmPassword: 'Confirm Password is required' }));
            isConfirmPassword = false;
            return isConfirmPassword;
        }

        if (confirmPass != value_pass) {
            setFormErrors((errors) => ({ ...errors, confirmPassword: 'Passwords do not match' }));
            isConfirmPassword = false;
            return isConfirmPassword;
        }

        return isConfirmPassword;
    }



    return {
        formErrors,
        validateEmail,
        validatePassword,
        validateConfirmPassword
    };
}
