import * as React from 'react';
import {useEffect} from 'react';
import {BackgroundCard, StudyRoomChatCard} from '../CustomMUIComponents/CustomCards';
import NavDrawer from "../NavDrawer/navDrawer"
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import {GetStudyRoomChat} from "./StudyRoomChat";
import socketIO from "socket.io-client";


export default function StudyRoom() {
    useEffect(() => {
        if (localStorage.getItem("email")) {
            if (localStorage.getItem("email") === "")
                window.location = "/calendar"
        }
    }, [])
    //const socket = socketIO.connect('http://localhost:4000');


    const chatRoom = (
        <React.Fragment>
            <NavDrawer/>
            { /* Top */ }
            <StudyRoomChatCard width='92vw' height='10vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px'/>
            { /*  Chat  */ }
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<GetStudyRoomChat socket={"socket"} />}/>
            { /* Typing area */ }
            <StudyRoomChatCard width='92vw' height='5vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px'/>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>

                { /* Drawer left icon */ }
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={<button
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                    onClick={() => alert("documents")}><DescriptionIcon
                    style={{color: '#912338', height: '4vh', width: '4vh'}}/></button>}/>
                { /* Drawer middle icon */ }
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<button
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                    onClick={() => alert("participants")}><GroupsIcon
                    style={{color: '#912338', height: '6vh', width: '6vh'}}/></button>}/>
                { /* Drawer right icon */ }
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<button
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                    onClick={() => alert("settings")}><SettingsIcon
                    style={{color: '#912338', height: '4vh', width: '4vh'}}/></button>}/>
            </div>
        </React.Fragment>
    )

    return (
        <BackgroundCard width='96vw' height='99vh' content={chatRoom}/>
    );
}

export function SetLocalStorage(res) {
    localStorage.setItem("email", JSON.stringify(res.data.profile.email));
    localStorage.setItem("token", JSON.stringify(res.data.token));
}