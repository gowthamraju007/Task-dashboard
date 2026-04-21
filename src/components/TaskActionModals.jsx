import GenericModal from './GenericModal';
import TaskModal from './TaskModal';

export default function TaskActionModals({
  modalTask,
  deleteTaskId,
  onCloseTaskModal,
  onSaveTask,
  onCloseDeleteModal,
  onConfirmDelete,
}) {
  return (
    <>
      {modalTask !== null && (
        <GenericModal onClose={onCloseTaskModal}>
          <TaskModal task={modalTask} onSave={onSaveTask} onClose={onCloseTaskModal} embedded />
        </GenericModal>
      )}

      {deleteTaskId !== null && (
        <GenericModal onClose={onCloseDeleteModal}>
          <h2>Delete task</h2>
          <p>Are you sure you want to delete this task?</p>
          <div className="modal-actions">
            <button className="btn" onClick={onCloseDeleteModal}>Cancel</button>
            <button className="btn btn-danger" onClick={onConfirmDelete}>Delete</button>
          </div>
        </GenericModal>
      )}
    </>
  );
}
