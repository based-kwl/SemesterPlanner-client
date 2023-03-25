import GetAuthentication from "../Authentication/Authentification";
import axios from 'axios';



async function getEventsByUsername(user_name, futureTimestamp) {
  try {
    console.log(`${process.env.REACT_APP_BASE_URL}events/${user_name}`)

    // Convert futureTimestamp to UTC time
    const futureUtcTimestamp = new Date(futureTimestamp).toUTCString();

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}events/${user_name}`);
    console.log(response)

    const events = response.data.filter((event) => {
      return new Date(event.startDate) >= new Date() && new Date(event.startDate) <= new Date(futureUtcTimestamp);
    });

    const eventTimes = events.map((event) => {
      const startTime = new Date(event.startTime).toLocaleString("en-US", { timeZone: "America/New_York" });
      const endTime = new Date(event.endTime).toLocaleString("en-US", { timeZone: "America/New_York" });
      return [new Date(startTime), new Date(endTime)];
    });

    return eventTimes;
  } catch (error) {
    console.error(error);
    return [];
  }
}




export async function getHoursBetweenTimestamps(startTimestamp, endTimestamp, timeslots, segment) {
  // Convert start and end timestamps to JavaScript Date objects
  const username = GetAuthentication().username
  console.log(username)
  const excludedTimes = await getEventsByUsername(username, endTimestamp);
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  // Round up to the next time segment for the start date
  startDate.setMinutes(Math.ceil(startDate.getMinutes() / segment) * segment, 0, 0);

  // Create an array to store the results
  const hoursBetween = [];

  // Loop through each time segment between the start and end dates
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const currentTimestamp = currentDate.toISOString();

    // Check if the current time segment is excluded
    let isExcluded = false;
    for (let i = 0; i < excludedTimes.length; i++) {
      const startExcluded = new Date(excludedTimes[i][0]);
      const endExcluded = new Date(excludedTimes[i][1]);

      // Floor the start time and ceil the end time
      startExcluded.setMinutes(Math.floor(startExcluded.getMinutes() / segment) * segment, 0, 0);
      endExcluded.setMinutes(Math.ceil(endExcluded.getMinutes() / segment) * segment, 0, 0);

      if (currentDate >= startExcluded && currentDate < endExcluded) {
        isExcluded = true;
        break;
      }
    }

    // Add the current time segment to the results if it's not excluded
    if (!isExcluded) {
      hoursBetween.push(currentTimestamp);
    }

    // Move to the next time segment
    currentDate.setMinutes(currentDate.getMinutes() + segment);
  }
  timeslots(hoursBetween)
  return hoursBetween;
}

