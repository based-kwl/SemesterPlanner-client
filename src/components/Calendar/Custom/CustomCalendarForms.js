
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { BackgroundCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export const CalendarTextField = ({ inputProps,id, value, label, variant, onChange, data_test}) => {
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
            
             />

    )
}
// {
//     readOnly: true,
//   }
export const TextFieldDisplay = ({inputProps, id, value, label, variant, onChange, data_test}) => {
    return (
        <TextField
            data-test={data_test}
            fullWidth
            id={id}
            value={value || ''}
            required
            label={label}
            variant={variant}
            onChange={onChange}
            inputProps={inputProps} />
             

    )
}
export const CalendarDatePicker = ({ inputProps,key, value, label, onChange }) => {
    return (
        <MobileDatePicker
            key={key}
            label={label}
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
            inputProps={inputProps} 
            disabled/>
            

        
    )
}

export const CalendarTimePicker = ({ id, label, onChange, value }) => {
    return (
        <Grid item sm={6} xs={6} md={6} key={1}>

            <TextField
                id={id}
                label={label}
                type="time"
                defaultValue="12:00"
                value={value}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                onChange={onChange}
                sx={{ width: '100%' }}
            />
        </Grid>


    )
}

export const CompleteEditEvent = ({ content }) => {
    return (
        <>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '60px' }}>

                <BackgroundCard width='96vw' height='900px' content={content} />

            </div>
        </>

    )
}


export const UpdateCancelButton = ({content, disable, onClick,backgroundColor}) => {
    return (
        <div style={{ paddingTop: '20px' }}>

        <Button

            disabled={disable}
            onClick={onClick}
            variant="contained"
            style={{
                paddingTop: '10px', paddingBottom: '10px',
                width: '305px', backgroundColor: backgroundColor
            }}>
            {content}
        </Button>
        </div>

    );
}
 export function EventDataComponents({eventState, eventStateSetter}) {
    const recurrenceSelection = (
        <FormControl>
            {/* <RadioGroup row onChange={handleRecurrenceChange}>
                <FormControlLabel defaultChecked={true} value="daily" control={<Radio data-test="everyDay" />} label="Every Day" />
                <FormControlLabel value="weekly" control={<Radio data-test="everyWeek" />} label="Every Week" />
                <FormControlLabel value="monthly" control={<Radio data-test="everyMonth"  />} label="Every Month" />
            </RadioGroup> */}

            {/** Event End Date */}
            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CalendarDatePicker
                        data-test="eventEndDate"
                        key={"endDate"}
                        label="Ending date"
                        value={eventState.endDate}
                        onChange={(e) => eventStateSetter({ ...eventState, endDate: e.$d })}
                    />
                </LocalizationProvider>
            </div>
        </FormControl>
    );
    function handleRecurrenceChange(e) {
        eventStateSetter({ ...eventState, reccurence: e.target.value })
    }

    function handleEditEventHeaderChange(e) {
        eventStateSetter({ ...eventState, eventHeader: e.target.value })
    }

    function handleEditDescriptionChange(e) {
        eventStateSetter({ ...eventState, description: e.target.value })
    }

    function handleEditStartDateChange(e) {
        eventStateSetter({ ...eventState, startDate: e.$d })
    }

    function handleEditStartTimeChange(e) {
        eventStateSetter({ ...eventState, startTime: e.target.value })
    }

    function handleEditEndTimeChange(e) {
        eventStateSetter({ ...eventState, endTime: e.target.value })
    }

    // function handleIsReccurentChange() {
    //     setIsRecurrent((prev) => !prev);
    // }
    const editEventForm = (
            <form style={{ paddingLeft: '10px', paddingRight: '10px' }}> 
                <div align='center' style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <CalendarTextField
                            data_test="eventHeader"
                            id='eventHeader'
                            value={eventState.eventHeader}
                            InputLabelProps={{ shrink: "Event Name" }}
                            label="Event Name"
                            variant='outlined'
                            onChange={handleEditEventHeaderChange}

                        />
                    </div>

                    {/** Event description */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <CalendarTextField
                            data_test="eventDescription"
                            id='description'
                            InputLabelProps={{ shrink: "Description" }}
                            value={eventState.description}
                            label="Description"
                            variant='outlined'
                            onChange={handleEditDescriptionChange}
                        />
                    </div>

                    {/** Event link */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <CalendarTextField
                            data_test="eventLink"
                            id='eventLink'
                            value={eventState.link}
                            label="Event Link"
                            variant='outlined'
                            onChange={(e) => eventStateSetter({ ...eventState, link: e.target.value })}
                        />
                    </div>


                    {/** Event Start Date */}
                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CalendarDatePicker
                                data-test="eventStartDate"
                                id='eventStartDate'
                                key={"startDate"}
                                label="Starting date"
                                value={eventState.startDate}
                                onChange={handleEditStartDateChange}
                            />
                        </LocalizationProvider>
                    </div>

                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Grid container spacing={2} alignItems="flex-end">

                            {/** Event Start Time */}
                                <CalendarTimePicker
                                    data-test="eventStartTime"
                                    id="startTime"
                                    label="Start Time"
                                    value={eventState.startTime}
                                    onChange={handleEditStartTimeChange}

                                />

                            {/** Event End Time */}
                                <CalendarTimePicker
                                    data-test="eventEndTime"
                                    id="endTime"
                                    label="EndTime Time"
                                    value={eventState.endTime}
                                    onChange={handleEditEndTimeChange}

                                />
                        </Grid>
                    </div>
                </div>

                {/* <FormControlLabel sx={{ display: 'block' }} label="Recurrent" control={
                    <Switch
                        data-test="eventSwitch"
                        sx={{ color: '#912338' }}
                        checked={isRecurrent}
                        onChange={handleIsReccurentChange}
                    />
                } />
                <div>{isRecurrent && recurrenceSelection}</div>
                <div>{editUpdateButtons}</div> */}
            </form>
    )

 

    return (editEventForm );
}
 