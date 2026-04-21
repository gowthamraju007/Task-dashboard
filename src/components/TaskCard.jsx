function isOverdue(dueDate, status) {
  if (status === 'Completed') return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

function badgeClass(status) {
  return status === 'Completed' ? 'badge badge-done'
    : status === 'In Progress' ? 'badge badge-progress'
    : 'badge badge-pending';
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-title">{task.title}</span>
        <div className="task-actions">
          <button className="btn btn-edit" title="Edit" onClick={() => onEdit(task)}>✎</button>
          <button className="btn btn-danger" title="Delete" onClick={() => onDelete(task.id)}>✕</button>
        </div>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-meta">
        <span className={badgeClass(task.status)}>{task.status}</span>
        <span className={`due${overdue ? ' due-overdue' : ''}`}>
          {overdue ? 'Overdue: ' : 'Due: '}{task.dueDate}
        </span>
      </div>
    </div>
  );
}
