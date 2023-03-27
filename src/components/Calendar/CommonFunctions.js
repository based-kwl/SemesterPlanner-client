import axios from "axios";
import {cloneDeep} from "lodash"

/**
 * method that takes JS Date object and returns a time string in the format "HH:mm" with appropriate padding for single digit hours/minutes
 * @param {Date} e, JS Date object to be converted into time string
 * @returns {string}, time string in the format "HH:mm" with appropriate padding for single digit hours/minutes
 */
export const getTime = (e) => {
    let date = new Date(e);
    return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
}

/**
 * method that returns and Promise of events list given a specific username
 * @param {String} username, username for which the event list is to be fetched
 * @returns {Promise<any>}, Promise of events list for the specified username
 */
export const getEventList = (username) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}events/${username}`)
        .then((res) => {
                return res.data
            }
        );
}

/**
 * method that takes an array of events and filters them out based on a specific date
 * @param {Array} eventsList, array of events to be filtered
 * @param {Date} filterDate, date object of the date to filter by
 * @returns {Array} array containing events whose startDate is the same as the filterDate
 */
export const filterEventsByDate = (eventsList, filterDate) => {
    return eventsList.filter((item) => {
        const startDate = new Date(item.startDate);
        return (startDate.getDate() === filterDate.getDate()
            && startDate.getMonth() === filterDate.getMonth()
            && startDate.getFullYear() === filterDate.getFullYear())
    })
}

/**
 * method that takes a time string and returns a Date object with the specified time; the date part of the Date object is set to today's date
 * @param {String} time, time string in the format of "HH:mm"
 * @returns {Date}, JS Date object containing the specified time; the date part of the Date object is set to today's date
 */
export const timeStringToDateObject = (time) => {
    let date = new Date();
    date.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
    return date;
}

/**
 * method that takes a 'condensed' list of events fetched from the database and generates an expanded list taking event
 * recurrence into account
 * @param {Array} condensedEventList, array of events
 * @returns {*}, returns a copy of the original condensed array after expanding it
 */
export function expandEventList(condensedEventList) {
    let expandedEvents = cloneDeep(condensedEventList);
    condensedEventList.forEach((event) => {
        const startDate = new Date(event.startDate);
        startDate.setHours(0, 0, 0, 0); // required to ignore time on date comparisons
        const endDate = new Date(event.endDate);
        endDate.setHours(0, 0, 0, 0); // required to ignore time on date comparisons
        if (event.recurrence === 'daily') {
            expandEvent(expandedEvents, event, 1, event.recurrence, startDate, endDate)
        } else if (event.recurrence === 'weekly') {
            expandEvent(expandedEvents, event, 7, event.recurrence, startDate, endDate)
        } else if (event.recurrence === 'monthly') {
            expandEvent(expandedEvents, event, 1, event.recurrence, startDate, endDate)
        }
    })

    return expandedEvents;
}

/**
 * method that takes a single event, expands it, and adds it to specified array
 * @param expandedEventsList array of events into which the specified event's expansion will be added to
 * @param event event for which the expansion is to be applied
 * @param dateIncrement an integer for the increment required to the date; value are 1 (daily or monthly), 7 (weekly); other values may lead to unexpected behaviour
 * @param incrementType a string of value 'daily', 'weekly', or 'monthly' depending on the type of increment specified in the 'dateIncrement' parameter
 * @param startDate initial start date of the event to be expanded
 * @param endDate event end date at which the expansion ends
 */
function expandEvent(expandedEventsList, event, dateIncrement, incrementType, startDate, endDate) {
    do {
        if (incrementType === 'monthly')
            startDate.setMonth(startDate.getMonth() + dateIncrement);
        else if (incrementType === 'daily' || incrementType === 'weekly')
            startDate.setDate(startDate.getDate() + dateIncrement);
        else
            break;

        if (startDate > endDate) // loop needs to be terminated this way to satisfy sonarcloud's expectation
            break;

        const temp = cloneDeep(event);
        temp.startDate = cloneDeep(startDate);
        expandedEventsList.push(temp);
    } while (true)
}

/**
 * method that takes an array of events and sorts them chronologically by startDate
 * @param {Array} eventsList, an array of events to be sorted
 * @returns {*}, returns a copy of the original array after sorting it
 */
export const sortEventsByDate = (eventsList) => {
    const events = cloneDeep(eventsList);
    events.sort((a, b) => {
        if (a.startDate < b.startDate)
            return -1;
        else if (a.startDate > b.startDate)
            return 1;
        else
            return 0;
    })

    return events;
}

/**
 * Method to calculate the time difference between two time strings (endTime-startTime); does NOT take dates into account
 * @param {String} startTime, start time for calculation in ISO date string format
 * @param {String} endTime, end time for calculation in ISO date string format
 * @returns {String}, string format "HH:mm", where "HH" is hour difference and "mm" is minute difference between startTime and endTime
 */
export const getTimeDifference = (startTime, endTime) => {
    const sTime = new Date(startTime);
    const eTime = new Date(endTime);
    let hourDiff = eTime.getHours() - sTime.getHours();
    if (hourDiff < 0) hourDiff += 24;
    let minDiff = eTime.getMinutes() - sTime.getMinutes();
    if (minDiff < 0) {
        hourDiff -= 1;
        minDiff += 60;
    }

    return `${hourDiff}:${minDiff}`;
}
