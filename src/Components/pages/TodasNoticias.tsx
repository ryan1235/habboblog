import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";

export default function TodasNoticias({ cargo }) {
    const [noticias, setNoticias]: any = useState('')

    useEffect(() => {
        async function allnoticias() {
            const getnoticias = await axios.get("http://localhost:3333/noticias")
            setNoticias(getnoticias.data)
        }
        allnoticias()
    }, [])

    if (noticias === '') {
        return <Loading />
    }
    return (
        <div className="flex flex-col">
            <Typography variant="h1"><div className="text-blue-500 text-center my-8">Revisar Noticias</div></Typography>
            <table className="border-separate border-spacing-2 border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-blue-600 text-blue-500">Titulo</th>
                        <th className="border border-blue-600 text-blue-500" >Quem postou</th>
                        <th className="border border-blue-600 text-blue-500">Revisado</th>
                        <th className="border border-blue-600 text-blue-500">Reviar</th>
                    </tr>
                </thead>
                <tbody>
                    {noticias.map((noticia) => {
                        return (
                            <tr key={noticia.id}>
                                <th className="border border-gray-600">{noticia.titulo}</th>
                                <th className="border border-gray-600">{noticia.nick}</th>
                                <th className="border border-gray-600">{noticia.postada}</th>
                                <th className="border border-green-600"><Link to={`/painel/moderar-noticia/${noticia.slug}`}>Moderar</Link></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}
