import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from "@mui/material/Badge";
import axios from "axios";
import GetAuthentication from "../Authentication/Authentification";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import FriendNotification from "../FriendList/FriendsNotification";
import StudyRecap from "../ProgressReports/StudyRecap";
import {filterEventsByDate, getEventList} from "../Calendar/CommonFunctions";
import ExamNotification from "./examNotification";

export default function NotificationMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [friendRequestCount, setFriendRequestCount] = React.useState(0);
    const [studyHourCount, setStudyHourCount] = React.useState(0);
    const [examCount, setExamCount] = React.useState(1)
    const examEvent = [{
        subject: 'SOEN',
        catalog: '385',
        startTime: new Date(),
        startDate: new Date(),
        endDate: new Date(),
    },{
        subject:'SOEN',
        catalog:'422',
        startTime: new Date(),
        startDate: new Date(),
        endDate: new Date(),
    }]
    // setExamCount(examEvent.length)
    console.log(examCount)
    console.log(examEvent)

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/incoming-requests/${GetAuthentication().email}`)
            .then(res => {
                setFriendRequestCount(res.data.length);
            })
            .catch(err => {
                console.log('Error', err);
            })

        getEventList(GetAuthentication().username).then((res) => {
            let studyEventList = filterEventsByDate(res, new Date()).filter(item => item.type === 'study' && !item.studyHoursConfirmed);
            // let examEventList = filterEventsByDate(res, new Date()+8).filter(item => item.type === 'exam')
            // setExamCount(examEventList.length)
            // setExamEvent(examEvent)

            if (studyEventList.length > 0) {
                const currentTime = new Date();
                if (currentTime.getHours() >= 21)
                    setStudyHourCount(studyHourCount + 1);
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFriendRequestClick = () => {
        setAnchorEl(null);
        document.getElementById('friendRequestDrawer').click();
    };

    const handleStudyHoursClick = () => {
        setAnchorEl(null);
        document.getElementById('studyRecapDrawer').click();
    };

    const handleExamNotificationClick = (index) => {
        setAnchorEl(null);
        document.getElementById(index.toString()).click();

    };

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Badge badgeContent={friendRequestCount + studyHourCount + examCount} showZero overlap="circular" sx={{
                    "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "#000000"
                    }
                }}>
                    <NotificationsIcon style={{color: 'white', height: '3vh', width: '3vh'}}/>
                </Badge>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {friendRequestCount > 0 ?
                    <MenuItem onClick={handleFriendRequestClick}>
                        <div style={{marginRight: '15px'}}>Friend Requests</div>
                        <div>
                            <Badge badgeContent={friendRequestCount} showZero overlap="circular" sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#000000"
                                }
                            }}/>
                        </div>
                    </MenuItem> : null}
                {studyHourCount > 0 ?
                    <MenuItem onClick={handleStudyHoursClick}>
                        <div style={{marginRight: '43px'}}>Study Hours</div>
                        <div>
                            <Badge badgeContent={studyHourCount} showZero overlap="circular" sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#000000"
                                }
                            }}/>
                        </div>
                    </MenuItem> : null}
                {examCount > 0 ?
                   <> {examEvent.map((exam,index)=>(
                    <MenuItem  onClick={()=>{handleExamNotificationClick(index)}}>
                        <div style={{marginRight: '43px'}}>Exam Notification {' '+ exam.subject+' '}{exam.catalog}</div>
                        <div>
                            <Badge badgeContent={examCount} showZero overlap="circular" sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#000000"
                                }
                            }}/>
                        </div>
                    </MenuItem> ))}</> : null}
                {friendRequestCount <= 0 && studyHourCount <= 0 && examCount <= 0 ?
                    <MenuItem style={{ backgroundColor: 'transparent' }} disableRipple={true}>
                        No notifications
                    </MenuItem>
                : null}
            </Menu>
            <div style={{visibility: 'hidden', height: '0px', width: '0px'}}>
                <BottomDrawer icon={<div style={{visibility: 'hidden', height: '0px', width: '0px'}} id={'studyRecapDrawer'}></div>} title={'Study Hours Recap'}
                              content={<StudyRecap notificationCount={studyHourCount}
                                                   notificationCountSetter={setStudyHourCount}/>}/>
                <BottomDrawer icon={<div style={{visibility: 'hidden', height: '0px', width: '0px'}} id={'friendRequestDrawer'}></div>} title={'Friend Requests'}
                              content={<FriendNotification/>}/>
                {examEvent.map((exam, index)=>{

                    return ( <BottomDrawer icon={<div style={{visibility: 'hidden', height: '0px', width: '0px'}} id={index.toString()}></div>} title={exam.catalog+exam.subject}
                                  content={<ExamNotification examData={exam}/>}/>)
                })}

            </div>
        </div>
    );
}