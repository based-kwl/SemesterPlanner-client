import * as React from 'react';
import { Radio, RadioGroup, Typography } from "@mui/material";
import { BackgroundCard, CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import { PrimaryButton2, SecondaryButton2 } from '../../CustomMUIComponents/CustomButtons';
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { CalendarDatePicker, CalendarTextField, CalendarTimePicker, UpdateCancelButton, CompleteEditEvent, EditButton, CancelButton } from '../Custom/CustomCalendarForms';

export default function EditEvent() {
    const [isRecurrent, setIsRecurrent] = React.useState(false);
    const eventId = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const [eventData, setEventData] = React.useState({
    })
    const navigate = useNavigate();
    const [eventError, seteventError] = React.useState({ message: "Error, please try again later", hasError: false });

    const fetchData = useCallback(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}events/event/${eventId}`)
            .then((res) => {
                setEventData(
                    res.data
                )
            }
            ).catch((err) => {
                seteventError({ ...eventError, message: err.message });
            });
    }, [])

    useEffect(() => {
        fetchData();
    }, [])

    const reccurenceSelection = (
        <FormControl>
            <RadioGroup row onChange={handleReccurenceChange}>
                <FormControlLabel defaultChecked={true} value="daily" control={<Radio />} label="Every Day" />
                <FormControlLabel value="weekly" control={<Radio />} label="Every Week" />
                <FormControlLabel value="monthly" control={<Radio />} label="Every Month" />
            </RadioGroup>

            {/** Event End Date */}
            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <CalendarDatePicker
                        key={"endDate"}
                        label="Ending date"
                        value={eventData.endDate}
                        onChange={(e) => setEventData({ ...eventData, endDate: e.$d })}
                    />
                </LocalizationProvider>
            </div>
        </FormControl>
    );

    function handleReccurenceChange(e) {
        setEventData({ ...eventData, reccurence: e.target.value })
    }

    function handleEvent() {
        // TODO:  validate user inputs if have time
        axios.post(`${process.env.REACT_APP_BASE_URL}events/update`, eventData)
            .then(() => {
                navigate('/calendar');
            })
            .catch(err => {
                seteventError({ ...eventError, message: "Error connecting to database. " + err });
                seteventError({ ...eventError, hasError: true });

            });
    }

    function handleCancel() {
        navigate('/calendar')
    }



    function handleEventHeaderChange(e) {
        setEventData({ ...eventData, eventHeader: e.target.value })
    }


    function handleDescriptionChange(e) {
        setEventData({ ...eventData, description: e.target.value })
    }

    function handleStartDateChange(e) {
        setEventData({ ...eventData, startDate: e.$d })
    }

    function handleStartTimeChange(e) {
        setEventData({ ...eventData, startTime: e.target.value })
    }

    function handleEndTimeChange(e) {
        setEventData({ ...eventData, endTime: e.target.value })
    }

    const PageError = eventError.hasError ? (
        <Typography align="center" color="#DA3A16">
            {eventError.message}
        </Typography>
    ) : null;

    function handleIsReccurentChange() {
        setIsRecurrent((prev) => !prev);
    }

    const buttons = (
        <React.Fragment>
          
    
            <UpdateCancelButton backgroundColor={'#912338'} content="Update" onClick={() => { handleEvent() }} />
            <UpdateCancelButton backgroundColor={'#C8C8C8'} content="Cancel" onClick={() => { handleEvent() }} />

        </React.Fragment>
    );

    const addEventForm = (
        <React.Fragment>
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>{PageError}</div>
                <Typography align='center' style={{ fontFamily: 'Roboto', fontSize: '30px', fontWeight: 'bold' }}>
                    Edit Event
                </Typography>
                <div align='center' style={{ paddingTop: '16px', paddingBottom: '20px' }}>


                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>

                        <CalendarTextField
                            id='eventHeader'
                            value={eventData.eventHeader}
                            InputLabelProps={{ shrink: "Event Name" }}
                            label="Event Name"
                            variant='outlined'
                            onChange={handleEventHeaderChange}

                        />
                    </div>

                    {/** Event description */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>

                        <CalendarTextField
                            id='description'
                            InputLabelProps={{ shrink: "Description" }}
                            value={eventData.description}
                            label="Description"
                            variant='outlined'
                            onChange={handleDescriptionChange}

                        />

                    </div>

                    {/** Event link */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>

                        <CalendarTextField
                            id='eventLink'
                            value={eventData.link}
                            label="Event Link"
                            variant='outlined'
                            onChange={(e) => setEventData({ ...eventData, link: e.target.value })}
                        />
                    </div>


                    {/** Event Start Date */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <CalendarDatePicker
                                key={"startDate"}
                                label="Starting date"
                                value={eventData.startDate}
                                onChange={handleStartDateChange}
                            />
                        </LocalizationProvider>
                    </div>

                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Grid container spacing={2} alignItems="flex-end">
                            {/** Event Start Time */}
                                <CalendarTimePicker
                                    id="startTime"
                                    label="Start Time"
                                    onChange={handleStartTimeChange}

                                />

                            {/** Event End Time */}
                    
                                <CalendarTimePicker
                                    id="endTime"
                                    label="EndTime Time"
                                    onChange={handleEndTimeChange}

                                />
                        </Grid>
                    </div>
                </div>

                <FormControlLabel sx={{ display: 'block' }} label="Recurrent" control={
                    <Switch
                        sx={{ color: '#912338' }}
                        checked={isRecurrent}
                        onChange={handleIsReccurentChange}
                    />
                } />
                <div>{isRecurrent && reccurenceSelection}</div>
                <div>{buttons}</div>
            </form>
        </React.Fragment>
    )

    const addEventCard = (
        <React.Fragment>
            <CustomWhiteCard width='326px' height='840px' marginTop='50px' content={addEventForm} />
        </React.Fragment>
    )

    return (
        <React.Fragment>
           
            <CompleteEditEvent
                content={addEventCard}
            />
        </React.Fragment>
    );
}