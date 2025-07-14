import { SearchBar } from "./SearchBar";
import Select from "react-select";

export const Filter = ({SearchBarPlaceholder, options}) => {
    return (
        <div className="filters section">
            <h3 className="filters-title">Filtros</h3>
            <div className="filters-wrap">
                <SearchBar
                    placeholderText={SearchBarPlaceholder}
                ></SearchBar>
                <form className="filters-filters">
                    <Select
                        options={options}
                        defaultValue={options[0]}
                    />
                </form>
            </div>
        </div>
    )
}
