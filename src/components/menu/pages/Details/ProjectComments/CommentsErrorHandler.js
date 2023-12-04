import { useState } from "react";

export function useCommentsFormError() {
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        commentText: "",
    });

    const validateCommentName = (name) => {
        let isCommentNameValid = true;

        if (name === "") {
            setFormErrors((errors) => ({ ...errors, name: "Name is required" }));
            isCommentNameValid = false;
        } else if (name.length < 2) {
            setFormErrors((errors) => ({ ...errors, name: "Name must be at least 2 characters long" }));
            isCommentNameValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, name: "" }));
        }

        return isCommentNameValid;
    };

    function validateCommentEmail(email) {
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

    const validateCommentText = (commentText) => {
        let isCommentTextValid = true;

        if (commentText === "") {
            setFormErrors((errors) => ({ ...errors, commentText: "Please add some text" }));
            isCommentTextValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, commentText: "" }));
        }

        return isCommentTextValid;
    };

    const getBlurHandlers = (commentsValues) => {
        return {
            handleCommentNameBlur: () => validateCommentName(commentsValues.name),
            handleCommentEmailBlur: () => validateCommentEmail(commentsValues.email),
            handleCommentTextBlur: () => validateCommentText(commentsValues.commentText),
        };
    };

    return {
        formErrors,
        validateCommentName,
        validateCommentEmail,
        validateCommentText,
        getBlurHandlers,
    };
}
