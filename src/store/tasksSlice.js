import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskApi from '../services/taskApi';

export const loadTasks = createAsyncThunk('tasks/load', () => taskApi.fetchTasks());
export const createTask = createAsyncThunk('tasks/create', (task) => taskApi.createTask(task));
export const editTask = createAsyncThunk('tasks/edit', (task) => taskApi.updateTaskApi(task));
export const removeTask = createAsyncThunk('tasks/remove', (id) => taskApi.deleteTaskApi(id));

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filterStatus: 'All',
    sortDir: 'asc',
    search: '',
    sortMode: 'date',
  },
  reducers: {
    setFilterStatus(state, action) {
      state.filterStatus = action.payload;
    },
    setSortDir(state, action) {
      state.sortDir = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSortMode(state, action) {
      state.sortMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.meta.arg);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setFilterStatus, setSortDir, setSearch, setSortMode } = tasksSlice.actions;

export const selectFilteredTasks = (statusOverride) => (state) => {
  const { items, filterStatus, sortDir, search, sortMode } = state.tasks;
  const activeStatus = statusOverride || filterStatus;

  let result = items.filter(t => {
    if (activeStatus !== 'All' && t.status !== activeStatus) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (sortMode === 'alphabetical') {
    return sortalphabetically(result, sortDir);
  }

  return [...result].sort((a, b) => {
    const diff = new Date(a.dueDate) - new Date(b.dueDate);
    return sortDir === 'asc' ? diff : -diff;
  });
};

export const sortalphabetically = (tasks, sortDir) => {
  return [...tasks].sort((a, b) => {
    return sortDir === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
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
