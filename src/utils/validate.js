// src/utils/validate.js

export const validate = (values) => {
    let errors = {};

    if (!values.fullName) {
        errors.fullName = 'Full Name is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone Number is invalid';
    }

    if (values.position === 'developer' || values.position === 'designer') {
        if (!values.relevantExperience || values.relevantExperience <= 0) {
            errors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
        }
    }

    if (values.position === 'designer' && !values.portfolioUrl) {
        errors.portfolioUrl = 'Portfolio URL is required';
    } else if (values.portfolioUrl && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioUrl)) {
        errors.portfolioUrl = 'Portfolio URL is invalid';
    }

    if (values.position === 'manager' && !values.managementExperience) {
        errors.managementExperience = 'Management Experience is required';
    }

    if (!Object.values(values.skills).some(skill => skill)) {
        errors.skills = 'At least one skill must be selected';
    }

    if (!values.preferredInterviewTime) {
        errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    return errors;
};
