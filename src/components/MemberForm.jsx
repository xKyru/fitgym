import Select from "react-select";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const MemberForm = ({ mode }) => {

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        nacimiento: '',
        emergenciaNombre: '',
        emergenciaNumero: '',
        imagenPerfil: '',
        plan: '',
        estado: '',
        fechaRegistro: '',
        ultimoPago: '',
        siguientePago: ''
    })

    const options = [
        { value: "1", label: "Básico" },
        { value: "2", label: "Premium" },
        { value: "3", label: "Familiar" }
    ]

    const memberId = useParams().id || null;
    const { data: members, loading: membersLoading, error: membersError } = useFetch('http://localhost:3001/members');

    const findMemberById = id => {
        if (!members || !Array.isArray(members)) return null;
        return members.find(member => String(member.id) === String(id));
    }

    const member = mode === "edit" ? findMemberById(memberId) : null;

    useEffect(() => {
        if (mode === 'edit' && member) {
            console.log(member);
            
            setFormData({
                nombre: member.nombre,
                email: member.email,
                telefono: member.telefono,
                direccion: member.direccion,
                nacimiento: member.nacimiento,
                emergenciaNombre: member.emergenciaNombre,
                emergenciaNumero: member.emergenciaNumero,
                imagenPerfil: member.imagenPerfil,
                plan: member.plan,
                estado: member.estado,
                fechaRegistro: member.fechaRegistro,
                ultimoPago: member.ultimoPago,
                siguientePago: member.siguientePago
            })
        }
    }, [member]);

    if(mode == "edit"){
        if (membersLoading) return <div>Cargando...</div>;
        if (membersError) return <div>Error: {membersError.message}</div>;
    }


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            plan: selectedOption.value
        }));
    }

    return (
        <>
            <section className="section">
                <h2 className="section__title">Información Personal</h2>
                <h3 className="section__subtitle">Datos básicos del miembro</h3>
                <form action="" className="form form-personal">
                    <div className="form__group">
                        <label htmlFor="name" className="form__field-label">Nombre Completo</label>
                        <input
                            id="name"
                            className="form__field-input"
                            placeholder="Ej. Ana García López"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="number" className="form__field-label">Teléfono</label>
                        <input
                            id="number"
                            className="form__field-input"
                            placeholder="4491234567"
                            value={formData.telefono}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="address" className="form__field-label">Dirección</label>
                        <input
                            id="address"
                            className="form__field-input"
                            placeholder="Calle Principal 123, Col. Centro"
                            value={formData.direccion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="email" className="form__field-label">Email</label>
                        <input
                            id="email"
                            className="form__field-input" type="email"
                            placeholder="ana@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="born-date" className="form__field-label">Fecha de Nacimiento</label>
                        <input
                            id="born-date"
                            className="form__field-input"
                            type="date"
                            value={formData.nacimiento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <fieldset className="form__group">
                        <legend>Contacto de Emergencia</legend>
                        <div className="form__subgroup">
                            <label htmlFor="emergency-name" className="form__field-label">Nombre</label>
                            <input
                                id="emergency-name"
                                className="form__field-input"
                                placeholder="Ej. Javier García"
                                value={formData.emergenciaNombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form__subgroup">
                            <label htmlFor="emergency-number" className="form__field-label">Teléfono</label>
                            <input
                                id="emergency-number"
                                className="form__field-input"
                                placeholder="4491234567"
                                value={formData.emergenciaNumero}
                                onChange={handleInputChange}
                            />
                        </div>
                    </fieldset>
                </form>
            </section>
            <section className="section">
                <h2 className="section__title">Plan de Membresía</h2>
                <h3 className="section__subtitle">Selecciona el plan de suscripción</h3>
                <form action="" className="form form-membership">
                    <div className="form__group">
                        <label htmlFor="plan" className="form__field-label">Plan</label>
                        <Select
                            className="form__field-input"
                            options={options}
                            defaultValue={options[0]}
                            value={options.find(opt => opt.value == formData.plan)}
                            onChange={handleSelectChange}
                        />
                    </div>
                </form>
            </section>
            <div className="buttons">
                <button className="buttons__button-send">
                    <span className="material-symbols-outlined buttons__button-icon">
                        save
                    </span>
                    Guardar Miembro
                </button>
                <button className="buttons__button-cancel">
                    Cancelar
                </button>
            </div>
        </>

    )
}
