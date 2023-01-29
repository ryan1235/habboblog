import { CaretDoubleRight } from 'phosphor-react'
import { Link } from 'react-router-dom'

export default function NavBar({ cargo }: any) {
  if (!cargo) {
    return null
  }
  return (
    <div className='w-full h-full flex flex-col items-center justify-start'>
      {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true ?
        <div className='w-full h-full flex flex-col items-start justify-start'>
          <span className='w-full text-start px-3 bg-white text-black font-bold'>Administração</span>
          <Link to={'/painel/adm/usuarios'} className={'flex items-center gap-2 hover:text-black'}><CaretDoubleRight size={16} />Usuarios</Link>
        </div>
        : null}
      {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true || cargo.jornalista ?
        <div className='w-full h-full flex flex-col items-start justify-start'>
          <span className='w-full text-start px-3 bg-white text-black font-bold'>Jornalismo</span>
          <Link to={'/painel/criar-noticia'} className={'flex items-center gap-2 hover:text-black'}><CaretDoubleRight size={16} />Criar Noticia</Link>
        </div>
        : null}
    </div>
  )
}
