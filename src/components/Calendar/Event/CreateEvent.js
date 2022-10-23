import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, InputAdornment } from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import { BackgroundCard, CustomWhiteCard, EventCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axios from 'axios';
import { useNavigate } from "react-router";
import {PrimaryButton2, SelectButton} from '../../CustomMUIComponents/CustomButtons';


export default function CreateEvent() {
    const [eventData, setEventData] = React.useState({
        eventHeader: '',
        description: '',
        startDate: '',
        startTime: '',
        endTime: '',
        endDate: '',
    })
    const [eventError, seteventError] = React.useState({ message: "Error, please try again later", hasError: false });
    const navigate = useNavigate();

    function handleEvent() {
        console.log(eventData);
                        navigate('/calendar');

        // axios.post('http://localhost:5000/users/add', eventData)
        //     .then(() => {
        //         console.log();
        //         navigate('/calendar');
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         seteventError({ ...eventError, message: "Error connecting to database" });
        //         seteventError({ ...eventError, hasError: true });
        //         console.log(eventError);
        //         console.log(`Error: ${err}`)
        //     });
    }

    function handleEventHeaderChange(e) {
        setEventData({ ...eventData, eventHeader: e.target.value })
    }
    function handleDescriptionChange(e) {
        setEventData({ ...eventData, description: e.target.value })
    }
    function handleStartDateChange(e) {
        setEventData({ ...eventData, startDate: e.target.value })
    }
    function handleStartTimeChange(e) {
        setEventData({ ...eventData, startTime: e.target.value })
    }
    function handleEndTimeChange(e) {
        setEventData({ ...eventData, endTime: e.target.value })
    }
    function handleEndDateChange(e) {
        setEventData({ ...eventData, endDate: e.target.value })
    }
    const PageError = eventError.hasError ? (
        <Typography align="center" color="#DA3A16">
            {eventError.message}
        </Typography>
    ) :
        (<React.Fragment />);


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // const user = {
    //     //     email,
    //     //     password,
    //     // }
    // }
    const addEventForm = (
        <React.Fragment>
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>{PageError}</div>
                <Typography align='center' style={{ fontFamily: 'Roboto', fontSize: '30px', fontWeight: 'bold' }}>
                    Add Event
                </Typography>
                <div align='center' style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <TextField
                            fullWidth
                            id='eventHeader'
                            value={eventData.eventHeader}
                            required
                            label="Event Name"
                            variant='outlined'
                            //   className={error ? 'error' : ''}
                            onChange={handleEventHeaderChange}
                        //type='eventName'
                        //  onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <TextField
                            fullWidth
                            id='description'
                            value={eventData.description}
                            label="Description"
                            variant='outlined'
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <TextField
                            fullWidth
                            id='startDate'
                            value={eventData.startDate}
                            label="Start Date"
                            variant='outlined'
                            onChange={handleStartDateChange}
                        />
                    </div>

                    {/* <DateTimePicker 
                        label="Date desktop"
                        id='startDate'
                        value={eventData.startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />} /> */}

                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <TextField
                            fullWidth
                            id='endDate'
                            value={eventData.endDate}
                            label="End Date"
                            variant='outlined'
                            onChange={handleEndDateChange}
                        />
                    </div>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <TextField
                            fullWidth
                            id='startTime'
                            value={eventData.startTime}
                            label="Start Time"
                            variant='outlined'
                            onChange={handleStartTimeChange}
                        />
                    </div>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <TextField
                            fullWidth
                            id='endTime'
                            value={eventData.endTime}
                            label="Start Date"
                            variant='outlined'
                            onChange={handleEndTimeChange}
                        />
                    </div>
                    <PrimaryButton2 width='305px' content="Register" onClick={handleEvent} />

                    <button
                        // onClick={onClose}
                        id="cancelButton">Cancel</button>
                </div>

            </form>
        </React.Fragment>
    )
    const addEventCard = (
        <React.Fragment>
            <CustomWhiteCard width='326px' height='780px' marginTop='50px' content={addEventForm} />
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '60px' }}>
                <BackgroundCard width='372px' height='785px' content={addEventCard} />
            </div>
        </React.Fragment>
    );

}