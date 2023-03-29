import { useEffect } from "react";
import {BackgroundCard, SnippetCard, StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import * as React from "react";
import NavDrawer from "../NavDrawer/navDrawer";
import BottomDrawer from "./BottomDrawer";
import {PrimaryButton} from "../CustomMUIComponents/CustomButtons";
import RoomCreation from "./StudyRoomCreate";
import {Avatar, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router";
import axios from "axios";
import {GetAuthentication} from "../Authentication/Authentification";

export default function StudyRoomHome() {
    const navigate = useNavigate();
    const [roomData, setRoomData] = React.useState([]);
    const user = GetAuthentication();

    useEffect(() => {
        getData();
    },[])

    //API call to get all the rooms that the logged-in user participates in
    const getData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}room/${user.email}`)
            .then(res => {
                setRoomData(res.data);
            })
            .catch(err => {console.log('Error',err);})
        }

    function handleDestination(studyRoomID){
        navigate(`/study-room/${studyRoomID}`)
    }

        const studyGroups = (
            <React.Fragment>
                <NavDrawer/>
                <StudyRoomChatCard width='92vw' height='10vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{fontSize:'22px', fontWeight:'bold'}} ><Typography variant="1">Study Rooms</Typography></div>}/>
                <div style={{overflow: 'scroll', height: '70vh', marginTop: '15px'}}>

                    {roomData.map((item) => (
                        <div key={item.studyRoomID}  onClick={ () => handleDestination( item.studyRoomID)}>
                            <SnippetCard
                                value={item}
                                width='92vw'
                                borderRadius='5px'
                                height='12vh'
                                marginBottom='15px'
                                content={
                                    <>
                                        <Stack direction='row' spacing={2}
                                               divider={<Divider orientation="vertical" flexItem/>}
                                               justifyContent="flex-start"
                                               alignItems="center"
                                        >
                                            <Avatar sx={{
                                                bgcolor: item.color,
                                                width: 56,
                                                height: 56
                                            }}>{item.avatar} </Avatar>
                                            <div>
                                                <Typography variant="body1">Title:{item.title}</Typography>
                                                <Typography variant="body1">Description:{item.description}</Typography>
                                                <Typography variant="body2">created on:{item.createdAt.split("T")[0]}</Typography>
                                            </div>
                                        </Stack>
                                    </>}
                            /></div> )
                    )}
                </div>
                <div>
                    <BottomDrawer icon={<PrimaryButton width={'99vw'} content={"Create New Room"}/>}
                                  title={'create a study room'} content={<RoomCreation/>}/>
                </div>
            </React.Fragment>
        )
        return (<BackgroundCard width='96vw' height='99vh' content={studyGroups}/>)

}


