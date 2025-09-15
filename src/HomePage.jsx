import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function HomePage() {
  return (
    <div>
      <h1>Página principal</h1>

      <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
        <div style={{ border: '2px solid red', padding: '1rem' }}>
          <h2>Registrarse</h2>
          <RegisterForm />
        </div>

        <div style={{ border: '2px solid blue', padding: '1rem' }}>
          <h2>Iniciar Sesión</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
