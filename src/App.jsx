import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Index from './pages/Index'
import TaskList from './pages/TaskList'

const NavbarLink = ({ children, to }) => {
  const { pathname } = useLocation()

  const active = pathname === to

  return (
    <Link
      className={[
        'w-1/2 bg-blue-200 text-center uppercase',
        'hover:bg-blue-300',
        active ? 'font-bold border-b-black border-b-2' : ''
      ].join(' ')}
      to={to}
    >
      {children}
    </Link>
  )
}

export default function App() {
  return (
    <div>
      <div className='flex'>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/list">List of tasks</NavbarLink>
      </div>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/list' element={<TaskList />} />
      </Routes>
    </div>
  )
}