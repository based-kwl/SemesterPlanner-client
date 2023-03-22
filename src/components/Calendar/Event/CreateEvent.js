import * as React from 'react';
import {Typography, Stack} from "@mui/material";
import {PrimaryButton2} from '../../CustomMUIComponents/CustomButtons';
import axios from "axios";
import GetAuthentication from "../../Authentication/Authentification";
import {EventForm, RecurrenceSelection} from '../Custom/CommonInputEventForm';
import moment from "moment";

export default function CreateEvent(props) {
    const email = GetAuthentication().email;
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


    const recurrenceSelection = () => {
        return RecurrenceSelection(eventData, setEventData);
    };


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

    const buttons = (
        <React.Fragment>
            <Stack justifyContent="center"
                   alignItems="center"
                   spacing={3}
                   width='100%'
                   direction="row">
                <PrimaryButton2 data_test={"addButton"} width={'41vw'} colour={'#912338'} content="Add" onClick={handleEvent}/>
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
                    <div>{recurrenceSelection()}</div>
                </div>
                <div style={{ paddingTop: '20px'}}>{buttons}</div>
            </form>
        </React.Fragment>
    )
}