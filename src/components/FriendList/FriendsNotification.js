import * as React from "react";
import Typography from "@mui/material/Typography";
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";

export default function FriendNotification() {
    const [requestSent, setRequestSent] = React.useState([]);
    const [requestReceived, setRequestReceived] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const ownerEmail = JSON.parse(localStorage.getItem("email"));

    //todo:cancel request doesnt cancel. The data is still in the db
    function handleCancel(index){
        const id = requestSent[index]._id;
        axios.delete(`${process.env.REACT_APP_BASE_URL}friend/cancel-request`,{requestId:id})
            .then(() => {
                console.log('info sent');
            })
            .catch(err => {console.log('Error:', err)});
         window.location.reload();

    }
    function handleReject(index){
        const id = requestReceived[index]._id;
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/answerFriendRequest`, {answer:"declined", requestId:id})
            .then(() => {
                console.log('info sent');
            })
            .catch(err => {console.log('Error:', err)});
        window.location.reload();

    }

    function handleAccept(index){
        const id = requestReceived[index]._id;
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/answerFriendRequest`, {answer:"accepted", requestId:id})
            .then(() => {
                console.log('info sent');
            })
            .catch(err => {console.log('Error:', err)});
        window.location.reload();
    }


    React.useEffect( ()=>{
        //friend request received
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/incoming-requests/${ownerEmail}`)
            .then(res => {
                console.log("received", res.data);
                setRequestReceived(res.data);
                setCount(requestReceived.length);
            })
        // //friend request sent
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/outgoing-requests/${ownerEmail}`)
            .then(res => {
                setRequestSent(res.data);
            })

    },[])


    const friendNotification = (
        <React.Fragment>
            <Typography variant="body1" marginBottom="10px"> Friend Request Sent</Typography>
            <div style={{overflow: 'auto', height: '30vh', marginBottom:'25px'}}>
                {requestSent.map((sent, index) => (
                    <div key={index}>
                        <StudyRoomCard width={'81vw'} height={'40px'}
                                       content={<> {sent.receiverEmail}
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
                                       content={<> {received.senderEmail}
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