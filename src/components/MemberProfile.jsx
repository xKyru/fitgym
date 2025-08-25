import useFetch from "../hooks/useFetch"

export const MemberProfile = ({
  member: {
    nombre,
    email,
    telefono,
    direccion,
    nacimiento,
    emergenciaNombre,
    emergenciaNumero,
    planId,
    estado,
    fechaRegistro,
    ultimoPago,
    siguientePago
  }
}) => {
  const { data: plans, loading: plansLoading, error: plansError } = useFetch(`${import.meta.env.VITE_API_URL}/plans`);
 

  if (plansLoading) return <div>Cargando...</div>;
  if (plansError) return <div>Error: {plansError.message}</div>;
  return (
    <>
      <div className="profile">
        <div className="profile__personal">
          <h2>Información Personal</h2>
          <div className="profile__personal-card">
            <div className="profile__personal-profile">
              <img className="profile__personal-image" src={'/src/assets/img/profile.png'} />
              <div className="profile__personal-name">
                {nombre}
              </div>
              <div className={`profile__personal-status profile__personal-status--${estado.toLowerCase()}`}>
                <span>
                  {estado}
                </span>
              </div>
            </div>
            <div className="profile__personal-info">
              <div className="profile__personal-group">
                <div className="profile__personal-icon">
                  <span className="material-symbols-outlined">
                    mail
                  </span>
                </div>
                <div className="profile__personal-data">
                  {email}
                </div>
              </div>
              <div className="profile__personal-group">
                <div className="profile__personal-icon">
                  <span className="material-symbols-outlined">
                    call
                  </span>
                </div>
                <div className="profile__personal-data">
                  {telefono}
                </div>
              </div>
              <div className="profile__personal-group">
                <div className="profile__personal-icon">
                  <span className="material-symbols-outlined">
                    location_on
                  </span>
                </div>
                <div className="profile__personal-data">
                  {direccion}
                </div>
              </div>
              <div className="profile__personal-group">
                <div className="profile__personal-icon">
                  <span className="material-symbols-outlined">
                    calendar_today
                  </span>
                </div>
                <div className="profile__personal-data">
                  Nacimiento: {nacimiento}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile__suscription">
          <h2>Información de Suscripción</h2>
          <div className="profile__suscription-groups">


            <div className="profile__suscription-group">
              <h3 className="profile__suscription-title">
                Plan Actual
              </h3>
              <p className="profile__suscription-content">
                {plans[planId - 1].name || planId}
              </p>
            </div>
            <div className="profile__suscription-group">
              <h3 className="profile__suscription-title">
                Último Pago
              </h3>
              <p className="profile__suscription-content">
                {ultimoPago}
              </p>
            </div>
            <div className="profile__suscription-group">
              <h3 className="profile__suscription-title">
                Contacto de Emergencia
              </h3>
              <p className="profile__suscription-content">
                {`${emergenciaNombre} - ${emergenciaNumero}`}
              </p>
            </div>
            <div className="profile__suscription-group">
              <h3 className="profile__suscription-title">
                Fecha de Registro
              </h3>
              <p className="profile__suscription-content">
                {fechaRegistro}
              </p>
            </div>
            <div className="profile__suscription-group">
              <h3 className="profile__suscription-title">
                Próximo Pago
              </h3>
              <p className="profile__suscription-content">
                {siguientePago}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section__title">Historial de Pagos</h2>
        <h3 className="section__subtitle">Registro completo de todos los pagos realizados</h3>
      </div>
    </>
  )
}
