import { useState, useEffect } from 'react';

export const useFormValidation = (initialState, validate, callback) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                callback();
                setIsSubmitting(false);
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setIsSubmitting(true);
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    };
};
