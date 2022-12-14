import * as React from 'react';
import { Radio, RadioGroup, Typography } from "@mui/material";
import {  BackgroundCard,CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import DescriptionIcon from '@mui/icons-material/Description';
import BottomDrawer from "../../StudyRoom/BottomDrawer"
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'

import { useCallback, useEffect , useState} from "react";
import { CalendarDatePicker, CalendarTextField, CalendarTimePicker, UpdateCancelButton, CompleteEditEvent } from '../Custom/CustomCalendarForms';
import EventInfoDisplay from './EventInfo';

export default function EditEvent() {
    const [isRecurrent, setIsRecurrent] = React.useState(false);
    const eventId = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const [eventData, setEventData] = React.useState({});
    const navigate = useNavigate();
    const [eventError, setEventError] = React.useState({ message: "Error, please try again later", hasError: false });
    const[loading,setLoading] = useState(true);

    const fetchData = useCallback(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}events/event/${eventId}`)
            .then((res) => {
                setEventData(res.data)
                console.log(res.data);

            }
            ).catch((err) => {
                setEventError({ ...eventError, message: err.message });
                setLoading(false);

            });
    }, [])

    React.useEffect(() => {
         fetchData();
     }, [loading])
 

    const recurrenceSelection = (
        <FormControl>
            <RadioGroup row onChange={handleRecurrenceChange}>
                <FormControlLabel defaultChecked={true} value="daily" control={<Radio data-test="everyDay" />} label="Every Day" />
                <FormControlLabel value="weekly" control={<Radio data-test="everyWeek" />} label="Every Week" />
                <FormControlLabel value="monthly" control={<Radio data-test="everyMonth"  />} label="Every Month" />
            </RadioGroup>

            {/** Event End Date */}
            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CalendarDatePicker
                        data-test="eventEndDate"
                        key={"endDate"}
                        label="Ending date"
                        value={eventData.endDate}
                        onChange={(e) => setEventData({ ...eventData, endDate: e.$d })}
                    />
                </LocalizationProvider>
            </div>
        </FormControl>
    );

    function handleRecurrenceChange(e) {
        setEventData({ ...eventData, reccurence: e.target.value })
    }

    function handleEvent() {
        axios.post(`${process.env.REACT_APP_BASE_URL}events/update`, eventData)
            .then(() => {
                navigate('/calendar');
            })
            .catch(err => {
                setEventError({ ...eventError, message: "Error connecting to database. " + err });
                setEventError({ ...eventError, hasError: true });
            });

    }

    function handleEditEventHeaderChange(e) {
        setEventData({ ...eventData, eventHeader: e.target.value })
    }

    function handleEditDescriptionChange(e) {
        setEventData({ ...eventData, description: e.target.value })
    }

    function handleEditStartDateChange(e) {
        setEventData({ ...eventData, startDate: e.$d })
    }

    function handleEditStartTimeChange(e) {
        setEventData({ ...eventData, startTime: e.target.value })
    }

    function handleEditEndTimeChange(e) {
        setEventData({ ...eventData, endTime: e.target.value })
    }

    const PageError = eventError.hasError ? (
        <Typography align="center" color="#DA3A16">
            {eventError.message}
        </Typography>
    ) : null;
    function deleteData(eventId) {
        axios.delete(`${process.env.REACT_APP_BASE_URL}events/${eventId}`)
            .then((res) => {

            }
            ).catch((err) => {
                setEventError({ ...eventError, message: err.message});            });

    }
    function handleIsReccurentChange() {
        setIsRecurrent((prev) => !prev);
    }

    const editUpdateButtons = (
        <React.Fragment>
              <BottomDrawer icon={<DescriptionIcon style={{color: '#912338', height: '4vh', width: '4vh'}}/>}
                               title={'Edit Event'} content={<EventInfoDisplay />}/>
            <UpdateCancelButton backgroundColor={'#912338'} content="Update" onClick={() => { handleEvent() }} />
            <UpdateCancelButton backgroundColor={'#C8C8C8'} content="Cancel" onClick={() => { navigate('/calendar') }} />
        </React.Fragment>
    );

    const editEventForm = (
        <React.Fragment>
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '0px', paddingBottom: '10px' }}>{PageError}</div>
 
                <div align='center' style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <CalendarTextField
                            data_test="eventHeader"
                            id='eventHeader'
                            value={eventData.eventHeader}
                            InputLabelProps={{ shrink: "Event Name" }}
                            label="Event Name"
                            variant='outlined'
                            onChange={handleEditEventHeaderChange}
                            inputProps={{readOnly: true}}
                            
                        />
                    </div>

                    {/** Event description */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <CalendarTextField
                            data_test="eventDescription"
                            id='description'
                            InputLabelProps={{ shrink: "Description" }}
                            value={eventData.description}
                            label="Description"
                            variant='outlined'
                            onChange={handleEditDescriptionChange}
                            inputProps={{readOnly: true}}

                        />
                    </div>

                    {/** Event link */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <CalendarTextField
                            data_test="eventLink"
                            id='eventLink'
                            value={eventData.link}
                            label="Event Link"
                            variant='outlined'
                            onChange={(e) => setEventData({ ...eventData, link: e.target.value })}
                            inputProps={{readOnly: true}}

                   />
                    </div>


                    {/** Event Start Date */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CalendarDatePicker
                                data-test="eventStartDate"
                                id='eventStartDate'
                                key={"startDate"}
                                label="Starting date"
                                value={eventData.startDate}
                                onChange={handleEditStartDateChange}
                                inputProps={{readOnly: true}}

                            />
                        </LocalizationProvider>
                    </div>

                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Grid container spacing={2} alignItems="flex-end">

                            {/** Event Start Time */}
                                <CalendarTimePicker
                                    data-test="eventStartTime"
                                    id="startTime"
                                    label="Start Time"
                                    value={eventData.startTime}
                                   onChange={handleEditStartTimeChange}

                                />

                            {/** Event End Time */}
                                <CalendarTimePicker
                                    data-test="eventEndTime"
                                    id="endTime"
                                    label="EndTime Time"
                                    value={eventData.endTime}
                                    onChange={handleEditEndTimeChange}

                                />
                        </Grid>
                    </div>
                </div>

                <FormControlLabel sx={{ display: 'block' }} label="Recurrent" control={
                    <Switch
                        data-test="eventSwitch"
                        sx={{ color: '#912338' }}
                        checked={isRecurrent}
                        onChange={handleIsReccurentChange}
                    />
                } />
                <div>{isRecurrent && recurrenceSelection}</div>
                <div>{editUpdateButtons}</div>
            </form>
        </React.Fragment>
    )

    const editEventCard = (
        <React.Fragment>
            <CustomWhiteCard width='326px' height='840px' marginTop='50px' content={editEventForm} />
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '60px' }}>
                <BackgroundCard width='372px' height='900px'  content={editEventCard} />
            </div>
        </React.Fragment>
    );
    }