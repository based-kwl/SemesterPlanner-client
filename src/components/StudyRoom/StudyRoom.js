import * as React from 'react';
import {useEffect} from 'react';
import {BackgroundCard, StudyRoomChatCard} from '../CustomMUIComponents/CustomCards';
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
import { GetStudyRoomChat } from "./StudyRoomChat/StudyRoomChat";
import ChatFooter from "./StudyRoomChat/ChatFooter";
import CourseNotes from './CourseNotes'


export default function StudyRoom() {
    const [roomData, setRoomData] = React.useState([]);
    let studyRoomId;

    function getData() {
        studyRoomId = window.location.href.split("/")[window.location.href.split("/").length - 1];
        axios.get(`${process.env.REACT_APP_BASE_URL}room/fetch/${studyRoomId}`)
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

    const chatRoom = React.useMemo(() => (
        <React.Fragment>
            <NavDrawer/>

            {/* Top */}
            <StudyRoomChatCard width='92vw' height='10vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={roomHeader}/>

            { /*  Chat  */ }
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<GetStudyRoomChat />}/>

            { /* Typing area */ }
            <StudyRoomChatCard width='92vw' height='5vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<ChatFooter />}/>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>

                { /* Drawer left icon */}

                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px'
                                   topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<div data-test={'Files'}><DescriptionIcon
                    style={{color: '#912338', height: '4vh', width: '4vh'}}/></div>}
                               title={'Course Notes'} content={<CourseNotes/>}/></div>}/>

                { /* Drawer middle icon */}
                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<GroupsIcon style={{color: '#912338', height: '6vh', width: '6vh'}}/>}
                               title={'Participants'} content={<ParticipantsList/>}/></div>}/>

                { /* Drawer right icon */}

                <StudyRoomChatCard width='30.5vw' height='7vh' marginTop='2px' topLeftRadius='0px'
                                   topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<div data-test={'Settings'}><SettingsIcon
                    style={{color: '#912338', height: '4vh', width: '4vh'}}/></div>}
                               title={'settings page'} content={<StudyRoomSettings/>}/></div>}/>
            </div>
        </React.Fragment>
    ), [roomData]);

    return (
        <BackgroundCard width='96vw' height='99vh' content={chatRoom}/>
    );
}

