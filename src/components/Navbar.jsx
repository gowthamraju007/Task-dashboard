import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Task Dashboard</span>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          All Tasks
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          Completed
        </NavLink>
      </div>
    </nav>
  );
}
