import {useEffect} from "react";
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
    useEffect(() => {
        if (localStorage.getItem("email")) {
            if (localStorage.getItem("email") === "")
                window.location = "/calendar"
        }
    }, [])

    //todo get room title,icon,description and creation date in the study room snippet

    // axios.get('http://localhost:5000/room/',roomData)
    //     .then(res => {
    //         console.log(res);
    //         navigate("/study-room-home");
    //     })
    //     .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'insert proper error message' : `${err}`)});

    const studyRoomsSnippet =(
        <Stack direction='row' spacing={2}
               divider={<Divider orientation="vertical" flexItem/>}
               justifyContent="flex-start"
               alignItems="center"
        >
            <Avatar sx={{width: 56, height: 56}}> < /Avatar>
            <div>
                <Typography variant="body1">Title:</Typography>
                <Typography variant="body1">Description:</Typography>
                <Typography variant="body2">created on:</Typography>
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

