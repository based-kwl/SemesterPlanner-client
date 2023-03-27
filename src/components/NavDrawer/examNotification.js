import * as React from "react";
import { InputAdornment, Stack } from "@mui/material";
import { PrimaryButton2 } from "../CustomMUIComponents/CustomButtons";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { TimeCard } from "../CustomMUIComponents/CustomCards";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { getTime } from "../Calendar/CommonFunctions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { GetAuthentication } from '../Authentication/Authentification';
import axios from "axios";
import { delay } from "../CommonHelperFunctions/CommonHelperFunctions";
import { getHoursBetweenTimestamps } from "./examNotificationFactory";

export default function ExamNotification(props) {
    const [studyTimes, setStudyTimes] = React.useState([])
    const [timeSlot, setTimeSlot] = React.useState([])
    const [timePeriod, setTimePeriod] = React.useState(60)
    const [exams] = React.useState(props.examData)
    const [availability, setAvailability] = React.useState({
        startTime: new Date(),
        endTime: new Date()
    })
    const options = { month: "long" };
    let date = new Date(exams.startDate)
    let date2 = new Intl.DateTimeFormat('en-us', options).format(date).toUpperCase()
    let date3 = date.getDate()


    React.useEffect(() => {
        // Convert strings to Date objects
        const date_1 = new Date(exams.startDate);
        const date_2 = new Date(exams.startTime);
        // Extract the date from date1 and time from date2
        const newDate = new Date(date_1.getFullYear(), date_1.getMonth(), date_1.getDate(), date_2.getHours(), date_2.getMinutes(), date_2.getSeconds(), date_2.getMilliseconds());
        // Convert the new Date object back to an ISO formatted string
        const newTimestamp = newDate.toISOString();
        const examTime = new Date(newTimestamp).toLocaleString('en-US', { timeZone: 'America/New_York' });
        const dateNow = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        getHoursBetweenTimestamps(dateNow, examTime, setTimeSlot, timePeriod)

        initTimes()
    }, [timePeriod])

    function initTimes() {
        const newInitTime =
        {
            startTime: new Date(),
            endTime: new Date()
        }
        newInitTime.startTime.setHours(9, 0, 0, 0)
        newInitTime.endTime.setHours(18, 0, 0, 0)
        setAvailability(newInitTime)
    }
    function handleCancel() {
        document.elementFromPoint(0, 0).click();
    }
    function handleDismiss() {
        exams.studyHoursConfirmed = true

        axios.post(`${process.env.REACT_APP_BASE_URL}events/update`, exams)
            .then(() => {
            })
            .catch(err => {
                console.log(err)
            });
        delay(200).then(() => {
            window.location.reload()
        })
    }


    function handleEvent() {
        studyTimes.forEach((studyTime) => {
            const dateepoch = new Date(studyTime[0]);
            const isoStartTimestampString = dateepoch.toISOString();
            const dateepochend = new Date(studyTime[1]);
            const isoEndTimestampString = dateepochend.toISOString();

            const eventDay = {
                username: GetAuthentication().username,
                eventHeader: exams.subject + ' ' + exams.catalog,
                description: 'study for exam',
                recurrence: 'once',
                link: '',
                type: 'study',
                subject: exams.subject,
                catalog: exams.catalog,
                startTime: isoStartTimestampString,
                endTime: isoEndTimestampString,
                actualStartTime: new Date().toISOString(),
                actualEndTime: new Date().toISOString(),
                startDate: isoStartTimestampString, // needs to be calculated
                endDate: isoEndTimestampString
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}events/add`, eventDay)
                .then((res) => {

                })
        })
    }
    function handleTimeChange(e) {
        const newDate = new Date()
        newDate.setHours(e.target.value.split(':')[0])
        newDate.setMinutes(e.target.value.split(':')[1])

        if (e.target.id === 'startTime') {
            setAvailability({ ...availability, startTime: newDate })
        } else {
            setAvailability({ ...availability, endTime: newDate })
        }
    }
    function handleMenu(e) {
        setStudyTimes([])
        setTimePeriod(e.target.value)

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
                    padding: '0',
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
            data-test="eventEndTime"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={handleTimeChange}
            sx={{
                "& css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                {
                    padding: '0',
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
            value={timePeriod}
        >
            <MenuItem value={60}>
                60 min
            </MenuItem>
            <MenuItem value={30}>
                30 min
            </MenuItem>
        </TextField>
    )
    const examName = (
        <div align='center' style={{ marginBottom: '5px' }}>
            <Typography variant="h5"> {exams.subject + ' ' + exams.catalog} EXAM ON {date2} {date3}</Typography>
        </div>
    )

    const showAvailability = (
        <React.Fragment>
            <div style={{ width: '97vw', marginBottom: '5px', paddingLeft: '7px' }}>
                <Typography> show availability from <p style={{ alignItems: 'center' }}>{startTime} to {endTime}</p></Typography>
                <Typography> display slots of {slotMenu} </Typography>
            </div>

        </React.Fragment>
    )

    const handleAddStudyTimeSlots = (startTime) => {
        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + (timePeriod === 60 ? 60 : 30) * 60 * 1000);
        setStudyTimes([...studyTimes, [startDate.getTime(), endDate.getTime()]]);

    };

    const handleRemoveStudyTimeSlots = (startTime) => {
        setStudyTimes(studyTimes.filter(time => time[0] !== startTime));

    };

    const timeDisplay = timeSlot
        .filter((startTime) => {
            const date = new Date(startTime);
            const startHour = availability.startTime.getHours();
            let endHour = availability.endTime.getHours();
            if (endHour < startHour) {
                endHour = 24;
            }
            const currentHour = date.getHours();
            return currentHour >= startHour && (currentHour < endHour || (currentHour === 0 && endHour === 24));
        })
        .map((startTime, index) => {
            const date = new Date(startTime);
            const dateString = `${date.toLocaleString('default', { weekday: 'short' }).toUpperCase()} ${date.toLocaleString('default', { month: 'short' }).toUpperCase()} ${date.getDate()}`;
            const startDate = new Date(startTime);
            const endDate = new Date(startDate.getTime() + (timePeriod === 60 ? 60 : 30) * 60 * 1000);
            const endTimeString = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const startTimeString = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const isTimeSelected = studyTimes.some(time => time[0] === startDate.getTime());
            return (
                <TimeCard
                    key={index}
                    width={'100%'}
                    content={
                        <>
                            <Stack direction="row" alignItems="center" justifyContent="space-around" spacing={1}>
                                <Typography variant="subtitle1">{dateString}</Typography>
                                <TextField
                                    id="courseStart"
                                    type="text"
                                    value={startTimeString}
                                    size="small"
                                    disabled
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccessTimeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        width: '25vw',
                                        '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                            paddingRight: '7px',
                                        },
                                    }}
                                    data-test="eventEndTime"
                                    margin="none"
                                />
                                <TextField
                                    id="courseStart"
                                    type="text"
                                    value={endTimeString}
                                    size="small"
                                    disabled
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccessTimeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        width: '25vw',
                                        '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                            paddingRight: '7px',
                                        },
                                    }}
                                    data-test="eventEndTime"
                                    margin="none"
                                />
                                {isTimeSelected ?
                                    <Button
                                        variant="text"
                                        onClick={() => handleRemoveStudyTimeSlots(startDate.getTime())}
                                    >
                                        <CheckIcon />
                                    </Button>
                                    :
                                    <Button
                                        variant="text"
                                        onClick={() => handleAddStudyTimeSlots(startTime)}
                                    >
                                        <AddIcon />
                                    </Button>
                                }
                            </Stack>
                        </>
                    }
                />
            );
        });


    const buttons = (
        <React.Fragment>
            <Stack justifyContent="center"
                alignItems="center"
                spacing={1}
                width='100%'
            >
                <PrimaryButton2 width={'97vw'} colour={'#057D78'} content="Add to calendar" onClick={handleEvent} />
                <PrimaryButton2 width={'97vw'} colour={'#912338'} content="Cancel" onClick={handleCancel} />
                <PrimaryButton2 width={'97vw'} colour={'#0072A8'} content="Dismiss notification" onClick={handleDismiss} />
            </Stack>
        </React.Fragment>
    )
    const examNotification = (
        <React.Fragment>
            {examName}
            {showAvailability}
            <div align='center' style={{
                border: '1px black solid', overflow: 'auto',
                paddingTop: '10px',
                marginBottom: '10px',
                width: '97vw',
                height: '35vh'
            }}>
                {timeDisplay}

            </div>
            {buttons}


        </React.Fragment>
    )
    return (examNotification)
}