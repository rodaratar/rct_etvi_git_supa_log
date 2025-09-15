// LoginForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // <-- Importa aquí correctamente

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();              // ✅ Hook de navegación
  const { setUser } = useAuth();               // ✅ AHORA sí dentro del componente

  const onSubmit = async (data) => {
    const { error, data: sessionData } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Bienvenido ' + sessionData.user.email);

      // Actualizar el contexto manualmente por seguridad
      setUser(sessionData?.user || null);

      // Redirigir al mapa
      navigate('/mapa');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: 'El email es obligatorio' })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Contraseña"
        {...register('password', { required: 'La contraseña es obligatoria' })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
