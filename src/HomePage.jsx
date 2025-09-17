import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

import RegisterForm from './RegisterForm'; 
import LoginForm from './LoginForm';

export default function HomePage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (window.location.hash.includes('access_token')) {
        // Opcional: limpiar cualquier sesión previa
        await supabase.auth.getSession(); // solo para que Supabase inicialice su estado
        setUser(null); // Por si acaso había una sesión
        navigate('/login');
      }
    };

    handleAuthRedirect();
  }, [navigate, setUser]);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Bienvenido</h1>

      <div style={{ border: '2px solid blue', padding: '1rem', marginBottom: '2rem' }}>
        <h2>Iniciar Sesión</h2>
        <LoginForm />
      </div>

      <div style={{ border: '2px solid red', padding: '1rem' }}>
        <h2>Registrarse</h2>
        <RegisterForm />
      </div>
    </div>
  );
}




