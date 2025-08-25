import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

export const SearchBar = ({ placeholderText }) => {

  const [query, setQuery] = useState("");
  const { setSearchResults } = useContext(SearchContext);
  const navigate = useNavigate();
  const deboundeRef = useRef(null);

  const searchMembers = async q => {
    if (!q.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/members/search/?q=${q}`);
      if (!response.ok) throw new Error("Error en la búsqueda");

      const results = await response.json();
      setSearchResults(results);
      navigate("/members");
    } catch (error) {
      console.log("Error", error);
      setSearchResults([]);
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);

    if (deboundeRef.current) clearTimeout(deboundeRef.current);
    deboundeRef.current = setTimeout(() => {
      searchMembers(value)
    }, 500);
  };

  const handleSubmit = e => {
    e.preventDefault();
    searchMembers(query);
  };

  return (
    <form
      className="navigation__search"
      onSubmit={handleSubmit}
    >
      <span className="navigation__search-icon material-symbols-outlined">search</span>
      <input
        className="navigation__search-input"
        type="search"
        id="search"
        placeholder={placeholderText ? placeholderText : "Buscar..."}
        value={query}
        onChange={handleChange}
      />
      <input type="submit" className="navigation__search-submit" value="Buscar" />
    </form>
  )
}
