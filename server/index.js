import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
