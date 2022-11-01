import * as React from "react";
import {
    Avatar,
    Checkbox,
    Chip,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    Select,
    Stack,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PrimaryButton} from "../CustomMUIComponents/CustomButtons";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from '@mui/icons-material/Circle';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {CheckBox} from "@mui/icons-material";
import {StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import "./customButton.css"
import axios from "axios";
import {SetLocalStorage} from "../Authentication/SignIn";
import {useNavigate} from "react-router";
import {useState} from "react";

//todo create a list from the friendlist
const friendList = ['eyal','jakelop','jasmin', 'maya', 'kewen', 'mahmoud','ramzi'];

export default function RoomCreation() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [checked, setChecked] = React.useState([]);
    const [roomData, setRoomData] = React.useState({
        title:'',
        color: '',
        avatarText:'',
        description:'',
        participants:[],
    });

    React.useEffect(()=>{
      let user = localStorage.getItem("username")
        setRoomData({...roomData, owner:user});

    })


    const handleCheck =(e) =>{
        let updatedList = [...checked];
        if(e.target.checked){
            updatedList = [...checked, e.target.value];
        }else{
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
        setRoomData({...roomData, participants:updatedList});
    }

    const handleRoomCreation = (e) =>{
        e.preventDefault();
        console.log(roomData.title);
        let avatarIconText = SetAvatarText(roomData.title);
        console.log('avatar text:', avatarIconText);
        setRoomData({...roomData, avatarText: avatarIconText});
        console.log(roomData);
        // window.location = "/study-room-home";

        axios.post('http://localhost:5000/room/',roomData)
            .then(res => {
                console.log(res);
                navigate("/study-room-home");
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'insert proper error message' : `${err}`)});
    }

    function handleTitleChange(e){
        let avatar = SetAvatarText( e.target.value)
        setRoomData({...roomData, title: e.target.value, avatarText:avatar});
        console.log(roomData.title);
    }
    function handleColorChange(e){
        setRoomData({...roomData, color: e.target.value});
        console.log(roomData.color);
    }
    function handleDescriptionChange(e){
        setRoomData({...roomData, description: e.target.value});
        console.log(roomData.description);
        console.log(roomData)
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
                    <InputLabel>Color</InputLabel>
                    <Select style={{width: '40vw', color:'black'}}
                            id="color"
                            label="Choose a color"
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
                    <Avatar sx={{bgcolor: roomData.color, width: 56, height: 56}}> {roomData.avatarText}

                    </Avatar>
                </Stack>
                <div style={{width: '90vw', height: '50vh', marginTop: '10px'}}>
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
                    {/*<div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>*/}
                    <div
                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    </div>
                    <Typography style={{fontWeight: 'bold'}}>
                        Select group members:
                    </Typography>
                    <div style={{overflow:'scroll', height:'35vh', border:'3px solid rgba(0, 0, 0, 0.05'}}>
                        {friendList.map((item,index) => (
                            <div key={index} className="container">
                                {/*style={{paddingLeft:'5px', alignItems: 'center', display:'inline-flex', backgroundColor:'#e9e3d3', borderRadius:'10px',width:'30vw', height:'40px', marginBottom:'10px'}}*/}
                                <input value={item} type="checkbox" onChange={handleCheck} style={{ display:'inline',backgroundColor:'#e9e3d3'}}/>
                                <span className="checkmark">{item}</span>
                                {/*<Chip label={item}  icon={<CheckBox onChange={handleCheck}/>} style={{backgroundColor:'#e9e3d3', marginBottom:'10px', width:'10vw'}}*/}
                                {/*/>*/}

                                {/*<FormControlLabel*/}
                                {/*    value={item}*/}
                                {/*    control={<Checkbox />}*/}
                                {/*    label={item}*/}
                                {/*    labelPlacement="start"*/}
                                {/*    onChange={handleCheck}*/}
                                {/*    style={{backgroundColor:'#e9e3d3', marginBottom:'10px', width:'10vw', borderRadius:'15px'}}*/}
                                {/*/>*/}
                            </div>
                        ))}
                    </div>
                </div>

                <PrimaryButton width={'90vw'} content="Create" />
            </form>
        </React.Fragment>
    )

    return(
        createRoom
    );

    }






