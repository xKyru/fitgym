import { MemberProfile } from "../components/MemberProfile";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

export const MemberView = () => {

  const { id } = useParams();
  const { data, loading, error } = useFetch(`http://localhost:3001/members/${id}`);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <MemberProfile
      member={data}
    />
  )
}