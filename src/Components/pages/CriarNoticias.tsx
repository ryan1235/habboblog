import { Input, Select, Option, Button, Alert } from '@material-tailwind/react'
import { Navigate } from 'react-router-dom'
import Loading from '../Loading'

import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Article, PaperPlaneRight, Warning, XSquare } from 'phosphor-react';
import axios from 'axios';



export default function CriarNoticias({ cargo }: any) {
    const editor = useRef(null);
    const [content, setContent] = useState("Escreva sua noticia!");
    const [tangle, setTangle] = useState(false)
    const [selected, setSelected]: any = useState(null);
    const [title, settitle]: any = useState('')
    const [link, setLink] = useState('')
    const [erro, setErro] = useState('')
    const [sucess, setsucess] = useState('')
    const config = {
        readonly: false,
        height: 400,
        with: 400
    };
    function postar() {
        setErro('')
        if (title.length < 10) {
            setErro('Titulo Invalido')
        } else if (selected === null) {
            setErro("Selecione um tipo da noticia")
        } else if (link.length < 10) {
            setErro('Coloque o link do banner')
        } else {
            setTangle(!tangle)
        }
    }

    async function publicar() {
        const dados = {
            "titulo": title,
            "tipo": selected,
            "noticia": content,
            "banner": link,
            "nick": cargo.nick
        }
        const createNoticia = await axios.post('http://localhost:3333/noticia', dados)
        setTangle(!tangle)
        setsucess('A noticia foi enviada com sucesso!')
        setContent('Noticia enviada!')
    }

    if (!cargo) {
        return <Loading />
    } else if (cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true || cargo.jornalista) {
        return (
            <div className='flex flex-col items-center justify-center' >
                <h1 className='mt-8 text-blue-500 text-2xl'>Criar Noticias</h1>
                <div className='flex flex-col items-center justify-center mt-10 gap-4'>
                    <div className='flex w=full gap-2'>
                        <Input onChange={(e) => settitle(e.target.value)} variant="standard" label="Titulo da noticia" className='w-full' />
                        <Select onChange={(e) => setSelected(e)} variant="static" label="Tipo da noticia">
                            <Option value='Noticias Habo'>Noticias Habo</Option>
                            <Option value='Noticias da fã site'>Noticias da fã site</Option>
                            <Option value='Noticia Premiada'>Noticia Premiada</Option>
                            <Option value='Noticia em destaque'>Noticia em destaque</Option>
                            <Option value='fofoca'>fofoca</Option>
                        </Select>
                    </div>
                    <Input onChange={(e) => setLink(e.target.value)} variant="standard" label="Url Banner" className='w-full' />
                    <JoditEditor
                        ref={editor}
                        value={"vamos começar"}
                        config={config}
                        onBlur={(e) => setContent(e)}
                    />
                    {erro === '' ? null : <Alert color='red'><div className='flex items-center justify-center gap-2'><Warning size={32} />{erro}</div></Alert>}
                    {sucess === '' ? <Button color='green' className='mb-10' onClick={postar}><div className='flex items-center gap-2'><PaperPlaneRight size={22} />Postar</div></Button> : <Button color='green' className='mb-10' disabled><div className='flex items-center gap-2'><PaperPlaneRight size={22} />{sucess}</div></Button>}

                    {tangle === true ?
                        <div className='fixed bg-black/60 top-0 left-0 w-screen h-screen flex items-center justify-center'>
                            <div className=' w-5/6 overflow-auto bg-white h-screen rounded-md shadow-lg flex items-center flex-col'>
                                <h1 className='bg-blue-500 text-4xl p-4 text-white border-b-2 w-full text-center border-blue-500 font-bold'><div className='relative'>Revise sua noticia<div className='absolute right-0 top-0'><XSquare size={64} className='-mt-3 cursor-pointer' onClick={() => setTangle(!tangle)} /></div></div></h1>
                                <div className='' dangerouslySetInnerHTML={{ __html: content }} />
                                <div className='mb-4'><Button onClick={publicar}><div className='flex items-center gap-2'><Article size={22} />Publicar</div></Button></div>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        )
    } else { return <Navigate to='/painel' /> }
}
