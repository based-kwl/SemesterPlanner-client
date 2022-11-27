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

export const reccurenceSelection  = ({eventData, setEventData, handleReccurenceChange })=> (
    <FormControl>
    <RadioGroup row onChange={handleReccurenceChange}>
        <FormControlLabel defaultChecked={true} value="daily" control={<Radio />} label="Every Day" />
        <FormControlLabel value="weekly" control={<Radio />} label="Every Week" />
        <FormControlLabel value="monthly" control={<Radio />} label="Every Month" />
    </RadioGroup>

    {/** Event End Date */}
    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                key={"endDate"}
                label="Ending date"
                inputFormat="MM/DD/YYYY"
                value={eventData.endDate}
                onChange={(e) => setEventData({...eventData, endDate: e.$d})}
                renderInput={(params) => <TextField {...params}  sx={{width: '100%'}}/>}
            />
        </LocalizationProvider>
    </div>
</FormControl>
);