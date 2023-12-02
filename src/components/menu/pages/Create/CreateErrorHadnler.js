import { useState } from 'react';

export function useCreateFormError() {

    const [formErrors, setFormErrors] = useState({
        projectName: '',
        category: '',
        bedrooms: '',
        bathrooms: '',
        image: '',
    });


    const validateProjectName = (projectName) => {
        let isProjectNameValid = true;

        if (projectName === '') {
            setFormErrors((errors) => ({ ...errors, projectName: 'Project name is required' }));
            isProjectNameValid = false;
        } else if (projectName.length < 3) {
            setFormErrors((errors) => ({ ...errors, projectName: 'Project name must be at least 3 characters long' }));
            isProjectNameValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, projectName: '' }));
        }

        return isProjectNameValid;
    };

    const validateCategory = (category) => {
        let isCategoryValid = true;

        if (category === '') {
            setFormErrors((errors) => ({ ...errors, category: 'Select category from the list' }));
            isCategoryValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, category: '' }));
        }

        return isCategoryValid;
    };

    const validateBedrooms = (bedrooms) => {
        let isBedroomsValid = true;

        if (bedrooms === '') {
            setFormErrors((errors) => ({ ...errors, bedrooms: 'Select bedrooms from the list' }));
            isBedroomsValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, bedrooms: '' }));
        }

        return isBedroomsValid;
    };

    const validateBathrooms = (bedrooms) => {
        let isBathroomsValid = true;

        if (bedrooms === '') {
            setFormErrors((errors) => ({ ...errors, bathrooms: 'Select bedrooms from the list' }));
            isBathroomsValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, bathrooms: '' }));
        }

        return isBathroomsValid;
    };

    const validateImage = (image) => {
        let isImageValid = true;

        if (image === '') {
            setFormErrors((errors) => ({ ...errors, image: 'Project image is required' }));
            isImageValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, image: '' }));
        }

        return isImageValid;
    };




    const getBlurHandlers = (createdValues) => {
        return {
            handleProjectNameBlur: () => validateProjectName(createdValues.projectName),
            handleCategoryBlur: () => validateCategory(createdValues.category),
            handleBedroomsBlur: () => validateBedrooms(createdValues.bedrooms),
            handleBathroomsBlur: () => validateBathrooms(createdValues.bathrooms),
            handleImageBlur: () => validateImage(createdValues.img),
        };
    };




    return {
        formErrors,
        validateProjectName,
        validateCategory,
        validateBedrooms,
        validateBathrooms,
        validateImage,
        getBlurHandlers
    };
}
