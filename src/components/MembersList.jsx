import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export const MembersList = ({ viewMember, editMember, deleteMember }) => {

    const { searchResults, setSearchResults } = useContext(SearchContext);

    const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/members`);

    const { data: plans, loading: plansLoading, error: plansError } = useFetch(`${import.meta.env.VITE_API_URL}/plans`);

    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (searchResults !== null) {
            setMembers(searchResults);
        } else if (data) {
            setMembers(data);
        }
    }, [data, searchResults]);

    const handleDeleteButton = async id => {
        const confirmation = confirm("¿Realmente quieres borrar este registro?");
        if (confirmation) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/members/${id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar el miembro");
                }

                alert("El Miembro ha sido eliminado");

                setMembers(prev => prev.filter(member => member.id !== id));

            } catch (error) {
                alert("Hubo un error: " + error.message);
            }
        }
    };

    if (loading || plansLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (plansError) return <div>Error: {plansError}</div>;

    return (
        <>

            <table className="miembros-lista__table">
                <thead className="miembros-lista__table-thead">
                    <tr className="miembros-lista__table-tr">
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Plan</th>
                        <th>Estado</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="miembros-lista__table-tbody">
                    {members.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>No se encontraron resultados</td>
                        </tr>
                    ) : (
                        members?.map(({ id, nombre, email, planId, estado, fechaRegistro }) => (
                            <tr key={id} className="miembros-lista__table-tr">
                                <td>{nombre}</td>
                                <td>{email}</td>
                                <td>{plans[planId - 1].name || planId}</td>
                                <td className={`miembros-lista__table-plan miembros-lista__table-plan--${estado.toLowerCase()}`}><span>{estado}</span></td>
                                <td>{fechaRegistro}</td>
                                <td className="miembros-lista__table-actions">
                                    {viewMember &&
                                        <Link
                                            to={`/members/${id}`}
                                        >
                                            <span className="material-symbols-outlined">visibility</span>
                                        </Link>
                                    }
                                    {editMember &&
                                        <Link
                                            to={`/members/${id}/edit`}
                                        >
                                            <span className="material-symbols-outlined">edit_square</span>
                                        </Link>
                                    }
                                    {deleteMember &&
                                        <button
                                            type="button"
                                            className="action__delete"
                                            onClick={() => handleDeleteButton(id)}
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}
