export async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const error = new Error(response.statusText) as Error & {
      response: Response;
    };
    error.response = response;
    throw error;
  }

  return (await response.json()) as T;
}
