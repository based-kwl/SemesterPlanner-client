import * as React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { fetchData } from './fetchingDataFactory'

export function MonthlyStatistic() {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchData('study-events-monthly', setCourses)
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