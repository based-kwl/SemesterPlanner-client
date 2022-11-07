import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";
import {CardHeader} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import {CardActionArea} from "@mui/material";

export const BackgroundCard = ({width, height, content}) => {
    return (
        <Card variant='outlined' style={{
            width: width,
            height:  height,
            justifyContent: 'center',
            backgroundColor: '#E9E3D3',
            margin: 'auto'
        }}>
            {content}
        </Card>
    )
}

export const CustomWhiteCard = ({width, height, marginTop, content}) => {
    return (
        <Card style={{
            borderRadius: '15px',
            margin: 'auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: width,
            height: height,
            marginTop: marginTop
        }} variant='outlined'>
            {content}
        </Card>
    );
}

export const StudyRoomChatCard = ({width, height, marginTop,topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius, content}) => {
    return (
        <Card style={{
            margin: 'auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: width,
            height: height,
            marginTop: marginTop,
            borderTopLeftRadius: topLeftRadius,
            borderTopRightRadius: topRightRadius,
            borderBottomRightRadius: bottomRightRadius,
            borderBottomLeftRadius: bottomLeftRadius
        }} variant='outlined'>
            {content}
        </Card>
    );
}

export const ReminderCard = ({width, height, marginTop, justifyContent, content, backgroundColor, overflow}) => {
    return (
        <Card style={{
            borderRadius: '15px',
            margin: 'auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: justifyContent,
            width: width,
            height: height,
            marginTop: marginTop,
            backgroundColor: backgroundColor,
            paddingTop: '8px',
            overflow: overflow,

        }} variant='outlined'>
            {content}
        </Card>
    );
}

export const SnippetCard = ({width, height, marginBottom, content, borderRadius,destination}) => {
    return (
        <Card style={{
            margin: 'auto',
            alignItems: 'left',
            display: 'flex',
            justifyContent: 'left',
            width: width,
            height: height,
            marginBottom: marginBottom,
            paddingLeft:'10px',
            borderRadius: borderRadius,

        }} variant='outlined'>
            <CardActionArea onClick={destination}>{content}</CardActionArea>


        </Card>
    );
}

export const ChatMessagesCard = ({content, userType}) => {

    let backgroundColor;
    let textColor;
    let textSenderColor;

    if (userType === "you") {
        backgroundColor = "#F0F0F0"
        textColor = "#000000"
        textSenderColor = "#E5A712"
    } else {
        backgroundColor = "#CBB576"
        textColor = "#FFFFFF"
        textSenderColor = "#403531"
    }


    return (
        <Card sx={{
            backgroundColor: backgroundColor,
            width: "69vw",
            borderRadius: "10px"
        }}>
            <CardContent>
                <Typography sx={{color: textSenderColor}}>{content.props.senderEmail}</Typography>
                <Typography sx={{color: textColor}}>{content.props.messageContent}</Typography>
            </CardContent>
        </Card>
    );
}