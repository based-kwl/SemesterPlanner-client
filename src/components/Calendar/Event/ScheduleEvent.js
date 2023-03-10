// import GetAuthentication from "../../Authentication/Authentification";
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


export default function ScheduleEvent() {
    // const email = GetAuthentication().email;
    // const dummyCourseList = ['SOEN 321', 'COMP 435', 'SOEN 490', 'ENGR 213', 'ELEC 275']
    const[courseList, setCourseList] = React.useState([])
    const [schedule, setSchedule] = React.useState({
        subject:'',
        catalog:'',
        day1:'Mo',
        day2:'Mo',
        startTime:new Date(),
        endTime:new Date()
    });

    function handleEvent() {
        console.log('list of events to validate:',schedule)
    }

    function handleCancel() {
        document.elementFromPoint(0, 0).click();
    }

    function handleDayChange(index, e) {
        console.log(index,e.target.name, e.target.value)
        if(e.target.name ==='day1'){
            setSchedule({...schedule,day1:e.target.value})
        }else{
            setSchedule({...schedule,day2:e.target.value})
        }
        console.log(schedule)
    }
    function handleTimeChange(){

    }
    function handleDelete(index){
        const updatedList = courseList.filter((_, i) => i !== index);
        setCourseList(updatedList);
    }
    function handleAdd(){
        setCourseList([...courseList, "sample"]);
        console.log(courseList)
    }
    function handleCourse(e){
        setSchedule({...schedule, subject:e.target.value});
        console.log(schedule)
    }
    const SelectDay = (index, onChange, name) =>{
        return(
            <TextField
                name={name}
                id='day'
                label="day"
                select
                onChange={(e)=>onChange(index,e)}
                defaultValue={schedule.day1}
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
            {courseList.map((course, index) => (
                <div key={index} style={{width: '98%', textAlign: 'center', justifyContent:'center', margin:'1%'}}>
                <CourseCard width={'100%'} height={'fit-content'}
                               content={
                                   <div   style={{width: '100%', textAlign: 'center'}}>
                                       <Stack direction='row'  spacing={1} justifyContent='space-between' alignItems='center' marginBottom='5%' >
                                           <TextField required
                                                      data_test="courseSubject"
                                                      id="subject"
                                                      label="subject"
                                                      value={schedule.subject}
                                                      defaultValue="EX: SOEN"
                                                      size="small"
                                                      margin="none"
                                                      onChange={(e)=>{handleCourse(e,index)}}
                                           />
                                           <TextField required
                                                      data_test="courseCatalog"
                                                      id="catalog"
                                                      label="catalog"
                                                      value={schedule.catalog}
                                                      defaultValue="EX: 385"
                                                      size="small"
                                                      margin="none"
                                                      // onChange={(e) => {
                                                      //     setSchedule({...schedule, catalog: e.target.value})}}
                                                      onChange={(e)=>{handleCourse(index)}}
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
                                           {SelectDay(index, handleDayChange, 'day1')}
                                           {SelectDay(index, handleDayChange, 'day2')}
                                           <TextField
                                               id="startTime"
                                               label="Start Time"
                                               type="time"
                                               value={getTime(new Date())}
                                               sx={{
                                                   width: '29%',
                                                   "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                                       {
                                                           paddingLeft: '2px',
                                                           paddingRight: '0'
                                                       }
                                               }}
                                               data-test="eventStartTime"
                                               onChange={handleTimeChange}
                                               margin="normal"
                                           />
                                           <TextField
                                               id="endTime"
                                               label="End Time"
                                               type="time"
                                               value={getTime(new Date())}
                                               sx={{
                                                   width: '29%',
                                                   "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                                       {
                                                           paddingLeft: '2px',
                                                           paddingRight: '0'
                                                       }
                                               }}

                                               data-test="eventStartTime"
                                               onChange={handleTimeChange}
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
            <div style={{  width:'98vw', height:'55vh', overflowY:'auto', marginBottom:'10px', border:'1px solid black', marginTop:'10px'}}>
                {coursesFound}
                {addCourse}
            </div>
            {buttons}
        </React.Fragment>
    )
}