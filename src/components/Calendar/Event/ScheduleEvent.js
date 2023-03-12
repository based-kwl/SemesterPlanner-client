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
import moment from "moment/moment";


export default function ScheduleEvent() {
    const username = GetAuthentication().username;
    const [error, setError] = React.useState('')
    const [validateCourse, setValidateCourse] = React.useState(false)
    const [schedule, setSchedule] = React.useState([{
        username: username,
        eventHeader:'',
        description:'',
        recurrence:'weekly',
        link:'',
        type:'course',
        subject:'ex:SOEN',
        catalog:'ex:385',
        day1:'Mo',
        day2:'Mo',
        startTime:new Date(),
        endTime:new Date(),
        actualStartTime:new Date(),
        actualEndTime:new Date(),
        startDate:'',
        endDate:''
    }]);

    function handleEvent() {
        setError('')
        schedule.forEach((course)=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}opendata/course/${course.subject}/${course.catalog}`)
                .then((res) => {
                    if(res.data){
                        console.log(res.data.title)
                        console.log('correct',course.subject, course.catalog)
                        course.eventHeader = res.data.subject + ' ' + res.data.catalog
                        course.description = res.data.title
                        course.startDate = moment("DD/MM/YYYY").toDate()

                    }else{
                        console.log('not correct', course.subject, course.catalog)
                        const error = 'invalid course: '+ course.subject+ ' '+course.catalog
                        setError(error)
                        setValidateCourse(false)
                    }
                })
        })
        console.log(schedule)
        // if(validateCourse){
        //     schedule.forEach((course)=>{
        //         const newSchedule = [...schedule]
        //         axios.post(`${process.env.REACT_APP_BASE_URL}events/add`, schedule)
        //             .then((res) => {
        //                 document.elementFromPoint(0, 0).click();
        //             })
        //             .catch(err => {
        //
        //             });
        //
        //     })
        // }
    }

    function handleCancel() {
        document.elementFromPoint(0, 0).click();
    }

    function handleDayChange(course, e) {
        const newSchedule = [...schedule]
        if(e.target.name ==='day1'){
            course.day1 = e.target.value
        }else{
            course.day2 = e.target.value
        }
        // newSchedule.push(course)
        setSchedule(newSchedule)
    }
    function handleTimeChange(course, e){
        const newDate = new Date()
        newDate.setHours(e.target.value.split(':')[0])
        newDate.setMinutes(e.target.value.split(':')[1])
        const newTime = [...schedule]
        if(e.target.id === 'startTime'){
            course.startTime = newDate
        }else{
            course.endTime = newDate
        }
        setSchedule(newTime)
    }
    function handleDelete(index){
        const updatedList = schedule.filter((_, i) => i !== index);
        setSchedule(updatedList)

    }
    function handleAdd(){
        const addCourse = {
            subject:'',
            catalog:'',
            day1:'Mo',
            day2:'Mo',
            startTime:new Date(),
            endTime:new Date()
        }
        const newSchedule = [...schedule]
        newSchedule.push(addCourse)
        setSchedule(newSchedule);

    }
    function handleCourse(e, course){
        const newSchedule = [...schedule]
        if(e.target.id === 'subject'){
            course.subject = e.target.value
        }else{
            course.catalog = e.target.value
        }
        setSchedule(newSchedule)
    }
    const SelectDay = (course, onChange, name) =>{
        return(
            <TextField
                name={name}
                id='day'
                label="day"
                select
                onChange={(e)=>onChange(course,e)}
                value={name==='day1'?course.day1: course.day2}
                sx={{
                    width: '15vw', color: 'black',
                    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                            paddingLeft: '3px',
                            paddingRight: '0',
                        },
                }}
            >
                <MenuItem value={"Mo"}>
                    Mo
                </MenuItem>
                <MenuItem value={"Tu"}>
                    Tu
                </MenuItem>
                <MenuItem value={"We"}>
                    We
                </MenuItem>
                <MenuItem value={"Th"}>
                    Th
                </MenuItem>
                <MenuItem value={"Fr"}>
                    Fr
                </MenuItem>
                <MenuItem value={"Sa"}>
                    Sa
                </MenuItem>
                <MenuItem value={"Su"}>
                    Su
                </MenuItem>
                <MenuItem value={"-"}>
                    -
                </MenuItem>
            </TextField>
        )

    }
    const addCourse = (
        <React.Fragment>
            <div style={{border:'1px solid blue', margin:'1%' }}>
                <Stack direction='row' justifyContent="flex-end">
                    <Button
                        style={{backgroundColor:'#0072A8', color:'white'}}
                        data-test={`add-courseSchedule`}
                        variant="text"
                        onClick={handleAdd}>
                        <AddIcon style={{color:'white'}}/>
                        Add another course
                    </Button>
                </Stack>
            </div>
        </React.Fragment>
    )

    const coursesFound = (
        <React.Fragment>
            {schedule.map((course, index) => (
                <div key={index} style={{width: '98%', textAlign: 'center', justifyContent:'center', margin:'1%'}}>
                <CourseCard width={'100%'} height={'fit-content'}
                               content={
                                   <div   style={{width: '100%', textAlign: 'center'}}>
                                       <Stack direction='row'  spacing={1} justifyContent='space-between' alignItems='center' marginBottom='5%' >
                                           <TextField required
                                                      data_test="courseSubject"
                                                      id="subject"
                                                      label="course code"
                                                      value={course.subject}
                                                      size="small"
                                                      margin="none"
                                                      onChange={(e)=>{handleCourse(e,course)}}
                                           />
                                           <TextField required
                                                      data_test="courseCatalog"
                                                      id="catalog"
                                                      label="course number"
                                                      value={course.catalog}
                                                      size="small"
                                                      margin="none"
                                                      onChange={(e)=>{handleCourse(e, course)}}
                                           />
                                           <Button
                                               sx={{marginRight:'0px'}}
                                               data-test={`delete-courseSchedule-${course}`}
                                               variant="text"
                                               onClick={() => handleDelete(index)}>
                                               <ClearIcon style={{color: '#912338'}}
                                                          sx={{
                                                              "& css-17nqgcs-MuiButtonBase-root-MuiButton-root":
                                                                  {
                                                                      padding: '0',
                                                                      justifyContent:'end'
                                                                  },
                                                          }}
                                               />

                                           </Button>
                                       </Stack>

                                       <Stack direction='row' spacing={1} marginTop={1}  justifyContent='space-between'>
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
                                               onChange={(e) => {handleTimeChange(course,e)}}
                                               margin="normal"
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
                                               onChange={(e) => {handleTimeChange(course,e)}}
                                               margin="normal"
                                           />
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
                <PrimaryButton2 width={"96vw"} colour={'#057D78'} content="Add to calendar" onClick={handleEvent}/>
                <PrimaryButton2 width={"96vw"} colour={'#912338'} content="Cancel" onClick={handleCancel}/>
            </Stack>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <div style={{  width:'98vw', height:'50vh', overflowY:'auto', marginBottom:'10px', border:'1px solid black', marginTop:'10px'}}>
                {coursesFound}
                {addCourse}
            </div>
            <div style={{color: 'red', height: '5vh'}}>{error}</div>
            {buttons}
        </React.Fragment>
    )
}