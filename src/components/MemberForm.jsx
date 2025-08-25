import Select from "react-select";
import useFetch from "../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const MemberForm = ({ mode }) => {

    const navigate = useNavigate();

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
    const { data: members, loading: membersLoading, error: membersError } = useFetch(`${import.meta.env.VITE_API_URL}/members`);

    const findMemberById = id => {
        if (!members || !Array.isArray(members)) return null;
        return members.find(member => String(member.id) === String(id));
    }

    const member = mode === "edit" ? findMemberById(memberId) : null;

    useEffect(() => {
        if (mode === 'edit' && member) {

            setFormData({
                nombre: member.nombre,
                email: member.email,
                telefono: member.telefono,
                direccion: member.direccion,
                nacimiento: member.nacimiento,
                emergenciaNombre: member.emergenciaNombre,
                emergenciaNumero: member.emergenciaNumero,
                imagenPerfil: member.imagenPerfil,
                planId: member.planId,
                estado: member.estado,
                fechaRegistro: member.fechaRegistro,
                ultimoPago: member.ultimoPago,
                siguientePago: member.siguientePago
            })
        }
    }, [member]);

    if (mode == "edit") {
        if (membersLoading) return <div>Cargando...</div>;
        if (membersError) return <div>Error: {membersError.message}</div>;
    }

    const validateForm = () => {
        const errors = {};
        if (!formData.nombre.trim()) errors.nombre = "El nombre es obligatorio";
        if (!formData.email.trim()) errors.email = "El email es obligatorio";
        if (!formData.telefono.trim()) errors.nombre = "El teléfono es obligatorio";
        if (!formData.direccion.trim()) errors.nombre = "La dirección es obligatoria";
        if (!formData.nacimiento.trim()) errors.nombre = "La fecha de nacimiento es obligatoria";
        if (!formData.emergenciaNombre.trim()) errors.nombre = "El contacto de emergencia es obligatorio";
        if (!formData.emergenciaNumero.trim()) errors.nombre = "El número de emergencia es obligatorio";
        return errors;
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            planId: selectedOption.value
        }));

    }

    const handleSaveClick = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            alert(Object.values(errors).join("\n"));
            return;
        }

        try {
            const url = mode === "edit"
                ? `${import.meta.env.VITE_API_URL}/members/${memberId}`
                : `${import.meta.env.VITE_API_URL}/members`;

            const method = mode === "edit" ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error al guardar miembro");
            }

            const savedMember = await response.json();

            alert(mode === "edit" ? "Miembro actualizado correctamente" : "Miembro guardado correctamente");

            navigate(`/members/${savedMember.id}`);

        } catch (error) {
            alert("Hubo un error: " + error.message);
        }

    }


    const handleCancelClick = () => {
        if (mode === "edit") {
            navigate(`/members/${memberId}`);
        } else {
            navigate("/");
        }
    }

    const handleDeleteButton = async () => {
        const confirmation = confirm("¿Realmente quieres borrar este registro?");
        if (confirmation) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/members/${memberId}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar el miembro");
                }

                alert("El Miembro ha sido eliminado");

                navigate("/");

            } catch (error) {
                alert("Hubo un error: " + error.message);
            }
        }

    }

    return (
        <>
            <section className="section">
                <h2 className="section__title">Información Personal</h2>
                <h3 className="section__subtitle">Datos básicos del miembro</h3>
                <form action="" className="form form-personal">
                    <div className="form__group">
                        <label htmlFor="name" className="form__field-label">Nombre Completo*</label>
                        <input
                            name="nombre"
                            id="name"
                            className="form__field-input"
                            placeholder="Ej. Ana García López"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="number" className="form__field-label">Teléfono*</label>
                        <input
                            name="telefono"
                            id="number"
                            className="form__field-input"
                            placeholder="4491234567"
                            value={formData.telefono}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="address" className="form__field-label">Dirección*</label>
                        <input
                            name="direccion"
                            id="address"
                            className="form__field-input"
                            placeholder="Calle Principal 123, Col. Centro"
                            value={formData.direccion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="email" className="form__field-label">Email*</label>
                        <input
                            name="email"
                            id="email"
                            className="form__field-input" type="email"
                            placeholder="ana@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="born-date" className="form__field-label">Fecha de Nacimiento*</label>
                        <input
                            name="nacimiento"
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
                            <label htmlFor="emergency-name" className="form__field-label">Nombre*</label>
                            <input
                                name="emergenciaNombre"
                                id="emergency-name"
                                className="form__field-input"
                                placeholder="Ej. Javier García"
                                value={formData.emergenciaNombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form__subgroup">
                            <label htmlFor="emergency-number" className="form__field-label">Teléfono*</label>
                            <input
                                name="emergenciaNumero"
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
                            value={options.find(opt => opt.value == formData.planId)}
                            onChange={handleSelectChange}
                        />
                    </div>
                </form>
            </section>
            <div className="buttons">
                <button
                    className="buttons__button-send"
                    type="button"
                    onClick={handleSaveClick}
                >
                    <span className="material-symbols-outlined buttons__button-icon">
                        save
                    </span>
                    Guardar Miembro
                </button>
                <button
                    className="buttons__button-cancel"
                    type="button"
                    onClick={handleCancelClick}
                >
                    Cancelar
                </button>
                {mode === "edit" && (
                    <button
                        className="buttons__button-delete"
                        type="button"
                        onClick={handleDeleteButton}
                    >
                        Borrar miembro
                    </button>
                )}
            </div>
        </>

    )
}
