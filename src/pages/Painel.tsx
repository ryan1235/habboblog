import { Avatar } from "@material-tailwind/react";
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from 'react-router-dom';
import Loading from "../Components/Loading";
import NavBar from "../Components/NavBar";
import RouterPeges from "../Components/RouterPeges";

export default function Painel() {
    const context = localStorage.getItem("id")
    const [user, setUser]: any = useState()
    const [cargo, setCargo]: any = useState()
    useEffect(() => {
        async function ValideteLogin() {
            const validete: any = await axios.get(`http://ca-amd-b1.phosting.com.br:10174/user/google/${context}`)
            setUser(validete)
            if (validete.data === null || validete.data.equipe === false) {
                localStorage.removeItem('id')
                location.reload()
            }
            const user = await axios.get(`http://ca-amd-b1.phosting.com.br:10174/cargo/${context}`)
            setCargo(user.data)
        }
        ValideteLogin()
    }, [])
    console.log(context)
    if (!user) {
        return <Loading />
    }
    if (context === null) {
        return <Navigate to="/painel/login" />
    }
    return (
        <main className="flex w-full h-full">
            <div className="bg-blue-500 w-44 text-white flex items-center justify-center flex-col">
                <div className="fixed top-0 h-full left-0 w-44 bg-blue-500">
                    <span className="flex items-center mt-4"><Avatar alt="avatar" size="sm" src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user.data.nick}&direction=4&head_direction=3&size=l&headonly=1`}></Avatar>Olá {user.data.nick}</span>
                    <NavBar
                        cargo={cargo} />
                </div>
            </div>
            <div className="flex-1 w-full h-full">
                <RouterPeges
                    user={user}
                    cargo={cargo}
                />
            </div>
        </main>
    )
}
