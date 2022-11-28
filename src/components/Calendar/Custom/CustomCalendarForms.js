
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Radio, RadioGroup, Typography } from "@mui/material";
import { BackgroundCard, CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import { useNavigate } from "react-router";
import { PrimaryButton2, SecondaryButton2 } from '../../CustomMUIComponents/CustomButtons';
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useCallback, useEffect } from "react";
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

 export function HandleChange(e,eventData, setEventData, content) {
    return(    setEventData({ ...eventData, content:{content} })
    )

 }