import imgloading from '../assets/Loading.gif'

export default function Loading() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col  items-center justify-center'>
                <img src={imgloading} alt="carregando..." />
                <strong>Carregando Aguarde..</strong>
            </div>
        </div>
    )
}
