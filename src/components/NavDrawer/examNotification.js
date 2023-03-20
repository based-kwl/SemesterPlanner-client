import * as React from "react";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {TimeCard} from "../CustomMUIComponents/CustomCards";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
export default function ExamNotification(){
    function handleCancel(){}
    function handleDismiss(){}
    function handleEvent(){}
    function handleTimeChange(){}
    function handleMenu(){}
    function handleAddStudyTimeSlots(){}

    const startTime = (
        <TextField
            id="startTime"
            type="time"
            value='9'
            InputLabelProps={{
                shrink: true,
            }}
            data-test="eventStartTime"
            onChange={handleTimeChange}
            sx={{width: '100px'}}
            margin="none"
        />
    )
    const endTime = (
        <TextField
            id="endTime"
            type="time"
            value='9'
            InputLabelProps={{
                shrink: true,
            }}
            data-test="eventendTime"
            onChange={handleTimeChange}
            sx={{width: '100px'}}
            margin="none"
        />
    )
    const slotMenu = (
        <TextField
            name='slot'
            id='day'
            label="slot"
            size="small"
            margin="none"
            select
            onChange={handleMenu}
            value={1}
        >
            <MenuItem value={1}>
                60 min
            </MenuItem>
            <MenuItem value={2}>
                45 min
            </MenuItem>
            <MenuItem value={3}>
                30 min
            </MenuItem>
        </TextField>
    )
    const examName = (
        <div align='center' style={{marginBottom:'5px'}}>
        <Typography variant="h5"> SOEN 345 EXAM ON MARCH 1</Typography>
        </div>
    )

    const showAvailability = (
        <React.Fragment>
            <Typography> show availability from {startTime} to {endTime}</Typography>
            <Typography> display slots of {slotMenu} </Typography>
        </React.Fragment>
    )

    const timeDisplay = (
        <TimeCard width={'100%'} height={'fit-content'}
                       content={<>
                           <Stack direction="row" spacing={1}>
                               <p>TUE FEB 21</p>
                               <TextField
                                   id="endTime"
                                   type="time"
                                   value='9'
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   data-test="eventendTime"
                                   onChange={handleTimeChange}
                                   sx={{width: '100px'}}
                                   margin="none"
                               />
                               <TextField
                                   id="endTime"
                                   type="time"
                                   value='9'
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   data-test="eventendTime"
                                   onChange={handleTimeChange}
                                   sx={{width: '100px'}}
                                   margin="none"
                               />
                               <Button
                                   data-test={`accept-request-`}
                                   variant="text"
                                   onClick={() => handleAddStudyTimeSlots()}><AddIcon
                                   style={{color: '#057D78'}}/>
                               </Button>
                               {/*<Button*/}
                               {/*    data-test={`decline-request-`}*/}
                               {/*    variant="text"*/}
                               {/*    onClick={() => handleAddStudyTimeSlots()}><ClearIcon*/}
                               {/*    style={{color: '#912338'}}/>*/}
                               {/*</Button>*/}
                           </Stack>
                       </>}>
        </TimeCard>
    )
    const buttons = (
        <React.Fragment>
            <Stack justifyContent="center"
                   alignItems="center"
                   spacing={2}
                   width='100%'
                   >
                <PrimaryButton2 width={'97vw'} colour={'#057D78'} content="Add to calendar" onClick={handleEvent}/>
                <PrimaryButton2 width={'97vw'} colour={'#912338'} content="Cancel" onClick={handleCancel}/>
                <PrimaryButton2 width={'97vw'} colour={'#0072A8'} content="Dismiss notification" onClick={handleDismiss}/>
            </Stack>
        </React.Fragment>
    )
    const examNotification = (
        <React.Fragment>
            {examName}
            {showAvailability}
            <div align='center' style={{border:'1px black solid',overflow: 'auto',
                paddingTop: '10px',
                marginBottom:'10px',
                width: '97vw',
                height: '40vh'}}>
                {timeDisplay}
                {timeDisplay}
                {timeDisplay}
                {timeDisplay}
                {timeDisplay}
            </div>
            {buttons}


        </React.Fragment>
    )
    return(examNotification)
}