import {useEffect, useState} from "react";
import {BackgroundCard} from "../CustomMUIComponents/CustomCards";
import * as React from "react";
import NavDrawer from "../NavDrawer/navDrawer";
import BottomDrawer from "./BottomDrawer";
import {PrimaryButton} from "../CustomMUIComponents/CustomButtons";
import RoomCreation from "./StudyRoomCreate";
import {Avatar, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import axios from "axios";

export default function StudyRoomHome() {
    const [errorMessage, setErrorMessage] = useState('')
    const [roomData, setRoomData] = React.useState({
        title:'',
        color: '',
        description:'',
        avatarText:'',
        createdOn:'',
    });

    //todo get room title,icon,description and creation date in the study room snippet
    useEffect(() => {
        getData();
    },[])

    function getData(){
        let user = localStorage.getItem("username");
        console.log(user);
        axios.get(`http://localhost:5000/room/${user}`)
            .then(res => {
                console.log(res.data[0]);
                const data = res.data[0];
                setRoomData({
                    ...roomData,
                    title: data.title,
                    color: data.color,
                    description: data.description,
                    avatarText: data.avatarText,
                    createdOn: data.createdAt
                })
                console.log(roomData)
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'insert proper error message' : `${err}`)});

    }

    const studyRoomsSnippet =(
        <Stack direction='row' spacing={2}
               divider={<Divider orientation="vertical" flexItem/>}
               justifyContent="flex-start"
               alignItems="center"
        >
            <Avatar sx={{bgcolor: roomData.color, width: 56, height: 56}}>{roomData.avatarText} </Avatar>
            <div>
                <Typography variant="body1">Title:{roomData.title}</Typography>
                <Typography variant="body1">Description:{roomData.description}</Typography>
                <Typography variant="body2">created on:{roomData.createdOn}</Typography>
            </div>
        </Stack>
    );

    const studyGroups = (
        <React.Fragment>
            <NavDrawer/>
            <div style={{height:'33vh', marginTop:'70px'}}>
                <Card style={{
                    margin: 'auto',
                    alignItems: 'left',
                    display: 'flex',
                    justifyContent: 'left',
                    width: '92vw',
                    height: '12vh',
                    marginBottom: '15px',
                    paddingLeft:'10px',
                    borderRadius: '10px'
                }} variant='outlined' >
                    {studyRoomsSnippet}
                </Card>
                <Card style={{
                    margin: 'auto',
                    alignItems: 'left',
                    display: 'flex',
                    justifyContent: 'left',
                    width: '92vw',
                    height: '12vh',
                    marginBottom: '15px',
                    paddingLeft:'10px',
                    borderRadius: '10px'
                }} variant='outlined' >
                    {studyRoomsSnippet}
                </Card>
            </div>
                <BottomDrawer icon={ <PrimaryButton width={'99vw'} content={"Create New Room"}/>} style={{color: '#912338', height: '4vh', width: '4vh'}}
                              title={'create a study room'} content={<RoomCreation/>} />
            </React.Fragment>

    )

    return(
        <BackgroundCard width='96vw' height='99vh' content={studyGroups}/>
    );
}

