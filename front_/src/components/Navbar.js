import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const navigate = useNavigate()

  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">
            <span className="material-symbols-outlined icon">home</span>
            <p className="title">Home</p>
          </NavLink>
        </li>
        {user && <div>
          <li>
            <NavLink to="/tasks" end>
              <span className="material-symbols-outlined icon">checklist</span>
              <p className="title">Tasks</p>
              {/* {tasks && <p className="tasks-length">{tasks.length}</p>} */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" end>
              <span className="material-symbols-outlined icon">person</span>
              <p className="title">{user.name}</p>
            </NavLink>
          </li>
          <li>
            <div className="logout" onClick={handleClick}>
              <span className="material-symbols-outlined icon">logout</span>
              <p className="title">Log Out</p>
            </div>
          </li>
        </div>}
        {!user && <div>
          <li>
            <NavLink to="/login" end>
              <span className="material-symbols-outlined icon">login</span>
              <p className="title">Log In</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" end>
              <span className="material-symbols-outlined icon">person_add</span>
              <p className="title">Sign Up</p>
            </NavLink>
          </li>
        </div>}
        <li>
          <NavLink to="/404-test" end>
            <span className="material-symbols-outlined icon">error</span>
            <p className="title">404</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar