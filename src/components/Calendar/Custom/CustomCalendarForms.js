
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { BackgroundCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";


export const CalendarTextField = ({ id, value, label, variant, onChange }) => {
    return (
        <TextField
            fullWidth
            id={id}
            value={value || ''}
            required
            label={label}
            variant={variant}
            onChange={onChange} />

    )
}
export const CalendarDatePicker = ({ key, value, label, onChange }) => {
    return (
        <MobileDatePicker
            key={key}
            label={label}
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
        />
    )
}

export const CalendarTimePicker = ({ id, label, onChange, InputLabelProps, inputProps }) => {
    return (
        <Grid item sm={6} xs={6} md={6} key={1}>

            <TextField
                id={id}
                label={label}
                type="time"
                defaultValue="12:00"
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

export const CompleteEditEvent = ({ id, label, content, InputLabelProps, inputProps }) => {
    return (
        <>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '60px' }}>

                <BackgroundCard width='372px' height='900px' content={content} />

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
 