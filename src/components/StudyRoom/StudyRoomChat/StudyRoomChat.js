import React from 'react';
import Grid from "@mui/material/Grid";
import { socket } from './Sockets';
import axios from "axios";
import {GetAuthentication} from "../../Authentication/Authentification";
import {MyMessage, OthersMessage} from "./ChatComponents";

export function GetStudyRoomChat(){

    const userEmail = React.useRef("")
    const [messages, setMessages] = React.useState([]);
    const [messageCount, setMessageCount] = React.useState(0)
    React.useEffect(() => {
        userEmail.current = GetAuthentication().email;
        fetchMessages();
        socket.on("newMessage", listener)
        return () => {
            socket.off("newMessage", listener)
        };
    }, [messageCount]);

    function listener() {
        setMessageCount((prev) => prev+1);
    }

    function fetchMessages() {
        const studyRoomId = window.location.href.split("/")[window.location.href.split("/").length - 1];
        axios.get(`${process.env.REACT_APP_BASE_URL}message/bulk/${studyRoomId}/100`)
            .then(res => {
                const messageFromRoom = res.data;
                const messageReverse = messageFromRoom.reverse();
                setMessages(messageReverse);
                setMessageCount(res.data.length)
                socket.emit('create', studyRoomId)
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    function isMyMessage(message) {
        return userEmail.current === message.email;
    }

    const MessagesBubbles = () => (React.useMemo(() => {
        return(
            <div style={{
                position: 'absolute',
                top: '10px',
                overflowY: 'scroll',
                height: '100%',
                paddingBottom: '10px',
                display: 'flex',
                flexDirection: 'column-reverse'}} // scroll down to last message
            >
                <Grid container>
                    {messages.map((message) => {
                        return  (
                            <Grid item key={messages.messageID} message sm={12} md={12} sx={{paddingBottom: '12px'}}>
                                { isMyMessage(message) ? <MyMessage props={message}/> : <OthersMessage props={message}/> }
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }, [messages]));

    return <MessagesBubbles />
}