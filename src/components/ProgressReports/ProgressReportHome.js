import {BackgroundCard, StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import NavDrawer from "../NavDrawer/navDrawer";
import * as React from "react";
import Typography from "@mui/material/Typography";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import axios from "axios";
import { useState, useMemo, useEffect } from 'react';
import {GetAuthentication} from "../Authentication/Authentification";
import {Stack} from "@mui/system";
import { fetchData } from './fetchingCategoryDataFactory';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import StudyRecap from "./StudyRecap";
import UpdateIcon from '@mui/icons-material/Update';
import CategoryIcon from '@mui/icons-material/Category';
import SchoolIcon from '@mui/icons-material/School';

export default function ProgressReportHome(){
    const [courses, setCourses] = useState([])
    const [link, setLink] = useState('study-events-monthly')
    const [course, setCourse] = useState([])
    const [time, setTime] = useState('')
    const email = GetAuthentication().email;

    useEffect(()=>{
        fetchData(link, setCourses)
        handleCourseList()
        handleTotalStudyTime()
    },[link])


    const studyStatisticsData = {
        labels: courses?.map((course) => course.name),
        datasets: [{
            label: "Recommended",
            backgroundColor: '#912338',
            data: courses?.map((course) => course.expectedTime),
        }, {
            label: "Actual",
            backgroundColor: '#E9E3D3',
            data: courses?.map((course) => course.Actual),
        }]
    }

    const categoryStatisticsData = {
        labels: courses?.map((course) => course.name),
        datasets: [{
            label: "Time (hours)",
            backgroundColor: courses?.map((course) => course.colour),
            data: courses?.map((course) => course.expectedTime),
        }]
    }

    const optionsStudyData = {
        maintainAspectRatio: false,
        responsive: false,
        indexAxis: 'y',
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hours'
                }
            }
        }
    };

    const optionsCategoryData = {
        maintainAspectRatio: false,
        responsive: false,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hours'
                }
            }
        }
    };

    const renderBarChart = (data, options) => {
        return (
            <React.Fragment>
                <div>
                    <Bar data={data} height={"600%"} options={options}></Bar>
                </div>
            </React.Fragment>
        )
    }

    function handleCourseList() {
        axios.get(`${process.env.REACT_APP_BASE_URL}student/courses/${email}`)
            .then(res => {
                setCourse(res.data.courses);
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    function handleTotalStudyTime() {
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
            <NavDrawer />
            <StudyRoomChatCard width='92vw' height='8vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px'
                               content={<div style={{fontSize: '22px', fontWeight: 'bold'}}><Typography variant="1">Study
                                   Estimator</Typography></div>}/>
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={
                <div style={{overflow: 'auto', height: '60vh'}}>
                    <h3>Course Workload</h3>
                    <div style={{overflow: 'auto', height: '32vh'}}>
                        {course.map((course, index) => (
                            <div key={index}>
                                <StudyRoomCard data-test={`${course}`} width={'85vw'} height={'fit-content'}

                                               content={<Stack direction="row"
                                                               justifyContent="space-between"
                                                               >
                                                   <div style={{
                                                       width: "50vw",
                                                       margin: "0px",
                                                   }}>{course.subject} {course.catalog} {course.title} </div>
                                                   <div style={{
                                                       width: "15vw",
                                                       margin: "0px",
                                                   }}>credits: {course.classUnit}</div>
                                                   <div style={{
                                                       width: "15vw",
                                                       margin: "0px",

                                                   }}> study time: {course.studyHours} hrs
                                                   </div>
                                               </Stack>}/>
                            </div>
                        ))}
                    </div>
                    <StudyRoomCard data_test={'totalRecommendedStudyTime'} width={'85vw'} height={'40px'}
                                   content={<> Total recommended study time: {time} hrs
                                   </>}/>

                </div>
            }/>

            {/*drawers for future features*/}
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '2vw', marginRight: '2vw'}}>
                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={  <div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "block", justifyContent: "space-between" }}>
                                   <BottomDrawer icon={<Stack direction="column" alignItems="center" justifyContent="center"> <SchoolIcon style={{color:'#912338'}} onClick={() => { setLink('study-events-monthly') }}/> <Typography variant="body2" style={{color:'#912338'}}>Monthly</Typography></Stack>}
                                       title={'Monthly Study Statistics'} content={renderBarChart(studyStatisticsData, optionsStudyData)} ></BottomDrawer>
                               </div> }/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "block", justifyContent: "space-between" }}>
                                   <BottomDrawer icon={<Stack direction="column" alignItems="center" justifyContent="center"> <SchoolIcon style={{color:'#912338'}} onClick={() => { setLink('study-events-weekly') }}/> <Typography variant="body2" style={{color:'#912338'}}>Weekly</Typography></Stack>}
                                       title={'Weekly Study Statistics'} content={renderBarChart(studyStatisticsData, optionsStudyData)} ></BottomDrawer>
                               </div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "block", justifyContent: "space-between" }}>
                                   <BottomDrawer icon={<Stack direction="column" alignItems="center" justifyContent="center"> <CategoryIcon style={{color:'#912338'}} onClick={() => { setLink('events-monthly') }}/> <Typography variant="body2" style={{color:'#912338'}}>Monthly</Typography></Stack>}
                                       title={'Monthly Category Statistics'} content={renderBarChart(categoryStatisticsData, optionsCategoryData)} ></BottomDrawer>
                               </div>
                   }/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={ <div style={{ marginTop: "10px", margin: 'auto', width: '360px', display: "block", justifyContent: "space-between" }}>
                    <BottomDrawer icon={<Stack direction="column" alignItems="center" justifyContent="center"> <CategoryIcon style={{color:'#912338'}} onClick={() => { setLink('events-weekly') }}/> <Typography variant="body2" style={{color:'#912338'}}>Weekly</Typography></Stack>}
                                       title={'Weekly Category Statistics'} content={renderBarChart(categoryStatisticsData, optionsCategoryData)} ></BottomDrawer>
                               </div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<Stack style={{width:'110%', height:'100%'}} direction="column" alignItems="center" justifyContent="center"><UpdateIcon style={{color: '#912338'}}/> <Typography variant="body2" style={{color:'#912338'}}>Recaps</Typography></Stack>}
                               title={'Study Recap'} content={<StudyRecap/>}/></div>}/>

            </div>
        </React.Fragment>
    )

    const statisticPageCards = useMemo(() => (
        <React.Fragment>
            {studyEstimator}

        </React.Fragment>
    ), [studyEstimator]);

    return(<BackgroundCard width='96vw' height='99vh' content={statisticPageCards}/>)
}