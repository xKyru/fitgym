export const SearchBar = ({placeholderText}) => {
  return (
    <form className="navigation__search">
        <span className="navigation__search-icon material-symbols-outlined">search</span>
        <input className="navigation__search-input" type="search" id="search" placeholder={placeholderText ? placeholderText : "Buscar..."} />
    </form>
  )
}
