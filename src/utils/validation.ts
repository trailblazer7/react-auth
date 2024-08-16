import { Validation } from "../types/form";

export const validation: Validation = {
  email: {
    touched: false,
    errors: [
      {
        test: (t: string) => /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/.test(t),
        message: 'Invalid email address',
        error: false
      }
    ]
  },
  password: {
    touched: false,
    errors: [
      {
        test: (t: string) => t?.length >= 8,
        message: '8 characters or more (no spaces)',
        error: false
      },
      {
        test: (t: string) => t?.length < 64,
        message: 'No more than 64 characters',
        error: false,
        showOnErrorOnly: true
      },
      {
        test: (t: string) => /^(?=.*[a-z])(?=.*[A-Z]).*$/.test(t),
        message: 'Uppercase and lowercase letters',
        error: false
      },
      {
        test: (t: string) => /[0-9]/.test(t),
        message: 'At least one digit',
        error: false
      },
    ]
  }
}