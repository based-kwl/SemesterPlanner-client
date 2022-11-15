import React from 'react';
import { ChatMessagesCard } from '../../CustomMUIComponents/CustomCards';
import Grid from "@mui/material/Grid";
import { socket } from './Sockets';
import axios from "axios";

export function GetStudyRoomChat(){

    const userEmail = React.useRef("")
    const [messages, setMessages] = React.useState([]);
    const [messageCount, setMessageCount] = React.useState(0)
    React.useEffect(() => {
        userEmail.current = localStorage.getItem("email");
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
        axios.get(`${process.env.REACT_APP_BASE_URL}room/fetch/${studyRoomId}`)
            .then(res => {
                const messageFromRoom = res.data.messages;
                const messageReverse = messageFromRoom.reverse();
                setMessages(messageReverse);
                setMessageCount(res.data.messages.length)
                socket.emit('create', res.data.sID)
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

    const OthersMessage = (data) =>
        (
            <div style={{paddingLeft: "10px"}}>
                <ChatMessagesCard content={data} userType="others"  />
            </div>
        );

    const MyMessage = (data) =>
        (
            <div style={{paddingLeft: "80px"}}>
                <ChatMessagesCard content={data} userType="you"  />
            </div>
        );

    function isMyMessage(message) {
        const sender = JSON.parse(message.username);
        return userEmail.current == `"${sender}"`;
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
                    {messages.map((message, index) => {
                        return  (
                            <Grid item key={index} message sm={12} md={12} sx={{paddingBottom: '12px'}}>
                                { isMyMessage(message) ? <MyMessage props={message}/> : <OthersMessage props={message}/> }
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }, [messages]));

    return <MessagesBubbles />
};