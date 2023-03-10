import Button from '@material-tailwind/react/components/Button'
import Input from '@material-tailwind/react/components/Input'
import { Alert } from "@material-tailwind/react";
import loadingimg from '../assets/Loading.svg'


import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from '../services/FirebaseConfig';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';


export default function PainelLogin() {
    const context = localStorage.getItem("id")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [espera, setEspera] = useState(false)
    const [validateErro, setValidateErro]: any = useState(false);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth)
    async function AuthLogin() {
        setEspera(true)
        const googleath = await signInWithEmailAndPassword(email, password)
        if (googleath?.user) {
            const url = `https://landhabbo.vps-kinghost.net:3443/user/google/${googleath.user.uid}`
            const axiosAth = await axios.get(url)
            console.log(axiosAth)
            if (axiosAth.data.equipe === true) {
                localStorage.setItem('id', `${axiosAth.data.googleid}`)
                location.reload()
            } else {
                setValidateErro(true)
                setEspera(false)
            }
        }
    }
    if (context) {
        return <Navigate to="/painel" />
    }
    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <form className="flex flex-col w-2/6 gap-6 mt-6 p-7 border-blue-500 rounded-sm border-4">
                <strong className='w-full text-center text-lg'>Painel de Login</strong>
                <Input variant="outlined" label="E-mail" color='blue'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input type={'password'} variant="outlined" label="Senha" color='blue'
                    onChange={(e) => setPassword(e.target.value)}
                />
                {espera === true ? <Button className='flex justify-center items-center gap-3'><img className='w-6 text-center' src={loadingimg} alt="loading" /> carregando</Button> : <Button onClick={AuthLogin}>Fazer Login</Button>}
                {error?.message ? <Alert color="red">Email ou senha invalida. Esqueceu sua senha? <Link to={'/redefinir-email'}>clique aqui</Link></Alert> : null}
                {validateErro === true ? <Alert color="red">Voc?? n??o ?? membro da nossa equipe.</Alert> : null}
            </form>
        </main>
    )
}
