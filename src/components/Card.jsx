export const Card = ({title, icon, quantity, currency, description}) => {
  return (
    <li className="dashboard__card">
        <h3 className="dashboard__card-title">{title}</h3>
        <span className="dashboard__card-icon material-symbols-outlined">{icon}</span>
        <p className="dashboard__card-qty">{currency ? Intl.NumberFormat("en-EN", {style: "currency", currency: "USD"}).format(quantity) : quantity}</p>
        {description && <p className="dashboard__card-desc">{description}</p>}
    </li>
  )
}