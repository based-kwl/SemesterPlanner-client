import axios from "axios";


export async function fetchData(api_link, setCourses) {
    var username = localStorage.getItem("username")
    username = username.substring(1);
    username = username.slice(0, -1)
    var courseName
    await axios.get(`${process.env.REACT_APP_BASE_URL}events/${api_link}/${username}`)
        .then((response) => {
            var arr = response.data
            var courseList = []
            arr.forEach((event) => {
                if (api_link === 'events-monthly' || api_link === 'events-weekly') {

                    courseName = event.type
                }
                else {
                    courseName = event.subject + event.catalog
                }

                if (courseList.some(e => e.name === courseName)) {
                    for (let i = 0; i < courseList.length; i++) {
                        if (courseList[i].name === courseName) {
                            courseList[i].expectedTime = courseList[i].expectedTime + diff_minutes(event.endTime, event.startTime)
                            if (event.actualEndTime && event.actualStartTime) {
                                courseList[i].Actual = courseList[i].Actual + diff_minutes(event.actualEndTime, event.actualStartTime)
                            }
                        }
                    }
                }
                else {

                    if (event.actualEndTime && event.actualStartTime) {
                        courseList.push({
                            name: courseName,
                            expectedTime: diff_minutes(event.endTime, event.startTime),
                            Actual: diff_minutes(event.actualEndTime, event.actualStartTime)
                        })
                    }

                    else {

                        courseList.push({
                            name: courseName,
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
