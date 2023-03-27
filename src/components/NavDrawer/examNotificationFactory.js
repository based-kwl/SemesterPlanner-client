import {GetAuthentication} from '../Authentication/Authentification';
import axios from 'axios';


async function getEventsByUsername(user_name, futureTimestamp) {
  try {
    console.log(`${process.env.REACT_APP_BASE_URL}events/${user_name}`)

    const easternTimeZone = "America/New_York";

    // Combine start date and start time into a single string
    const eventsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}events/${user_name}`);
    const eventsData = eventsResponse.data;
    const events = eventsData.filter((event) => {
      const startDate = new Date(event.startDate);
      const startTime = new Date(event.startTime);
      const startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),
        startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(),
        startTime.getMilliseconds()).toLocaleString("en-US", { timeZone: easternTimeZone });
      return new Date(startDateTime) >= new Date() && new Date(startDateTime) <= new Date(futureTimestamp);
    });

    const eventTimes = events.map((event) => {
      // Convert start and end times to UTC
      const startDate = new Date(event.startDate);
      const startTime = new Date(event.startTime);
      const startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),
        startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(),
        startTime.getMilliseconds()).toLocaleString("en-US", { timeZone: easternTimeZone });
      const startTimeUTC = new Date(startDateTime).toUTCString();

      const endDate = new Date(event.endDate);
      const endTime = new Date(event.endTime);
      const endDateTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),
        endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(),
        endTime.getMilliseconds()).toLocaleString("en-US", { timeZone: easternTimeZone });
      const endTimeUTC = new Date(endDateTime).toUTCString();

      return [new Date(startTimeUTC), new Date(endTimeUTC)];
    });

    // Convert all event times to Eastern time
    const easternEventTimes = eventTimes.map((eventTime) => {
      const startDateTime = new Date(eventTime[0]).toLocaleString("en-US", { timeZone: easternTimeZone });
      const startTimeEastern = new Date(startDateTime);
      const endDateTime = new Date(eventTime[1]).toLocaleString("en-US", { timeZone: easternTimeZone });
      const endTimeEastern = new Date(endDateTime);
      return [startTimeEastern, endTimeEastern];
    });

    return easternEventTimes;
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