import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { validate } from '../utils/validate';
import './JobApplicationForm.css';

const INITIAL_STATE = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    skills: {
        javascript: false,
        css: false,
        python: false,
    },
    preferredInterviewTime: '',
};

const JobApplicationForm = () => {
    const [showSummary, setShowSummary] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = useFormValidation(INITIAL_STATE, validate, submitForm);

    function submitForm() {
        setSubmittedData(values);
        setShowSummary(true);
    }

    const handleReset = () => {
        setShowSummary(false);
        setSubmittedData(null);
    };

    return (
        <div className="form-container">
            <h1>Job Application Form</h1>
            {showSummary ? (
                <div className="summary">
                    <h2>Application Summary</h2>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                    <button onClick={handleReset}>Reset Form</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <p className="error">{errors.fullName}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    <div className="form-group">
                        <label>Applying for Position</label>
                        <select
                            name="position"
                            value={values.position}
                            onChange={handleChange}
                        >
                            <option value="">Select a position</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    {(values.position === 'developer' || values.position === 'designer') && (
                        <div className="form-group">
                            <label>Relevant Experience (years)</label>
                            <input
                                type="number"
                                name="relevantExperience"
                                value={values.relevantExperience}
                                onChange={handleChange}
                            />
                            {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
                        </div>
                    )}
                    {values.position === 'designer' && (
                        <div className="form-group">
                            <label>Portfolio URL</label>
                            <input
                                type="text"
                                name="portfolioUrl"
                                value={values.portfolioUrl}
                                onChange={handleChange}
                            />
                            {errors.portfolioUrl && <p className="error">{errors.portfolioUrl}</p>}
                        </div>
                    )}
                    {values.position === 'manager' && (
                        <div className="form-group">
                            <label>Management Experience</label>
                            <input
                                type="text"
                                name="managementExperience"
                                value={values.managementExperience}
                                onChange={handleChange}
                            />
                            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
                        </div>
                    )}
                    <div className="form-group">
                        <label>Additional Skills</label>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="skills.javascript"
                                    checked={values.skills.javascript}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'skills',
                                            value: {
                                                ...values.skills,
                                                javascript: e.target.checked,
                                            }
                                        }
                                    })}
                                />
                                JavaScript
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="skills.css"
                                    checked={values.skills.css}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'skills',
                                            value: {
                                                ...values.skills,
                                                css: e.target.checked,
                                            }
                                        }
                                    })}
                                />
                                CSS
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="skills.python"
                                    checked={values.skills.python}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'skills',
                                            value: {
                                                ...values.skills,
                                                python: e.target.checked,
                                            }
                                        }
                                    })}
                                />
                                Python
                            </label>
                        </div>
                        {errors.skills && <p className="error">{errors.skills}</p>}
                    </div>
                    <div className="form-group">
                        <label>Preferred Interview Time</label>
                        <input
                            type="datetime-local"
                            name="preferredInterviewTime"
                            value={values.preferredInterviewTime}
                            onChange={handleChange}
                        />
                        {errors.preferredInterviewTime && <p className="error">{errors.preferredInterviewTime}</p>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default JobApplicationForm;
