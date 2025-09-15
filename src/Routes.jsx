// Routes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import HomePage from './HomePage'; // ✔️

import MapView from './MapView'; // ⬅️ ajusta la ruta si es necesario
import BarScatter from './PlotlyBarScatter';
import LogoutButton from './LogoutButton'; // ⬅️ Falta


function Dashboard() {
  return <h2>Área protegida: Dashboard</h2>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* ✔️ Carga HomePage */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* RUTA PROTEGIDA */}
        <Route
  path="/mapa"
  element={
    <ProtectedRoute>
      <div className="AppContainer">
        <LogoutButton />
        <MapView />
        <BarScatter />
      </div>
    </ProtectedRoute>
  }
/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;