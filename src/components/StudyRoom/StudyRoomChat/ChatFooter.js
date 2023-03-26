import React, { useState } from 'react';
import axios from "axios";
import {GetAuthentication} from "../../Authentication/Authentification";

export const ChatFooter = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        const studyRoomId = window.location.href.split("/")[window.location.href.split("/").length - 1];
        const email = GetAuthentication().email;
        axios.post(`${process.env.REACT_APP_BASE_URL}message/send`, {
            studyRoomID: studyRoomId,
            email: email,
            content: message
        })
            .then(() => {
                setMessage('');
            })
    };
    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter;