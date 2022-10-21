import * as React from 'react';
import {useState} from 'react';
import {Typography} from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'
import {BackgroundCard, CustomWhiteCard, EventCard} from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";


export default function CalendarView() {
    const [date, setDate] = useState(new Date()) // stores date, sets date using Date obj
   //  use this to mark certain days and change the colour using .highlight in celendar.css
    // const mark = [ 
    //     '04-03-2022',
    //     '03-03-2022',
    //     '05-03-2022'
    // ]

    const celendarMonth = (
        <React.Fragment>
            <Calendar onChange={setDate} value={date} 

            />
        </React.Fragment>
    )

    const calendarCard = (
        <React.Fragment>
            <CustomWhiteCard width='360px' height='400px' marginTop='50px' content={celendarMonth} />
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
  
    const eventList = (
        <CardContent style={{ paddingBottom: 0, paddingTop:0}}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                14:00-17:00
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="#000000" fontWeight={500} style={{ fontFamily: 'Roboto'  }}>
                School Meeting
            </Typography>
            <Typography variant="body2" color="text.secondary" >
                Start from screen 16
            </Typography>
        </CardContent>
    )

    const eventDisplay = (
        <React.Fragment>
            <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial'  content={eventHeader} backgroundColor='#8CC63E' />
            <EventCard justifyContent='left' width='360px' height='90px' marginTop='10px' overflow='auto' content={eventList}  />
            <EventCard justifyContent='left' width='360px' height='90px' marginTop='10px' overflow='auto' content={eventList}  />
        </React.Fragment>
    )

    const calendarPageCards = (
        <React.Fragment>
        {calendarCard}
        {eventDisplay}
        </React.Fragment>
        )

    return (
        <React.Fragment>
            <PersistentDrawerLeft/>
            <div style={{paddingTop: '60px'}}>
                <BackgroundCard width='372px' height='785px' content={calendarPageCards}/>
            </div>
        </React.Fragment>
    );
}