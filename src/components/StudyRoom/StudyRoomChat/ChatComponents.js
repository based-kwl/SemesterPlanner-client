import {ChatMessagesCard} from "../../CustomMUIComponents/CustomCards";
import React from "react";

export const OthersMessage = (data) => {
    return (
        <div style={{paddingLeft: "10px"}}>
            <ChatMessagesCard content={data} userType="others"/>
        </div>
    )
}

export const MyMessage = (data) => {
    return (
        <div style={{paddingLeft: "80px"}}>
            <ChatMessagesCard content={data} userType="you"/>
        </div>
    )
}