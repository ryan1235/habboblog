import axios from "axios"
import { useEffect, useState } from "react"

export default function home({ user }: any) {
    const [destaques, setDestaques]: any = useState()
    useEffect(() => {
        async function api() {
            const destaque: any = await axios.get('http://localhost:3333/destaque/get')
            setDestaques(destaque)
        }
        api()
    }, [])
    if (!destaques) {
        return null
    }
    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='text-center mt-4 text-lg font-bold underline'>Bem vindo ao painel de Administração {user.data.nick}</h1>
            <div className="flex flex-col">
                <strong className="mt-10 text-lg text-center">Distaques do mês!</strong>
                <div className="flex justify-between">
                    <div className="flex items-center justify-center">
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${destaques.data.nick1}&direction=3&head_direction=3&size=l&gesture=sml&action=std,wav,crr=3`} />
                        <div className="w-96">
                            <span className="text-lg text-blue-500 flex flex-col gap-2 mt-3">{destaques.data.nick1}</span>
                            <p>{destaques.data.mensage1}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${destaques.data.nick2}&direction=3&head_direction=3&size=l&gesture=sml&action=std,wav,crr=3`} />
                        <div className="w-96">
                            <span className="text-lg text-blue-500 flex flex-col gap-2 mt-3">{destaques.data.nick2}</span>
                            <p>{destaques.data.mensage2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
