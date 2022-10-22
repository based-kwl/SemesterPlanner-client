import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, InputAdornment } from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import { BackgroundCard, CustomWhiteCard, EventCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function CreateEvent({ onSave, onClose }) {
    const [eventData, setEventData] = React.useState({
        eventHeader: '',
        description: '',
        startDate: '',
        startTime: '',
        endTime: '',
        endDate: '',
    })
    const [eventError, seteventError] = React.useState({ message: "Error, please try again later", hasError: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        // const user = {
        //     email,
        //     password,
        // }
    }
    const addEventForm = (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Box>
                    <Typography align='center' style={{ fontFamily: 'Roboto', fontSize: '30px', fontWeight: 'bold' }}>
                        Add Event
                    </Typography>
                    <div align='center' style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <TextField
                                value={eventData}
                                className={eventError ? 'error' : ''}
                                onChange={e => setEventData(e.target.value)}
                                fullWidth
                                id='eventName'
                                type='eventName'
                                required
                                label="Event Name"
                                variant='outlined'
                            //  onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>
                        <button
                            onClick={() => {
                                if (eventData) {
                                    seteventError(false);
                                    onSave(eventData);
                                } else {
                                    seteventError(true);
                                }
                            }}
                            id="saveButton">Save</button>
                        <button
                            onClick={onClose}
                            id="cancelButton">Cancel</button>
                    </div>

                </Box>
            </form>
        </React.Fragment>
    )
    const addEventCard = (
        <React.Fragment>
            <CustomWhiteCard width='326px' height='400px' marginTop='50px' content={addEventForm} />
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