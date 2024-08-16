'use client'

import React from 'react';
import PasswordInput from './PasswordInput';
import { validation } from '@utils/validation';
import { useForm } from '@hooks/useForm';
import { ErrorStatus, Field } from '../types/form';

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
    isEmailValid,
    isPasswordValid 
  } = form;
  const submitDisabled = !(values.email.length && values.password.length);

  const getCssClasses = (field: Field): string => {
    let cssClasses = 'input-base';

    if (field === 'email') {
      if (isEmailValid) {
        cssClasses += ' input-success';
      }

      if (errors.email.length && !isEmailValid) {
        cssClasses += ' input-error';
      }
    }

    if (field === 'password') {
      cssClasses += ' !pr-14';

      if (isPasswordValid) {
        cssClasses += ' input-success';
      }

      if (errors.password.length && !isPasswordValid) {
        cssClasses += ' input-error';
      }
    }

    return cssClasses;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className={getCssClasses('email')}
          onChange={handleChange}
          value={values.email}
        />
        {errors.email.length && errors.email[0].error ? <div className="text-red text-sm pl-[20px]">{errors.email[0].message}</div> : null}
      </div>
      <div>
        <PasswordInput onChangeCallback={handleChange} value={values.password} cssClasses={getCssClasses('password')} />
        {
          errors.password.length
            ? errors.password.map(
              (error: ErrorStatus) => 
                <div key={error.message.replace(' ', '-').substring(0, 10)} className={`${error.error ? 'text-red' : 'text-green'} text-sm pl-[20px]`}>
                  {error.message}
                </div>
              ) 
            : null
        }
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
