import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Typography } from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'
import { BackgroundCard, CustomWhiteCard, EventCard } from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import { useNavigate } from "react-router";
import GetAuthentication from "../Authentication/Authentification";
import { PrimaryButton2 } from '../CustomMUIComponents/CustomButtons';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import axios from "axios";

export default function CalendarView() {

    const [date, setDate] = useState(new Date()) // stores date, sets date using Date obj

    const [events, setEvents] = useState([]);
    const [acadEvents, setAcedemicEvents] = useState([]);


    const navigate = useNavigate();


    const user = GetAuthentication();
    console.log()
    console.log(events);

    function deleteData(eventID) {
        axios.delete(`${process.env.REACT_APP_BASE_URL}events/${eventID}`)
            .then((res) => {

            }
            ).catch((err) => {
                // give user a error message.
            })

    }


    function fetchData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}events/${user.username}`)
            .then((res) => {
                setEvents(res.data)
                console.log(res.data)
            }
            ).catch((err) => {
                // give user a error message.
            })
    }
    // need confirmation on how to call 
    function fetchAcadData(){
        axios.get(`${process.env.REACT_APP_BASE_URL}opendata/importantdates/`)
        .then((res) => {
            setAcedemicEvents(res.data)
            console.log(res.data)
        }
        ).catch((err) => {
            // give user a error message.
        })
    }

    useEffect(() => {
        if (user.username != null) {
            fetchData();
            fetchAcadData();

        } 
     
        
        else {
            navigate("login");
        }

    }, [])

    function addEventButton() {
        navigate('/event');
    }

    function setDates(d) {
        setDate(d);
    }


    const handleEdit = (e) => {

        console.log(e.EventID)
        navigate(`/editevent/${e.EventID}`)

    };


    function handleDelete(e) {
        console.log(e)
        deleteData(e.EventID);
        window.location.reload();
    }
    const AcademicEventsTile = ({ date }) => {
        const academicEvents = acadEvents.filter((e)=>{
            const event = new Date(e.date);
            return isSameDate(event, date)
        }) ;

        let AcademicTileContent;
        if(academicEvents.length < 1){
            AcademicTileContent = (<></>);
        }
        else {
            AcademicTileContent = "academicHighlight"
        }
        return AcademicTileContent
    }
    
    const calendarMonth = (
        <React.Fragment>
            <Calendar
                tileContent={({ date }) => <DayTile key={date} day={date} />}
                tileClassName={AcademicEventsTile}
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

    const EventHeader = ({content})=>{
        return(
        <React.Fragment>
        
            <CardContent>
                <Typography color="#000000" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                }}>
                    {content}
                </Typography>
            </CardContent>
        </React.Fragment>
   ) }


    const EventDisplay = ({ startTime, endTime, header, description, startDate, EventID, modifiable }) => {
        const currentDate = new Date(startDate);
        return (
            <div style={{ paddingBottom: 0, paddingTop: 0, width: '100%', display:'flow'}}>
                <div style={{ display: 'inline-block', paddingLeft: '10px' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {startTime + "-" + endTime}, {currentDate.getFullYear()} - {currentDate.getMonth() < 9 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1} - {currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="#000000" fontWeight={500} style={{ fontFamily: 'Roboto' }}>
                        {header}
                    </Typography>

                  <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">

                    </Typography>
                </div>


                <div style={{ float: 'right' }}>

                    {modifiable?<><button class="button_updates" onClick={() => handleEdit({ EventID })}>update</button>
                    <br></br>
                    <button class="button_updates" onClick={() => handleDelete({ EventID })}>delete</button></>: <></>}
                </div>
            </div>
        )
    }

    const eventsDisplay = (
     <> <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial'
        content={<EventHeader content={"School"}/>} backgroundColor='#0095FFs' />
        <div className="events">
         
            {events !== undefined && events.map((e, index) => (

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
                            EventID={e.eventID}
                            modifiable={true}

                        />}
                />
            ))}
        </div>
        </>  
    )

    const academicEventsDisplay = (
      <> <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial' 
        content={<EventHeader content={"Important Academic Events"}/>}  backgroundColor='#E5A712' />
       <div className="events">
          
            {acadEvents !== undefined && acadEvents.map((e, index) => (

                <EventCard
                    key={index}
                    justifyContent="left"
                    width="360px"
                    height='130px'
                    marginTop='10px' overflow='hidden'
                    content={
                        <EventDisplay
                            startDate={e.date}
                            startTime={"00:00"}
                            endTime={"23:59"}
                            header={e.description}
                            EventID={e._id}
                            modifiable={false}

                        />}
                />
            ))}
        </div>
        </> 
    )
    const isSameDate = (date1, date2) => (
        date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
    )

    const DayTile = ({ day }) => {
        const eventsThisDay = events.filter((e) => {
            const event = new Date(e.startDate);
            return isSameDate(event, day)
        });
       // console.log(date)



        let tileContent;

        if (eventsThisDay.length < 1) {
            tileContent = (<CalendarDayEventIcon key={day} eventType={"none"} />);
        } else {
            tileContent = eventsThisDay.map((e) => (
                <CalendarDayEventIcon key={`day-${e._id}`} eventType={e.eventHeader} />
            ))
        }

        return tileContent;
    }


    const CalendarDayEventIcon = ({ eventType }) => {
        let backgroundColor = "#0095FF"
        if (eventType === "Gym") {
            backgroundColor = "#735BF2"
        } else if (eventType === "Exam") {
            backgroundColor = "#00B383"
        } else if (eventType === "Volunteering") {
            backgroundColor = "#800410"
        }

        let tileIcon = <TripOriginIcon sx={{ color: backgroundColor, transform: "scale(0.25)" }} />

        if (eventType === "none") {
            tileIcon = (<></>);
        }

        return (<div style={{ width: "40px", height: "40px" }}><br />{tileIcon}</div>);
    }

    const calendarPageCards = useMemo(() => (
        <React.Fragment>
            {calendarCard}
            {eventsDisplay}
            {academicEventsDisplay}
        </React.Fragment>
    ), [calendarCard, calendarMonth]);

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '30px' }}>
                <BackgroundCard width='372px' height='100%' content={calendarPageCards} />
            </div>
        </React.Fragment>
    );
}