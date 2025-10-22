import { Outlet, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="layout">
      <header>
        <h1>UBT AI Teacher</h1>
        <nav>
          <NavLink to="/" end>Басты бет</NavLink>
          <NavLink to="/learn">Оқу</NavLink>
          <NavLink to="/practice">Жаттығу</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
