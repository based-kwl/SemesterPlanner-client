
import * as React from 'react';
import {Radio, RadioGroup, Typography} from "@mui/material";
import { BackgroundCard, CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {PrimaryButton2, SecondaryButton2 } from '../../CustomMUIComponents/CustomButtons';
import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import {useCallback, useEffect} from "react";


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

export const CalendarTimePicker = ({id,  label, onChange, InputLabelProps, inputProps}) => {
    return (

            <TextField
                id={id}
                label={label}
                type="time"
                defaultValue="12:00"
                InputLabelProps={InputLabelProps}
                inputProps={inputProps}
                onChange={onChange}
                sx={{ width: '100%' }}
            />

    )
}
