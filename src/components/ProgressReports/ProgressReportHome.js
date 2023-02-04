import {BackgroundCard, StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import NavDrawer from "../NavDrawer/navDrawer";
import * as React from "react";
import Typography from "@mui/material/Typography";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import AssessmentIcon from '@mui/icons-material/Assessment';
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import axios from "axios";
import { useState, useMemo, useEffect } from 'react';
import GetAuthentication from "../Authentication/Authentification";
import {Stack} from "@mui/system";
import { fetchData } from './fetchingCategoryDataFactory'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

export default function ProgressReportHome(){
    const [courses, setCourses] = useState([])
    const [link, setLink] = useState('study-events-monthly')
    const [course, setCourse] = React.useState([])
    const [time, setTime] = React.useState('')
    const email = GetAuthentication().email;


    React.useEffect(()=>{
        fetchData(link, setCourses)
        handleCourseList()
        handleTotalStudyTime()

    },[link])


    var data = {
        labels: courses?.map((course) => course.name),
        datasets: [{
            label: "Recommanded",
            backgroundColor: '#912338',
            data: courses?.map((course) => course.expectedTime),
        }, {
            label: "Actual",
            backgroundColor: '#E9E3D3',
            data: courses?.map((course) => course.Actual),
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




    function handleCourseList(){
        axios.get(`${process.env.REACT_APP_BASE_URL}student/courses/${email}`)
            .then(res => {
                setCourse(res.data.courses);
                console.log(res.data.courses)
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    function handleTotalStudyTime(){
        axios.get(`${process.env.REACT_APP_BASE_URL}student/studyhours/${email}`)
            .then(res => {
                setTime(res.data.studyHours);
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    const studyEstimator = (
        <React.Fragment>
            <NavDrawer/>
            <StudyRoomChatCard width='92vw' height='8vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{fontSize:'22px', fontWeight:'bold'}} ><Typography variant="1">Study Estimator</Typography></div>}/>
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={
                <div style={{overflow: 'auto', height: '60vh'}}>
                    <h3>Course Workload</h3>
                    <div style={{overflow: 'auto', height: '32vh'}}>
                        {course.map((course, index) => (
                            <div key={index}>
                                <StudyRoomCard data-test={`${course}`} width={'81vw'} height={'40px'}

                                               content={<Stack direction="row"
                                                               justifyContent="space-between"
                                                               spacing={20}>
                                                   <div style={{
                                                       width:"60vw",
                                                       margin: "0px",
                                                       display: 'flex',
                                                       justifyItems: 'left'}}>{course.subject} {course.catalog} {course.title} </div>
                                                   <div style={{
                                                       width:"10vw",
                                                       margin: "0px",
                                                       display: 'flex',
                                                       justifyItems: 'right'}}>credits: {course.classUnit}</div>
                                                   <div style={{
                                                       width:"11vw",
                                                       margin: "0px",
                                                       display: 'flex',
                                                       justifyItems: 'right'}}> study time: {course.studyHours} hrs</div>
                                               </Stack>}/>
                            </div>
                        ))}
                    </div>
                    <StudyRoomCard data-test={`${time}`} width={'81vw'} height={'40px'}
                                   content={<> Total recommended study time: {time} hrs
                                   </>}/>

                </div>
            }/>

            {/*drawers for future features*/}
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>
                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}}  />}
                               title={'Feature 1'} content={monthly}/></div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}} onClick={() => { setLink('events-weekly') }}/>}
                               title={'Feature 2'} content={weekly}/></div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}} onClick={() => { setLink('events-weekly') } }/>}
                               title={'Feature 3'} content={categorymonthly}/></div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}} onClick={() => { setLink('events-weekly') }} />}
                               title={'Feature 4'} content={categoryweekly}/></div>}/>

            </div>
        </React.Fragment>
    )

    return(<BackgroundCard width='96vw' height='99vh' content={studyEstimator}/>)
}