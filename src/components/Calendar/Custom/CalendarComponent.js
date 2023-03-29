import TripOriginIcon from "@mui/icons-material/TripOrigin";

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