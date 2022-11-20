import * as React from "react";
import Typography from "@mui/material/Typography";
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";

export default function FriendNotification() {
    // const requestSent = ['bob', 'bub', 'beb', 'bab','bib','fed', 'fad','fuc'];
    // const requestReceived = ['blob', 'blub', 'bleb', 'blab','blib', 'bob', 'bub', 'beb', 'bab'];
    const [requestSent, setRequestSent] = React.useState([]);
    const [requestReceived, setRequestReceived] = React.useState([]);
    const ownerEmail = JSON.parse(localStorage.getItem("email"));

    function handleCancel(){

    }
    function handleReject(){}

    function handleAccept(){}


    React.useEffect( ()=>{
        //friend request received
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/incoming-requests/${ownerEmail}`)
            .then(res => {
                console.log(res.data);
                setRequestReceived( res.data);
            })
        //friend request sent
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/outgoing-requests/${ownerEmail}`)
            .then(res => {
                console.log(res.data);
                setRequestSent( res.data);
            })

    },[])


    const friendNotification = (
        <React.Fragment>
            <Typography variant="body1" marginBottom="10px"> Friend Request Sent</Typography>
            <div style={{overflow: 'auto', height: '30vh', marginBottom:'25px'}}>
                {requestSent.map((sent, index) => (
                    <div key={index}>
                        <StudyRoomCard width={'81vw'} height={'40px'}
                                       content={<> {sent}
                                           <Button
                                               variant="text"
                                               onClick={() => handleCancel(index)}><p style={{color:"#6E6E6E"}}>Cancel Request</p><ClearIcon
                                               style={{color: '#912338'}}/>
                                           </Button>
                                       </>}/>
                    </div>
                ))}
            </div>

            <Typography variant="body1" marginBottom="10px"> Friend Request Received</Typography>

            <div style={{overflow: 'auto', height: '30vh'}}>
                {requestReceived.map((received, index) => (
                    <div key={index}>
                        <StudyRoomCard width={'81vw'} height={'40px'}
                                       content={<> {received}
                                       <Stack direction="row" >
                                           <Button
                                               variant="text"
                                               onClick={() => handleAccept(index)}><CheckIcon
                                               style={{color: '#057D78'}}/>
                                           </Button>
                                           <Button
                                               variant="text"
                                               onClick={() => handleReject(index)}><ClearIcon
                                               style={{color: '#912338'}}/>
                                           </Button>
                                       </Stack>
                                       </>}/>
                    </div>
                ))}
            </div>

        </React.Fragment>


    )
    return(friendNotification)
}