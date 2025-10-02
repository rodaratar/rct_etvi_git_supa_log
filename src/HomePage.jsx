import RegisterForm from './RegisterForm'; 
import LoginForm from './LoginForm';

export default function HomePage() {
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



