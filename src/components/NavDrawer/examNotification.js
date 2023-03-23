import * as React from "react";
import {InputAdornment, Stack} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {TimeCard} from "../CustomMUIComponents/CustomCards";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {getTime} from "../Calendar/CommonFunctions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GetAuthentication from "../Authentication/Authentification";
import axios from "axios";

export default function ExamNotification(props){
    const [timeSlot, setTimeSlot] = React.useState(60)
    const [exams, setExams] = React.useState(props.examData)
    const [availability, setAvailability] = React.useState({
        startTime: new Date(),
        endTime: new Date()
    })

    console.log('exm',exams)

    React.useEffect(()=>{
        initTimes()
    },[])

    function initTimes(){
        const newInitTime =
            {
                startTime: new Date(),
                endTime: new Date()
            }
        newInitTime.startTime.setHours(9,0,0,0)
        newInitTime.endTime.setHours(18,0,0,0)
        setAvailability(newInitTime)
    }
    function handleCancel(){
        document.elementFromPoint(0, 0).click();
    }
    function handleDismiss(){}
    function handleEvent() {
        exams.forEach((exam) => {
            const eventDay = {
                username:GetAuthentication().username,
                eventHeader: exam.subject + ' ' + exam.data.catalog,
                description:'study for exam',
                recurrence: 'once',
                link: '',
                type: 'exam',
                subject: exam.subject,
                catalog:exam.catalog,
                startTime: exam.startTime.toISOString(),
                endTime: exam.endTime.toISOString(),
                actualStartTime: new Date().toISOString(),
                actualEndTime: new Date().toISOString(),
                startDate: exam.toISOString(), // needs to be calculated
                endDate: exam.endDate.toISOString()
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}events/add`, eventDay)
                .then((res) => {
                    console.log(res.data)
                })
        })
    }
    function handleTimeChange(e){
        console.log(e.target.id)
        const newDate = new Date()
        newDate.setHours(e.target.value.split(':')[0])
        newDate.setMinutes(e.target.value.split(':')[1])

        console.log(newDate)
        if (e.target.id === 'startTime') {
            setAvailability({...availability, startTime: newDate})
        } else {
            setAvailability({...availability, endTime: newDate})
        }
    }
    function handleMenu(e){
        setTimeSlot(e.target.value)
        console.log(timeSlot)
    }
    function handleAddStudyTimeSlots(){

    }

    const startTime = (
        <TextField
            id="startTime"
            type="time"
            value={getTime(availability.startTime)}
            data-test="eventStartTime"
            onChange={handleTimeChange}
            InputLabelProps={{
                shrink: true,
            }}
            sx={{
            "& css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                {
                    padding:'0',
                }

            }}
            margin="none"
        />
    )
    const endTime = (
        <TextField
            id="endTime"
            type="time"
            value={getTime(availability.endTime)}
            data-test="eventendTime"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={handleTimeChange}
            sx={{
                "& css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                    {
                        padding:'0',
                    }

            }}
            margin="none"
        />
    )
    const slotMenu = (
        <TextField
            name='slot'
            id='slot'
            size="small"
            margin="none"
            select
            onChange={handleMenu}
            value={timeSlot}
        >
            <MenuItem value={60}>
                60 min
            </MenuItem>
            <MenuItem value={45}>
                45 min
            </MenuItem>
            <MenuItem value={30}>
                30 min
            </MenuItem>
        </TextField>
    )
    const examName = (
        <div align='center' style={{marginBottom:'5px'}}>
        <Typography variant="h5">  EXAM ON MARCH 1</Typography>
        </div>
    )

    const showAvailability = (
        <React.Fragment>
            <div style={{width:'97vw', marginBottom:'5px', paddingLeft:'7px'}}>
            <Typography> show availability from <p style={{alignItems:'center'}}>{startTime} to {endTime}</p></Typography>
                <Typography> display slots of {slotMenu} </Typography>
            </div>

        </React.Fragment>
    )

    const timeDisplay = (
        <TimeCard width={'100%'}
                       content={<>
                           <Stack direction="row" alignItems='center' justifyContent='space-around' spacing={1}>
                               <Typography variant="subtitle1">TUE FEB 21</Typography>
                               <TextField
                                   id="courseStart"
                                   type="text"
                                   value='00:00'
                                   size='small'
                                   disabled
                                   InputProps={{
                                       endAdornment:(<InputAdornment position='end'>
                                           <AccessTimeIcon/>
                                           </InputAdornment>
                                           ),
                                   }}
                                   sx={{
                                       width:'25vw',
                                       "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                                           {
                                               paddingRight:'7px',
                                           }
                                   }}
                                   data-test="eventendTime"
                                   margin="none"
                               />
                               <TextField
                                   id="courseStart"
                                   type="text"
                                   value='00:00'
                                   size='small'
                                   disabled
                                   InputProps={{
                                       endAdornment:(<InputAdornment position='end'>
                                               <AccessTimeIcon/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   sx={{
                                       width:'25vw',
                                       "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                                           {
                                               paddingRight:'7px',
                                           }
                                   }}
                                   data-test="eventendTime"
                                   margin="none"
                               />
                               <Button
                                   data-test={`accept-request-`}
                                   variant="text"
                                   onClick={() => handleAddStudyTimeSlots()}><AddIcon
                                   style={{color: '#057D78', margin:'0px'}}/>
                               </Button>
                           </Stack>
                       </>}>
        </TimeCard>
    )
    const buttons = (
        <React.Fragment>
            <Stack justifyContent="center"
                   alignItems="center"
                   spacing={1}
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
                height: '35vh'}}>
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