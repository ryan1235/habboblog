import { CaretDoubleRight } from 'phosphor-react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar({ cargo }: any) {
  const location = useLocation();
  if (!cargo) {
    return null
  }
  return (
    <div className='w-full flex flex-col justify-start'>
      {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true ?
        <div className='w-full h-full flex flex-col items-start justify-start'>
          <span className='w-full text-start px-3 bg-white text-black font-bold'>Administração</span>
          <Link to={'/painel/adm/usuarios'} className={location.pathname === '/painel/adm/usuarios' ? 'flex items-center gap-2 text-black' : 'flex items-center gap-2 hover:text-black'}><CaretDoubleRight size={16} />Usuarios</Link>
        </div>
        : null}
      {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true || cargo.jornalista ?
        <div className='w-full h-full flex flex-col items-start justify-start'>
          <span className='w-full text-start px-3 bg-white text-black font-bold'>Jornalismo</span>
          <Link to={'/painel/criar-noticia'} className={location.pathname === '/painel/criar-noticia' ? 'flex items-center gap-2 text-black' : 'flex items-center gap-2 hover:text-black'}><CaretDoubleRight size={16} />Criar Noticia</Link>
          {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true ?
            <Link to={'/painel/moderar-noticia'} className={location.pathname === '/painel/moderar-noticia' ? 'flex items-center gap-2 text-black' : 'flex items-center gap-2 hover:text-black'}><CaretDoubleRight size={16} />Moderar noticias</Link>
            : null}
          {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true ?
            <Link to={'/painel/noticias-postadas'} className={location.pathname === '/painel/noticias-postadas' ? 'flex items-center gap-2 text-black' : 'flex items-center gap-2 hover:text-black'}><CaretDoubleRight size={16} />Noticias Postadas</Link>
            : null}
        </div>
        : null}
    </div>
  )
}
