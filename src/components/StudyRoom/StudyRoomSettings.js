import {useNavigate} from "react-router";
import {useCallback, useEffect, useState} from "react";
import * as React from "react";
import axios from "axios";
import {Avatar, InputLabel, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
import {PrimaryButton3} from "../CustomMUIComponents/CustomButtons";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import MockStudyRoom from "./Mocks/mockStudyRoom.json"

const studyRoom = MockStudyRoom[0];

export default function StudyRoomSettings() {
    const navigate = useNavigate();
    //const [errorMessage, setErrorMessage] = useState('')
    const[loading,setLoading] = useState(true);
    const [roomData, setRoomData] = React.useState({
        owner:'',
        sid:'',
        title:'',
        color: '',
        avatarText:'',
        description:'',
        participants:[],
    });

    const fetchData = useCallback(( ) => {
        setRoomData({...roomData,
            owner: studyRoom.owner,
            sid: studyRoom.sid,
            title: studyRoom.title,
            color: studyRoom.color,
            avatarText: studyRoom.avatarText,
            participants: studyRoom.participants,
            createdOn: studyRoom.createdOn,
            description: studyRoom.description
        })
        setLoading(false);
        //let email = JSON.parse(localStorage.getItem("email"));
        // axios.get(`http://localhost:5000/room/${email}`)
        //     .then(res => {
        //         const data = res.data[0];
        //         console.log(data);
        //         setRoomData({...roomData, title: data.title,avatarText: data.avatarText,color: data.color,description: data.description});
        //         console.log(roomData)
        //     })
        //     .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'request could not be sent' : `${err}`)});
     },[])

    React.useEffect(()=>{
        fetchData();
        let email = JSON.parse(localStorage.getItem("email"));
        //user needs to be logged in to access
        if(email === undefined || email === ''){
            navigate("/login");
        }
        // only an owner can access the settings page
        if(roomData.owner !== email && roomData.owner != ''){
            navigate("/study-room-home");
        }

    },[loading])

    // sends updated field to db
    function handleUpdate(e){
        e.preventDefault();
        let avatarIconText = SetAvatarText(roomData.title);
        setRoomData({...roomData, avatarText: avatarIconText});
        // axios.post('http://localhost:5000/room/',roomData)
        //     .then(res => {
        //         console.log(res);
        //         navigate("/study-room-home");
        //     })
        //     .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'request could not be sent' : `${err}`)});
    }

    //deletes the room in db
    function handleDelete(e){
        // axios.post('http://localhost:5000/room/delete',{username:roomData.owner, sID:roomData.sid})
        //     .then(res => {
        //         console.log(res);
        //         navigate("/study-room-home");
        //     })
        //     .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'request could not be sent' : `${err}`)});
    }

    function handleTitleChange(e){
        let avatar = SetAvatarText( e.target.value)
        setRoomData({...roomData, title: e.target.value, avatarText:avatar});
    }

    function handleColorChange(e){
        setRoomData({...roomData, color: e.target.value});
    }

    function handleDescriptionChange(e){
        setRoomData({...roomData, description: e.target.value});
    }

    function SetAvatarText(t){
        let finalText='';
        let displayText = t.split(' ').map(word => word[0]).join('');

        if(displayText.length >4){
            finalText = displayText.substring(0,4);
        }else{
            finalText = displayText;
        }
        return finalText;
    }

    const updateRoom = (
        <React.Fragment>
            <form style={{alignItems: 'center'}} >
                <div style={{width: '85vw', marginTop: '10px'}}>
                <TextField
                    fullWidth
                    id='title'
                    type='title'
                    required
                    label="Title"
                    variant='outlined'
                    margin="normal"
                    value ={roomData.title}
                    onChange = {handleTitleChange}
                />

                <Stack direction='row' spacing={5} marginTop={2} alignItems='center' justifyContent='center'>
                    <InputLabel>Choose a color for the study room icon</InputLabel>
                    <Select style={{width: '40vw', color:'black'}}
                            id="colour"
                            onChange={handleColorChange}
                            value={roomData.color}
                    >
                        <MenuItem value={"#912338"}>
                            <CircleIcon sx={{color: '#912338'}}/> Burgundy
                        </MenuItem>
                        <MenuItem value={"#DB0272"}>
                            <CircleIcon sx={{color: '#DB0272'}}/> Magenta
                        </MenuItem>
                        <MenuItem value={"#DA3A16"}>
                            <CircleIcon sx={{color: '#DA3A16'}}/> Orange
                        </MenuItem>
                        <MenuItem value={"#004085"}>
                            <CircleIcon sx={{color: '#573996'}}/> Mauve
                        </MenuItem>
                        <MenuItem value={"#004085"}>
                            <CircleIcon sx={{color: '#004085'}}/> Dark blue
                        </MenuItem>
                        <MenuItem value={"#0072A8"}>
                            <CircleIcon sx={{color: '#0072A8'}}/> Blue
                        </MenuItem>
                        <MenuItem value={"#057D78"}>
                            <CircleIcon sx={{color: '#057D78'}}/> Turquoise
                        </MenuItem>
                        <MenuItem value={"#508212"}>
                            <CircleIcon sx={{color: '#508212'}}/> Green
                        </MenuItem>
                        <MenuItem value={"#E5A712"}>
                            <CircleIcon sx={{color: '#E5A712'}}/> Yellow
                        </MenuItem>
                        <MenuItem value={"#CBB576"}>
                            <CircleIcon sx={{color: '#CBB576'}}/> Gold
                        </MenuItem>
                    </Select>
                    <Avatar sx={{bgcolor: roomData.color, width: 56, height: 56}}> {SetAvatarText(roomData.title)}

                    </Avatar>
                </Stack>
                </div>
                <div style={{width: '85vw', height: '50vh', marginTop: '10px'}}>
                    <TextField
                        fullWidth
                        id='description'
                        type='description'
                        label="Description"
                        variant='outlined'
                        margin="normal"
                        multiline
                        maxRows={3}
                        onChange={handleDescriptionChange}
                        value={roomData.description}
                    />
                </div>
                <Stack direction='row' spacing={7} marginTop={2}>
                <PrimaryButton3 width={'41vw'} content="Update" onClick={handleUpdate} />
                <PrimaryButton2 width={'41vw'} content="Delete" onClick={handleDelete}/>
                </Stack>
            </form>
        </React.Fragment>
    )
    return(updateRoom);
}




