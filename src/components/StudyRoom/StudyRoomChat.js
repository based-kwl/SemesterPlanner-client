import React from 'react';
import { ChatMessagesCard } from '../CustomMUIComponents/CustomCards';
import Mocks from "./Mocks/mockStudyRoomMessages.json";
import Grid from "@mui/material/Grid";
import { socket } from './Sockets';

export function GetStudyRoomChat(){

    // const userEmail = JSON.parse(localStorage.getItem("email"));
    const userEmail = "test@gmail.com";
    //const [messages, setMessages] = React.useState([]);
    const messages = Mocks;
    let studyRoomId;
    React.useEffect(() => {
        const studyRoomId = window.location.href.split("/")[window.location.href.split("/").length - 1];
        console.log(studyRoomId);
        fetchMessages();
        socket.on("newMessage", listener)
        return () => {
            socket.off("newMessage", listener)
        };
    }, []);

    function listener(data) {
        console.log(data)
    }

    function fetchMessages() {
        //setMessages(Mocks)
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
        const m = JSON.parse(JSON.stringify(message.senderEmail));
        if (m) {
            return m == "me@gmail.com"
        }
    }

    const MessagesBubbles = () => (React.useMemo(() => {
        return(
            <div style={{position: 'absolute', top: '10px', overflow: 'auto'}}>
                <Grid container>
                    {messages.map((message, index) => {
                        return  (
                            <Grid key={index} message sm={12} md={12} sx={{paddingBottom: '12px'}}>
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