import { UseFormInitialState, UseFormReturn, ErrorStatus, Field } from "../types/form";
import { ChangeEvent, useEffect, useState } from "react";

export const useForm = (initialState: UseFormInitialState): UseFormReturn => {
  const [values, setValues] = useState(initialState.initialValues);
  const [emailErrors, setEmailErrors] = useState<ErrorStatus[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<ErrorStatus[]>([]);
  const [submitTouched, setSubmitTouched] = useState(false);

  const isEmailValid = !!emailErrors.length && emailErrors.every(error => !error.error);
  const isPasswordValid = !!passwordErrors.length && passwordErrors.every(error => !error.error);
  const isFormValid = isEmailValid && isPasswordValid;

  const resetForm = () => {
    setValues(initialState.initialValues);
    setEmailErrors([]);
    setPasswordErrors([]);
    setSubmitTouched(false);
  }

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
    const findErrors = (field: Field): Array<ErrorStatus> => {
      let foundErrors: Array<ErrorStatus> = [];

      initialState.validation[field].errors.forEach(error => {
        const testPassed = error.test(values[field]);

        if (error.showOnErrorOnly && testPassed) return;

        foundErrors.push({
          message: error.message,
          error: !testPassed
        })
      });

      return foundErrors;
    }

    const foundEmailErrors = findErrors('email');
    const foundPasswordErrors = findErrors('password');

    setEmailErrors(foundEmailErrors);
    setPasswordErrors(foundPasswordErrors);

    return isFormValid;
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

    if (isFormValid) {
      resetForm();
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
    isEmailValid,
    isPasswordValid
  };
}