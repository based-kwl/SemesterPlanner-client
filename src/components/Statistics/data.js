import axios from 'axios';
function diff_minutes(dt2, dt1)
{
var diff =(new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
return Math.abs(Math.round(diff));
}


async function fetchData(){
 const stuff = await axios.get(`${process.env.REACT_APP_BASE_URL}events/study-events/paama`)
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
return courseList
})


}



export const courses = [

    {
     name: "soen490",
     expectedTime:"3600",
     actualTime:"2500"

    },
    {
       name: "soen390",
       expectedTime:"3000",
       actualTime:"3000"

    },
    {
       name: "soen290",
       expectedTime:"7200",
       actualTime:"5500"

    },
    {
      name: "soen590",
      expectedTime:"7000",
      actualTime:"4000"

   }

   ]

   