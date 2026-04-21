import { useState } from 'react';

const STATUSES = ['Pending', 'In Progress', 'Completed'];

export default function TaskModal({ task, onSave, onClose, embedded = false }) {
  const isEdit = !!task?.id;
  const [form, setForm] = useState(task || { title: '', description: '', status: 'Pending', dueDate: '' });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.dueDate) e.dueDate = 'Due date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => { if (validate()) onSave(form); };

  const content = (
    <>
      <h2>{isEdit ? 'Edit task' : 'New task'}</h2>

      <div className="field">
        <label>Title *</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Task title" />
        {errors.title && <div className="field-error">{errors.title}</div>}
      </div>

      <div className="field">
        <label>Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Optional description" />
      </div>

      <div className="field">
        <label>Status</label>
        <select value={form.status} onChange={e => set('status', e.target.value)}>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="field">
        <label>Due date *</label>
        <input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
        {errors.dueDate && <div className="field-error">{errors.dueDate}</div>}
      </div>

      <div className="modal-actions">
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={submit}>{isEdit ? 'Save changes' : 'Add task'}</button>
      </div>
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="overlay" onClick={e => { if (e.target.className === 'overlay') onClose(); }}>
      <div className="modal">
        {content}
      </div>
    </div>
  );
}
