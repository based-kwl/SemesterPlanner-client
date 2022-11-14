import * as React from 'react';
import { useState, useEffect } from 'react';
import { Menu, Typography } from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'
import { BackgroundCard, CustomWhiteCard, EventCard } from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import { useNavigate } from "react-router";
import { PrimaryButton2 } from '../CustomMUIComponents/CustomButtons';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import MockendEvents from "./eventsMockedData.json";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";

export default function CalendarView() {

    const [date, setDate] = useState(new Date()) // stores date, sets date using Date obj

    const [event, setEvent] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const options = ['Edit', 'Delete', 'Cancel'];

    const fetchData = () => {
        const user = JSON.parse(localStorage.getItem('username'));
        axios.get(`${process.env.REACT_APP_BASE_URL}events/${user}`)
            .then((res) => {
                setEvent(res.data)
            }
            ).catch((err) => {
                // give user a error message.
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const navigate = useNavigate();

    function addEventButton() {
        navigate('/event');
    }

    function setDates(d) {
        setDate(d);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const EventOptions = () => (
        <div style={{ float: 'right', display: 'flex', paddingLeft: "30px" }}>
            <IconButton
                sx={{ float: 'right' }}
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
                getContentAnchorEl={undefined}
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

    const calendarMonth = (
        <React.Fragment>
            <Calendar
                tileContent={({ date }) => <DayTile key={date} day={date} />}
                onChange={setDates}
                value={date}
            />
        </React.Fragment>
    )

    const calendarCard = (
        <React.Fragment>
            <CustomWhiteCard width='360px' height='480px' marginTop='50px' content={calendarMonth} />
            <div className="center">
                <PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="+" onClick={addEventButton} />
            </div>

        </React.Fragment>
    )

    const eventHeader = (
        <React.Fragment>
            <CardContent>
                <Typography color="#000000" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                }}>
                    School
                </Typography>
            </CardContent>
        </React.Fragment>
    )


    const EventDisplay = ({ startTime, endTime, header, description, startDate }) => {
        const currentDate = new Date(startDate);
        return (
            <div style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}>
                <div style={{ display: 'inline-block', paddingLeft: '10px' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {startTime + "-" + endTime}, {currentDate.getFullYear()} - {currentDate.getMonth() < 9 ? '0' + currentDate.getMonth() + 1 : currentDate.getMonth() + 1} - {currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="#000000" fontWeight={500} style={{ fontFamily: 'Roboto' }}>
                        {header}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </div>
                <div style={{ float: 'right' }}>
                    <EventOptions />
                </div>
            </div>
        )}

    const eventsDisplay = (
        <div className="events">
            <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial'
                content={eventHeader} backgroundColor='#8CC63E' />
            {event !== undefined && event.map((e, index) => (
                <EventCard
                    key={index}
                    justifyContent="left"
                    width="360px"
                    height='90px'
                    marginTop='10px' overflow='hidden'
                    content={
                        <EventDisplay
                            startDate={e.startDate}
                            startTime={e.startTime}
                            endTime={e.endTime}
                            description={e.description}
                            header={e.eventHeader}
                        />}
                />
            ))}
        </div>
    )

    const isSameDate = (date1, date2) => (
        date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
    )

    const DayTile = ({ day }) => {
        const eventsThisDay = event.filter((e) => {
            const event = new Date(e.startDate);
            return isSameDate(event, day)
        });

        let tileContent;

        if (eventsThisDay.length < 1) {
            tileContent = (<CalendarDayEventIcon eventType={"none"} />);
        } else {
            tileContent = eventsThisDay.map((e) => (
                <CalendarDayEventIcon eventType={e.eventHeader} />
            ))
        }
        
        return tileContent;
    }


    const CalendarDayEventIcon = ({ eventType }) => {
        let backgroundColor = "#0095FF"
        if (eventType == "Gym") {
            backgroundColor = "#735BF2"
        } else if (eventType == "Exam") {
            backgroundColor = "#00B383"
        } else if (eventType == "Volunteering") {
            backgroundColor = "#800410"
        }

        let tileIcon = <TripOriginIcon sx={{ color: backgroundColor, transform: "scale(0.25)" }} />

        if (eventType == "none") {
            tileIcon = (<></>);
        }

        return (<div style={{ width: "40px", height: "40px" }}><br />{tileIcon}</div>);
    }

    const calendarPageCards = (
        <React.Fragment>
            {calendarCard}
            {eventsDisplay}
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '30px' }}>
                <BackgroundCard width='372px' height='100%' content={calendarPageCards} />
            </div>
        </React.Fragment>
    );
}