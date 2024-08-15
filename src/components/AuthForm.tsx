'use client'

import React from 'react';
import PasswordInput from './PasswordInput';
import { validation } from '@utils/validation';
import { useForm } from '@hooks/useForm';

export default function AuthForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validation
  });

  const { 
    values,
    handleChange,
    handleSubmit,
    errors,
    isEmailSuccessful,
    isPasswordSuccessful 
  } = form;
  const submitDisabled = !values.email.length && !values.password.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className={`input-base ${isEmailSuccessful && 'input-success'}`}
          onChange={handleChange}
          value={values.email}
        />
        {errors.email.length && errors.email[0].error ? <div className="text-red text-sm pl-[20px]">{errors.email[0].message}</div> : null}
      </div>
      <div>
        <PasswordInput onChangeCallback={handleChange} value={values.password} cssClasses={`input-base ${isPasswordSuccessful && 'input-success'}`} />
        {errors.password.length ? errors.password.map((error: any, i: number) => <div key={i} className={`${error.error ? 'text-red' : 'text-green'} text-sm pl-[20px]`}>{error.message}</div>) : null}
      </div>
      <div className="justify-center flex pt-5">
        <button
          type="submit"
          disabled={submitDisabled}
          className="button-base"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
