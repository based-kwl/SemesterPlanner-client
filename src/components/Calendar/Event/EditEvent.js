import * as React from 'react';
import { Radio, RadioGroup, Typography } from "@mui/material";
import { BackgroundCard, CustomWhiteCard, StudyRoomChatCard } from '../../CustomMUIComponents/CustomCards';
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
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useEffect, useState } from "react";
import { CalendarDatePicker, CalendarTextField, CalendarTimePicker, UpdateCancelButton, CompleteEditEvent } from '../Custom/CustomCalendarForms';
import EventInfoDisplay from './EventInfo';

export default function EventDetails() {
    const [isRecurrent, setIsRecurrent] = React.useState(false);
    const eventId = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const [eventData, setEventData] = React.useState({});
    const [eventError, setEventError] = React.useState({ message: "Error, please try again later", hasError: false });
    const [loading, setLoading] = useState(true);

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


    const PageError = eventError.hasError ? (
        <Typography align="center" color="#DA3A16">
            {eventError.message}
        </Typography>
    ) : null;
 

    const eventInfoForm = (
        <React.Fragment>
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '0px', paddingBottom: '10px' }}>{PageError}</div>
                <Typography align='center' style={{ paddingTop: '5px', fontFamily: 'Roboto', fontSize: '30px', fontWeight: 'bold' }}>
                    Event Details
                </Typography>
                <div align='center' style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '16px', paddingBottom: '20px' }}>
                    <Grid justifyContent="center" container spacing={1} alignItems="flex-end">
                        <Grid item xs={12} md={12}>
                            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                <CalendarTextField
                                    data_test="eventHeader"
                                    id='eventHeader'
                                    value={eventData.eventHeader}
                                    InputLabelProps={{ shrink: "Event Name" }}
                                    label="Event Name"
                                    variant='outlined'
                                    inputProps={{ readOnly: true }}

                                />
                            </div>
                        </Grid>

                        {/** Event description */}
                        <Grid item xs={12} md={12}>

                            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                <CalendarTextField
                                    data_test="eventDescription"
                                    id='description'
                                    InputLabelProps={{ shrink: "Description" }}
                                    value={eventData.description}
                                    label="Description"
                                    variant='outlined'
                                    inputProps={{ readOnly: true }}

                                />
                            </div>
                        </Grid>

                        {/** Event link */}

                        <Grid item xs={12} md={12}>

                            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                <CalendarTextField
                                    data_test="eventLink"
                                    id='eventLink'
                                    value={eventData.link}
                                    label="Event Link"
                                    variant='outlined'
                                    inputProps={{ readOnly: true }}

                                />
                            </div>
                        </Grid>

                        {/** Event Start Date */}
                        <Grid item xs={12} md={12}>

                            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <CalendarTextField
                                        data-test="eventStartDate"
                                        id='eventStartDate'
                                        key={"startDate"}
                                        label="Starting date"
                                        value={eventData.startDate}
                                        inputProps={{ readOnly: true }}

                                    />
                                </LocalizationProvider>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={12}>

                            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>


                                {/** Event Start Time */}
                                <CalendarTextField
                                    data-test="eventStartTime"
                                    id="startTime"
                                    label="Start Time"
                                    value={eventData.startTime}
                                    inputProps={{ readOnly: true }}
                                />
                            </div>

                        </Grid>
                        <Grid item xs={12} md={12}>

                            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>

                                {/** Event End Time */}
                                <CalendarTextField
                                    data-test="eventEndTime"
                                    id="endTime"
                                    label="EndTime Time"
                                    value={eventData.endTime}
                                    inputProps={{ readOnly: true }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </React.Fragment>
    )

    const editEventCard = (
        <React.Fragment>
            {/*Card containing uneditable form with event details */}
            <StudyRoomChatCard bottomRightRadius='0px' width='330px' height='740px' marginTop='50px' content={eventInfoForm} />
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw' }}>
                {/*Drawer settings icon */}
                <StudyRoomChatCard width='342px' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                    bottomLeftRadius='10px' bottomRightRadius='10px' content={<div
                        style={{ width: '100%', height: '100%', background: 'none', border: 'none' }}
                    ><BottomDrawer icon={<EditIcon style={{ color: '#912338', height: '4vh', width: '4vh' }} />}
                        title={'Edit Event'} content={<EventInfoDisplay />} /></div>} />
            </div>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '60px' }}>
                <BackgroundCard width='372px' height='900px' content={editEventCard} />
            </div>
        </React.Fragment>
    );
}