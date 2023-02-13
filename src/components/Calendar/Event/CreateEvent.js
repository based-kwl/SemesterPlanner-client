import * as React from 'react';
import {Radio, RadioGroup, Typography, Stack} from "@mui/material";
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
import {EventForm} from '../Custom/CommonInputEventForm';
import moment from "moment";

export default function CreateEvent(props) {
    const email = GetAuthentication().email;
    const [isRecurrent, setIsRecurrent] = React.useState(false);
    const [course, setCourse] = React.useState([]);
    const [eventData, setEventData] = React.useState({
        username: GetAuthentication().username,
        eventHeader: props.event ? props.event.name : '',
        description: props.event ? props.event.description : '',
        link: '',
        startDate: props.date ? moment(props.date, "DD/MM/YYYY").toDate() : new Date(),
        endDate: props.date ? moment(props.date, "DD/MM/YYYY").toDate() : new Date(),
        startTime: props.event ? props.event.startTime : new Date(),
        endTime: props.event ? props.event.endTime : new Date(),
        actualStartTime: new Date(),
        actualEndTime:  new Date(),
        recurrence: 'once',
        type: props.event ? props.event.type: '',
        subject: props.event ? props.event.subject: '',
        catalog:props.event ? props.event.catalog: ''
    })
    const [eventError, setEventError] = React.useState({message: "Error, please try again later", hasError: false});

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

    React.useEffect(()=>{
        handleCourseList()
    },[])

    function handleCourseList(){
        axios.get(`${process.env.REACT_APP_BASE_URL}student/courses/${email}`)
            .then(res => {
                setCourse(res.data.courses);
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    function handleRecurrenceChange(e) {
        setEventData({ ...eventData, recurrence: e.target.value})
    }

    function handleEvent() {
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
            <Stack justifyContent="center"
                   alignItems="center"
                   spacing={3}
                   width='100%'
                   direction="row">
                <PrimaryButton2 width={'41vw'} colour={'#912338'} content="Add" onClick={handleEvent}/>
                <PrimaryButton2 width={'41vw'} colour={'#C8C8C8'} content="Cancel" onClick={handleCancel}/>
            </Stack>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>{PageError}</div>

                <div align='center' style={{
                    overflow: 'auto',
                    paddingTop: '10px',
                    width: '97vw',
                    height: '65vh'
                }}>
                    <EventForm eventState={eventData} eventStateSetter={setEventData} courseArray={course}/>
                    <FormControlLabel sx={{display: 'block'}} label="Recurrent" control={
                        <Switch
                            sx={{color: '#912338'}}
                            checked={isRecurrent}
                            onChange={handleIsRecurrentChange}
                        />
                    }/>
                    {isRecurrent && recurrenceSelection}
                </div>
                <div style={{ paddingTop: '20px'}}>{buttons}</div>
            </form>
        </React.Fragment>
    )
}