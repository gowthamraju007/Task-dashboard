import { useCallback, useState } from 'react';

export default function useTaskCardActions({ onSaveTask, onDeleteTask }) {
  const [modalTask, setModalTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const closeTaskModal = useCallback(() => setModalTask(null), []);
  const closeDeleteModal = useCallback(() => setDeleteTaskId(null), []);
  const openAddTaskModal = useCallback(() => setModalTask({}), []);
  const openEditTaskModal = useCallback((task) => setModalTask(task), []);

  const handleSave = useCallback((form) => {
    onSaveTask(form);
    setModalTask(null);
  }, [onSaveTask]);

  const handleDelete = useCallback((id) => setDeleteTaskId(id), []);

  const confirmDelete = useCallback(() => {
    if (deleteTaskId) onDeleteTask(deleteTaskId);
    setDeleteTaskId(null);
  }, [deleteTaskId, onDeleteTask]);

  return {
    modalTask,
    deleteTaskId,
    handleSave,
    handleDelete,
    confirmDelete,
    closeTaskModal,
    closeDeleteModal,
    openAddTaskModal,
    openEditTaskModal,
  };
}
