'use client'

import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from './PasswordInput';

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, '8 characters or more (no spaces)')
    .max(64, 'No more than 64 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/, 'Uppercase and lowercase letters')
    .matches(/[0-9]/, 'At least one digit')
    .required('Required'),
});

export default function AuthForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={FormSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => {
        console.log("ERRORS: ", errors);
        console.log("VALUES: ", values);
        console.log("tOUCHED: ", touched);
        return (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2.5">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="input-base"
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email ? <div className="text-red text-sm pl-[20px]">{errors.email}</div> : null}
            </div>
            <div className="space-y-2.5">
              <PasswordInput onChangeCallback={handleChange} value={values.password} />
              {touched.password && errors.password ? <div className="text-red text-sm pl-[20px]">{errors.password}</div> : null}
            </div>
            <div className="justify-center flex pt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-base"
              >
                Sign up
              </button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
