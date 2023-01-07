import { Dataset } from '@mui/icons-material';
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {Bar} from 'react-chartjs-2';
import { useNavigate } from "react-router";
import {courses} from "./data"
import  {Chart as ChartJS} from 'chart.js/auto'

export function MonthlyStatistic(){
    
    const [Data, setEventData] = useState({
      
      labels: courses.map((course) => course.name),
      datasets:[{
       
         label:"expected time",
         data: courses.map((course) => course.expectedTime),
      },{
        label:"actual time",
        data: courses.map((course) => course.actualTime),
     }]
   }
       )
    

return (


<Bar data={Data}  height={"600%"}
  options={{ maintainAspectRatio: false }} > </Bar>


)



}