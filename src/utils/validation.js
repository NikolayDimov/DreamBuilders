export default function Validation(createdValues) {
    const errors = {};


    if (createdValues.projectName == '') {
        errors.projectName = 'Project Name is required';
    }

    return errors;
}