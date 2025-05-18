import { useEffect, useState } from 'react';
import { fetchClient } from '../utils/fetchClient';
import type { Libro } from '../types/Libro';

export function useLibros() {
  const [data, setData] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const libros = await fetchClient<Libro[]>('libros');
        setData(libros);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, loading, error };
}