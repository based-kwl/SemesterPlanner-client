import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import {useMemo} from "react";
import {EventCard} from "../CustomMUIComponents/CustomCards";

function EventsDisplay(props) {

    const options = ['Edit', 'Delete', 'Cancel'];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const eventHeader = useMemo(() => (
        <React.Fragment>
            <CardContent>
                <Typography color="#000000" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                }}>
                    School
                </Typography>
            </CardContent>
        </React.Fragment>
    ), []);


    const EventOptions = () => useMemo(() => (
        <div style={{ float: 'right', display: 'flex', paddingLeft: "30px" }}>
            <IconButton
                sx={{ float: 'right' }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={undefined}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={handleClose}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    ), [anchoreEl, options]);

    const EventDisplay = ({ startTime, endTime, header, description, startDate }) => {
        const currentDate = new Date(startDate);
        return (
            <div style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}>
                <div style={{ display: 'inline-block', paddingLeft: '10px' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {startTime + "-" + endTime}, {currentDate.getFullYear()} - {currentDate.getMonth() < 9 ? '0' + currentDate.getMonth() + 1 : currentDate.getMonth() + 1} - {currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="#000000" fontWeight={500} style={{ fontFamily: 'Roboto' }}>
                        {header}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </div>
                <div style={{ float: 'right' }}>
                    <EventOptions />
                </div>
            </div>
        )}

    const eventsDisplay = (
        <div className="events">
            <EventCard justifyContent='auto' width='360px' height='30px' marginTop='15px' overflow='initial'
                       content={eventHeader} backgroundColor='#8CC63E' />
            {events !== undefined && events.map((e, index) => (
                <EventCard
                    key={index}
                    justifyContent="left"
                    width="360px"
                    height='90px'
                    marginTop='10px' overflow='hidden'
                    content={
                        <EventDisplay
                            startDate={e.startDate}
                            startTime={e.startTime}
                            endTime={e.endTime}
                            description={e.description}
                            header={e.eventHeader}
                        />}
                />
            ))}
        </div>
    )
    return eventsDisplay;

}
