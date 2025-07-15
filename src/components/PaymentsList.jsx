import useFetch from "../hooks/useFetch"

export const PaymentsList = () => {

    const { data: payment, loading: paymentsLoading, error: paymentsError } = useFetch('http://localhost:3001/payments');
    const { data: members, loading: membersLoading, error: membersError } = useFetch('http://localhost:3001/members');
    const { data: plans, loading: plansLoading, error: plansError } = useFetch('http://localhost:3001/plans');

    if (paymentsLoading || membersLoading || plansLoading) return <div>Cargando...</div>;
    if (paymentsError) return <div>Error: {paymentsError}</div>;
    if (membersError) return <div>Error: {membersError}</div>;
    if (plansError) return <div>Error: {plansError}</div>;

    const findMemberById = id => {
        if(!members || !Array.isArray(members)) return null;

        return members.find(member => String(member.id) === String(id));
    }

    return (
        <>
           
            <table className="pagos-lista__table">
                <thead className="pagos-lista__table-thead">
                    <tr className="pagos-lista__table-tr">
                        <th>Miembro</th>
                        <th>Plan</th>
                        <th>Monto</th>
                        <th>Método</th>
                        <th>Fecha de Pago</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody className="pagos-lista__table-tbody">
                    {payment?.map(({ id, memberId, amount, method, status, date, invoiceNumber }) => {

                        const member = findMemberById(memberId);     
                        
                        
                        const {nombre, plan} = member;
                        
                        return(
                    
                        <tr key={id} className="pagos-lista__table-tr">
                            <td>{nombre}</td>
                            <td>{plans[plan-1].plan || plan}</td>
                            <td>{Intl.NumberFormat("en-EN", {style: "currency", currency: "USD"}).format(amount)}</td>
                            <td><span>{method}</span></td>
                            <td>{date}</td>
                            <td className={`pagos-lista__table-plan pagos-lista__table-plan--${status.toLowerCase()}`}> <span>{status}</span> </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}
