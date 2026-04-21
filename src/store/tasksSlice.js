import { createSlice } from '@reduxjs/toolkit';

const SAMPLE_TASKS = [
  { id: 1, title: 'Design system audit', description: 'Review all UI components for consistency.', status: 'Completed', dueDate: '2025-04-10' },
  { id: 2, title: 'Fix login page bug', description: 'Users are unable to reset password on mobile.', status: 'In Progress', dueDate: '2025-04-22' },
  { id: 3, title: 'Write unit tests', description: 'Cover the auth module with at least 80% coverage.', status: 'Pending', dueDate: '2025-04-30' },
  { id: 4, title: 'Deploy staging build', description: 'Push the latest changes to the staging server.', status: 'Pending', dueDate: '2025-04-25' },
  { id: 5, title: 'Code review PR #42', description: "Review the pull request for the dashboard feature.", status: 'In Progress', dueDate: '2025-04-21' },
];

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('tm_tasks');
    return saved ? JSON.parse(saved) : SAMPLE_TASKS;
  } catch {
    return SAMPLE_TASKS;
  }
}

function saveToStorage(tasks) {
  try {
    localStorage.setItem('tm_tasks', JSON.stringify(tasks));
  } catch {}
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: loadFromStorage(),
    filterStatus: 'All',
    sortDir: 'asc',
    search: '',
  },
  reducers: {
    addTask(state, action) {
      const newTask = { ...action.payload, id: Date.now() };
      state.items.push(newTask);
      saveToStorage(state.items);
    },
    updateTask(state, action) {
      const idx = state.items.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      saveToStorage(state.items);
    },
    deleteTask(state, action) {
      state.items = state.items.filter(t => t.id !== action.payload);
      saveToStorage(state.items);
    },
    setFilterStatus(state, action) {
      state.filterStatus = action.payload;
    },
    setSortDir(state, action) {
      state.sortDir = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilterStatus, setSortDir, setSearch } = tasksSlice.actions;

// Selectors
export const selectFilteredTasks = (statusOverride) => (state) => {
  const { items, filterStatus, sortDir, search } = state.tasks;
  const activeStatus = statusOverride || filterStatus;

  let result = items.filter(t => {
    if (activeStatus !== 'All' && t.status !== activeStatus) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return [...result].sort((a, b) => {
    const diff = new Date(a.dueDate) - new Date(b.dueDate);
    return sortDir === 'asc' ? diff : -diff;
  });
};

export const selectCounts = (state) => {
  const items = state.tasks.items;
  return {
    All: items.length,
    Pending: items.filter(t => t.status === 'Pending').length,
    'In Progress': items.filter(t => t.status === 'In Progress').length,
    Completed: items.filter(t => t.status === 'Completed').length,
  };
};

export default tasksSlice.reducer;
