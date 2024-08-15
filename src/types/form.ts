import { ChangeEvent } from "react";

export interface Error {
  test: Function;
  message: string;
  error: boolean;
}

export interface ErrorStatus {
  message: string;
  error: boolean;
}

export interface InitialValues {
  email: string;
  password: string;
}

export interface Validation {
  email: {
    touched: boolean;
    errors: Array<Error>;
  },
  password: {
    touched: boolean;
    errors: Array<Error>;
  }
}

export interface UseFormInitialState {
  initialValues: InitialValues,
  validation: Validation
}

interface Errors {
  email: Array<ErrorStatus>;
  password: Array<ErrorStatus>;
}

export interface UseFormReturn {
  values: InitialValues,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void,
  errors: Errors,
  isEmailSuccessful: boolean,
  isPasswordSuccessful: boolean
}