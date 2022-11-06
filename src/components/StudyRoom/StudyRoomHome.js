import {useCallback, useEffect, useState} from "react";
import {BackgroundCard, SnippetCard} from "../CustomMUIComponents/CustomCards";
import * as React from "react";
import NavDrawer from "../NavDrawer/navDrawer";
import BottomDrawer from "./BottomDrawer";
import {PrimaryButton} from "../CustomMUIComponents/CustomButtons";
import RoomCreation from "./StudyRoomCreate";
import {Avatar, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import mockStudyRoom from "./Mocks/mockStudyRoom.json"
import {useNavigate} from "react-router";
import axios from "axios";

let email = JSON.parse(localStorage.getItem("email"));

export default function StudyRoomHome() {
    const navigate = useNavigate();
    // const [errorMessage, setErrorMessage] = useState('')
    const [roomData, setRoomData] = React.useState({
        title: '',
        sid: '',
        owner:'',
        color: '',
        description: '',
        avatarText: '',
        createdOn: '',
        participants: [],
    });

    useEffect(() => {
        //user needs to be logged in to access
        if (email === undefined || email === '') {
            navigate("/login");
        }
        //getData();
    }, [])

    //API call to get all the rooms that the logged in user participates in
    // const getData = () => {
    //     let user = localStorage.getItem("email");
    //     axios.get(`http://localhost:5000/room/${user}`)
    //         .then(res => {
    //             console.log(res.data);
    //             const data = res.data;
    //             setRoomData({
    //                 ...roomData, title: data.title, color: data.color, description: data.description,
    //                 avatarText: data.avatarText, createdOn: data.createdAt
    //             })
    //         })
    //         .catch(err =>
    //         {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'insert proper error message' : `${err}`)});
    //     }

        //to be used when we have functionning backend
        const studyRoomsSnippet = (
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
        )
    function handleDestination(){
        navigate('/study-room')
    }

        const studyGroups = (
            <React.Fragment>
                <NavDrawer/>
                <div style={{overflow: 'scroll', height: '80vh', marginTop: '70px'}}>
                    {mockStudyRoom.map((item, index) => (
                         item.participants[0] === email ? (
                            <SnippetCard
                                destination={handleDestination}
                                key={index}
                                width='92vw'
                                borderRadius='10px'
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
                                            }}>{item.avatarText} </Avatar>
                                            <div>
                                                <Typography variant="body1">Title:{item.title}</Typography>
                                                <Typography variant="body1">Description:{item.description}</Typography>
                                                <Typography variant="body2">created on:{item.createdOn}</Typography>
                                            </div>
                                        </Stack>
                                    </>}
                            /> ) : null
                    ))
                    }
                </div>
                <div>
                    <BottomDrawer icon={<PrimaryButton width={'99vw'} content={"Create New Room"}/>}
                                  title={'create a study room'} content={<RoomCreation/>}/>
                </div>

            </React.Fragment>
        )

        return (<BackgroundCard width='96vw' height='99vh' content={studyGroups}/>)

}


