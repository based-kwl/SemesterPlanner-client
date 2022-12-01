import * as React from "react";
import Typography from "@mui/material/Typography";
import { StudyRoomCard } from "../StudyRoom/CommonResources";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import GetAuthentication from "../Authentication/Authentification";
import { useState } from "react";


export default function FriendNotification() {
    const [requestSent, setRequestSent] = React.useState([]);
    const [requestReceived, setRequestReceived] = React.useState([]);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loadingReject, setLoadingReject] = useState(false);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const ownerEmail = GetAuthentication().email;

    function handleCancel(index) {
        const id = requestSent[index]._id;
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/cancel-request`, { requestId: id, senderEmail: ownerEmail })
            .then(() => {
                setRequestSent((prevState) => prevState.filter(request => request !== requestSent[index]))
            })
            .catch(err => { console.log('Error:', err) });
        setLoadingCancel(true);

    }

    function handleReject(index) {
        const id = requestReceived[index]._id;
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/answerFriendRequest`, { answer: "declined", email: ownerEmail, requestId: id })
            .then(() => {
            })
            .catch(err => { console.log('Error:', err) });
        setLoadingReject(true);
    }

    function handleAccept(index) {
        const id = requestReceived[index]._id;
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/answerFriendRequest`, { answer: "accepted", email: ownerEmail, requestId: id })
            .then(() => {
            })
            .catch(err => { console.log('Error:', err) });
        setLoadingAccept(true);
    }

    React.useEffect(() => {
        //friend request received
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/incoming-requests/${ownerEmail}`)
            .then(res => {
                setRequestReceived(res.data);
            })
        // //friend request sent
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/outgoing-requests/${ownerEmail}`)
            .then(res => {
                setRequestSent(res.data);
            })
    }, [loadingCancel, loadingAccept, loadingReject])

    const friendNotification = (
        <React.Fragment>
            <Typography variant="body1" marginBottom="10px"> Friend Request Sent</Typography>
            <div style={{ overflow: 'auto', height: '30vh', marginBottom: '25px' }}>
                {requestSent.map((sent, index) => (
                    <div key={index}>
                        <StudyRoomCard width={'81vw'} height={'40px'}
                            content={<> {sent.receiverEmail}
                                <Button
                                    variant="text"
                                    onClick={() => handleCancel(index)}><p style={{ color: "#6E6E6E" }}>Cancel Request</p><ClearIcon
                                        data-test={`cancel-request-${sent.receiverEmail}`}
                                        style={{ color: '#912338' }} />
                                </Button>
                            </>} />
                    </div>
                ))}
            </div>

            <Typography variant="body1" marginBottom="10px"> Friend Request Received</Typography>

            <div style={{ overflow: 'auto', height: '30vh' }}>
                {requestReceived && requestReceived.map((received, index) => (
                    <div key={index}>
                        <StudyRoomCard width={'81vw'} height={'40px'}
                            content={<> {received.senderEmail}
                                <Stack direction="row" >
                                    <Button
                                        data-test={`accept-request-${received.senderEmail}`}
                                        variant="text"
                                        onClick={() => handleAccept(index)}><CheckIcon
                                            style={{ color: '#057D78' }} />
                                    </Button>
                                    <Button
                                        data-test={`decline-request-${received.senderEmail}`}
                                        variant="text"
                                        onClick={() => handleReject(index)}><ClearIcon
                                            style={{ color: '#912338' }} />
                                    </Button>
                                </Stack>
                            </>} />
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
    return (friendNotification)
}