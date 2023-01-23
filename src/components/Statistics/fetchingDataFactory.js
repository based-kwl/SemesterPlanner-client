import axios from "axios";


export async function fetchData(api_link,setCourses) {
    var username = localStorage.getItem("username")
    username = username.substring(1);
    username = username.slice(0, -1)

    await axios.get(`${process.env.REACT_APP_BASE_URL}events/${api_link}/${username}`)
      .then((response) => {
        var arr = response.data
        var courseList = []
        arr.forEach((event) => {

          var courseName = event.subject + event.catalog

          if (courseList.some(e => e.name === courseName)) {
            for (let i = 0; i < courseList.length; i++) {
              if (courseList[i].name == courseName) {
                courseList[i].expectedTime = courseList[i].expectedTime + diff_minutes(event.endTime, event.startTime)
                courseList[i].actualTime = courseList[i].actualTime + diff_minutes(event.actualEndTime, event.actualStartTime)
              }
            }
          }
          else {
            courseList.push({
              name: courseName,
              expectedTime: diff_minutes(event.endTime, event.startTime),
              actualTime: diff_minutes(event.actualEndTime, event.actualStartTime)
            })
          }
        })
        setCourses(courseList)
      })
  }

  function diff_minutes(dt2, dt1) {
    var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    return Math.abs(Math.round(diff));
  }
