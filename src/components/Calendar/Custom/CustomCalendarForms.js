
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

export const CalendarTextField = ({width, inputProps,id, value, label, variant, onChange, data_test}) => {
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
            width = {width}
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
            />
            

        
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
 