import { useEmpleados } from '../hooks/useEmpleados';
import Table from '../components/Table';
import type { Empleado } from '../types/Empleado';
import { postClient, deleteClient, putClient, fetchClient } from '../utils/fetchClient';
import { useEffect, useState } from 'react';

export default function Empleados() {
  const { data, loading, error } = useEmpleados();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [editando, setEditando] = useState<Empleado | null>(null);

  useEffect(() => {
    setEmpleados(data);
  }, [data]);

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Cargo', accessor: 'cargo' },
    { header: 'Acciones', accessor: 'acciones' },
  ] as { header: string; accessor: keyof Empleado | 'acciones' }[];

  const handleAddEmpleado = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nombre = form.get('nombre')?.toString() ?? '';
    const cargo = form.get('cargo')?.toString() ?? '';

    try {
      await postClient<Empleado>('empleados', { nombre, cargo });

      const actualizados = await fetchClient<Empleado[]>('empleados');
      setEmpleados(actualizados);

      e.currentTarget.reset();
    } catch (err) {
      alert('Error al agregar empleado');
      console.error(err);
    }
  };

  const handleEditEmpleado = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editando) return;

    const form = new FormData(e.currentTarget);
    const nombre = form.get('nombre')?.toString() ?? '';
    const cargo = form.get('cargo')?.toString() ?? '';

    try {
      const actualizado = await putClient<Empleado>(`empleados/${editando.id}`, { nombre, cargo });
      setEmpleados(empleados.map((emp) => (emp.id === actualizado.id ? actualizado : emp)));
      setEditando(null);
    } catch (err) {
      alert('Error al actualizar empleado');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Empleados</h2>

      {/* FORMULARIO NUEVO */}
      <h3>Agregar nuevo empleado</h3>
      <form onSubmit={handleAddEmpleado} style={formStyle}>
        <input name="nombre" placeholder="Nombre" required style={inputStyle} />
        <input name="cargo" placeholder="Cargo" required style={inputStyle} />
        <button type="submit" style={submitButtonStyle}>Guardar empleado</button>
      </form>

      {/* FORMULARIO DE EDICIÓN */}
      {editando && (
        <form onSubmit={handleEditEmpleado} style={editFormStyle}>
          <h3>Editar empleado</h3>
          <input name="nombre" defaultValue={editando.nombre} required style={inputStyle} />
          <input name="cargo" defaultValue={editando.cargo} required style={inputStyle} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" style={saveButtonStyle}>Guardar cambios</button>
            <button type="button" onClick={() => setEditando(null)} style={cancelButtonStyle}>Cancelar</button>
          </div>
        </form>
      )}

      {/* TABLA */}
      <Table
        data={empleados}
        columns={columns}
        filterField="nombre"
        renderRow={(empleado: Empleado) => (
          <tr key={empleado.id}>
            <td>{empleado.id}</td>
            <td>{empleado.nombre}</td>
            <td>{empleado.cargo}</td>
            <td>
              <button onClick={() => setEditando(empleado)} style={editButtonStyle}>Editar</button>
              <button
                onClick={async () => {
                  const confirmar = confirm(`¿Eliminar a ${empleado.nombre}?`);
                  if (!confirmar) return;
                  try {
                    await deleteClient(`empleados/${empleado.id}`);
                    setEmpleados(empleados.filter((e) => e.id !== empleado.id));
                  } catch (err) {
                    alert('Error al eliminar empleado');
                  }
                }}
                style={deleteButtonStyle}
              >
                Eliminar
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}

const formStyle: React.CSSProperties = {
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
};

const editFormStyle: React.CSSProperties = {
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  background: '#161b22',
  padding: '1rem',
  borderRadius: '8px',
};

const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
};

const submitButtonStyle: React.CSSProperties = {
  padding: '0.6rem',
  backgroundColor: '#1abc9c',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: '#2ecc71',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
};

const editButtonStyle: React.CSSProperties = {
  marginRight: '0.5rem',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
};
