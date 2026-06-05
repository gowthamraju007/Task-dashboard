const BASE = import.meta.env.VITE_API_URL || '/api';

async function handleResponse(res) {
  if (res.ok) return res.status === 204 ? null : res.json();
  const body = await res.json().catch(() => ({}));
  throw new Error(body.error || `Request failed (${res.status})`);
}

export async function fetchTasks() {
  const res = await fetch(`${BASE}/tasks`);
  return handleResponse(res);
}

export async function createTask(task) {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
}

export async function updateTaskApi(task) {
  const res = await fetch(`${BASE}/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
}

export async function deleteTaskApi(id) {
  const res = await fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}
