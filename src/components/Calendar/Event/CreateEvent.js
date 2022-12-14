import * as React from 'react';
import {Radio, RadioGroup, Typography} from "@mui/material";
import { BackgroundCard, CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {PrimaryButton2, SecondaryButton2 } from '../../CustomMUIComponents/CustomButtons';
import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import GetAuthentication from "../../Authentication/Authentification";


export default function CreateEvent() {
    const [isRecurrent, setIsRecurrent] = React.useState(false);
    const [eventData, setEventData] = React.useState({
        username: GetAuthentication().username,
        eventHeader: '',
        description: '',
        link: '',
        startDate: new Date(),
        endDate: new Date(),
        startTime: '12:00',
        endTime: '12:00',
        reccurence: 'once'
    })
    const [eventError, setEventError] = React.useState({ message: "Error, please try again later", hasError: false });
    const navigate = useNavigate();

    const recurrenceSelection = (
        <FormControl>
            <RadioGroup row onChange={handleReccurenceChange}>
                <FormControlLabel defaultChecked={true} value="daily" control={<Radio />} label="Every Day" />
                <FormControlLabel value="weekly" control={<Radio />} label="Every Week" />
                <FormControlLabel value="monthly" control={<Radio />} label="Every Month" />
            </RadioGroup>

            {/** Event End Date */}
            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        key={"endDate"}
                        label="Ending date"
                        inputFormat="MM/DD/YYYY"
                        value={eventData.endDate}
                        onChange={(e) => setEventData({...eventData, endDate: e.$d})}
                        renderInput={(params) => <TextField {...params}  sx={{width: '100%'}}/>}
                    />
                </LocalizationProvider>
            </div>
        </FormControl>
    );



    function handleReccurenceChange(e) {
        setEventData({ ...eventData, reccurence: e.target.value})
    }

    function handleEvent() {
        // TODO:  validate user inputs if have time
        navigate('/calendar');
        axios.post(`${process.env.REACT_APP_BASE_URL}events/add`, eventData)
            .then(() => {
                navigate('/calendar');
            })
            .catch(err => {
                setEventError({ ...eventError, message: "Error connecting to database. " + err });
                setEventError({ ...eventError, hasError: true });
            });
    }

    function handleCancel() {
        navigate('/calendar')
    }

    function handleEventHeaderChange(e) {
        setEventData( {...eventData, eventHeader: e.target.value })
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
        setIsRecurrent((prev) =>  !prev);
    }

    const buttons = (
        <React.Fragment>
            <div style={{ paddingTop: '20px'}}>
                <PrimaryButton2 width='305px' colour={'#912338'} content="Add" onClick={handleEvent} />
            </div>
            <div style={{ paddingTop: '20px'}}>
                <SecondaryButton2 width='305px' content="Cancel" onClick={handleCancel} />
            </div>
        </React.Fragment>
    );


    const addEventForm = (
        <React.Fragment>
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>{PageError}</div>
                <Typography align='center' style={{ fontFamily: 'Roboto', fontSize: '30px', fontWeight: 'bold' }}>
                    Add New Event
                </Typography>
                <div align='center' style={{ paddingTop: '16px', paddingBottom: '20px' }}>

                    {/** Event name */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <TextField
                            fullWidth
                            id='eventHeader'
                            value={eventData.eventHeader}
                            required
                            label="Event Name"
                            variant='outlined'
                            onChange={handleEventHeaderChange}
                        />
                    </div>

                    {/** Event description */}
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

                    {/** Event link */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <TextField
                            fullWidth
                            id='eventLink'
                            value={eventData.link}
                            required
                            label="Event Link"
                            variant='outlined'
                            onChange={(e) => setEventData({ ...eventData, link: e.target.value})}
                        />
                    </div>


                    {/** Event Start Date */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                key={"startDate"}
                                label="Starting date"
                                inputFormat="MM/DD/YYYY"
                                value={eventData.startDate}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField {...params}  sx={{width: '100%'}}/>}
                            />
                        </LocalizationProvider>
                    </div>

                    <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                        <Grid container spacing={2} alignItems="flex-end">
                            {/** Event Start Time */}
                            <Grid item sm={6} xs={6} md={6} key={1}>
                                    <TextField
                                        id="startTime"
                                        label="Start Time"
                                        type="time"
                                        defaultValue="12:00"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        onChange={handleStartTimeChange}
                                        sx={{ width: '100%'}}
                                    />
                                </Grid>

                            {/** Event End Time */}
                            <Grid item sm={6} xs={6} md={6} key={2}>
                                    <TextField
                                        id="endTime"
                                        label="EndTime Time"
                                        type="time"
                                        defaultValue="12:00"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        onChange={handleEndTimeChange}
                                        sx={{ width: '100%'}}
                                    />
                                </Grid>
                        </Grid>
                    </div>
                </div>

                <FormControlLabel sx={{display: 'block'}} label="Recurrent" control={
                    <Switch
                        sx={{color: '#912338'}}
                        checked={isRecurrent}
                        onChange={handleIsReccurentChange}
                    />
                }/>
                <div>{ isRecurrent && recurrenceSelection }</div>
                <div>{ buttons }</div>
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
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '60px' }}>
                <BackgroundCard width='372px' height='900px'  content={addEventCard} />
            </div>
        </React.Fragment>
    );
}