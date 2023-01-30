import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading'

export default function ModerarNoticias({ cargo }) {
    const { slug } = useParams()
    const [noticia, setNoticia] = useState('')
    useEffect(() => {
        async function noticia() {
            const buscanoticia = await axios.get(`http://localhost:3333/noticia/${slug}`)
            setNoticia(buscanoticia.data)
        }
        noticia()
    }, [])
    if (noticia === '') {
        return (<Loading />)
    }
    return (
        <div>ModerarNoticias</div>
    )
}
