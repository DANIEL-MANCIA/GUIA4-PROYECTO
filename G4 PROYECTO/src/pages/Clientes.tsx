import { useClientes } from '../hooks/useClientes';
import Table from '../components/Table';
import { postClient } from '../utils/fetchClient';
import { useEffect, useState } from 'react';
import type { Cliente } from '../types/Cliente';

export default function Clientes() {
  const { data, loading, error } = useClientes();
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    setClientes(data);
  }, [data]);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Email', accessor: 'email' }
  ] as { header: string; accessor: keyof Cliente }[];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nombre = form.get('nombre')?.toString().trim() ?? '';
    const email = form.get('email')?.toString().trim() ?? '';

    if (!nombre || !email) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const nuevo = await postClient<Cliente>('clientes', { nombre, email });
      setClientes([...clientes, nuevo]);
      e.currentTarget.reset();
    } catch (err) {
      alert('Error al agregar cliente');
      console.error(err); // 💡 Mostrar más info para depurar
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Clientes</h2>

      <h3 style={{ marginTop: '1rem' }}>Agregar nuevo cliente</h3>
      <form onSubmit={handleSubmit}
        style={{
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '400px',
        }}
      >
        <input
          name="nombre"
          placeholder="Nombre"
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          name="email"
          placeholder="Email"
          required
          type="email"
          style={{ padding: '0.5rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem',
            backgroundColor: '#1abc9c',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Guardar cliente
        </button>
      </form>

      <Table data={clientes} columns={columns} filterField="nombre" />
    </div>
  );
}
