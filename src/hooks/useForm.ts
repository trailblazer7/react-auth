import { UseFormInitialState, UseFormReturn, Error, ErrorStatus } from "../types/form";
import { ChangeEvent, useEffect, useState } from "react";

export const useForm = (initialState: UseFormInitialState): UseFormReturn => {
  const [values, setValues] = useState(initialState.initialValues);
  const [emailErrors, setEmailErrors] = useState<ErrorStatus[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<ErrorStatus[]>([]);
  const [submitTouched, setSubmitTouched] = useState(false);

  const isEmailSuccessful = !!emailErrors.length && emailErrors.every(error => !error.error);
  const isPasswordSuccessful = !!passwordErrors.length && passwordErrors.every(error => !error.error);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    switch (target.name) {
      case 'email':
        setValues({
          ...values,
          email: target.value
        });
        break;
      case 'password':
        setValues({
          ...values,
          password: target.value
        });
        break;
      default:
        break;
    }
  }

  const runValidation = () => {
    const findErrors = (field: 'email' | 'password'): Array<ErrorStatus> => {
      let foundErrors: Array<ErrorStatus> = [];

      initialState.validation[field].errors.forEach(error => {
        foundErrors.push({
          message: error.message,
          error: !error.test(values[field])
        })
      });

      return foundErrors;
    }

    const foundEmailErrors = findErrors('email');
    const foundPasswordErrors = findErrors('password');

    setEmailErrors(foundEmailErrors);
    setPasswordErrors(foundPasswordErrors);

    if (isEmailSuccessful || isPasswordSuccessful) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (submitTouched) {
      runValidation();
    }
  }, [submitTouched, values.email, values.password]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!submitTouched) {
      setSubmitTouched(true);
    }

    const isFormValid = runValidation();

    if (isFormValid) {
      alert('Form submitted successfully!');
    }
    
    return isFormValid;
  }

  return {
    values,
    handleChange,
    handleSubmit,
    errors: {
      email: emailErrors,
      password: passwordErrors,
    },
    isEmailSuccessful,
    isPasswordSuccessful
  };
}