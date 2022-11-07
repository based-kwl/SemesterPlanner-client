import * as React from "react";
import {
    Avatar, Checkbox,
    InputLabel,
    Select,
    Stack,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PrimaryButton} from "../CustomMUIComponents/CustomButtons";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from '@mui/icons-material/Circle';
import "./customButton.css"
import axios from "axios";
import {useNavigate} from "react-router";
import {useState} from "react";
import {ParticipantCard} from "./StudyRoomCards";


export default function RoomCreation() {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([])
    const [checked, setChecked] = React.useState([]);
    const [roomData, setRoomData] = React.useState({
        title:'',
        owner:'',
        color: '',
        avatarText:'',
        description:'',
        participants:[],
        createdAt:''
    });

    React.useEffect(()=> {
        let email = JSON.parse(localStorage.getItem("email"));
        setRoomData({...roomData, owner: email})
        fetchData();
        },[])
    // API call to get the list of friends for the logged in user
    function fetchData() {
        const email = JSON.parse(localStorage.getItem("email"));
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/${email}`)
            .then(res => {
                setFriends( res.data);
            })
    }
    const handleCheck =(e) =>{
        let updatedList = [...checked];
        if(e.target.checked){
            updatedList = [...checked, e.target.value];
        }else{
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
        console.log('list:', updatedList)
        setRoomData({...roomData, participants:updatedList});
    }

    const handleRoomCreation = (e) =>{
        e.preventDefault();
        let avatarIconText = SetAvatarText(roomData.title);
        //add the owner to the list
        let participantsList = roomData.participants.push(roomData.owner);
        setRoomData({...roomData, avatarText: avatarIconText, participants: participantsList});
        console.log(roomData);
        //API call the post study room info to create a new room
        axios.post(`${process.env.REACT_APP_BASE_URL}room/`,roomData)
            .then(() => {
                navigate("/study-room-home");
            })
            .catch(err => {console.log('Error:', err)});
        window.location.reload();
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
        }else
            finalText = displayText;
        return finalText;
    }

    const createRoom = (
        <React.Fragment>
            <form style={{alignItems: 'center'}} onSubmit={handleRoomCreation}>
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

                <Stack direction='row' spacing={5} marginTop={2}>
                    <InputLabel>Colour</InputLabel>
                    <Select style={{width: '40vw', color:'black'}}
                            id="colour"
                            label="Choose a colour"
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
                <div style={{width: '90vw', height: '45vh', marginTop: '10px'}}>
                    <TextField
                        fullWidth
                        id='description'
                        type='description'
                        label="Description"
                        variant='outlined'
                        margin="normal"
                        multiline
                        maxRows={1}
                        onChange={handleDescriptionChange}
                        value={roomData.description}
                    />
                    <Typography style={{fontWeight: 'bold'}}>
                        Select group members:
                    </Typography>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center', overflow:'auto', height:'30vh', border:'3px solid rgba(0, 0, 0, 0.05'}}>
                        {friends.map((friend,index) => (
                            <div key={index} style={{ margin:'-5px'}}>
                                <ParticipantCard width={'81vw'} height={'40px'}
                                                 content={<> {friend}
                                                     <Checkbox
                                                         value={friend}
                                                         onChange={handleCheck}
                                                         inputProps={{'aria-label': 'controlled'}}
                                                         style={{color: '#057D78'}}
                                                     />
                                                 </>}/>
                            </div>
                        ))}
                    </div>
                </div>
                <PrimaryButton width={'90vw'} content="Create" />
            </form>
        </React.Fragment>
    )
    return(createRoom)
}