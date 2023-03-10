import React, { useEffect, useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../services/FirebaseConfig';
import loadingimg from '../assets/Loading.svg'
import Button from '@material-tailwind/react/components/Button'
import Input from '@material-tailwind/react/components/Input'
import { Alert, Avatar } from "@material-tailwind/react";
import axios from 'axios';
export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nick, setNick] = useState('Morgana')
    const [resposta, setResposta] = useState()
    const [erroNick, setErroNick] = useState(false)
    const [tangle, setTangle] = useState(false)
    const [habboerror, setHabboerro] = useState('')
    const [verificação, setVerificação]: any = useState()
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    useEffect(() => {
        const numero = Math.floor(Math.random() * 900) + 100;
        setVerificação(`habbo${numero}`)
    }, [])

    async function Register() {
        setErroNick(false)
        setTangle(false)
        setHabboerro('')
        interface userInterfece {
            nick: String
            email: string
            googleid: string
        }
        if (nick.length < 3 || nick === 'Morgana') {
            setErroNick(true)
        } else {
            const habbomissao: any = await axios.get(`https://www.habbo.com.br/api/public/users?name=${nick}`)
            if (habbomissao.data.motto === verificação) {
                const userverify = await axios.get(`https://landhabbo.vps-kinghost.net:3443/user/${nick}`)
                if (userverify.data === null) {
                    try {
                        const googleResponse: any = await createUserWithEmailAndPassword(email, password)
                        setResposta(googleResponse)
                        setTangle(true)
                        console.log(googleResponse)
                        if (googleResponse.user || !error) {
                            const dados: userInterfece = {
                                "nick": nick,
                                "email": googleResponse.user.email,
                                "googleid": googleResponse.user.uid
                            }
                            const axiosResponse = await axios.post('https://landhabbo.vps-kinghost.net:3443/user', dados)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    setErroNick(true)
                }
            } else {
                setHabboerro(`Por favor coloque o codigo abaixo em sua missão no habbo para verificar se essa conta é realmente sua.`)
            }
        }
    }
    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <div className="flex flex-col w-3/6 gap-6 mt-6 p-7 border-blue-500 rounded-sm border-4">
                <strong className='w-full text-center text-lg'>Registre-se</strong>
                <Input variant="outlined" label="E-mail" color='blue'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input type={'password'} variant="outlined" label="Senha" color='blue'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex items-center gap-5'>
                    <Avatar onError={() => { setNick('Morgana') }} src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${nick}&direction=2&head_direction=3&size=m&gesture=sml&action=sit,crr=33`} alt="avatar" size="lg" className='bg-blue-500' />
                    <Input variant="outlined" label="Nick" color='blue'
                        onChange={(e) => setNick(e.target.value)}
                    />
                </div>
                {loading === true ? <Button className='flex justify-center items-center gap-3'><img className='w-6 text-center' src={loadingimg} alt="loading" /> carregando</Button> : resposta ? <Button disabled >Registrar</Button> : <Button onClick={Register}>Registrar</Button>}
                {error ? <Alert color="red">Email ou Senha invalidos</Alert> : null}
                {tangle === true ? resposta ? <Alert color='green'>Conta Criada!</Alert> : <Alert color='red'>Conta Não Criada!</Alert> : null}
                {erroNick === true ? <Alert color='red'>Nick invalido</Alert> : null}
                {habboerror === '' ? null : <Alert color="red">{habboerror}</Alert>}
                <Alert color='deep-orange' >Coloque <strong className='text-black'>{verificação}</strong> em sua missão habbo para verificar sua conta</Alert>
            </div>
        </main>
    )
}
