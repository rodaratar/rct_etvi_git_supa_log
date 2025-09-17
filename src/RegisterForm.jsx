// RegisterForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from './supabaseClient'; // ✅ importa instancia compartida


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

    const onSubmit = async (data) => {
    const { error, data: result } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: 'https://rodaratar.github.io/rct_etvi_git_supa_log/#/login',
      },
    });

    if (error) {
      alert('Error al registrar: ' + error.message);
    } else {
      alert('Usuario registrado: ' + result.user.email);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: 'Email requerido' })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Contraseña"
        {...register('password', {
          required: 'Contraseña requerida',
          minLength: { value: 6, message: 'Mínimo 6 caracteres' },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
}