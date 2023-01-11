import * as React from 'react';
import {useState, useMemo} from 'react';
import {Typography} from "@mui/material";
import Calendar from 'react-calendar';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'
import {BackgroundCard, CustomWhiteCard, EventCard} from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import {useNavigate} from "react-router";
import GetAuthentication from "../Authentication/Authentification";
import {PrimaryButton2} from '../CustomMUIComponents/CustomButtons';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import axios from "axios";
import {getTime} from "./CommonFunctions";
import EditIcon from "@mui/icons-material/Edit";
import EditEvent from "./Event/EditEvent";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BottomDrawer from "../StudyRoom/BottomDrawer";
import ImageUpload from "./ImageUpload";

export default function CalendarView() {

    const [date, setDate] = useState(new Date())
    const [events, setEvents] = useState([]);
    const [academicEvents, setAcedemicEvents] = useState([]);
    const [eventError, seteventError] = React.useState({message: "Error, please try again later", hasError: false});
    const navigate = useNavigate();
    const user = GetAuthentication();

    //  Get all Events by student username
    function fetchData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}events/${user.username}`)
            .then((res) => {
                    setEvents(res.data)
                }
            ).catch((err) => {
            seteventError({...eventError, message: err.message});
        });
    }

    function fetchAcademicData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}opendata/importantdates/`)
            .then((res) => {
                    setAcedemicEvents(res.data)
                }
            ).catch((err) => {
            seteventError({...eventError, message: err.message});
        });

    }

    React.useEffect(() => {
        fetchData();
        fetchAcademicData();
    }, [])

    function addEventButton() {
        navigate('/event');
    }

    function setDates(d) {
        setDate(d);
    }

    /**
     * Method that updates the events state after an events has been updated or deleted
     * @param {event} eventData, event data array containing all updated event params
     * @param {int} type, type of update required; 0 = update, 1 = delete
     */
    async function updateEventList(eventData, type = 0) {
        const tempEvents = [...events];

        if (type === 0)
            tempEvents[tempEvents.findIndex((e) => e._id === eventData._id)] = eventData;
        else if (type === 1)
            tempEvents.splice(tempEvents.findIndex((e) => e._id === eventData._id), 1);

        setEvents(tempEvents);
    }

    const AcademicEventsTile = ({ date }) => (
        academicEvents.some((e) => isSameDate(new Date(e.date), date))
            ? "academicHighlight"
            : ""
    );
    
    const calendarMonth = (
        <React.Fragment>
            <Calendar
                tileContent={({ date }) => <DayTile key={date} day={date} />}
                tileClassName={AcademicEventsTile}
                onChange={setDates}
                value={date}
            />
        </React.Fragment>
    )


    const calendarCard = (
        <React.Fragment>
            <CustomWhiteCard width='360px' height='480px' marginTop='50px' content={calendarMonth} />
            <div style={{marginTop:"10px", margin: 'auto', width:'360px',display:"flex", justifyContent:"space-between"}}>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} colour={'#057D78'} content={<AddAPhotoIcon/>}/>}
                              title={'Upload an Image'} content={<ImageUpload/>}/>
                <PrimaryButton2 style={{ margin: 'auto' }} colour={'#912338'} content="+" onClick={addEventButton} />
            </div>
        </React.Fragment>
    )

    const EventHeader = ({content})=>{
        return(
        <React.Fragment>
            <CardContent>
                <Typography color="#000000" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                }}>
                    {content}
                </Typography>
            </CardContent>
        </React.Fragment>
   ) }

    const EventDisplay = ({startTime, endTime, header, description, startDate}) => {
        const currentDate = new Date(startDate);
        return (
            <div style={{paddingBottom: 0, paddingTop: 0, width: '100%', display: 'flow'}}>

                <div style={{display: 'inline-block', paddingLeft: '10px'}}>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {startTime + "-" + endTime}, {currentDate.getFullYear()} - {currentDate.getMonth() < 9 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1} - {currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="#000000" fontWeight={500} style={{fontFamily: 'Roboto'}}>
                        {header}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">

                    </Typography>
                </div>

            </div>
        )
    }

    const eventsDisplay = (
        <>
            <EventCard
                justifyContent='auto'
                width='360px'
                height='30px'
                marginTop='15px'
                overflow='initial'
                content={<EventHeader content={"School"}/>}
                backgroundColor='#0095FF'/>
            <div className="events">

                {events && events.map((e, index) => (
                    <EventCard
                        key={index}
                        justifyContent="left"
                        width="360px"
                        height='90px'
                        marginTop='10px' overflow='hidden'
                        content={
                            <>
                                <EventDisplay
                                    startDate={e.startDate}
                                    startTime={getTime(e.startTime)}
                                    endTime={getTime(e.endTime)}
                                    description={e.description}
                                    header={e.eventHeader}
                                    EventID={e._id}
                                />
                                <BottomDrawer icon={<EditIcon style={{color: '#912338', height: '2vh', width: '2vh'}}/>}
                                              title={'Edit Event'}
                                              content={<EditEvent eventId={e._id} onDrawerClose={updateEventList}
                                                                  eventData={e}/>}/>
                            </>
                        }
                    />
                ))}
            </div>
        </>
    )

    const academicEventsDisplay = (
      <> <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial' 
        content={<EventHeader content={"Important Academic Events"}/>}  backgroundColor='#E5A712' />
       <div className="events">

                {academicEvents && academicEvents.map((e, index) => (

                    <EventCard
                        key={index}
                        justifyContent="left"
                        width="360px"
                        height='130px'
                        marginTop='10px' overflow='hidden'
                        content={
                            <EventDisplay
                                startDate={e.date}
                                startTime={"00:00"}
                                endTime={"23:59"}
                                header={e.description}
                                EventID={e._id}
                            />
                        }/>
                ))}
            </div>
        </>
    )

    const isSameDate = (date1, date2) => (
        date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
    )

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
        if (eventType === "Gym") {
            backgroundColor = "#735BF2"
        } else if (eventType === "Exam") {
            backgroundColor = "#00B383"
        } else if (eventType === "Volunteering") {
            backgroundColor = "#800410"
        }

        let tileIcon = <TripOriginIcon sx={{ color: backgroundColor, transform: "scale(0.25)" }} />

        if (eventType === "none") {
            tileIcon = (<></>);
        }

        return (<div style={{ width: "40px", height: "40px" }}><br />{tileIcon}</div>);
    }

    const calendarPageCards = useMemo(() => (
        <React.Fragment>
            {calendarCard}
            {eventsDisplay}
            {academicEventsDisplay}
        </React.Fragment>
    ), [calendarCard, calendarMonth]);

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '30px' }}>
                <BackgroundCard width='372px' height='100%' content={calendarPageCards} />
            </div>
        </React.Fragment>
    );
}