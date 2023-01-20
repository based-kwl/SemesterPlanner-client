import * as React from 'react';
import {Radio, RadioGroup, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {PrimaryButton2} from '../../CustomMUIComponents/CustomButtons';
 import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import GetAuthentication from "../../Authentication/Authentification";
import {  EventForm } from '../Custom/CommonInputEventForm';
import { Stack } from '@mui/system';
import Grid from "@mui/material/Grid";


export default function CreateEvent(props) {
    const [isRecurrent, setIsRecurrent] = React.useState(false);
    const [eventData, setEventData] = React.useState({
        username: GetAuthentication().username,
        eventHeader: '',
        description: '',
        link: '',
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        recurrence: 'once',
        type: ''
    })
    const [eventError, setEventError] = React.useState({ message: "Error, please try again later", hasError: false });

    const recurrenceSelection = (
        <FormControl>
            <RadioGroup row onChange={handleRecurrenceChange}>
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



    function handleRecurrenceChange(e) {
        setEventData({ ...eventData, recurrence: e.target.value})
    }

    function handleEvent() {
        console.log(eventData)
        // TODO:  validate user inputs if have time
        axios.post(`${process.env.REACT_APP_BASE_URL}events/add`, eventData)
            .then((res) => {
                document.elementFromPoint(0, 0).click();

                if (props.onDrawerClose)
                    props.onDrawerClose(res.data, 2);
            })
            .catch(err => {
                setEventError({ ...eventError, message: "Error connecting to database. " + err });
                setEventError({ ...eventError, hasError: true });
            });
    }

    function handleCancel() {
        document.elementFromPoint(0, 0).click();
    }

    function handleTypeUpdate(e){
        setEventData({...eventData, type: e.target.value})
        console.log('type', eventData.type)
    }

    const PageError = eventError.hasError ? (
        <Typography align="center" color="#DA3A16">
            {eventError.message}
        </Typography>
    ) : null;

    function handleIsRecurrentChange() {
        setIsRecurrent((prev) =>  !prev);
    }

    const buttons = (
        <React.Fragment>
                                   <Stack direction='row' spacing={7} marginTop={2}>

                 <PrimaryButton2  width={'41vw'} colour={'#912338'} content="Add" onClick={handleEvent} />
                 <PrimaryButton2 width={'41vw'} colour={'#C8C8C8'} content="Cancel" onClick={handleCancel} />
                 </Stack>
          </React.Fragment>
    );
     const categories = (
         <React.Fragment>
             <Grid container spacing={{ xs: 2 }} style={{border:'1px solid black'}} >
                 <Grid item xs={4}>
                     <PrimaryButton2 width={'33%'} colour={'#CCE3E4'} content="Course" value="course" onClick={handleTypeUpdate}>Course</PrimaryButton2>
                 </Grid>
                 <Grid item xs={8}>
                     <PrimaryButton2 width={'66%'} colour={'#E9E3D3'} content="Study" value="study" onClick={handleTypeUpdate}>Course</PrimaryButton2>
                 </Grid>
                 <Grid item xs={4}>
                     <PrimaryButton2 width={'15vw'} colour={'#F9CDC3'} content="Gym" value="gym" onClick={handleTypeUpdate}>Course</PrimaryButton2>
                 </Grid>
                 <Grid item xs={4}>
                     <PrimaryButton2 width={'15vw'} colour={'#FACDE3'} content="Appointment" value="appointment" onClick={handleTypeUpdate}>Course</PrimaryButton2>
                 </Grid>
             </Grid>
         </React.Fragment>
     )


    return (
        <React.Fragment>
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>{PageError}</div>

                <div align='center' style={{ paddingTop: '10px', paddingBottom: '20px', border:'1px solid black' }}>

                <EventForm  eventState={eventData} eventStateSetter={setEventData}/>
                   
                 <FormControlLabel sx={{display: 'block'}} label="Recurrent" control={
                    <Switch
                        sx={{color: '#912338'}}
                        checked={isRecurrent}
                        onChange={handleIsRecurrentChange}
                    />
                }/>
                <div>{ isRecurrent && recurrenceSelection }</div>
                    <div style={{border:'1px solid black'}}>{categories}</div>
                <div>{ buttons }</div>

                </div>

            </form>
        </React.Fragment>
    )
}