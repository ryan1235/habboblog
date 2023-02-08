import { Alert, Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import axios from "axios";
import { CheckSquare, Trash, UserPlus, UsersThree, WarningCircle } from "phosphor-react";
import { Fragment, useState } from "react";

import { parseISO, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Navigate } from "react-router-dom";
import Loading from "../Loading";


export default function AdmUsuario({ cargo }: any) {
    const [open, setOpen] = useState(false);
    const [opencargo, setOpencargo] = useState(false);
    const handleOpen = () => setOpen(!open);
    const handleOpencargo = () => setOpencargo(!opencargo);
    const [nick, setNick]: any = useState('es')
    const [nickErro, setNickError] = useState('')
    const [user, setUser]: any = useState('')
    const [userTangle, setUserTangle] = useState(false)
    const [data, setData] = useState()

    const [jornlista, setJornalista]: any = useState()
    const [coordenador_jornalismo, setCoordenador_jornalismo]: any = useState()
    const [supervisor_jornalismo, setSupervisor_jornalismo]: any = useState()
    const [adm_jornalista, setAdm_jornalista]: any = useState()
    const [webmaster, setWebmaster]: any = useState()
    const [diretor, setDiretor]: any = useState()
    const [ceo, setCeo]: any = useState()

    async function buscar() {
        setNickError('')
        setUserTangle(false)
        if (nick.length < 3) {
            setNickError('Nick invalido!')
        } else {
            const userapi: any = await axios.get(`https://landhabbo.vps-kinghost.net:3443/user/${nick}`)
            setUser(userapi.data)
            setUserTangle(true)

            if (userapi.data === null) {
                setUserTangle(false)
                setNickError('Usuario Não encontrado')
            } else {
                const date = parseISO(userapi.data.create_et)
                const timePeriod: any = formatDistanceToNow(date, {
                    locale: ptBR
                })
                setData(timePeriod)

                const cargoapi = await axios.get(`https://landhabbo.vps-kinghost.net:3443/cargo/${userapi.data.googleid}`)


                setCoordenador_jornalismo(cargoapi.data.coordenador_jornalismo)
                setSupervisor_jornalismo(cargoapi.data.supervisor_jornalismo)
                setAdm_jornalista(cargoapi.data.adm_jornalista)
                setDiretor(cargoapi.data.diretor)
                setWebmaster(cargoapi.data.webmaster)
                setCeo(cargoapi.data.ceo)
                setJornalista(cargoapi.data.jornalista)

            }
        }
    }
    async function addcargo() {
        const dados = {
            "nick": user.nick,
            "googleid": user.googleid
        }
        const criarCargo = await axios.post('https://landhabbo.vps-kinghost.net:3443/cargo', dados)
        handleOpencargo()
        const userCargo = await axios.put('https://landhabbo.vps-kinghost.net:3443/user/cargo/true', {
            nick: user.nick
        })
        buscar()
    }


    async function editcargo() {
        const editarcargo = axios.put('https://landhabbo.vps-kinghost.net:3443/cargo/edit/', {
            nick: nick,
            ceo: ceo,
            diretor: diretor,
            webmaster: webmaster,
            adm_jornalista: adm_jornalista,
            supervisor_jornalismo: supervisor_jornalismo,
            coordenador_jornalismo: coordenador_jornalismo,
            jornalista: jornlista
        })
        handleOpencargo()
    }


    async function removecargo() {
        const removeuser = await axios.put('https://landhabbo.vps-kinghost.net:3443/user/cargo/false', {
            nick: user.nick
        })
        const removecargo = await axios.put(`https://landhabbo.vps-kinghost.net:3443/cargo/remove`, {
            nick: user.nick
        })
        handleOpencargo()
        buscar()
    }
    console.log(cargo)
    if (!cargo) {
        return <Loading />
    } else if (cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl mt-10">Buscar por um usuario</h1>

                <div className="w-96 mt-10 flex gap-4">
                    <Input label="Buscar por Nick" icon={<UsersThree size={24} />}
                        onChange={(e) => setNick(e.target.value)}
                    />
                    <Button onClick={buscar} variant="filled">Buscar</Button>
                </div>
                {nickErro === '' ? null : <Alert className="w-96 mt-4" color='red'><div className="w-full flex items-center justify-center gap-2"><WarningCircle size={32} />{nickErro}</div></Alert>}
                {userTangle === true ? <div className="flex items-center justify-center">
                    <div>
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user?.nick}&direction=3&head_direction=3&size=l&gesture=sml&action=std,wav&frame=3`} alt="" />
                    </div>
                    <div className="flex flex-col gap-1 justify-center mt-8">
                        <span>Nick: <strong className="text-blue-500">{user.nick}</strong></span>
                        <span>Faz parte da equipe:{user.equipe === true ? <strong className="text-blue-500"> sim </strong> : <strong className="text-blue-500"> Não </strong>}</span>
                        <span>Registrado há: <strong className="text-blue-500">{data}</strong></span>
                        {user.equipe === true ? <Button onClick={() => { setOpencargo(!opencargo), console.log(opencargo) }} className="mt-2"><div className="w-full flex items-center justify-center gap-2"><CheckSquare size={24} />Alterar cargo</div></Button> : <Button onClick={handleOpen} className="mt-2"><div className="w-full flex items-center justify-center gap-2"><UserPlus size={24} />registrar como membro da equipe</div></Button>}
                    </div>
                </div> :
                    null
                }


                {userTangle === true ? <Fragment >
                    <Dialog open={open} handler={handleOpen} >
                        <DialogHeader>Adicionar Membro da equipe</DialogHeader>
                        <DialogBody >
                            Depois de adicionar o <strong className="text-blue-500">{user.nick}</strong> a equipe você dever setar os cargos do mesmo.
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cencelar</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={addcargo}>
                                <span>Confirmar</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </Fragment>
                    : null}





                {opencargo === true ?
                    <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex items-center justify-center">
                        <div className="relative w-[50%] h-[90%] overflow-scroll rounded-md shadow-md bg-white flex flex-col items-center ">
                            <span className="text-2xl p-4 flex items-center gap-1"> <img className="w-12" src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${nick}&direction=4&head_direction=3&size=l&headonly=1`} alt={`imagem do jogar ${nick}`} /> Editando cargo de <strong className="text-blue-500">{nick}</strong>  </span>
                            <Button onClick={removecargo} className="w-3/6" variant="gradient" color="red"><div className="flex gap-2 items-center justify-center"><Trash size={24} />Remover da equipe</div></Button>
                            {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true ?
                                <div className="flex flex-col items-center">
                                    <span className="text-blue-500 fon-bold text-lg p-4">Cargos Superiores Gerais</span>
                                    <div className="flex gap-2 flex-wrap">
                                        {diretor === true ? <Button color="green" onClick={(e) => setDiretor(!diretor)}>diretor</Button> : <Button color="red" onClick={(e) => setDiretor(!diretor)}>Diretor</Button>}
                                        {webmaster === true ? <Button color="green" onClick={(e) => setWebmaster(!webmaster)}>Web Master</Button> : <Button color="red" onClick={(e) => setWebmaster(!webmaster)}>Web Master</Button>}
                                        {ceo === true ? <Button color="green" onClick={(e) => setCeo(!ceo)}>CEO</Button> : <Button color="red" onClick={(e) => setCeo(!ceo)}>ceo</Button>}
                                    </div>
                                </div>
                                : null}
                            {/* cargo ADM */}
                            {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true ?
                                <div className="flex flex-col items-center">
                                    <span className="text-blue-500 fon-bold text-lg p-4">Cargos Administração</span>
                                    <div className="flex gap-2 flex-wrap">
                                        {adm_jornalista === true ? <Button color="green" onClick={(e) => setAdm_jornalista(!adm_jornalista)}>Cordernador Jornalismo</Button> : <Button color="red" onClick={(e) => setAdm_jornalista(!adm_jornalista)}>Administração Jornalismo</Button>}
                                    </div>
                                </div>
                                : null}

                            {/* cargo supervisor e cordernador */}
                            {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true ?
                                <div className="flex flex-col items-center">
                                    <span className="text-blue-500 fon-bold text-lg p-4">Cargos Supervisao e Cordernação</span>
                                    <div className="flex gap-2 flex-wrap">
                                        {coordenador_jornalismo === true ? <Button color="green" onClick={(e) => setCoordenador_jornalismo(!coordenador_jornalismo)}>Cordernador Jornalismo</Button> : <Button color="red" onClick={(e) => setCoordenador_jornalismo(!coordenador_jornalismo)}>Cordernador Jornalismo</Button>}
                                        {supervisor_jornalismo === true ? <Button color="green" onClick={(e) => setSupervisor_jornalismo(!supervisor_jornalismo)}>Supervisor Jornalismo</Button> : <Button color="red" onClick={(e) => setSupervisor_jornalismo(!supervisor_jornalismo)}>Supervisor Jornalismo</Button>}
                                    </div>
                                </div>
                                : null}
                            {/* jornalista, radio etc */}
                            {cargo.ceo === true || cargo.webmaster === true || cargo.diretor === true || cargo.adm_jornalista === true || cargo.supervisor_jornalismo === true || cargo.coordenador_jornalismo === true ?
                                <div className="flex flex-col items-center">
                                    <span className="text-blue-500 fon-bold text-lg p-4">Cargos Comuns</span>
                                    <div>
                                        {jornlista === true ? <Button color="green" onClick={(e) => setJornalista(!jornlista)}>jornalista</Button> : <Button color="red" onClick={(e) => setJornalista(!jornlista)}>Jornalista</Button>}
                                    </div>
                                </div>
                                : null}
                            <div className="flex items-end justify-end w-full">
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpencargo}
                                    className="mr-1"
                                >
                                    <span>Cencelar</span>
                                </Button>
                                <Button variant="gradient" color="green" onClick={editcargo}>
                                    <span>Adicionar</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        )
    } else { return <Navigate to='/painel' /> }
}
