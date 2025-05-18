import { useEffect, useState } from 'react';
import { fetchClient } from '../utils/fetchClient';

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

export function useClientes() {
  const [data, setData] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClient<Cliente[]>('clientes')
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
