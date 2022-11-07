import * as React from 'react';
import {useState, useEffect} from 'react';
import {Menu, Typography} from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'
import {BackgroundCard, CustomWhiteCard, EventCard} from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import {useNavigate} from "react-router";
import {PrimaryButton2} from '../CustomMUIComponents/CustomButtons';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import MockendEvents from "./eventsMockedData.json";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";


export default function CalendarView() {
    const [date, setDate] = useState(new Date()) // stores date, sets date using Date obj
    //  use this to mark certain days and change the colour using .highlight in celendar.css
    // const mark = [ 
    //     '04-03-2022',
    //     '03-03-2022',
    //     '05-03-2022'
    // ]

    const events = MockendEvents;
    const [selectedDay, setSelectedDay] = React.useState(new Date());
    const [event, setEvent] = useState(events);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const options = ['Delete', 'Cancel'];

    const ITEM_HEIGHT = 48;

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(event));
    }, [event]);

    const navigate = useNavigate();

    function addEventButton() {
        navigate('/event');

    }
    function setDates(d) {
        setDate(d);
        setSelectedDay(d);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const EventOptions = () => (
        <div style={{ float: 'right', display: 'flex', paddingLeft: "30px"}}>
            <IconButton
                sx={{float: 'right'}}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={handleClose}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );

    const celendarMonth = (
        <React.Fragment>
            <Calendar
                tileContent={({activeStartDate, date, view}) => <DayTile day={date} view={view}/>}
                onChange={setDates}
                value={date}
            />
        </React.Fragment>
    )

    const calendarCard = (
        <React.Fragment>
                <CustomWhiteCard width='360px' height='480px' marginTop='50px' content={celendarMonth}/>
            <div className="center">
                <PrimaryButton2 style={{margin: 'auto'}} content="+" onClick={addEventButton}/>
            </div>

        </React.Fragment>
    )

    const eventHeader = (
        <React.Fragment>
            <CardContent>
                <Typography color="#ffffff" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                }}>
                    School
                </Typography>
            </CardContent>
        </React.Fragment>
    )


    const EventDisplay = ({startTime, endTime, header, description}) => (
        <CardContent style={{paddingBottom: 0, paddingTop: 0}}>
            <Grid container alignItems="flex-end">
                <Grid item sm={10} s={10} >
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {startTime + "-" + endTime}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="#000000" fontWeight={500} style={{fontFamily: 'Roboto'}}>
                        {header}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </Grid>
                <Grid item sm={2} s={2}>
                    <EventOptions />
                </Grid>
            </Grid>
        </CardContent>
    )

    const eventsDisplay = (
        <div className="events">
            <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial'
                       content={eventHeader} backgroundColor='#8CC63E'/>
            {MockendEvents.map((e, index) => (
                    <EventCard
                        key={index}
                        justifyContent="left"
                        width="360px"
                        height='90px'
                        marginTop='10px' overflow='hidden'
                        content={
                        <EventDisplay
                            startTime={e.startTime}
                            endTime={e.endTime}
                            description={e.description}
                            header={e.eventHeader}
                        />}
                    />
            ))}
        </div>
    )

    const DayTile = ({day, view}) => {
        const eventsThisDay = MockendEvents.filter((e) => e.startDate == day);
        let tileContent;

        if (eventsThisDay.length < 1){
           tileContent =  (<CalendarDayEventIcon eventType={"none"} />);
        } else {
            tileContent = eventsThisDay.map((e) => (
                <CalendarDayEventIcon eventType={e.eventHeader}/>
            ))
        }

        return tileContent;
    }


    const CalendarDayEventIcon = ({eventType}) => {
        let backgroundColor = "#0095FF"
        if (eventType == "Gym") {
            backgroundColor = "#735BF2"
        } else if (eventType == "Exam") {
            backgroundColor = "#00B383"
        }else if (eventType == "Volunteering") {
            backgroundColor = "#800410"
        }

        let tileIcon = <TripOriginIcon sx={{color: backgroundColor, transform: "scale(0.25)"}}/>

        if (eventType == "none") {
            tileIcon = (<></>);
        }

        return (<div style={{ width: "40px" ,height: "40px"}}><br />{tileIcon}</div>);
    }

    const calendarPageCards = (
        <React.Fragment>
            {calendarCard}
            {eventsDisplay}
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <PersistentDrawerLeft/>
            <div style={{paddingTop: '30px'}}>
                <BackgroundCard width='372px' height='100%' content={calendarPageCards}/>
            </div>
        </React.Fragment>
    );
}