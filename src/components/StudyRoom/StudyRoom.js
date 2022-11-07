import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {BackgroundCard, SnippetCard, StudyRoomChatCard} from '../CustomMUIComponents/CustomCards';
import NavDrawer from "../NavDrawer/navDrawer"
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import BottomDrawer from './BottomDrawer';
import StudyRoomSettings from "./StudyRoomSettings";
import ParticipantsList from './ParticipantsList';
import {Avatar, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import axios from "axios";


export default function StudyRoom() {
    // useEffect(() => {
    //     if (localStorage.getItem("email")) {
    //         if (localStorage.getItem("email") === "")
    //             window.location = "/calendar"
    //     }
    // }, [])
    const [roomData, setRoomData] = React.useState([]);

    function getData() {
        const studyRoomID = window.location.href.split("/")[window.location.href.split("/").length - 1];
        axios.get(`${process.env.REACT_APP_BASE_URL}room/fetch/${studyRoomID}`)
            .then(res => {
                setRoomData(res.data);
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const roomHeader = (
        <div style={{margin: '15px', width:'92vw'}}>
            <Stack direction='row' spacing={2}
                   divider={<Divider orientation="vertical" flexItem/>}
                   justifyContent="flex-start"
                   alignItems="center"
            >
                <Avatar sx={{
                    background: roomData.color,
                    width: 56,
                    height: 56
                }}>{roomData.avatar} </Avatar>
                <div>
                    <Typography variant="body1">Title: {roomData.title}</Typography>
                    <Typography variant="body1">Description: {roomData.description}</Typography>
                    <Typography variant="body2">Created on: {roomData.createdAt ? roomData.createdAt.split("T")[0] : ''}</Typography>
                </div>
            </Stack>
        </div>
    )

    const chatRoom = (
        <React.Fragment>
            <NavDrawer/>
            <StudyRoomChatCard width='92vw' height='10vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={roomHeader}/>
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
                               title={'Participants'} content={<ParticipantsList/>}/></div>}/>
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<SettingsIcon style={{color: '#912338', height: '4vh', width: '4vh'}}/>}
                               title={'settings page'} content={<StudyRoomSettings/>}/></div>}/>
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