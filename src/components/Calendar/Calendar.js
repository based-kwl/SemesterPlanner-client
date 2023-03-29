import * as React from 'react';
import {useState, useMemo} from 'react';
import {Typography} from "@mui/material";
import Calendar from 'react-calendar';
import '../Calendar/calendar.css'
import {BackgroundCard, EventCard, EventTypeCard, StudyRoomChatCard} from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import {GetAuthentication} from "../Authentication/Authentification";
import {PrimaryButton2} from '../CustomMUIComponents/CustomButtons';
import axios from "axios";
import {expandEventList, getTime} from "./CommonFunctions";
import EditIcon from "@mui/icons-material/Edit";
import EditEvent from "./Event/EditEvent";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImageUpload from "./ImageUpload";
import CreateEvent from "./Event/CreateEvent";
import AddIcon from "@mui/icons-material/Add";
import {
    EventDisplay,
    EventTypeHeader,
    EventHeader,
    isSameDate,
    DayTile
} from "./Custom/CalendarComponent";

export default function CalendarView() {
    const [date, setDate] = useState(new Date());
    const [condensedEventsList, setCondensedEventsList] = useState([]);
    const [events, setEvents] = useState([]);
    const [academicEvents, setAcademicEvents] = useState([]);
    const [eventError, setEventError] = React.useState({message: "Error, please try again later", hasError: false});
    const categories = ['course', 'study', 'workout', 'appointment', 'exam'];

    const user = GetAuthentication();
    function fetchData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}events/${user.username}`)
            .then((res) => {
                    setCondensedEventsList(res.data);
                    setEvents(expandEventList(res.data));
                }
            ).catch((err) => {
            setEventError({...eventError, message: err.message});
        });
    }

    function fetchAcademicData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}opendata/importantdates/`)
            .then((res) => {
                    setAcademicEvents(res.data)
                }
            ).catch((err) => {
            setEventError({...eventError, message: err.message});
        });

    }

    React.useEffect(() => {
        fetchData();
        fetchAcademicData();

    }, [])

    function setDates(d) {
        setDate(d);
    }

    /**
     * Method that updates the events state after an events has been updated or deleted
     * @param {event} eventData, event data array containing all updated event params
     * @param {int} type, type of update required; 0 = update, 1 = delete, 2 = add
     */
    async function updateEventList(eventData, type) {
        const tempEvents = [...condensedEventsList];

        if (type === 0)
            tempEvents[tempEvents.findIndex((e) => e._id === eventData._id)] = eventData;
        else if (type === 1)
            tempEvents.splice(tempEvents.findIndex((e) => e._id === eventData._id), 1);
        else if (type === 2)
            tempEvents.push(eventData);

        setCondensedEventsList(tempEvents);
        setEvents(expandEventList(tempEvents));
    }

    const AcademicEventsTile = ({ date }) => (
        academicEvents.some((e) => isSameDate(new Date(e.date), date))
            ? "academicHighlight"
            : ""
    );

    const calendarMonth =(
        <React.Fragment>
            <Calendar

                tileContent={({date}) => <DayTile key={date} day={date} events={events} categories={categories} />}
                // tileContent={<CalendarDate date={date} events={events} categories={categories}/>}
                tileClassName={AcademicEventsTile}
                onChange={setDates}
                value={date}
            />
        </React.Fragment>
    )


    const calendarCard = (
        <React.Fragment>
            <StudyRoomChatCard width='92vw' height='6vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{fontSize:'22px', fontWeight:'bold'}} ><Typography variant="1">Calendar</Typography></div>}/>
            <StudyRoomChatCard width='92vw' height='fit-content' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={calendarMonth}/>
            <StudyRoomChatCard width='92vw' height='6vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{width:'92vw', display:'flex', justifyContent:"space-between"}}>
                <BottomDrawer icon={<PrimaryButton2 data_test={"uploadPhotoEventButtonCalenderPage"} style={{ margin: 'auto' }} colour={'#057D78'} content={<AddAPhotoIcon/>}/>}
                              title={'Upload an Image'} content={<ImageUpload onDrawerClose={updateEventList}/>}/>
                <BottomDrawer icon={<PrimaryButton2 style={{ margin: 'auto' }} data_test={"addEventButtonCalendarPage"} colour={'#912338'} content={<AddIcon style={{color:'white'}}/>}/>}
                title={'Add Event'} content={<CreateEvent onDrawerClose={updateEventList} date={date}/>}/>
                </div>

            }/>
        </React.Fragment>
    )

    const eventsDisplay = (
        <>
            {categories.map(( item, index) =>(
                <>
                <EventTypeCard
                    value={item}
                    id={index}
                    justifyContent='auto'
                    width='92vw'
                    height='30px'
                    marginTop='5px'
                    overflow='initial'
                    content={<EventTypeHeader content={categories[index]}/>}
                    backgroundColor={categories[index]}
                />
                        {events && events.map((e) => (
                            <>{item === e.type && isSameDate(date, new Date(e.startDate)) ?
                            <EventCard
                                key={e.eventID}
                                justifyContent="left"
                                width="92vw"
                                height='fit-content'
                                marginTop='10px' overflow='hidden'
                                content={
                                        <>
                                        <EventDisplay
                                            startDate={e.startDate}
                                            startTime={getTime(e.startTime)}
                                            endTime={getTime(e.endTime)}
                                            description={e.description}
                                            link={e.link}
                                            header={e.eventHeader}
                                            EventID={e._id}
                                        />
                                        <BottomDrawer icon={<EditIcon data-test={"editButton_"+e.eventHeader} style={{color: '#912338', height: '2vh', width: '2vh'}}/>}
                                                      title={'Edit Event'}
                                                      content={<EditEvent onDrawerClose={updateEventList} eventData={e}/>}/>
                                        </>
                                    }
                            />
                                :null}</>
                        ))}
                </>
                ))}
        </>
    )

    const academicEventsDisplay = (
      <> <EventCard justifyContent='auto' width='92vw' height='30px' marginTop='5px' overflow='initial'
        content={<EventHeader content={"Important Academic Events"}/>}  backgroundColor='#E5A712' />
       <div className="events">

                {academicEvents && academicEvents.map((e) => (
                    <>{isSameDate(date, new Date(e.date))?
                    <EventCard
                        key={academicEvents._id}
                        justifyContent="left"
                        width="92vw"
                        height='fit-content'
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
                        :null
                    }</>
                ))}
            </div>
        </>
    )

    const calendarPageCards = useMemo(() => (
        <React.Fragment>
            {calendarCard}
            <div style={{paddingBottom:'10px'}}>
                {eventsDisplay}
                {academicEventsDisplay}
            </div>


        </React.Fragment>
    ), [calendarCard, calendarMonth]);

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '15px' }}>
                <BackgroundCard width='96vw' content={calendarPageCards} />
            </div>
        </React.Fragment>
    );
}