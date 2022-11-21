import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router";
import GetAuthentication from "../Authentication/Authentification";
import axios from "axios";

export function CalendarFacade(props) {
    const [events, setEvents] = useState([]);


    const navigate = useNavigate();

    const options = ['Edit', 'Delete', 'Cancel' +
    ''];

    const auth = GetAuthentication();
    function fetchData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}events/${auth.username}`)
            .then((res) => {
                    setEvents(res.data)
                }
            ).catch((err) => {
            // give user a error message.
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    function setAllEvents(events) {
        events.reduce((allEvents, event) => {
            const today = new Date();
            const firstDay = new Date(today.getDay() + 1);
            function addEventsForEachDay() {

            }

            function addEventsForEachWeek() {

            }

            function addEventsForEachMonth() {

            }

            if (event.reccurence === 'daily') {
                addEventsForEachDay()
            }else if (event.reccurence === 'weekly') {
                addEventsForEachWeek()
            }
            else if (event.reccurence === 'monthly') {
                addEventsForEachMonth()
            }
        })
    }
}