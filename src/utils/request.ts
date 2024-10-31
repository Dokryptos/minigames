import { apiUrl } from '../utils/env';

const request = async <D>(
  url: string,
  options: RequestInit & { data?: Record<string, unknown>; params?: Record<string, string> } = {}
) => {
  const token = localStorage.getItem('token');

  const searchParams = new URLSearchParams(options.params || {});
  const query = searchParams.toString() && `?${searchParams.toString()}`;

  const response = await fetch(`${apiUrl}${url}${query}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...(options.data && { body: JSON.stringify(options.data) }),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<D>;
};

export default request;
