import { Routes, Route } from "react-router-dom";
import Painel from "./pages/Painel";
import PainelLogin from "./pages/PainelLogin";
import PassorwdRedefine from "./pages/PassorwdRedefine";
import Register from "./pages/Register";


export default function Router() {
    return (
        <Routes>
            <Route path='/painel/*' element={<Painel />} />
            <Route path="/painel/login" element={<PainelLogin />} />
            <Route path="/redefinir-email" element={<PassorwdRedefine />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
