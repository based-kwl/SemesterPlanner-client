import React, { useState } from 'react';
import axios from "axios";

export const ChatFooter = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        const studyRoomId = window.location.href.split("/")[window.location.href.split("/").length - 1];
        e.preventDefault();
        const email = JSON.parse(localStorage.getItem('email'))
        axios.post(`${process.env.REACT_APP_BASE_URL}message/send`, {studyRoomID: studyRoomId, email: email, content: message})
            .then((res) => {console.log(res)})
        setMessage('');
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