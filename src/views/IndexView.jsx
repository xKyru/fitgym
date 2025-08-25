import { Card } from "../components/Card"
import './Index.scss';
import { MembersList } from "../components/MembersList";
import { useEffect, useState } from "react";

export const IndexView = () => {

  const [facets, setFacets] = useState({
    total: 0,
    inactivo: 0,
    activo: 0
  });

  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchFacets = async () => {
      try {
        const resFacets = await fetch(`${import.meta.env.VITE_API_URL}/members/search/facets`);
        const dataFacets = await resFacets.json();
        setFacets(dataFacets);

        const resRevenue = await fetch(`${import.meta.env.VITE_API_URL}/payments/revenue/total`);
        const dataRevenue = await resRevenue.json();
        setRevenue(dataRevenue);

      } catch (error) {
        console.log("Error fetching facets:", error);
      }
    }
    fetchFacets();
  }, []);

  return (



    <>
      <ul className="dashboard__cards">
        <Card
          title="Total Miembros"
          icon="group"
          quantity={facets.total}
          currency={false}
          description="+12% desde el mes pasado"
        ></Card>
        <Card
          title="Miembros Activos"
          icon="trending_up"
          quantity={facets.activo}
          currency={false}
          description="80.8% del total"
        ></Card>
        <Card
          title="Ingresos del Mes"
          icon="calendar_today"
          quantity={revenue}
          currency={true}
          description="+8% desde el mes pasado"
        ></Card>
        <Card
          title="Suscripciones Vencidas"
          icon="warning"
          quantity={facets.inactivo}
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