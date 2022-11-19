import * as React from "react";
import Calendar from "react-calendar";
import {CustomWhiteCard} from "../CustomMUIComponents/CustomCards";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import {useMemo} from "react";

function CalendarDisplay(props) {



    function addEventButton() {
        navigate('/event');
    }

    function setDates(d) {
        setDate(d);
    }



    const isSameDate = (date1, date2) => (
        date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
    )

    function CalendarMonthDisplay() {
        return (
            <React.Fragment>
                <Calendar
                    tileContent={({ date }) => <DayTile key={date} day={date} />}
                    onChange={setDates}
                    value={date}
                />
            </React.Fragment>
        )
    }

    const calendarCard = (
        <React.Fragment>
            <CustomWhiteCard width='360px' height='480px' marginTop='50px' content={<CalendarMonthDisplay />} />
            <div className="center">
                <PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="+" onClick={addEventButton} />
            </div>

        </React.Fragment>
    );
    const DayTile = ({ day }) => {
        const eventsThisDay = events.filter((e) => {
            const event = new Date(e.startDate);
            return isSameDate(event, day)
        });



        let tileContent;

        if (eventsThisDay.length < 1) {
            tileContent = (<CalendarDayEventIcon key={day} eventType={"none"} />);
        } else {
            tileContent = eventsThisDay.map((e) => (
                <CalendarDayEventIcon key={`day-${e._id}`} eventType={e.eventHeader} />
            ))
        }

        return tileContent;
    }


    const CalendarDayEventIcon = ({ eventType }) => {
        let backgroundColor = "#0095FF"
        if (eventType == "Gym") {
            backgroundColor = "#735BF2"
        } else if (eventType == "Exam") {
            backgroundColor = "#00B383"
        } else if (eventType == "Volunteering") {
            backgroundColor = "#800410"
        }

        let tileIcon = <TripOriginIcon sx={{ color: backgroundColor, transform: "scale(0.25)" }} />

        if (eventType == "none") {
            tileIcon = (<></>);
        }

        return (<div style={{ width: "40px", height: "40px" }}><br />{tileIcon}</div>);
    }

    return calendarCard;
}


