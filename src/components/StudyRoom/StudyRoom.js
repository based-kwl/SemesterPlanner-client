import * as React from 'react';
import {useEffect} from 'react';
import {BackgroundCard, StudyRoomChatCard} from '../CustomMUIComponents/CustomCards';
import NavDrawer from "../NavDrawer/navDrawer"
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import BottomDrawer from './BottomDrawer';


export default function StudyRoom() {
    useEffect(() => {
        if (localStorage.getItem("email")) {
            if (localStorage.getItem("email") === "")
                window.location = "/calendar"
        }
    }, [])

    const chatRoom = (
        <React.Fragment>
            <NavDrawer/>
            <StudyRoomChatCard width='92vw' height='10vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px'/>
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px'/>
            <StudyRoomChatCard width='92vw' height='5vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px'/>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<DescriptionIcon style={{color: '#912338', height: '4vh', width: '4vh'}}/>}
                               title={'course notes title'} content={'course notes content'}/></div>}/>
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<GroupsIcon style={{color: '#912338', height: '6vh', width: '6vh'}}/>}
                               title={'participants title'} content={'participants content'}/></div>}/>
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<SettingsIcon style={{color: '#912338', height: '4vh', width: '4vh'}}/>}
                               title={'settings title'} content={'settings content'}/></div>}/>
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