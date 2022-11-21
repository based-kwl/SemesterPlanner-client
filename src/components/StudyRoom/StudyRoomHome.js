import { useEffect } from "react";
import {BackgroundCard, SnippetCard} from "../CustomMUIComponents/CustomCards";
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



export default function StudyRoomHome() {
    const navigate = useNavigate();
    const [roomData, setRoomData] = React.useState([]);
    const email = JSON.parse(localStorage.getItem("email"));

    useEffect(() => {
        //user needs to be logged in to access
        if (email === undefined || email === '') {
            navigate("/login");
        }
        getData();
    }, [email])

    //API call to get all the rooms that the logged in user participates in
    const getData = () => {
        const email = JSON.parse(localStorage.getItem("email"));
        axios.get(`${process.env.REACT_APP_BASE_URL}room/${email}`)
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
                <div style={{overflow: 'scroll', height: '80vh', marginTop: '70px'}}>

                    {roomData.map((item, index) => (
                        <div  onClick={ () => handleDestination( item.studyRoomID)}>
                            <SnippetCard
                                value={item}
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


