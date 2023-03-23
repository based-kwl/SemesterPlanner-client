import axios from "axios";
import GetAuthentication from "../Authentication/Authentification";
import {getTimeDifference} from "../Calendar/CommonFunctions";

export async function fetchData(api_link, setCourses) {
    const username = GetAuthentication().username

    await axios.get(`${process.env.REACT_APP_BASE_URL}events/${api_link}/${username}`)
        .then(async (response) => {
            if (api_link === 'events-monthly' || api_link === 'events-weekly') {
                setCourses(generateEventData(response.data))
            } else {
                setCourses(await generateStudyData(response.data, api_link))
            }
        })
}

/**
 * Method to calculate the time difference between two time strings (endTime-startTime); does NOT take dates into account
 * @param {String} endTime, end time for calculation in ISO date string format
 * @param {String} startTime, start time for calculation in ISO date string format
 * @returns {Number}, time difference in hours, where minute differences are represented as fractions
 */
function diff_minutes(endTime, startTime) {
    const diff = getTimeDifference(startTime, endTime)
    return (parseInt(diff.split(':')[0]) + (parseInt(diff.split(':')[1]) / 60))
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

function generateEventData(eventsList){
    const categoryData = [{name: 'course', colour: '#0072A8', expectedTime: 0}, {
        name: 'study',
        colour: '#8CC63E',
        expectedTime: 0
    }, {name: 'workout', colour: '#DA3A16', expectedTime: 0}, {
        name: 'appointment',
        colour: '#DB0272',
        expectedTime: 0
    }]

    eventsList.forEach((item) => {
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

    return categoryData;
}

async function generateStudyData(eventsList, api_link) {
    const courseList = []
    const listOfCourses = await handleCourseList()
    let courseName

    if ("study-events-monthly" === api_link) {
        listOfCourses.forEach(item => {
            courseList.push({
                colour: null,
                name: item.subject + item.catalog,
                expectedTime: item.studyHours * 4,
                Actual: 0
            })
        })
    } else if ("study-events-weekly" === api_link) {
        listOfCourses.forEach(item => {
            courseList.push({
                colour: null,
                name: item.subject + item.catalog,
                expectedTime: item.studyHours,
                Actual: 0
            })
        })
    }

    eventsList.forEach((event) => {
        courseName = event.subject + event.catalog

        courseList.forEach((course) => {
            if (course.name === courseName) {
                if (!event.studyHoursConfirmed)
                    course.Actual = course.Actual + diff_minutes(event.endTime, event.startTime)
                else
                    course.Actual = course.Actual + diff_minutes(event.actualEndTime, event.actualStartTime)
            }
        })
    })

    return courseList;
}