import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LogoutButton() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Limpia el contexto
    navigate('/login');
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}
