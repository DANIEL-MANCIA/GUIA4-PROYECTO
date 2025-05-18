import { useEmpleados } from '../hooks/useEmpleados';
import { useClientes } from '../hooks/useClientes';
import StatsCard from '../components/StatsCard';
import { FaUserTie, FaUsers } from 'react-icons/fa';

export default function Dashboard() {
  const { data: empleados, loading: loadingEmpleados } = useEmpleados();
  const { data: clientes, loading: loadingClientes } = useClientes();

  const loading = loadingEmpleados || loadingClientes;

  return (
    <main style={{ padding: '2rem', backgroundColor: '#0e1117', color: '#fff' }}>
      <h2>Vista General</h2>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          {/* Totales */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <StatsCard title="Empleados" count={empleados.length} icon={<FaUserTie />} />
            <StatsCard title="Clientes" count={clientes.length} icon={<FaUsers />} />
          </div>

          {/* Últimos 5 empleados */}
          <h3 style={{ marginTop: '2rem' }}>Últimos empleados en Registrarse</h3>
          <ul>
            {empleados.slice(0, 5).map((e) => (
              <li key={e.id}>
                {e.nombre} – {e.cargo}
              </li>
            ))}
          </ul>

          {/* Últimos 5 clientes */}
          <h3 style={{ marginTop: '2rem' }}>Últimos clientes en Registrarse</h3>
          <ul>
            {clientes.slice(0, 5).map((c) => (
              <li key={c.id}>
                {c.nombre} – {c.email}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}