import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a2634', color: '#e0e7f0' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          backgroundColor: '#15202b',
          color: '#e0e7f0',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ color: '#4fd1c5', marginBottom: '2rem' }}>Admin Panel</h2>

        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            marginBottom: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '0.5rem 0',
            borderLeft: isActive ? '4px solid #4fd1c5' : '4px solid transparent',
          })}
        >
          Inicio
        </NavLink>

        <NavLink
          to="/empleados"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            marginBottom: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '0.5rem 0',
            borderLeft: isActive ? '4px solid #4fd1c5' : '4px solid transparent',
          })}
        >
          Empleados
        </NavLink>

        <NavLink
          to="/clientes"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            marginBottom: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '0.5rem 0',
            borderLeft: isActive ? '4px solid #4fd1c5' : '4px solid transparent',
          })}
        >
          Clientes
        </NavLink>

        <NavLink
          to="/libros"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            marginBottom: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '0.5rem 0',
            borderLeft: isActive ? '4px solid #4fd1c5' : '4px solid transparent',
          })}
        >
          Libros
        </NavLink>

        <NavLink
          to="/autores"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            marginBottom: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '0.5rem 0',
            borderLeft: isActive ? '4px solid #4fd1c5' : '4px solid transparent',
          })}
        >
          Autores
        </NavLink>

        <button
          onClick={logout}
          style={{
            marginTop: 'auto',
            backgroundColor: '#4fd1c5',
            color: '#1a2634',
            border: 'none',
            padding: '0.6rem 1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '6px',
          }}
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}