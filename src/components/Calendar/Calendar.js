import * as React from 'react';
import { Typography } from "@mui/material";
import { useState } from "react";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'
import { BackgroundCard, CustomWhiteCard, ReminderCard } from '../CustomMUIComponents/CustomCards';


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

    const reminderHeader = (
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
  
    const reminderList = (
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

    const reminderDisplay = (
        <React.Fragment>
            <ReminderCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial'  content={reminderHeader} backgroundColor='#8CC63E' />
            <ReminderCard justifyContent='left' width='360px' height='90px' marginTop='10px' overflow='auto' content={reminderList}  />
            <ReminderCard justifyContent='left' width='360px' height='90px' marginTop='10px' overflow='auto' content={reminderList}  />
        </React.Fragment>
    )

    const calendarPageCards = (
        <React.Fragment>
        {calendarCard}
        {reminderDisplay}
        </React.Fragment>
        )

    const calendarPage = (
        <BackgroundCard width='372px' height='785px' content={calendarPageCards} />
    )

    return calendarPage;
}