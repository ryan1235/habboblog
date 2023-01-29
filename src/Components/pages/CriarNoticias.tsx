import { Input, Select, Option, Button } from '@material-tailwind/react'
import { Navigate } from 'react-router-dom'
import Loading from '../Loading'

import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";



export default function CriarNoticias({ cargo }: any) {
    const editor = useRef(null);
    const [content, setContent] = useState("Start writing");
    const [tangle, setTangle] = useState(false)
    const config = {
        readonly: false,
        height: 400,
        with: 400
    };
    function editorr() {
        setTangle(!tangle)
    }
    if (!cargo) {
        return <Loading />
    } else if (cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true || cargo.jornalista) {
        return (
            <div className='flex flex-col items-center justify-center' >
                <h1 className='mt-8 text-blue-500 text-2xl'>Criar Noticias</h1>
                <div className='flex flex-col items-center justify-center mt-10 gap-4'>
                    <div className='flex w=full gap-2'>
                        <Input variant="standard" label="Titulo da noticia" className='w-full' />
                        <Select variant="static" label="Tipo da noticia">
                            <Option>Noticias Habo</Option>
                            <Option>Noticias da fã site</Option>
                            <Option>Noticia Premiada</Option>
                            <Option>Noticia em destaque</Option>
                            <Option>fofoca</Option>
                        </Select>
                    </div>
                    <Input variant="standard" label="Url Banner" className='w-full' />
                    <JoditEditor
                        ref={editor}
                        value={"vamos começar"}
                        config={config}
                        onBlur={(e) => setContent(e)}
                    />
                    <Button onClick={editorr}>Postar</Button>
                    {tangle === true ?
                        <div onClick={editorr} className=' fixed bg-black/60 top-0 left-0 w-screen h-screen flex items-center justify-center'>
                            <div className='w-5/6 overflow-auto bg-white h-screen rounded-md shadow-lg flex items-center flex-col'>
                                <h1 className='text-blue-500 text-2xl'>Revise sua noticia</h1>
                                <div className='' dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        )
    } else { return <Navigate to='/painel' /> }
}
