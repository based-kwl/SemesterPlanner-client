import * as React from 'react';
import {useState, useEffect} from 'react';
import {Typography} from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'
import {BackgroundCard, CustomWhiteCard, EventCard} from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import {useNavigate} from "react-router";
import {PrimaryButton2} from '../CustomMUIComponents/CustomButtons';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import MockendEvents from "./eventsMockedData.json";

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

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(event));
    }, [event]);
    const navigate = useNavigate();

    const eventForDate = date => event.find(e => e.date === date);

    function addEventButton() {
        navigate('/event');

    }
    function setDates(d) {
        setDate(d);
        setSelectedDay(d);
    }

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
            <PrimaryButton2 content="+ create event" onClick={addEventButton}/>

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
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {startTime + "-" + endTime}
            </Typography>
            <Typography sx={{mb: 1.5}} color="#000000" fontWeight={500} style={{fontFamily: 'Roboto'}}>
                {header}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    )

    const eventsDisplay = (
        <div className="test">
            <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial'
                       content={eventHeader} backgroundColor='#8CC63E'/>
            {MockendEvents.map((e) => (
                <EventCard
                    justifyContent="left"
                    width="360px"
                    height='90px'
                    marginTop='10px' overflow='auto'
                    content={<EventDisplay startTime={e.startTime} endTime={e.endTime} description={e.description}
                                           header={e.eventHeader}/>}/>
            ))}
        </div>
    )

    function isToday(e) {
        const today = new Date()
        return ((e.getDate() == today.getDate())
            && e.getMonth() == today.getMonth()
            && today.getFullYear() == e.getFullYear())
    };

    function isSelected(e) {
        return ((e.getDate() == selectedDay.getDate())
            && e.getMonth() == selectedDay.getMonth()
            && e.getFullYear() == selectedDay.getFullYear())
    }


    const DayTile = ({day, view}) => {
        const eventsThisDay = MockendEvents.filter((e) => e.startDate == day);
        const NoEventTile =  (<CalendarDayEventIcon eventType={isToday(day) ? "today" : "none"} />);
        const tileContent = (eventsThisDay.length < 1
            ? <CalendarDayEventIcon eventType={isSelected(day) ? "clicked" : isToday(day) ? "today" : "none" } />
            : <CalendarDayEventIcon eventType={"test"}/>
        );
        return (
            <div style={{maxHeight: "70px"}}>
                {tileContent}
            </div>
        )
    }


    const CalendarDayEventIcon = ({eventType}) => {
        let backgroundColor = "#0095FF"
        if (eventType == "Gym") {
            backgroundColor = "#735BF2"
        } else if (eventType == "Exam") {
            backgroundColor = "#00B383"
        } else if (eventType == "none") {
            backgroundColor = "#ffffff"
        }else if (eventType == "clicked") {
            backgroundColor = "#8e7bee"
        }else if (eventType == "today") {
            backgroundColor = "#00ADEF"
        }
        return (
            <div><br /><TripOriginIcon sx={{color: backgroundColor, transform: "scale(0.4)"}}/></div>
        );
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
                <BackgroundCard width='372px' height='785px' content={calendarPageCards}/>
            </div>
        </React.Fragment>
    );
}