import { Link } from "react-router-dom"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: "home"
  },
  {
    title: "Miembros",
    url: "/members",
    icon: "group"
  },
  {
    title: "Nuevo miembro",
    url: "/member/new",
    icon: "group_add"
  },
  {
    title: "Pagos",
    url: "/payments",
    icon: "credit_card"
  },
]

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <span className="sidebar__logo-icon material-symbols-outlined">exercise</span>
          <div className="sidebar__logo-text">
            <h2 className="sidebar__logo-title">FitGym</h2>
            <h3 className="sidebar__logo-subtitle">Manager</h3>
          </div>
        </div>
      </div>

      <div className="sidebar__content">
        <ul className="sidebar__nav">
          {menuItems.map(item => (
            <li key={item.url} className="sidebar__nav-element">
              <Link
              className="sidebar__nav-link"
                to={item.url}
              >
                <span className="sidebar__nav-icon material-symbols-outlined">{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__footer">
          <p className="sidebar__footer-copyright">&copy; 2025 FitGym Manager</p>
      </div>
    </div>
  )
}

export default Sidebar