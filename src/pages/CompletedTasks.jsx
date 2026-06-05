import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, removeTask, selectFilteredTasks } from '../store/tasksSlice';
import TaskCard from '../components/TaskCard';
import TaskActionModals from '../components/TaskActionModals';
import useTaskCardActions from '../hooks/useTaskCardActions';

export default function CompletedTasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks('Completed'));

  const onSaveTask = useCallback((form) => {
    dispatch(editTask(form));
  }, [dispatch]);

  const onDeleteTask = useCallback((id) => {
    dispatch(removeTask(id));
  }, [dispatch]);

  const {
    modalTask,
    deleteTaskId,
    handleSave,
    handleDelete,
    confirmDelete,
    closeTaskModal,
    closeDeleteModal,
    openEditTaskModal,
  } = useTaskCardActions({ onSaveTask, onDeleteTask });

  return (
    <div className="page">
      <div className="page-heading">
        <h2>Completed tasks</h2>
        <span className="count-badge">{tasks.length}</span>
      </div>

      {tasks.length === 0
        ? <div className="empty">No completed tasks yet.</div>
        : <div className="task-grid">
            {tasks.map(t => (
              <TaskCard key={t.id} task={t} onEdit={openEditTaskModal} onDelete={handleDelete} />
            ))}
          </div>
      }

      <TaskActionModals
        modalTask={modalTask}
        deleteTaskId={deleteTaskId}
        onCloseTaskModal={closeTaskModal}
        onSaveTask={handleSave}
        onCloseDeleteModal={closeDeleteModal}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
}
