import * as React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import {fetchData} from './fetchingDataFactory'

export function WeeklyStatistic() {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchData('study-events-weekly', setCourses)
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
    <React.Fragment>
    <div>
      <Bar data={data} height={"600%"}
        options={{ maintainAspectRatio: false, indexAxis: 'y' }}></Bar>
    </div>
    </React.Fragment>
  )

}