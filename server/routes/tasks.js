import { Router } from 'express';
import { SAMPLE_TASKS } from '../data.js';

const router = Router();
let tasks = [...SAMPLE_TASKS];

const VALID_STATUSES = ['Pending', 'In Progress', 'Completed'];

function validateTask(body, { requireAll = false } = {}) {
  const errors = [];
  if (requireAll || body.title !== undefined) {
    if (!body.title?.trim()) errors.push('Title is required');
  }
  if (requireAll || body.dueDate !== undefined) {
    if (!body.dueDate) errors.push('Due date is required');
  }
  if (body.status !== undefined && !VALID_STATUSES.includes(body.status)) {
    errors.push('Invalid status');
  }
  return errors;
}

router.get('/', (_req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const errors = validateTask(req.body, { requireAll: true });
  if (errors.length) return res.status(400).json({ error: errors.join(', ') });

  const task = {
    id: Date.now(),
    title: req.body.title.trim(),
    description: req.body.description?.trim() || '',
    status: req.body.status || 'Pending',
    dueDate: req.body.dueDate,
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const errors = validateTask(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(', ') });

  tasks[idx] = {
    id,
    title: req.body.title?.trim() ?? tasks[idx].title,
    description: req.body.description?.trim() ?? tasks[idx].description,
    status: req.body.status ?? tasks[idx].status,
    dueDate: req.body.dueDate ?? tasks[idx].dueDate,
  };
  res.json(tasks[idx]);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = tasks.some(t => t.id === id);
  if (!exists) return res.status(404).json({ error: 'Task not found' });

  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

export default router;
