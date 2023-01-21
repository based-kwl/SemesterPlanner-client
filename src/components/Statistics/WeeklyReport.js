import { Dataset } from '@mui/icons-material';
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {Bar} from 'react-chartjs-2';
import { useNavigate } from "react-router";
//import {courses} from "./data"
import  {Chart as ChartJS} from 'chart.js/auto'
import axios from 'axios';

export  function WeeklyStatistic(){

function diff_minutes(dt2, dt1)
{
var diff =(new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
return Math.abs(Math.round(diff));
}

   const [Data, setData] =  useState({})

  useEffect(()=>{ 
    axios.get(`${process.env.REACT_APP_BASE_URL}events/study-events/paama`)
    .then((response) =>{
      console.log(response.data)
      var arr= response.data
      var courseList=[]           
       arr.forEach((event)=>{ 
        console.log(event)      
       var courseName = event.subject + event.catalog
        
        if (courseList.some(e => e.name === courseName)) {
          for(let i = 0; i < courseList.length; i++){
            if(courseList[i].name==courseName){
              courseList[i].expectedTime = courseList[i].expectedTime + diff_minutes(event.endTime, event.startTime)
            }

          }

        }
        
        else{
          courseList.push({
           name:courseName,
           expectedTime: diff_minutes(event.endTime, event.startTime),
           actualTime:0
            })
        }

       
               
    }
   
    )
    console.log(courseList)
    console.log(Data)
    setData( {
      labels: courseList.map((course) => course.name),
      datasets:[{
         label:"expected time",
         backgroundColor: '#912338',
         data: courseList.map((course) => course.expectedTime),
      },{
        label:"actual time",
        backgroundColor: '#FFFFFF',
        data: courseList.map((course) => course.actualTime),
     }]
   })
    
})


  })
  
    

return (

<div>
<Bar data={Data}  height={"600%"}
  options={{ maintainAspectRatio: false, indexAxis: 'y' }}> </Bar>
</div>

)



}