import { Button, Input, Typography } from '@material-tailwind/react'
import axios from 'axios'
import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading'

export default function NoticiasPostadas({ cargo }) {
    const [allnoticias, setAllnoticias]: any = useState()
    const [acessallnoticias, setAcessAllNoticias] = useState(true)
    const [buscar, setBuscar]: any = useState()
    useEffect(() => {
        async function allnoticias() {
            const apiallnoticias: any = await axios.get('https://landhabbo.vps-kinghost.net:3443/noticias/postadas')
            setAllnoticias(apiallnoticias.data)
        }
        allnoticias()
    }, [])

    async function removeNoticia() {
        const noticiafalse = axios.put('https://landhabbo.vps-kinghost.net:3443/noticia/postar/false')
        const apiallnoticias: any = await axios.get('https://landhabbo.vps-kinghost.net:3443/noticias/postadas')
        setAllnoticias(apiallnoticias.data)
    }


    if (!allnoticias) {
        return <Loading />
    }
    return (
        <div className="flex flex-col items-center">
            <Typography variant="h1"><div className="text-blue-500 text-center my-8">Noticias postadas</div></Typography>
            <div className="w-96 flex gap-3 mb-4">
                <Input onChange={(e) => setBuscar(e.target.value)} label="Buscar pelo titulo" icon={<MagnifyingGlass size={16} />} />
                <Button>Buscar</Button>
            </div>
            <table className="w-full border-separate border-spacing-2 border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-blue-600 text-blue-500">Titulo</th>
                        <th className="border border-blue-600 text-blue-500" >Quem postou</th>
                        <th className="border border-blue-600 text-blue-500">Remover noticia</th>
                    </tr>
                </thead>
                {acessallnoticias === true ? allnoticias.map((noticia) => {
                    return (
                        noticia.postada === 'postada' ? null :
                            <tr key={noticia.id}>
                                <th className="border border-gray-600">{noticia.titulo}</th>
                                <th className="border border-gray-600">{noticia.nick}</th>
                                <th className="border border-red-600"><Link to={`/painel/noticias-postadas/${noticia.id}`}>remover</Link></th>
                            </tr>
                    )
                }) : null}
                <tbody>
                </tbody>
            </table>
        </div>
    )
}
