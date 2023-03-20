import * as React from 'react';
import {Typography, Stack} from "@mui/material";
import {PrimaryButton2} from '../../CustomMUIComponents/CustomButtons';
import axios from "axios";
import GetAuthentication from "../../Authentication/Authentification";
import {EventForm, RecurrenceSelection} from '../Custom/CommonInputEventForm';
import moment from "moment";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {useState} from "react";
import ScheduleEvent from "./ScheduleEvent";
import {styled} from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";

export default function CreateEvent(props) {
    const email = GetAuthentication().email;
    const [imageType, setImageType] = useState('event')
    const [eventIsVisible,setEventIsVisible] = React.useState(true)
    const [course, setCourse] = React.useState([]);
    const [eventData, setEventData] = React.useState({
        username: GetAuthentication().username,
        eventHeader: props.event ? props.event.name : '',
        description: props.event ? props.event.description : '',
        link: '',
        startDate: props.event ? moment(props.event.date, "DD/MM/YYYY").toDate() : props.date,
        endDate: props.event ? moment(props.event.date, "DD/MM/YYYY").toDate() : props.date,
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

    React.useEffect(()=>{
        handleCourseList()
        handleImageType()
    },[imageType,eventIsVisible])
    const recurrenceSelection = () => {
        return RecurrenceSelection(eventData, setEventData);
    };



    function handleCourseList(){
        axios.get(`${process.env.REACT_APP_BASE_URL}student/courses/${email}`)
            .then(res => {
                setCourse(res.data.courses);
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    function handleEvent() {
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

    function handleImageType(e, newImageType){
        if(newImageType != null){
            setImageType(newImageType)
        }
        if(imageType==='event'){
            setEventIsVisible(true)
        }
        else if (imageType ==='schedule'){
            setEventIsVisible(false)
        }
    }
    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: '#0072A8'
        }
    });

    const toggleButton = (
        <ToggleButtonGroup
            size="small"
            value={imageType}
            exclusive
            onChange={handleImageType}
            aria-label="image_type"
        >
            <ToggleButton value="event" aria-label="event">
                Event
            </ToggleButton>
            <ToggleButton value="schedule" aria-label="schedule">
                Schedule
            </ToggleButton>
        </ToggleButtonGroup>
    )

    const recurrence = recurrenceSelection();
    return (
        <React.Fragment>
            <div align='center'>
            {toggleButton}
            </div>
            {eventIsVisible?
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>{PageError}</div>

                <div align='center' style={{
                    overflow: 'auto',
                    paddingTop: '10px',
                    width: '97vw',
                    height: '60vh'
                }}>
                    <EventForm eventState={eventData} eventStateSetter={setEventData} courseArray={course}/>
                    <div> {recurrence} </div>
                </div>
                <div style={{ paddingTop: '20px'}}>{buttons}</div>
            </form> : <ScheduleEvent/>}
        </React.Fragment>
    )
}