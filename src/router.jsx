import { BrowserRouter, Routes, Route } from "react-router-dom";
import {IndexView} from "./views/IndexView";
import Layout from "./layouts/Layout";
import { MembersView } from "./views/MembersView";
import { PaymentsView } from "./views/PaymentsView";
import { MemberNewView } from "./views/MemberNewView";
import { MemberView } from "./views/MemberView";
import { MemberEditView } from "./views/MemberEditView";



const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout 
                            headerTitle={"Dashboard"}
                            headerSubtitle={"Resumen General de tu gimnasio"}
                        />
                    }
                >
                    <Route index element={<IndexView />}></Route>
                </Route>
                <Route
                    path="/members"
                    element={
                        <Layout 
                            headerTitle={"Gestión de Miembros"}
                            headerSubtitle={"Administra todos los miembros del gimnasio"}
                            buttonIcon={"person_add"}
                            buttonText={"Nuevo Miembro"}
                            buttonLink={"/member/new"}
                        />
                    }
                >
                    <Route index element={<MembersView />}></Route>
                </Route>
                <Route
                    path="/member/:id"
                    element={
                        <Layout 
                            headerTitle={"Perfil del miembro"}
                            headerSubtitle={"Información detallada y historial del miembro"}
                            buttonIcon={"edit_square"}
                            buttonText={"Editar"}
                            buttonLink={(id) => `/member/${id}/edit`}                        
                        />
                    }
                >
                    <Route index element={<MemberView />}></Route>
                </Route>                
                <Route
                    path="/member/new"
                    element={
                        <Layout 
                            headerTitle={"Nuevo Miembro"}
                            headerSubtitle={"Registra un nuevo miembro en el gimnasio"}
                        />
                    }
                >
                    <Route index element={<MemberNewView />}></Route>
                </Route>
                <Route
                    path="/member/:id/edit"
                    element={
                        <Layout 
                            headerTitle={"Editar Miembro"}
                            headerSubtitle={"Editar información del miembro"}
                        />
                    }
                >
                    <Route index element={<MemberEditView />}></Route>
                </Route>
                <Route
                    path="/payments"
                    element={
                        <Layout 
                            headerTitle={"Gestión de Pagos"}
                            headerSubtitle={"Administra todos los pagos y suscripciones"}
                        />
                    }
                >
                    <Route index element={<PaymentsView />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter