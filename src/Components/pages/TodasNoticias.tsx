import {
    Typography,
    Dialog,
    Button,
    DialogHeader,
    DialogBody,
    DialogFooter
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { Link, Navigate, useParams } from "react-router-dom";

export default function TodasNoticias({ cargo }) {
    const [noticias, setNoticias]: any = useState('')
    const [open, setOpen]: any = useState(false);
    const handleOpen = () => setOpen(!open);
    const { id } = useParams()
    useEffect(() => {
        async function allnoticias() {
            const getnoticias = await axios.get("http://ca-amd-b1.phosting.com.br:10174/noticias")
            setNoticias(getnoticias.data)
        }
        allnoticias()
    }, [])
    async function excluirnoticia() {
        const excluirnoticiaapi = await axios.put(`http://ca-amd-b1.phosting.com.br:10174/noticia/excluir/${id}`)
        window.location.reload()
    }
    if (noticias === '' || !cargo) {
        return <Loading />
    } else if (cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true) {
        return (
            <div className="flex flex-col">
                <Typography variant="h1"><div className="text-blue-500 text-center my-8">Revisar Noticias</div></Typography>
                <table className="border-separate border-spacing-2 border border-slate-500">
                    <thead>
                        <tr>
                            <th className="border border-blue-600 text-blue-500">Titulo</th>
                            <th className="border border-blue-600 text-blue-500" >Quem postou</th>
                            <th className="border border-blue-600 text-blue-500">moderar</th>
                            <th className="border border-blue-600 text-blue-500">excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticias.map((noticia) => {
                            return (
                                noticia.postada === 'postada' ? null :
                                    <tr key={noticia.id}>
                                        <th className="border border-gray-600">{noticia.titulo}</th>
                                        <th className="border border-gray-600">{noticia.nick}</th>
                                        <th className="border border-green-600"><Link to={`/painel/moderar-noticia/${noticia.slug}`}>Moderar</Link></th>
                                        <th className="border border-red-600"><Link onClick={(e) => { setOpen(!open) }} to={`/painel/moderar-noticia/excluir/${noticia.id}`}>excluir</Link></th>
                                    </tr>
                            )
                        })}
                    </tbody>
                    {id === null ? null :
                        <div>
                            <Dialog open={open} handler={handleOpen}>
                                <DialogHeader>Atenção.</DialogHeader>
                                <DialogBody divider>
                                    essa noticia será perdida para sempre, tem certeza que quer excluir?
                                </DialogBody>
                                <DialogFooter>
                                    <Link to={'/painel/moderar-noticia/'}>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={handleOpen}
                                            className="mr-1"
                                        >
                                            <span>Cancelar</span>
                                        </Button>
                                    </Link>
                                    <Button variant="gradient" color="green" onClick={handleOpen}>
                                        <Link onClick={excluirnoticia} to={'/painel/moderar-noticia/'}><span>Excluir</span></Link>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </div>
                    }
                </table>
            </div >
        )
    } else { return <Navigate to='/painel' /> }
}
