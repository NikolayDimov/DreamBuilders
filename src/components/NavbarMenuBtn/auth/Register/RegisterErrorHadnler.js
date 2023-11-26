import { useState } from 'react';


export function useRegsterFormError() {

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });


    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isEmailValid = true;

        if (email === '') {
            setFormErrors((errors) => ({ ...errors, email: 'Email is required' }));
            isEmailValid = false;
        } else if (!emailRegex.test(email)) {
            setFormErrors((errors) => ({ ...errors, email: 'Provide a valid email address' }));
            isEmailValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, email: '' }));
        }

        return isEmailValid;
    }

    function validatePassword(password) {
        let isPasswordValid = true;

        if (password === '') {
            setFormErrors((errors) => ({ ...errors, password: 'Password is required' }));
            isPasswordValid = false;
        } else if (password.length < 6 || password.length > 12) {
            setFormErrors((errors) => ({ ...errors, password: 'Password must be between 6 and 12 characters long' }));
            isPasswordValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, password: '' }));
        }

        return isPasswordValid;
    }



    function validateConfirmPassword(confirmPassword, password) {
        let isConfirmPassword = true;

        if (confirmPassword === '') {
            setFormErrors((errors) => ({ ...errors, confirmPassword: 'Confirm Password is required' }));
            isConfirmPassword = false;
            return isConfirmPassword;
        }

        if (confirmPassword != password) {
            setFormErrors((errors) => ({ ...errors, confirmPassword: 'Passwords do not match' }));
            isConfirmPassword = false;
            return isConfirmPassword;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, confirmPassword: '' }));
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
