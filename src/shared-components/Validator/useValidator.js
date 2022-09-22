import { useState } from 'react';

export const useValidator = (validationRules) => {
  // const [data, setData] = useState(({} || [] || ""));
  const [errors, setErrors] = useState({});

  const validator = (data) => {
    const validations = validationRules;
    let valid = true;
    if (validations) {
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return valid;
      }
      setErrors({});
    }
    return valid;
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const isValid = validator()//temp disable
  //   console.log(isValid)
  //   if (onSubmit && isValid) {
  //     onSubmit();
  //   }
  // };
  return {
    errors,
    validator
  };
};
