# Task Dashboard

A modern task management dashboard built with React, Redux Toolkit, and Vite.  
This app helps users create, edit, filter, search, and track task status with a clean, responsive UI.

## Live Demo

- Production: [task-dashboard-ten-iota.vercel.app](https://task-dashboard-ten-iota.vercel.app)

## Repository

- GitHub: [gowthamraju007/Task-dashboard](https://github.com/gowthamraju007/Task-dashboard)

## Features

- Add, edit, and delete tasks
- Task status workflow: `Pending`, `In Progress`, `Completed`
- Due date tracking with overdue indication
- Search tasks by title
- Filter tasks by status
- Sort tasks by due date (earliest/latest)
- Separate completed tasks view
- Summary cards for task counts by status
- Persistent data using `localStorage`

## Tech Stack

- React 19
- Redux Toolkit + React Redux
- React Router
- Vite
- ESLint

## Project Structure

```text
src/
  components/       # UI components (cards, modals, navbar, stats)
  constants/        # Shared constants
  hooks/            # Custom hooks (debounce, task action handlers)
  pages/            # Route-level screens
  store/            # Redux slice + selectors + store config
  App.jsx           # App root with routing and provider
  main.jsx          # Entry point
```

## Custom Hooks and Optimizations

- `useDebounce`: avoids dispatching search updates on every keystroke
- `useTaskCardActions`: reuses modal/delete state logic across pages
- `useMemo`, `useCallback`, and `React.memo`: reduce unnecessary rerenders
- Redux selectors: centralize and simplify filtered/derived task data

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment

This project is deployment-ready for platforms like Vercel and Netlify.

For Vercel:
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

## Future Enhancements

- Drag-and-drop task ordering
- Priority levels and tags
- Authentication and multi-user support
- Backend API integration
- Dark mode toggle

## Author

Developed by **Gowtham Raju**.
