import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { loadTasks } from './store/tasksSlice';
import Navbar from './components/Navbar';
import AllTasks from './pages/AllTasks';
import CompletedTasks from './pages/CompletedTasks';
import './index.css';

function AppContent() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.tasks);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  if (loading) {
    return <div className="page"><div className="empty">Loading tasks...</div></div>;
  }

  if (error) {
    return (
      <div className="page">
        <div className="empty">Failed to load tasks: {error}. Make sure the API server is running.</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/completed" element={<CompletedTasks />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
