import Button from '@material-tailwind/react/components/Button'
import Input from '@material-tailwind/react/components/Input'
import { Alert } from "@material-tailwind/react";
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from '../services/FirebaseConfig';


export default function PassorwdRedefine() {
    const [email, setEmail]: any = useState('');
    const [res, setRes]: any = useState()
    const [bolean, setBolean] = useState(false)
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    async function sendPassord() {
        const r: any = await sendPasswordResetEmail(email)
        await setRes(r)
        setBolean(true)
    }
    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <div className="flex flex-col w-2/6 gap-6 mt-6 p-7 border-blue-500 rounded-sm border-4">
                <strong className='w-full text-center text-lg'>Redefinir Senha</strong>
                <Input variant="outlined" label="E-mail" color='blue'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {res === true ? <Button onClick={sendPassord} disabled>Redefinir</Button> : <Button onClick={sendPassord}>Redefinir</Button>}
                {bolean === true ? res === true ? <Alert color="green">Enviado com sucesso, verifique seu e-mail!!</Alert> : <Alert color="red">Email errado ou invalido.</Alert> : null}
            </div>
        </main>
    )
}
