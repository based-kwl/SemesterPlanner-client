import * as React from 'react';
import {useEffect} from 'react';
import {BackgroundCard, StudyRoomChatCard} from '../CustomMUIComponents/CustomCards';
import NavDrawer from "../NavDrawer/navDrawer"


export default function StudyRoom() {
    useEffect(() => {
        if(localStorage.getItem("email")){
            if(localStorage.getItem("email") === "")
                window.location = "/calendar"
        }
    }, [])

    const chatRoom = (
        <React.Fragment>
            <NavDrawer />
            <StudyRoomChatCard width='92vw' height='10vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px' bottomLeftRadius='0px' bottomRightRadius='0px'/>
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px' bottomLeftRadius='0px' bottomRightRadius='0px'/>
            <StudyRoomChatCard width='92vw' height='5vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px' bottomLeftRadius='0px' bottomRightRadius='0px'/>
            <StudyRoomChatCard width='92vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px' bottomLeftRadius='10px' bottomRightRadius='10px'/>
        </React.Fragment>
    )

    return (
        <BackgroundCard width='96vw' height='99vh' content={chatRoom} />
    );
}

export function SetLocalStorage(res) {
    localStorage.setItem("email", JSON.stringify(res.data.profile.email));
    localStorage.setItem("token", JSON.stringify(res.data.token));
}