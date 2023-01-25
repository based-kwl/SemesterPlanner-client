import * as React from 'react';
import { useState, useMemo } from 'react';

import '../Calendar/calendar.css'
import { BackgroundCard, CustomWhiteCard, EventCard } from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import GetAuthentication from "../Authentication/Authentification";
import { PrimaryButton2 } from '../CustomMUIComponents/CustomButtons';

import BottomDrawer from "../StudyRoom/BottomDrawer";
import MonthlyStatistic from "./MonthlyReport.js"
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { fetchData } from './fetchingDataFactory'
export default function CalendarView() {
    const [courses, setCourses] = useState([])
    const [link, setLink] = useState('study-events-monthly')
    const user = GetAuthentication();

    //  Get all Events by student username

    useEffect(() => {

        fetchData(link, setCourses)

    }, [link])


    /**
     * Method that updates the events state after an events has been updated or deleted
     * @param {event} eventData, event data array containing all updated event params
     * @param {int} type, type of update required; 0 = update, 1 = delete, 2 = add
     */

    var data = {
        labels: courses?.map((course) => course.name),
        datasets: [{
            label: "expected time",
            backgroundColor: '#912338',
            data: courses?.map((course) => course.expectedTime),
        }, {
            label: "actual time",
            backgroundColor: '#FFFF55',
            data: courses?.map((course) => course.actualTime),
        }]
    }

    const monthly = (
        <React.Fragment>
            <div>
                <Bar data={data} height={"600%"}
                    options={{ maintainAspectRatio: false, responsive: false, indexAxis: 'y' }}></Bar>
            </div>
        </React.Fragment>
    )
    const weekly = (
        <React.Fragment>
            <div>
                <Bar data={data} height={"600%"}
                    options={{ maintainAspectRatio: false, responsive: false, indexAxis: 'y' }}></Bar>
            </div>
        </React.Fragment>
    )


    const calendarCard = (
        <React.Fragment>

            <div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "flex", justifyContent: "space-between" }}>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="monthly" onClick={()=>{setLink('study-events-monthly')}}/>}
                    title={'Add Event'} content={monthly} ></BottomDrawer>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="weekly" onClick={()=>{setLink('study-events-weekly')}} />}
                    title={'Add Event'} content={weekly} ></BottomDrawer>
            </div>
        </React.Fragment>
    )




    const calendarPageCards = useMemo(() => (
        <React.Fragment>
            {calendarCard}

        </React.Fragment>
    ), [calendarCard]);

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '500px' }}>
                <BackgroundCard width='372px' height='100%' content={calendarPageCards} />
            </div>
        </React.Fragment>
    );
}