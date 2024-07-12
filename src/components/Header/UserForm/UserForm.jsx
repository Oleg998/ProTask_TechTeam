import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from './Input';
import UploadButton from './UploadButton';
import { updateProfileSchemas } from '../../../schemas/udpadeProfileSchemas';

import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/auth-selectors';

import styles from './UserForm.module.css';

const UserForm = ({ user, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      avatar: null,
      password: user?.password
    },
    criteriaMode: 'all',
    mode: 'onChange',
    resolver: yupResolver(updateProfileSchemas),
  });

  const currentTheme = useSelector(selectTheme);

  const themeClassMap = {
    dark: styles.theme_dark,
    light: styles.theme_light,
    violet: styles.theme_violet,
  };

  const modalTheme = themeClassMap[currentTheme] || '';

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className={`${styles.formWrapper} ${modalTheme}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
          <UploadButton
            user={user}
            onChange={(file) => {
              field.onChange(file);
            }}
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            placeholder="Name"
            {...field}
            defaultValue={user?.name}
            error={errors?.name?.message}
          />
        )}
      />
      
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            placeholder="Email"
            {...field}
            defaultValue={user?.email}
            error={errors?.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            type="password"
            placeholder="Password"
            {...field}
          />
        )}
      />

      <button className={styles.formButton} type="submit">
        Send
      </button>
    </form>
  );
};

export default UserForm;
