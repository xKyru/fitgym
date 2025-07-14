import { Card } from "../components/Card"
import './Index.scss';
import { MembersList } from "../components/MembersList";

export const IndexView = () => {

  return (

    
    <>
      <ul className="dashboard__cards">
        <Card
          title="Total Miembros"
          icon="group"
          quantity={245}
          currency={false}
          description="+12% desde el mes pasado"
        ></Card>
        <Card
          title="Miembros Activos"
          icon="trending_up"
          quantity={198}
          currency={false}
          description="80.8% del total"
        ></Card>
        <Card
          title="Ingresos del Mes"
          icon="calendar_today"
          quantity={12450}
          currency={true}
          description="+8% desde el mes pasado"
        ></Card>
        <Card
          title="Suscripciones Vencidas"
          icon="warning"
          quantity={23}
          currency={false}
          description="Requieren atención"
        ></Card>
      </ul>

      <section className="miembros-recientes section">
        <h2 className="miembros-recientes__title section__title">Miembros Recientes</h2>
        <h3 className="miembros-recientes__subtitle section__subtitle">Últimos miembros registrados en el gimnasio</h3>
        <MembersList
          viewMember={true}
        ></MembersList>
      </section>

    </>
  )
}