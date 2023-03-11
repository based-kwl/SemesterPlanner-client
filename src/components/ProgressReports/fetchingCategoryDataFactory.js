import axios from "axios";
import GetAuthentication from "../Authentication/Authentification";
import {expandEventList} from "../Calendar/CommonFunctions";

export async function fetchData(api_link, setCourses) {
    let username = GetAuthentication().username

    await axios.get(`${process.env.REACT_APP_BASE_URL}events/${api_link}/${username}`)
        .then(async (response) => {
            let arr = expandEventList(response.data)

            if (api_link === 'events-monthly' || api_link === 'events-weekly') {
                let categoryData = [{name: 'course', colour: '#0072A8', expectedTime: 0}, {
                    name: 'study',
                    colour: '#8CC63E',
                    expectedTime: 0
                }, {name: 'workout', colour: '#DA3A16', expectedTime: 0}, {
                    name: 'appointment',
                    colour: '#DB0272',
                    expectedTime: 0
                }]

                arr.forEach((item) => {
                    switch (item.type) {
                        case categoryData[0].name:
                            categoryData[0].expectedTime = categoryData[0].expectedTime + diff_minutes(item.endTime, item.startTime)
                            break;
                        case categoryData[1].name:
                            categoryData[1].expectedTime = categoryData[1].expectedTime + (item.studyHoursConfirmed ? diff_minutes(item.actualEndTime, item.actualStartTime) : diff_minutes(item.endTime, item.startTime))
                            break;
                        case categoryData[2].name:
                            categoryData[2].expectedTime = categoryData[2].expectedTime + diff_minutes(item.endTime, item.startTime)
                            break;
                        case categoryData[3].name:
                            categoryData[3].expectedTime = categoryData[3].expectedTime + diff_minutes(item.endTime, item.startTime)
                            break;
                        default:
                            break;
                    }
                })
                setCourses(categoryData)
            } else {
                let courseList = []
                let listOfCourses = await handleCourseList()
                let courseName

                if ("study-events-monthly" === api_link) {
                    listOfCourses.forEach(item => {
                        courseList.push({
                            colour: null,
                            name: item.subject + item.catalog,
                            expectedTime: item.studyHours * 60 * 4,
                            Actual: 0
                        })
                    })
                } else if ("study-events-weekly" === api_link) {
                    listOfCourses.forEach(item => {
                        courseList.push({
                            colour: null,
                            name: item.subject + item.catalog,
                            expectedTime: item.studyHours * 60,
                            Actual: 0
                        })
                    })
                }

                arr.forEach((event) => {
                    courseName = event.subject + event.catalog

                    for (let i = 0; i < courseList.length; i++) {
                        if (courseList[i].name === courseName) {
                            if (!event.studyHoursConfirmed)
                                courseList[i].Actual = courseList[i].Actual + diff_minutes(event.endTime, event.startTime)
                            else
                                courseList[i].Actual = courseList[i].Actual + diff_minutes(event.actualEndTime, event.actualStartTime)
                        }
                    }
                })
                setCourses(courseList)
            }
        })
}

function diff_minutes(dt2, dt1) {
    let diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 60000;
    return Math.abs(Math.round(diff));
}


async function handleCourseList() {
    const email = GetAuthentication().email;
    return axios.get(`${process.env.REACT_APP_BASE_URL}student/courses/${email}`)
        .then(res => {
            return res.data.courses;
        })
        .catch(err => {
            console.log('Error', err);
        })
}