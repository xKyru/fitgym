import { SearchBar } from "./SearchBar"

const Navigation = () => {
  return (
    <header className="navigation">
        <div className="navigation__toggle">
            <a href="#" className="navigation__toggle-link">
                <span className="navigation__toggle-icon material-symbols-outlined">dock_to_right</span>
            </a>
        </div>
        <SearchBar></SearchBar>
        <div className="navigation__icons">
            <a href="#" className="navigation__icons-link material-symbols-outlined">
                <span className="navigation__icons-icon material-symbols-outlined">person</span>
            </a>
        </div>
    </header>
  )
}

export default Navigation