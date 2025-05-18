const API_URL = import.meta.env.VITE_API_URL;

export async function fetchClient<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GET failed: ${response.status} - ${errorText}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error('GET: La respuesta del servidor no es un JSON válido.');
  }
}

export async function postClient<T>(endpoint: string, body: unknown): Promise<T> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();

  try {
    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(data.error || `POST failed: ${response.statusText}`);
    }
    return data;
  } catch {
    throw new Error(`POST failed: ${text}`);
  }
}

export async function deleteClient(endpoint: string): Promise<void> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DELETE failed: ${response.status} - ${errorText}`);
  }
}

export async function putClient<T>(endpoint: string, body: unknown): Promise<T> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PUT failed: ${response.status} - ${errorText}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error('PUT: La respuesta del servidor no es un JSON válido.');
  }
}
