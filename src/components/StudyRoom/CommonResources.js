import {Avatar, InputLabel, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
import * as React from "react";
import Card from "@mui/material/Card";

export function RoomDataComponents({roomState, roomStateSetter}) {
    function SetAvatarText(t) {
        let finalText;
        let displayText = t.split(' ').map(word => word[0]).join('');

        if (displayText.length > 4) {
            finalText = displayText.substring(0, 4);
        } else
            finalText = displayText;
        return finalText;
    }

    function handleTitleChange(e) {
        let avatar = SetAvatarText(e.target.value)
        roomStateSetter({...roomState, title: e.target.value, avatarText: avatar});
    }

    function handleColorChange(e) {
        roomStateSetter({...roomState, color: e.target.value});
    }

    function handleDescriptionChange(e) {
        roomStateSetter({...roomState, description: e.target.value});
    }

    return (
        <>
            <TextField
                fullWidth
                id='title'
                type='title'
                required
                label="Title"
                variant='outlined'
                margin="normal"
                value={roomState.title}
                onChange={handleTitleChange}
            />
            <Stack direction='row' spacing={5} marginTop={2}>
                <InputLabel>Colour</InputLabel>
                <Select style={{width: '40vw', color: 'black'}}
                        id="colour"
                        label="Choose a colour"
                        onChange={handleColorChange}
                        value={roomState.color}
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
                <Avatar sx={{bgcolor: roomState.color, width: 56, height: 56}}> {SetAvatarText(roomState.title)}
                </Avatar>
            </Stack>
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
                value={roomState.description}
            />
        </>
    )
}

export const StudyRoomCard = ({width, height, content,paddingLeft='10px', backgroundColor='#F0F0F0',data_test}) => {
    return (
        <Card variant='outlined'
              data-test={data_test}
              style={{
            display: 'flex',
            flexDirection:'row',
            width: width,
            height:  height,
            backgroundColor: backgroundColor,
            marginBottom: '15px',
            paddingLeft: paddingLeft,
            justifyContent:'space-between',
            alignItems: 'center',
        }}>
            {content}
        </Card>
    )
}