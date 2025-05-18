import { useAutores } from '../hooks/useAutores';
import { postClient } from '../utils/fetchClient';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import type { Autor } from '../types/Autor';

export default function Autores() {
  const { data, loading, error } = useAutores();
  const [autores, setAutores] = useState<Autor[]>([]);

  useEffect(() => {
    setAutores(data);
  }, [data]);

  const columns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Apellido', accessor: 'apellido' },
    { header: 'Nacionalidad', accessor: 'nacionalidad' },
    { header: 'Nacimiento', accessor: 'fecha_nacimiento' }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const autorData = {
      nombre: formData.get('nombre') as string,
      apellido: formData.get('apellido') as string,
      nacionalidad: formData.get('nacionalidad') as string,
      fecha_nacimiento: formData.get('fecha_nacimiento') as string
    };

    try {
      const nuevoAutor = await postClient<Autor>('autores', autorData);
      setAutores([...autores, nuevoAutor]);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error al crear autor:', error);
      alert('Error al crear autor');
    }
  };

  if (loading) return <div>Cargando autores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Autores</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
        <input name="nombre" placeholder="Nombre" required />
        <input name="apellido" placeholder="Apellido" required />
        <input name="nacionalidad" placeholder="Nacionalidad" />
        <input name="fecha_nacimiento" type="date" />
        <button type="submit">Agregar Autor</button>
      </form>

      <Table data={autores} columns={columns} filterField="nombre" />
    </div>
  );
}