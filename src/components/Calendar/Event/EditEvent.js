import * as React from 'react';
import {Typography} from "@mui/material";
import axios from "axios";
import {RecurrenceSelection} from '../Custom/CommonInputEventForm';
import {EventForm} from '../Custom/CommonInputEventForm';
import {PrimaryButton2} from '../../CustomMUIComponents/CustomButtons';
import {Stack} from '@mui/system';

export default function EditEvent(props) {
    const [eventData, setEventData] = React.useState(props.eventData);
    const [eventError, setEventError] = React.useState({message: "Error, please try again later", hasError: false});

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
            <Stack direction='row' spacing={7} marginTop={2}>

                <PrimaryButton2 width={'41vw'} colour={'#912338'} content="Update" onClick={handleEventUpdate}/>
                <PrimaryButton2 width={'41vw'} colour={'#C8C8C8'} content="Delete"
                                onClick={handleEventDelete}/>
            </Stack>

        </React.Fragment>
    );

    const editEventForm = (
        <React.Fragment>
            <form style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <div style={{paddingTop: '0px', paddingBottom: '10px'}}>{PageError}</div>
                <div align='center' style={{paddingTop: '16px', paddingBottom: '20px'}}>

                    <EventForm eventState={eventData} eventStateSetter={setEventData}/>
                    <div>{recurrenceSelection()}</div>

                    <div>{editUpdateButtons}</div>
                </div>

            </form>
        </React.Fragment>
    )


    return (editEventForm);
}