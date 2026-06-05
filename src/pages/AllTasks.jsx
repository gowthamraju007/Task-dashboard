import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../hooks/useDebounce';
import useTaskCardActions from '../hooks/useTaskCardActions';
import {
  createTask, editTask, removeTask,
  setFilterStatus, setSortDir, setSearch, setSortMode,
  selectFilteredTasks, selectCounts
} from '../store/tasksSlice';
import TaskCard from '../components/TaskCard';
import StatCard from '../components/StatCard';
import TaskActionModals from '../components/TaskActionModals';
import { STATS_CONFIG, STATUSES } from '../constants/taskConstants';


export default function AllTasks() {
  const dispatch = useDispatch();
  const { filterStatus, sortDir, search, sortMode } = useSelector(s => s.tasks);
  const tasks = useSelector(selectFilteredTasks());
  const counts = useSelector(selectCounts);
  const [searchText, setSearchText] = useState(search);
  const debouncedSearchText = useDebounce(searchText, 300);

  const onSaveTask = useCallback((form) => {
    if (form.id) dispatch(editTask(form));
    else dispatch(createTask(form));
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
    openAddTaskModal,
    openEditTaskModal,
  } = useTaskCardActions({ onSaveTask, onDeleteTask });

  const handleSearchChange = useCallback((e) => setSearchText(e.target.value), []);
  const handleFilterChange = useCallback((e) => dispatch(setFilterStatus(e.target.value)), [dispatch]);
  const handleSortChange = useCallback((e) => dispatch(setSortDir(e.target.value)), [dispatch]);
  const handleSortModeChange = useCallback((e) => dispatch(setSortMode(e.target.value)), [dispatch]);

  const summaryStats = useMemo(() => (
    STATS_CONFIG.map((stat) => ({
      ...stat,
      value: counts[stat.key],
    }))
  ), [counts]);

  const filterOptions = useMemo(() => ['All', ...STATUSES], []);

  useEffect(() => {
    setSearchText(search);
  }, [search]);

  useEffect(() => {
    if (debouncedSearchText !== search) {
      dispatch(setSearch(debouncedSearchText));
    }
  }, [debouncedSearchText, dispatch, search]);

  return (
    <div className="page">
      <div className="summary">
        {summaryStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      <div className="controls">
        <input
          placeholder="Search tasks..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <select value={filterStatus} onChange={handleFilterChange}>
          {filterOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={sortDir} onChange={handleSortChange}>
          <option value="asc">Due: earliest first</option>
          <option value="desc">Due: latest first</option>
        </select>

        <select value={sortMode} onChange={handleSortModeChange}>
          <option value="date">Sort by due date</option>
          <option value="alphabetical">Sort alphabetically</option>
        </select>
        <span className="spacer" />
        <button className="btn btn-primary" onClick={openAddTaskModal}>+ Add task</button>
      </div>

      {tasks.length === 0
        ? <div className="empty">No tasks match your filters.</div>
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
