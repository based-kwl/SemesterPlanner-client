import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';

export function MonthlyStatistic() {

  function diff_minutes(dt2, dt1) {
    var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    return Math.abs(Math.round(diff));
  }

  const [courses, setCourses] = useState([])

  useEffect(() => {

    async function fetchData() {
      var username = localStorage.getItem("username")
      username = username.substring(1);
      username = username.slice(0, -1)

      await axios.get(`${process.env.REACT_APP_BASE_URL}events/study-events-monthly/${username}`)
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
    fetchData()
  }, [])

  var data = {
    labels: courses?.map((course) => course.name),
    datasets: [{
      label: "expected time",
      backgroundColor: '#912338',
      data: courses?.map((course) => course.expectedTime),
    }, {
      label: "actual time",
      backgroundColor: '#FFFFFF',
      data: courses?.map((course) => course.actualTime),
    }]
  }

  return (
    <div>
      <Bar data={data} height={"600%"}
        options={{ maintainAspectRatio: false, responsive: false, indexAxis: 'y' }}></Bar>
    </div>
  )

}