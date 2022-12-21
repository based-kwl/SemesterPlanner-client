import * as React from 'react';
import {  Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useCallback , useState} from "react";
import { CalendarDatePicker} from '../Custom/CommonInputEventForm';
import { EventForm } from '../Custom/CommonInputEventForm';
import { PrimaryButton2 } from '../../CustomMUIComponents/CustomButtons';
import { Stack } from '@mui/system';

export default function EditEvent(){
    const [isRecurrent, setIsRecurrent] = React.useState(false);
    const eventId = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const [eventData, setEventData] = React.useState({});
    const navigate = useNavigate();
    const [eventError, setEventError] = React.useState({ message: "Error, please try again later", hasError: false });
    const[loading,setLoading] = useState(true);

    //  Get specific event by event id
    const fetchEventData = useCallback(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}events/event/${eventId}`)
            .then((res) => {
                setEventData(res.data)

            }
            ).catch((err) => {
                setEventError({ ...eventError, message: err.message });
                setLoading(false);

            });
    }, [])

    
    React.useEffect(() => {
        fetchEventData();
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

    const PageError = eventError.hasError ? (
        <Typography align="center" color="#DA3A16">
            {eventError.message}
        </Typography>
    ) : null;

    function handleIsReccurentChange() {
        setIsRecurrent((prev) => !prev);
    }
    function handleDelete(e) {
        deleteData(e.eventId);
        navigate('/calendar');
        // window.location.reload();
    }
    function deleteData(eventId) {
        axios.delete(`${process.env.REACT_APP_BASE_URL}events/${eventId}`)
            .then((res) => {
                navigate('/calendar');

            }
            ).catch((err) => {
                setEventError({ ...eventError, message: err.message});  });

    }
    
    const editUpdateButtons = (
        <React.Fragment>
                       <Stack direction='row' spacing={7} marginTop={2}>

             <PrimaryButton2  width={'41vw'} colour={'#912338'} content="Update" onClick={() => { handleEvent() }} />
            <PrimaryButton2 width={'41vw'} colour={'#C8C8C8'} content="Delete" onClick={() => handleDelete({ eventId })} />
            </Stack>

        </React.Fragment>
    );
    const editEventForm = (
        <React.Fragment>
        <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div style={{ paddingTop: '0px', paddingBottom: '10px' }}>{PageError}</div>
        <div align='center' style={{ paddingTop: '16px', paddingBottom: '20px' }}>

            <EventForm  eventState={eventData} eventStateSetter={setEventData}/>
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
            </div>

        </form>
    </React.Fragment>
    )

 

    return (editEventForm  );
}