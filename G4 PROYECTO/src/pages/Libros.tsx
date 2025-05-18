import { useLibros } from '../hooks/useLibros';
import { postClient } from '../utils/fetchClient';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import type { Libro } from '../types/Libro';

export default function Libros() {
  const { data, loading, error } = useLibros();
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
    setLibros(data);
  }, [data]);

  const columns = [
    { header: 'Título', accessor: 'titulo' },
    { header: 'Autor', accessor: 'autor_nombre' },
    { header: 'ISBN', accessor: 'isbn' },
    { header: 'Publicación', accessor: 'fecha_publicacion' }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const libroData = {
      titulo: formData.get('titulo') as string,
      id_autor: formData.get('id_autor') as string,
      isbn: formData.get('isbn') as string,
      fecha_publicacion: formData.get('fecha_publicacion') as string
    };

    try {
      const nuevoLibro = await postClient<Libro>('libros', libroData);
      setLibros([...libros, nuevoLibro]);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error al crear libro:', error);
      alert('Error al crear libro');
    }
  };

  if (loading) return <div>Cargando libros...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Libros</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
        <input name="titulo" placeholder="Título" required />
        <input name="id_autor" placeholder="ID Autor" required />
        <input name="isbn" placeholder="ISBN" />
        <input name="fecha_publicacion" type="date" />
        <button type="submit">Agregar Libro</button>
      </form>

      <Table data={libros} columns={columns} filterField="titulo" />
    </div>
  );
}