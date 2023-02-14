// import GetAuthentication from "../../Authentication/Authentification";
import * as React from "react";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../../CustomMUIComponents/CustomButtons";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {getTime} from "../CommonFunctions";
import {StudyRoomCard} from "../../StudyRoom/CommonResources";


export default function ScheduleEvent() {
    // const email = GetAuthentication().email;
    const dummyCourseList = ['SOEN 321', 'COMP 435', 'SOEN 490', 'ENGR 213', 'ELEC 275']

    function handleEvent() {
    }

    function handleCancel() {
        document.elementFromPoint(0, 0).click();
    }

    function handleDayChange() {
    }
    function handleTimeChange(){

    }
    const SelectDay = () =>{
        return(
            <TextField
                id="day"
                label="day"
                select
                onChange={handleDayChange}
                value="Mo"
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

    const coursesFound = (
        <React.Fragment>
            {dummyCourseList.map((course, index) => (
                <StudyRoomCard width={'94vw'} height={'100px'} paddingLeft={'7px'}
                               content={
                                   <div  key={index} style={{width: '90vw', textAlign: 'center'}}>
                                       <Typography>{course}</Typography>
                                       <Stack direction='row' spacing={1} marginTop={1}>
                                           <SelectDay/>
                                           <SelectDay/>
                                           <TextField
                                               id="startTime"
                                               label="Start Time"
                                               type="time"
                                               value={getTime(new Date())}
                                               sx={{
                                                   width: '27vw',
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
                                                   width: '27vw',
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
                <PrimaryButton2 width={"94vw"} colour={'#057D78'} content="Add to calendar" onClick={handleEvent}/>
                <PrimaryButton2 width={"94vw"} colour={'#912338'} content="Cancel" onClick={handleCancel}/>
            </Stack>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <div style={{height:'130vw', overflowY:'auto', marginBottom:'10px'}}>
                {coursesFound}
            </div>
            {buttons}
        </React.Fragment>
    )
}