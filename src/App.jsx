import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import AllTasks from './pages/AllTasks';
import CompletedTasks from './pages/CompletedTasks';
import './index.css';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  );
}
