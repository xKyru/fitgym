import { Card } from "../components/Card";
import { PaymentsList } from "../components/PaymentsList";
import { Filter } from "../components/Filter";

export const PaymentsView = () => {

  const options = [
    {value: "all", label: "Todos los estados"},
    {value: "compleate", label: "Completado"},
    {value: "pending", label: "Pendiente"},
    {value: "failed", label: "Fallido"}
]

  return (
    <>
      <ul className="dashboard__cards">
        <Card
          title="Ingresos del Mes"
          icon="attach_money"
          quantity={12450}
          currency={true}
          description="+8% desde el mes pasado"
        ></Card>
        <Card
          title="Pagos Completados"
          icon="credit_card"
          quantity={198}
          currency={false}
          description="Este mes"
        ></Card>
        <Card
          title="Pagos Pendientes"
          icon="calendar_today"
          quantity={23}
          currency={false}
          description="Requieren seguimiento"
        ></Card>
        <Card
          title="Promedio por Pago"
          icon="trending_up"
          quantity={48.5}
          currency={true}
          description="+5% desde el mes pasado"
        ></Card>
      </ul>
      <Filter
        SearchBarPlaceholder={"Buscar Pagos..."}
        options={options}
      ></Filter>
      <section className="section">
        <h2 className="section__title">Historial de Pagos</h2>
        <h3 className="section__subtitle">Registro completo de todos los pagos realizados</h3>
        <PaymentsList
          viewMember={true}
        ></PaymentsList>
      </section>
    </>
  )
}
