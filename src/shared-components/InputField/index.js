import React from 'react';

const InputField = ({ value, name, label, placeholder, type, onChange, disabled, error }) => {
    // const [error, setError] = useState(false);

    const handleChange = (event) => {
        // const {value} = event.target;
        // setError(validateInput(validators, value));
        onChange(event);
    };

    return (
        <div className="form-group">
            {label && <label>{label}</label>}

            {type === 'textarea' ? (
                <textarea
                    name={name}
                    className='form-control'
                    placeholder={placeholder}
                    value={value}
                    defaultValue={value}
                    onChange={handleChange}
                    disabled={disabled}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    value={value}
                    className='form-control'
                    placeholder={placeholder}
                    onChange={handleChange}
                    disabled={disabled}
                />
            )}
            {error && <span className='error'>{error}</span>}
        </div>
    )
};

InputField.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    type: 'text'
};

export default InputField;
