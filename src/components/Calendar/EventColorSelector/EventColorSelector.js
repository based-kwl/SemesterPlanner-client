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
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import { CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';


export default function EventColorSelector() {
    const navigate = useNavigate();
    const [setErrorMessage] = React.useState('')
    const [eventSettingData, setEventSettingData] = React.useState({
        title: '',
        color: '',
        avatarText: '',
    });

    React.useEffect(() => {
        let user = localStorage.getItem("username")
        setEventSettingData({ ...eventSettingData, owner: user })
    }, []
    )


    const handleEventSetting = (e) => {
        e.preventDefault();
        setEventSettingData({ ...eventSettingData, avatarText: eventSettingData.title });

        axios.post(`${process.env.REACT_APP_BASE_URL}room`, eventSettingData)
            .then(() => {
                navigate("/study-room-home");
            })
            .catch(err => { setErrorMessage(`${err}`.substring(44) === '401' ? 'request could not be sent' : `${err}`) });
    }

    function handleTitleChange(e) {
        setEventSettingData({ ...eventSettingData, title: e.target.value, avatarText: e.target.value });
    }
    function handleColorChange(e) {
        setEventSettingData({ ...eventSettingData, color: e.target.value });
    }

    function changeColor(){
        navigate('/colorsetting');

    }

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
                    <Avatar sx={{ bgcolor: eventSettingData.color, width: 56, height: 56 }}> {eventSettingData.title}
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