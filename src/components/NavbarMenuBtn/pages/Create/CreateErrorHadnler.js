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
        setFormErrors((errors) => ({ ...errors, projectName: '' }));

        if (projectName === '') {
            setFormErrors((errors) => ({ ...errors, projectName: 'Project name is required' }));
            isProjectNameValid = false;
        } else if (projectName.length < 3) {
            setFormErrors((errors) => ({ ...errors, projectName: 'Project name must be at least 3 characters long' }));
            isProjectNameValid = false;
        }

        return isProjectNameValid;
    };

    const validateCategory = (category) => {
        let isCategoryValid = true;
        setFormErrors((errors) => ({ ...errors, category: '' }));

        if (category === '') {
            setFormErrors((errors) => ({ ...errors, category: 'Select category from the list' }));
            isCategoryValid = false;
        }

        return isCategoryValid;
    };

    const validateBedrooms = (bedrooms) => {
        let isBedroomsValid = true;
        setFormErrors((errors) => ({ ...errors, bedrooms: '' }));

        if (bedrooms === '') {
            setFormErrors((errors) => ({ ...errors, bedrooms: 'Select bedrooms from the list' }));
            isBedroomsValid = false;
        }

        return isBedroomsValid;
    };

    const validateBathrooms = (bedrooms) => {
        let isBathroomsValid = true;
        setFormErrors((errors) => ({ ...errors, bathrooms: '' }));

        if (bedrooms === '') {
            setFormErrors((errors) => ({ ...errors, bathrooms: 'Select bedrooms from the list' }));
            isBathroomsValid = false;
        }

        return isBathroomsValid;
    };

    const validateImage = (image) => {
        let isImageValid = true;
        setFormErrors((errors) => ({ ...errors, image: '' }));

        if (image === '') {
            setFormErrors((errors) => ({ ...errors, image: 'Project image is required' }));
            isImageValid = false;
        }

        return isImageValid;
    };



    return {
        formErrors,
        validateProjectName,
        validateCategory,
        validateBedrooms,
        validateBathrooms,
        validateImage
    };
}
