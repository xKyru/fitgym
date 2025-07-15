import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"

export const MembersList = ({viewMember, editMember, deleteMember}) => {

    const { data, loading, error } = useFetch('http://localhost:3001/members');
    const { data: plans, loading: plansLoading, error: plansError } = useFetch('http://localhost:3001/plans');

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
                    {data?.map(({ id, nombre, email, plan, estado, fechaRegistro }) => (
                        <tr key={id} className="miembros-lista__table-tr">
                            <td>{nombre}</td>
                            <td>{email}</td>
                            <td>{plans[plan-1].plan || plan}</td>
                            <td className={`miembros-lista__table-plan miembros-lista__table-plan--${estado.toLowerCase()}`}><span>{estado}</span></td>
                            <td>{fechaRegistro}</td>
                            <td className="miembros-lista__table-actions">
                                {viewMember && 
                                    <Link
                                        to={`/member/${id}`}
                                    >
                                        <span className="material-symbols-outlined">visibility</span>
                                    </Link> 
                                }
                                {editMember && 
                                    <Link
                                        to={`/member/${id}/edit`}
                                    >
                                        <span className="material-symbols-outlined">edit_square</span>
                                    </Link> 
                                }
                                {deleteMember && 
                                    <Link
                                        to={`/member/${id}/delete`}
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </Link> 
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
