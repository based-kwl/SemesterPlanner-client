import * as React from 'react';
import TextField from '@mui/material/TextField';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import {Radio, RadioGroup} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";


export const CalendarTextField = ({width, inputProps, id, value, label, variant, onChange, data_test}) => {
    return (
        <TextField
            data-test={data_test}
            fullWidth
            id={id}
            value={value || ''}
            // required
            label={label}
            variant={variant}
            onChange={onChange}
            inputProps={inputProps}
            width={width}
            margin="normal"
        />
    )
}

export const CalendarDatePicker = ({inputProps, key, value, label, onChange}) => {
    return (
        <MobileDatePicker
            key={key}
            label={label}
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
            inputProps={inputProps}
        />
    )
}

export function EventForm({eventState, eventStateSetter}) {
    function handleEditEventHeaderChange(e) {
        eventStateSetter({...eventState, eventHeader: e.target.value})
    }

    function handleEditDescriptionChange(e) {
        eventStateSetter({...eventState, description: e.target.value})
    }

    function handleEditStartDateChange(e) {
        eventStateSetter({...eventState, startDate: e.$d})
    }

    function handleEditStartTimeChange(e) {
        let startTime = new Date();
        startTime.setHours(e.target.value.split(':')[0], e.target.value.split(':')[1]);
        eventStateSetter({...eventState, startTime: startTime.toISOString()});
    }

    function handleEditEndTimeChange(e) {
        let endTime = new Date();
        endTime.setHours(e.target.value.split(':')[0], e.target.value.split(':')[1]);
        eventStateSetter({...eventState, endTime: endTime.toISOString()});
    }

    const getStartTime = () => {
        let date;
        if (eventState.startTime)
            date = new Date(eventState.startTime).toTimeString();
        else
            date = new Date().toTimeString();
        date = (date.split(':')[0] + ':' + date.split(':')[1]);
        return date.toString();
    }

    const getEndTime = () => {
        let date;
        if (eventState.endTime)
            date = new Date(eventState.endTime).toTimeString();
        else
            date = new Date().toTimeString();
        date = (date.split(':')[0] + ':' + date.split(':')[1]);
        return date.toString();
    }

    console.log(eventState)

    const eventForm = (
        <div style={{paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px'}}>
            <TextField
                data_test="eventHeader"
                id='eventHeader'
                value={eventState.eventHeader}
                InputLabelProps={{shrink: "Event Name"}}
                label="Event Name"
                variant='outlined'
                onChange={handleEditEventHeaderChange}
                type='title'
                required
                margin="normal"
                fullWidth
            />

            {/** Event description */}
            <TextField
                data_test="eventDescription"
                id='description'
                InputLabelProps={{shrink: "Description"}}
                value={eventState.description}
                label="Description"
                variant='outlined'
                onChange={handleEditDescriptionChange}
                margin="normal"
                sx={{width: '100%'}}
            />

            {/** Event link */}
            <TextField
                data_test="eventLink"
                id='eventLink'
                InputLabelProps={{shrink: "Description"}}
                value={eventState.link}
                label="Event Link"
                variant='outlined'
                onChange={(e) => eventStateSetter({...eventState, link: e.target.value})}
                margin="normal"
                sx={{width: '100%'}}
            />

            {/* * Event Start Date */}
            <div style={{width: '100%', paddingTop: '15px', paddingBottom: '10px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        key={"startDate"}
                        label="Starting date"
                        inputFormat="MM/DD/YYYY"
                        value={eventState.startDate}
                        onChange={handleEditStartDateChange}
                        renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                        variant='outlined'
                        data-test="eventStartDate"
                        id='eventStartDate'
                        margin="normal"
                    />
                </LocalizationProvider>
            </div>
            <Grid direction={"column"} item spacing={1}
                  style={{paddingRight: '10px', paddingTop: '15px', paddingBottom: '23px'}}>
                {/** Event Start Time */}
                <TextField
                    id="startTime"
                    label="Start Time"
                    type="time"
                    value={getStartTime()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    data-test="eventStartTime"
                    onChange={handleEditStartTimeChange}
                    sx={{width: '260px'}}
                />

                {/** Event End Time */}
                <TextField
                    id="endTime"
                    label="End Time"
                    type="time"
                    value={getEndTime()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    data-test="eventEndTime"
                    onChange={handleEditEndTimeChange}
                    sx={{width: '260px'}}
                />
            </Grid>
        </div>
    )
    return (eventForm);
}

export const CalendarButton = ({content, disable, onClick, backgroundColor}) => {
    return (
        <div style={{paddingTop: '20px'}}>
            <Button
                disabled={disable}
                onClick={onClick}
                variant="contained"
                style={{
                    paddingTop: '10px', paddingBottom: '10px',
                    width: '100%', backgroundColor: backgroundColor
                }}>
                {content}
            </Button>
        </div>

    );
}

export function RecurrenceSelection(recurrenceState, setRecurrenceState) {
    const [isRecurrent, setIsRecurrent] = React.useState(false);

    function handleRecurrenceChange(e) {
        setRecurrenceState({...recurrenceState, reccurence: e.target.value})
    }

    function handleIsReccurentChange() {
        setIsRecurrent((prev) => !prev);
    }

    const recurrenceOption = (

        <FormControl>
            <RadioGroup row onChange={handleRecurrenceChange}>
                <FormControlLabel defaultChecked={true} value="daily" control={<Radio data-test="everyDay"/>}
                                  label="Every Day"/>
                <FormControlLabel value="weekly" control={<Radio data-test="everyWeek"/>} label="Every Week"/>
                <FormControlLabel value="monthly" control={<Radio data-test="everyMonth"/>} label="Every Month"/>
            </RadioGroup>

            {/** Event End Date */}
            <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CalendarDatePicker
                        data-test="eventEndDate"
                        key={"endDate"}
                        label="Ending date"
                        value={recurrenceState.endDate}
                        onChange={(e) => setRecurrenceState({...recurrenceState, endDate: e.$d})}
                    />
                </LocalizationProvider>
            </div>
        </FormControl>
    )

    const recurrenceSwitch = (
        <FormControlLabel sx={{display: 'block'}} label="Recurrent" control={
            <Switch
                data-test="eventSwitch"
                sx={{color: '#912338'}}
                checked={isRecurrent}
                onChange={handleIsReccurentChange}
            />
        }/>
    )

    const displayy = (
        <React.Fragment>
            {recurrenceSwitch}
            <div>{isRecurrent && recurrenceOption}</div>
        </React.Fragment>
    )
    return (displayy);
}