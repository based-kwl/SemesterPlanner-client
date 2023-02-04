import axios from "axios";
import GetAuthentication from "../Authentication/Authentification";

export async function fetchData(api_link, setCourses) {
    var username = localStorage.getItem("username")
    username = username.substring(1);
    username = username.slice(0, -1)
    var courseName
    var color
    var listOfCourses = await handleCourseList()

    await axios.get(`${process.env.REACT_APP_BASE_URL}events/${api_link}/${username}`)
        .then((response) => {
            var arr = response.data
            var courseList = []

            if ("study-events-monthly" === api_link) {
                listOfCourses.forEach(item => {
                    courseList.push({
                        colour: color,
                        name: item.subject + item.catalog,
                        expectedTime: item.studyHours * 60 * 4,
                        Actual: 0
                    })
                })
            }
            else if ("study-events-weekly" === api_link) {

                listOfCourses.forEach(item => {
                    courseList.push({
                        colour: color,
                        name: item.subject + item.catalog,
                        expectedTime: item.studyHours * 60,
                        Actual: 0
                    })
                })


            }


            arr.forEach((event) => {
                if (api_link === 'events-monthly' || api_link === 'events-weekly') {

                    courseName = event.type

                    if (courseName == "course") {
                        color = '#0072A8'
                    }
                    else if (courseName == "workout") {
                        color = '#DA3A16'
                    }
                    else if (courseName == "study") {
                        color = '#8CC63E'
                    }
                    else {
                        color = '#DB0272'
                    }
                }
                else {
                    courseName = event.subject + event.catalog


                }

                if (courseList.some(e => e.name === courseName)) {
                    for (let i = 0; i < courseList.length; i++) {
                        if (courseList[i].name === courseName) {
                            courseList[i].Actual = courseList[i].Actual + diff_minutes(event.endTime, event.startTime)
                            if (event.actualEndTime && event.actualStartTime) {
                                courseList[i].Actual = courseList[i].Actual + diff_minutes(event.actualEndTime, event.actualStartTime)
                            }
                        }
                    }
                }
                else {

                    if (event.actualEndTime && event.actualStartTime && api_link != "study-event-monthly" && api_link != "study-event-weekly") {
                        courseList.push({
                            colour: color,
                            name: courseName,
                            expectedTime: diff_minutes(event.endTime, event.startTime),
                            Actual: diff_minutes(event.actualEndTime, event.actualStartTime)
                        })
                    }

                    else {

                        courseList.push({
                            name: courseName,
                            colour: color,
                            expectedTime: diff_minutes(event.endTime, event.startTime),
                            Actual: 0
                        })

                    }

                }
            })
            setCourses(courseList)
        })
}

function diff_minutes(dt2, dt1) {
    var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 60000;
    return Math.abs(Math.round(diff));
}


async function handleCourseList() {
    const email = GetAuthentication().email;
    return axios.get(`${process.env.REACT_APP_BASE_URL}student/courses/${email}`)
        .then(res => {

            console.log(res.data.courses)
            return res.data.courses;
        })
        .catch(err => {
            console.log('Error', err);
        })
}