import React from 'react';
// import PropTypes from 'prop-types';

const Dropdown = ({value, name,data, placeholder,label,disabled, onChange, error}) => {

    const handleChange = (event) => {
        // const {key,value} = event.target;
        // console.log(key+ " "+value)
        onChange(event);
    };

    return (
        <div className={`dropdown`}>
            {label && <label>{label}</label>}
            <select
                name={name}
                value={value}
                className="select"
                disabled={disabled}
                onChange={handleChange}>
                <option value="">{placeholder}</option>
                {data.map((item, key) => (
                    <option
                        key={key}
                        value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {error && <span className='error'>{error}</span>}
        </div>
    )
};

Dropdown.defaultProps = {
    value: '',
    styleClass: '',
    placeholder: ''
};

export default Dropdown;
