import { Route, Routes } from "react-router-dom";
import AdmUsuario from "./pages/AdmUsuario";
import CriarNoticias from "./pages/CriarNoticias";
import Home from "./pages/Home";
import ModerarNoticias from "./pages/ModerarNoticias";
import TodasNoticias from "./pages/TodasNoticias";

export default function RouterPeges({ user, cargo }: any) {
    return (
        <Routes>
            <Route path='/' element={<Home
                user={user}
            />} />
            <Route path='/adm/usuarios' element={<AdmUsuario cargo={cargo} />} />
            <Route path='/criar-noticia' element={<CriarNoticias cargo={cargo} />} />
            <Route path="/moderar-noticia" element={<TodasNoticias cargo={cargo} />} />
            <Route path="/moderar-noticia/:slug" element={<ModerarNoticias cargo={cargo} />} />
        </Routes>
    )
}
