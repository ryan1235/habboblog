import { Button, Input, Option, Select, Typography } from '@material-tailwind/react'
import axios from 'axios'
import JoditEditor from 'jodit-react'
import { useEffect, useState, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Loading from '../Loading'

export default function ModerarNoticias({ cargo }) {
    const { slugs }: any = useParams()
    const [noticia, setNoticia]: any = useState('')
    const [togle, setTogle] = useState(false)
    const [titulo, settitulo]: any = useState(null)
    const [link, setLink]: any = useState(null)
    const [option, setOption]: any = useState()
    const [newContent, setNewContent]: any = useState()
    const editor = useRef(null);
    const config = {
        readonly: false,
        height: 400,
        with: 400
    };

    useEffect(() => {
        async function noticia() {
            const dados: any = {
                slug: slugs
            }
            const buscanoticia = await axios.get(`https://landhabbo.vps-kinghost.net:3443/noticia/`, dados)
            setNoticia(buscanoticia.data)
            settitulo(buscanoticia.data.titulo)
            setLink(buscanoticia.data.banner)
            setOption(buscanoticia.data.tipo)
        }
        noticia()
    }, [])

    async function editar() {
        const editNoticia = await axios.put('https://landhabbo.vps-kinghost.net:3443/noticia/edit', {
            id: noticia.id,
            titulo: titulo,
            tipo: option,
            noticia: newContent,
            banner: link
        })
        window.location.reload()
    }
    async function postar() {
        const postarNoticia = await axios.put('https://landhabbo.vps-kinghost.net:3443/noticia/postar', {
            id: noticia.id,
        })
        window.location.reload()
    }

    if (noticia === '' || !cargo) {
        return (<Loading />)
    } else if (noticia === null || noticia.postada === 'postada') {
        return <Navigate to='/painel/moderar-noticia' />
    } else if (cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true) {
        return (
            <div className='flex items-center justify-center flex-col'>
                <Typography variant="h1"><div className='text-2xl my-5 text-blue-500'> {noticia.titulo} </div></Typography>
                <Typography variant='span'><div className='flex items-center text-start w-full'>Postado por {noticia.nick} <img className='w-8' src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${noticia.nick}&direction=4&head_direction=3&size=l&headonly=1`} alt={`rosto habbo de ${noticia.nick}`} /></div></Typography>
                <Typography variant="h2"><div className='text-blue-700 text-1xl'>Banner da noticia</div></Typography>
                <img src={noticia.banner} alt="banner da noticia" />
                <Typography variant="h2"><div className='text-blue-700 text-1xl mt-6'>Noticia inteira</div></Typography>
                <div className='px-16' dangerouslySetInnerHTML={{ __html: noticia.noticia }} />
                <div className='w-full gap-5 flex justify-end p-9'><Button color='green' onClick={postar} >Publicar</Button><Button color='red' onClick={() => setTogle(true)}>Editar</Button></div>


                {togle === true ?
                    <div className='fixed top-0 left-0 bg-black/60 w-full h-full flex items-center justify-center'>
                        <div className='overflow-auto w-5/6 p-10 h-screen bg-white rounded-t-lg shadow-2xl flex flex-col gap-5'>
                            <div className='w-full gap-5 flex justify-center'><Button color='green' onClick={editar}>editar</Button><Button color='red' onClick={() => setTogle(!togle)}>cancelar</Button></div>
                            <Input defaultValue={noticia.titulo} onChange={(e) => settitulo(e.target.value)} variant="standard" label={noticia.titulo} className='w-full' />
                            <Input defaultValue={noticia.banner} onChange={(e) => setLink(e.target.value)} variant="standard" label={noticia.banner} className='w-full' />
                            <Select defaultValue={noticia.tipo} onChange={(e) => setOption(e)} label={noticia.tipo}>
                                <Option value='Noticias Habo'>Noticias Habo</Option>
                                <Option value='Noticias da fã site'>Noticias da fã site</Option>
                                <Option value='Noticia Premiada'>Noticia Premiada</Option>
                                <Option value='Noticia em destaque'>Noticia em destaque</Option>
                                <Option value='fofoca'>fofoca</Option>
                            </Select>
                            <JoditEditor
                                ref={editor}
                                value={noticia.noticia}
                                config={config}
                                onBlur={(e) => setNewContent(e)}
                            />
                        </div>
                    </div>
                    : null}
            </div>

        )
    } else { return <Navigate to='/painel' /> }
}
