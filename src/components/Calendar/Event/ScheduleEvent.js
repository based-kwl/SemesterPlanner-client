import * as React from "react";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../../CustomMUIComponents/CustomButtons";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {getTime} from "../CommonFunctions";
import {CourseCard} from "../../StudyRoom/CommonResources";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import GetAuthentication from "../../Authentication/Authentification";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {CalendarDatePicker} from "../Custom/CommonInputEventForm";


export default function ScheduleEvent() {
    const username = GetAuthentication().username;
    const [error, setError] = React.useState('')
    const [validateCourse, setValidateCourse] = React.useState(true)
    const [schedule, setSchedule] = React.useState([{
        subject: 'ex:SOEN',
        catalog: 'ex:385',
        day1: 1,
        day2: 8,
        startTime: new Date(),
        endTime: new Date(),
        startDate: new Date(),
        endDate: new Date()
    }]);

    function newStartDay(day, startDate) {
        const numDate = startDate.getDay()
        let newStartDate = new Date(startDate)
        if (day < numDate) {
            newStartDate.setDate(startDate.getDate() + 7 - numDate + day)
        } else if (day >= numDate) {
            newStartDate.setDate(startDate.getDate() + day - numDate)
        }
        return newStartDate
    }

    function handleEvent() {
        let day1 = ''
        let day2 = ''
        schedule.forEach((course) => {
            axios.get(`${process.env.REACT_APP_BASE_URL}opendata/course/${course.subject}/${course.catalog}`)
                .then((res) => {
                    if (res.data == null) {
                        let error = 'Invalid course: ' + course.subject + ' ' + course.catalog
                        setError(error)
                    }else{
                        let error = ''
                        setError(error)
                    }
                })
        })
        // console.log(error)

       if(error === ''){
           schedule.forEach((course, index) => {
               axios.get(`${process.env.REACT_APP_BASE_URL}opendata/course/${course.subject}/${course.catalog}`)
                   .then((res) => {
                       if (res.data !== null) {
                           if (course.day1 < 8 && course.day2 === 8) {
                               day1 = newStartDay(course.day1, course.startDate)
                               day2 = null
                           } else {
                               day1 = newStartDay(course.day1, course.startDate)
                               day2 = newStartDay(course.day2, course.startDate)
                           }
                           const eventDay = {
                               username: username,
                               eventHeader: res.data.subject + ' ' + res.data.catalog,
                               description: res.data.title,
                               recurrence: 'weekly',
                               link: '',
                               type: 'course',
                               subject: res.data.subject,
                               catalog: res.data.catalog,
                               startTime: course.startTime.toISOString(),
                               endTime: course.endTime.toISOString(),
                               actualStartTime: new Date().toISOString(),
                               actualEndTime: new Date().toISOString(),
                               startDate: day1.toISOString(), // needs to be calculated
                               endDate: course.endDate.toISOString()
                           }
                           axios.post(`${process.env.REACT_APP_BASE_URL}events/add`, eventDay)
                               .then((res) => {
                                   console.log(res.data)
                                   if (day2 != null) {
                                       eventDay.startDate = day2.toISOString()
                                       axios.post(`${process.env.REACT_APP_BASE_URL}events/add`, eventDay)
                                           .then(() => {
                                           })
                                   }
                               })

                           console.log(index)
                           handleDelete(index) //to remove the classes that were added
                       }
                       else{
                           const error = 'Invalid course: ' + course.subject + ' ' + course.catalog
                           setError(error)
                       }

                   })
           })

       }

    }


    function handleCancel() {
        document.elementFromPoint(0, 0).click();
    }

    function handleDayChange(course, e) {
        const newSchedule = [...schedule]
        if (e.target.name === 'day1') {
            course.day1 = e.target.value
        } else {
            course.day2 = e.target.value
        }

        setSchedule(newSchedule)
        setError('')
        if(course.day1 >= course.day2){
            const error = 'Invalid day format'
            setError(error)
            setValidateCourse(false)
        }else{
            setValidateCourse(true)
        }
    }

    function handleDateChange(course,e, field) {
        const newSchedule = [...schedule]
        if (field === 'start'){
            course.startDate = e.$d
        }
        else{
            course.endDate = e.$d
        }
        setSchedule(newSchedule)
    }

    function handleTimeChange(course, e) {
        const newDate = new Date()
        newDate.setHours(e.target.value.split(':')[0])
        newDate.setMinutes(e.target.value.split(':')[1])
        const newTime = [...schedule]
        if (e.target.id === 'startTime') {
            course.startTime = newDate
        } else {
            course.endTime = newDate
        }
        setSchedule(newTime)
    }

    function handleDelete(index) {
        const updatedList = schedule.filter((_, i) => i !== index);
        console.log(updatedList)
        setSchedule(updatedList)
    }

    function handleAdd() {
        const addCourse = {
            subject: '',
            catalog: '',
            day1: 1,
            day2: 8,
            startTime: new Date(),
            endTime: new Date(),
            startDate: new Date(),
            endDate: new Date()
        }
        const newSchedule = [...schedule]
        newSchedule.push(addCourse)
        setSchedule(newSchedule);
    }

    function handleCourse(e, course) {
        const newSchedule = [...schedule]
        if (e.target.id === 'subject') {
            course.subject = e.target.value
        } else {
            course.catalog = e.target.value
        }
        setSchedule(newSchedule)

    }

    const SelectDay = (course, onChange, name) => {
        return (
            <TextField
                name={name}
                id='day'
                label="day"
                size="small"
                margin="none"
                select
                onChange={(e) => onChange(course, e)}
                value={name === 'day1' ? course.day1 : course.day2}
                // sx={{
                //     width: '15vw', color: 'black',
                //     "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                //         {
                //             paddingLeft: '3px',
                //             paddingRight: '0',
                //         },
                // }}
            >
                <MenuItem value={1}>
                    Mo
                </MenuItem>
                <MenuItem value={2}>
                    Tu
                </MenuItem>
                <MenuItem value={3}>
                    We
                </MenuItem>
                <MenuItem value={4}>
                    Th
                </MenuItem>
                <MenuItem value={5}>
                    Fr
                </MenuItem>
                <MenuItem value={6}>
                    Sa
                </MenuItem>
                <MenuItem value={7}>
                    Su
                </MenuItem>
                <MenuItem value={8}>
                    -
                </MenuItem>
            </TextField>
        )
    }

    const addCourse = (
        <React.Fragment>
            <div style={{ margin: '1%'}}>
                <Stack direction='row' justifyContent="flex-end">
                    <Button
                        style={{backgroundColor: '#0072A8', color: 'white'}}
                        data-test={`add-courseSchedule`}
                        variant="text"
                        onClick={handleAdd}>
                        <AddIcon style={{color: 'white'}}/>
                        Add another course
                    </Button>
                </Stack>
            </div>
        </React.Fragment>
    )

    const coursesFound = (
        <React.Fragment>
            {schedule.map((course, index) => (
                <div key={index} style={{
                    width: '98%',
                    height: 'fit-content',
                    textAlign: 'center',
                    justifyContent: 'center',
                    margin: '1%',
                }}>
                    <CourseCard width={'100%'} height={'fit-content'}
                                content={
                                    <div style={{width: '100%', textAlign: 'center'}}>
                                        <Stack direction='row' justifyContent='space-between' alignItems='center' marginBottom='10px'>
                                            <div style={{ width:'100%'}}>
                                                <Stack direction='row' spacing={1}  alignItems='center'>
                                            <TextField required
                                                       data_test="courseSubject"
                                                       id="subject"
                                                       label="course code"
                                                       value={course.subject}
                                                       size="small"
                                                       margin="none"
                                                       onChange={(e) => {
                                                           handleCourse(e, course)
                                                       }}
                                            />
                                            <TextField required
                                                       data_test="courseCatalog"
                                                       id="catalog"
                                                       label="course number"
                                                       value={course.catalog}
                                                       size="small"
                                                       margin="none"
                                                       onChange={(e) => {
                                                           handleCourse(e, course)
                                                       }}
                                            />
                                                </Stack>
                                            </div>
<div style={{justifyContent:'flex-end'}}>
                                            <Button
                                                sx={{marginRight: '0px', justifyContent:'flex-end'}}
                                                data-test={`delete-courseSchedule-${course}`}
                                                variant="text"
                                                onClick={() => handleDelete(index)}>
                                                <ClearIcon style={{color: '#912338'}}
                                                           sx={{
                                                               "& css-17nqgcs-MuiButtonBase-root-MuiButton-root":
                                                                   {
                                                                       padding: '0',
                                                                       justifyContent: 'end'
                                                                   },
                                                           }}
                                                />
                                            </Button>
</div>
                                        </Stack>

                                        <Stack direction='row' spacing={1} marginTop={1} marginBottom='10px'
                                               alignItems='center' justifyContent='space-between'>
                                            {SelectDay(course, handleDayChange, 'day1')}
                                            {SelectDay(course, handleDayChange, 'day2')}
                                            <TextField
                                                id="startTime"
                                                label="Start Time"
                                                type="time"
                                                value={getTime(course.startTime)}
                                                sx={{
                                                    width: '29%',
                                                    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                                        {
                                                            paddingLeft: '2px',
                                                            paddingRight: '0'
                                                        }
                                                }}
                                                data-test="eventStartTime"
                                                onChange={(e) => {
                                                    handleTimeChange(course, e)
                                                }}
                                                margin="normal"
                                                size="small"

                                            />
                                            <TextField
                                                id="endTime"
                                                label="End Time"
                                                type="time"
                                                value={getTime(course.endTime)}
                                                sx={{
                                                    width: '29%',
                                                    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                                        {
                                                            paddingLeft: '2px',
                                                            paddingRight: '0'
                                                        }
                                                }}
                                                data-test="eventStartTime"
                                                onChange={(e) => {
                                                    handleTimeChange(course, e)
                                                }}
                                                margin="normal"
                                                size="small"
                                            />

                                        </Stack>
                                        <Stack direction='row' spacing={1} alignItems='center'>

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <CalendarDatePicker
                                                    data-test="eventStartDate"
                                                    key={"startDate"}
                                                    label="starting date"
                                                    value={course.startDate}
                                                    onChange={(e) =>{
                                                        handleDateChange(course,e,'start')
                                                    }}
                                                />

                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <CalendarDatePicker
                                                    data-test="eventEndDate"
                                                    key={"endDate"}
                                                    label="Ending date"
                                                    value={course.endDate}
                                                    onChange={(e) =>{
                                                        handleDateChange(course,e,'end')
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Stack>
                                    </div>}/>
                </div>
            ))}
        </React.Fragment>
    )

    const buttons = (
        <React.Fragment>
            <Stack justifyContent="center"
                   alignItems="center"
                   spacing={3}
                   width='100%'
                   direction="column">
                <PrimaryButton2  disable={!validateCourse} width={"96vw"} colour={'#057D78'} content="Add to calendar" onClick={handleEvent}/>
                <PrimaryButton2 width={"96vw"} colour={'#912338'} content="Cancel" onClick={handleCancel}/>
            </Stack>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <div style={{
                width: '98vw',
                height: '50vh',
                overflowY: 'auto',
                marginBottom: '10px',
                marginTop: '10px',
                border:'1px solid black'
            }}>
                {coursesFound}
                {addCourse}
            </div>
            <div style={{border:'1px solid black', width:'98vw',color: 'red', height: '5vh', paddingLeft:'1%',}}>{error}</div>
            {buttons}
        </React.Fragment>
    )
}