import * as React from 'react';
import { useState, useMemo } from 'react';
import '../Calendar/calendar.css'
import { BackgroundCard, CustomWhiteCard, EventCard } from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import GetAuthentication from "../Authentication/Authentification";
import { PrimaryButton2 } from '../CustomMUIComponents/CustomButtons';
import BottomDrawer from "../StudyRoom/BottomDrawer";
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { fetchData } from './fetchingCategoryDataFactory'
export default function CalendarView() {
    const [courses, setCourses] = useState([])
    const [link, setLink] = useState('study-events-monthly')

    //  Get all Events by student username

    useEffect(() => {

        fetchData(link, setCourses)

    }, [link])


    var data = {
        labels: courses?.map((course) => course.name),
        datasets: [{
            label: "Recommanded",
            backgroundColor: '#912338',
            data: courses?.map((course) => course.expectedTime),
        }, {
            label: "Actual",
            backgroundColor: '#E9E3D3',
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

    const categoryweekly = (
        <React.Fragment>
            <div>
                <Bar data={data} height={"600%"}
                    options={{ maintainAspectRatio: false, responsive: false, indexAxis: 'y' }}></Bar>
            </div>
        </React.Fragment>
    )

    const categorymonthly = (
        <React.Fragment>
            <div>
                <Bar data={data} height={"600%"}
                    options={{ maintainAspectRatio: false, responsive: false, indexAxis: 'y' }}></Bar>
            </div>
        </React.Fragment>
    )

    const statisticCard = (
        <React.Fragment>

            <div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "flex", justifyContent: "space-between" }}>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="Monthly Courses Statistics" onClick={() => { setLink('study-events-monthly') }} />}
                    title={'Study Statistics'} content={monthly} ></BottomDrawer>
            </div>
            <div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "flex", justifyContent: "space-between" }}>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="Weekly Courses Statistics" onClick={() => { setLink('study-events-weekly') }} />}
                    title={'Study Statistics'} content={weekly} ></BottomDrawer>
            </div>

            <div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "flex", justifyContent: "space-between" }}>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="Weekly Category Statistics" onClick={() => { setLink('events-weekly') }} />}
                    title={'Category Statistics'} content={categoryweekly} ></BottomDrawer>
            </div>

            <div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "flex", justifyContent: "space-between" }}>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="Monthly Category Statistics" onClick={() => { setLink('events-monthly') }} />}
                    title={'Category Statistics'} content={categorymonthly} ></BottomDrawer>
            </div>
        </React.Fragment>
    )




    const statisticPageCards = useMemo(() => (
        <React.Fragment>
            {statisticCard}

        </React.Fragment>
    ), [statisticCard]);

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '300px' }}>
                <BackgroundCard width='372px' height='100%' content={statisticPageCards} />
            </div>
        </React.Fragment>
    );
}