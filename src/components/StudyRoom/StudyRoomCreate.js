import * as React from "react";
import {Avatar, InputLabel, Select, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PrimaryButton} from "../CustomMUIComponents/CustomButtons";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from '@mui/icons-material/Circle';


//todo create a list from the friendlist
export default function RoomCreation() {
    const [roomData, setRoomData] = React.useState({
        title:'',
        colour: '',
        avatarText:'',
        description:''
    });

    const handleRoomCreation = (e) =>{
        e.preventDefault();
        console.log(roomData.title);
        let avatarIconText = SetAvatarText(roomData.title);
        console.log('avatar text:', avatarIconText);
        setRoomData({...roomData, avatarText: avatarIconText});
        console.log(roomData);
        window.location = "/study-room-home";
    }

    function handleTitleChange(e){
        setRoomData({...roomData, title: e.target.value});
        console.log(roomData.title);
    }
    function handleColorChange(e){
        setRoomData({...roomData, colour: e.target.value});
        console.log(roomData.colour);
    }
    function handleDescriptionChange(e){
        setRoomData({...roomData, description: e.target.value});
        console.log(roomData.description);
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
                            value={roomData.colour}
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
                    <Avatar sx={{bgcolor: roomData.colour, width: 56, height: 56}}> {SetAvatarText(roomData.title)}

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
                </div>

                <PrimaryButton width={'90vw'} content="Create" />
            </form>
        </React.Fragment>
    )
    return(
        createRoom
    );
}





