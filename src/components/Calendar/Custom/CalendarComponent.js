import TripOriginIcon from "@mui/icons-material/TripOrigin";
import {Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";

export const CalendarDayEventIcon = ({eventType, categories}) => {
    let backgroundColor = "#0095FF"
    if (eventType === categories[0]) {
        backgroundColor = "#0072A8"
    } else if (eventType === categories[1]) {
        backgroundColor = "#8CC63E"
    } else if (eventType === categories[2]) {
        backgroundColor = "#DA3A16"
    } else if (eventType === categories[3]) {
        backgroundColor = "#DB0272"
    } else if (eventType === categories[4]){
        backgroundColor = "#912338"
    }

    let tileIcon = <TripOriginIcon sx={{ color: backgroundColor, transform: "scale(0.4)" }} />

    if (eventType === "none") {
        tileIcon = (<></>);
    }
    return (<div style={{ width: "40px", height: "40px" }}><br />{tileIcon}</div>);
}
export const EventDisplay = ({startTime, endTime, header, description, startDate, link}) => {
    const currentDate = new Date(startDate);
    return (
        <div style={{paddingBottom: 0, paddingTop: 0, width: '100%', display: 'flow'}}>

            <div style={{display: 'inline-block', paddingLeft: '10px'}}>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {startTime + "-" + endTime}, {currentDate.getFullYear()} - {currentDate.getMonth() < 9 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1} - {currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()}
                </Typography>
                <Typography data-test={header} sx={{mb: 1.5}} color="#000000" fontWeight={500} style={{fontFamily: 'Roboto'}}>
                    {header}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    <a href={link}>{link}</a>
                </Typography>

            </div>

        </div>
    )
}

export const EventTypeHeader = ({content})=>{
    return(
            <CardContent>
                <Typography color="white" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                }}>
                    {content}
                </Typography>
            </CardContent>
    ) }
export const EventHeader = ({content})=>{
    return(
            <CardContent>
                <Typography color="white" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                }}>
                    {content}
                </Typography>
            </CardContent>
    ) }

export const isSameDate = (date1, date2) => (
    date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate()
)

export const CalendarDate= ({events, categories}) =>
{return ({date})=> <DayTile key={date} day={date} event={events} categories={categories}/>}

export const DayTile = ({ day, events, categories }) => {
    const eventsThisDay = events.filter((e) => {
        const event = new Date(e.startDate);
        return isSameDate(event, day)
    });

    let tileContent;

    if (eventsThisDay.length < 1) {
        tileContent = (<CalendarDayEventIcon key={day} eventType={"none"} categories={categories} />);
    } else {
        tileContent = eventsThisDay.map((e) => (
            <CalendarDayEventIcon key={`day-${e._id}`} eventType={e.type} categories={categories}/>
        ))
    }
    return tileContent;
}