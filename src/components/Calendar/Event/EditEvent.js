import * as React from 'react';
import {Typography, Stack} from "@mui/material";
import axios from "axios";
import {RecurrenceSelection, EventForm} from '../Custom/CommonInputEventForm';
import {PrimaryButton2} from '../../CustomMUIComponents/CustomButtons';
import {GetAuthentication} from "../../Authentication/Authentification";

export default function EditEvent(props) {

    const email = GetAuthentication().email;
    const [eventData, setEventData] = React.useState(props.eventData);
    const [eventError, setEventError] = React.useState({message: "Error, please try again later", hasError: false});
    const [course, setCourse] = React.useState([])
    const studyCourse = props.eventData.subject+' '+props.eventData.catalog

    const recurrenceSelection = () => {
        return RecurrenceSelection(eventData, setEventData);
    }

    function handleEventUpdate() {
        axios.post(`${process.env.REACT_APP_BASE_URL}events/update`, eventData)
            .then(() => {
                document.elementFromPoint(0, 0).click();

                if (props.onDrawerClose)
                    props.onDrawerClose(eventData, 0);
            })
            .catch(err => {
                setEventError({...eventError, message: "Error connecting to database. " + err});
                setEventError({...eventError, hasError: true});
            });

    }
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
    const PageError = eventError.hasError ? (
        <Typography align="center" color="#DA3A16">
            {eventError.message}
        </Typography>
    ) : null;

    function handleEventDelete() {
        axios.delete(`${process.env.REACT_APP_BASE_URL}events/${eventData._id}`)
            .then(() => {
                    document.elementFromPoint(0, 0).click();

                    if (props.onDrawerClose)
                        props.onDrawerClose(eventData, 1);
                }
            ).catch((err) => {
            setEventError({...eventError, message: err.message});
        });

    }

    const editUpdateButtons = (
        <React.Fragment>
            <Stack direction='row' spacing={3} marginTop={2} alignItems="center" justifyContent="center">

                <PrimaryButton2 width={'41vw'} colour={'#912338'} content="Update" onClick={handleEventUpdate}/>
                <PrimaryButton2 data_test={"deleteEventButton"} width={'41vw'} colour={'#C8C8C8'} content="Delete"
                                onClick={handleEventDelete}/>
            </Stack>

        </React.Fragment>
    );

    const editEventForm = (
        <React.Fragment>

            <form style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>{PageError}</div>
                <div align='center' style={{
                    overflow: 'auto',
                    paddingTop: '10px',
                    width: '97vw',
                    height: '65vh'
                }}>
                    <Typography>{eventData.type ==='study'?"Editing event for "+studyCourse : " "}</Typography>

                    <EventForm eventState={eventData} eventStateSetter={setEventData} courseArray={course}/>

                    <div>{recurrenceSelection()}</div>

                </div>
                <div>{editUpdateButtons}</div>
            </form>
        </React.Fragment>
    )


    return (editEventForm);
}