import { string, object } from 'yup';

export const filterDashboardSchemas = object().shape({
  filter: string().min(1, 'Must be at least 1 characters').trim(),
});
