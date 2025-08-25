import { MembersList } from "../components/MembersList"
import './Members.scss'
import { Filter } from "../components/Filter"

const options = [
    {value: "all", label: "Todos los estados"},
    {value: "active", label: "Activo"},
    {value: "inactive", label: "Vencido"}
]

export const MembersView = () => {
    return (
        <>
            {/* <Filter
                SearchBarPlaceholder={"Buscar Miembros..."}
                options={options}
            ></Filter> */}
            <section className="section">
            <h2 className="section__title">Lista de miembros</h2>
            <h3 className="section__subtitle">Todos los miembros registrados en el gimnasio</h3>
            <MembersList
                viewMember={true}
                editMember={true}
                deleteMember={true}
            ></MembersList>
            </section>
        </>
    )
}
