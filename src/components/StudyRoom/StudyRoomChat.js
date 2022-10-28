import React from 'react';
import { ChatMessagesCard } from '../CustomMUIComponents/CustomCards';
import Mocks from "./mocks/messageMocks.json";
import Grid from "@mui/material/Grid";

export function GetStudyRoomChat({socket}){

    // const userEmail = JSON.parse(localStorage.getItem("email"));
    const userEmail = "test@gmail.com";
    //const [messages, setMessages] = React.useState([]);
    const messages = Mocks;

    function compareDates(messageA, messageB) {
        if (messageA.timeSent < messageB.timeSent) {
            return -1
        } else if (messageA.timeSent > messageB.timeSent) {
            return 1
        }
        return 0;
    }

     React.useEffect(() => {
         fetchMessages();
        // socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, []);

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
            <div style={{paddingRight: "10px"}}>
                <ChatMessagesCard content={data} userType="you"  />
            </div>
        );

    function isMyMessage(message) {
        console.log('Single item', message);
        const m = JSON.parse(JSON.stringify(message.senderEmail));
        console.log('Single message', m)
        if (m) {
            return m == "me@gmail.com"
        }

    }

    const messagesBubbles = React.useMemo(() => {
        return(
            <Grid container>
                {messages.map((message, index) => {

                    return  (
                        <Grid key={index} message sm={12} md={12} spacing={2}>
                            {
                                isMyMessage(message)
                                    ? <MyMessage content={message}/>
                                    : <OthersMessage props={message}/>
                            }
                        </Grid>
                    )
                })}
            </Grid>
        )
    }, [messages]);





    return <>{messagesBubbles}</>
};

