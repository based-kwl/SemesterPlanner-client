import * as React from "react";
import {
    Avatar, 
    InputLabel,
    Select,
    Stack,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { PrimaryButton2 } from '../../CustomMUIComponents/CustomButtons';
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from '@mui/icons-material/Circle';
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import { CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';


export default function EventColorSelector() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [eventSettingData, setEventSettingData] = React.useState({
        title: '',
        color: '',
        avatarText: '',
    });

    React.useEffect(() => {
        let user = localStorage.getItem("username")
        setEventSettingData({ ...eventSettingData, owner: user })
        fetchData();
    }, []
    )

    

    function fetchData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/`,eventSettingData)
            .then(res => {
                // todo set the form data
                console.log(res);
                console.log(res.body)
            })
    }


    const handleEventSetting = (e) => {
        e.preventDefault();
        let avatarIconText = SetAvatarText(eventSettingData.title);
        setEventSettingData({ ...eventSettingData, avatarText: avatarIconText });

        axios.post(`${process.env.REACT_APP_BASE_URL}room`, eventSettingData)
            .then(res => {
                console.log(res);
                navigate("/study-room-home");
            })
            .catch(err => { setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`) });
    }

    function handleTitleChange(e) {
        let avatar = SetAvatarText(e.target.value)
        setEventSettingData({ ...eventSettingData, title: e.target.value, avatarText: avatar });
    }
    function handleColorChange(e) {
        setEventSettingData({ ...eventSettingData, color: e.target.value });
    }

    function changeColor(){
        navigate('/colorsetting');

    }

    function SetAvatarText(t) {
        let finalText = '';
        return finalText;
    }

    const colorOptions = ([
        { name: 'Burgundy', value: '#912338' },
        { name: 'Magenta', value: '#DB0272' },
        { name: 'Orange', value: '#DA3A16' },
        { name: 'Mauve', value: '#573996' },
        { name: 'Darkblue', value: '#004085' },
        { name: 'Blue', value: '#0072A8' },
        { name: 'Turquoise', value: '#057D78' },
        { name: 'Green', value: '#508212' },
        { name: 'Yellow', value: '#E5A712' },
    ]);



    const setColor = (
        <React.Fragment>
            <form style={{ alignItems: 'center' }} onSubmit={handleEventSetting}>
                <Typography variant='h5'>
                    Edit your category title and color
                </Typography>
                <TextField
                    fullWidth
                    id='title'
                    type='title'
                    required
                    label="Title"
                    variant='outlined'
                    margin="normal"
                    value={eventSettingData.title}
                    onChange={handleTitleChange}
                />

                <Stack direction='row' spacing={5} marginTop={2}>
                    <InputLabel>Colour</InputLabel>
                    <Select style={{ width: '40vw', color: 'black' }}
                        id="colour"
                        label="Choose a colour"
                        onChange={handleColorChange}
                        defaultValue={'#0072A8'}

                    >


{/*          
This causes infinite errors on console, so removed it           
{colorOptions.map((color, name) => (

<MenuItem value={[color.value, name.name]}>

    <CircleIcon sx={{ color: color.value }} content={{name: color.name}} />

</MenuItem>

)
)} */}
                                          
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
                    <Avatar sx={{ bgcolor: eventSettingData.color, width: 56, height: 56 }}> {SetAvatarText(eventSettingData.title)}
                    </Avatar>
                </Stack>
                <div style={{ width: '90vw', height: '50vh', marginTop: '10px' }}>

                    <div
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    </div>

                </div>
                <PrimaryButton2 width={'90vw'} colour={'#912338'} content="save" onClick={changeColor} />
            </form>
        </React.Fragment >
    )
    const setColorCard = (
        <React.Fragment>
            <PersistentDrawerLeft />
            <CustomWhiteCard marginTop='50px' width='auto' height='900px' content={setColor} />


        </React.Fragment>
    )
    return (setColorCard)
}