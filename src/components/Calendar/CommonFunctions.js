import axios from "axios";

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