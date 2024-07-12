import { string, object } from 'yup';

export const updateProfileSchemas = object().shape({
  name: string().optional().min(3, 'Name must be at least 3 characters'),
  email: string().optional().email('Email is invalid'),
  password: string().optional().min(6, 'Password must be at least 6 characters'),
});
