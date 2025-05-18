import { useEffect, useState } from 'react';
import { fetchClient } from '../utils/fetchClient';
import type { Empleado } from '../types/Empleado';



export function useEmpleados() {
  const [data, setData] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClient<Empleado[]>('empleados')
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
