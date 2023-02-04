import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea} from "@mui/material";
import Typography from "@mui/material/Typography";

export const BackgroundCard = ({ width, height, content }) => {
    return (
        <Card variant='outlined' style={{
            width: width,
            height: height,
            justifyContent: 'center',
            backgroundColor: '#E9E3D3',
            margin: 'auto'
        }}>
            {content}
        </Card>
    )
}

export const CustomWhiteCard = ({ width, height, marginTop, content }) => {
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
            position: 'relative',
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

export const EventCard = ({ width, height, marginTop, justifyContent, content, backgroundColor }) => {
    return (
        <Card style={{
            borderRadius: '0px',
            margin: 'auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: justifyContent,
            width: width,
            height: height,
            marginTop: marginTop,
            backgroundColor: backgroundColor,
            paddingTop: '8px',
            overflow: "hidden",

        }} variant='outlined'>
            {content}

        </Card>
    );
}

function renderSwitch(type){
    switch (type){
        case 'course':
            return '#0072A8'
        case 'study':
            return '#8CC63E'
        case 'workout':
            return '#DA3A16'
        case 'appointment':
            return '#DB0272'
        default:
            return 'black'
    }
}
export const EventTypeCard = ({ width, height, marginTop, content }) => {
    return (
        <Card style={{
            margin: 'auto',
            width: width,
            height: height,
            marginTop: marginTop,
            backgroundColor: renderSwitch(content),
            overflow: "hidden",

        }} >
           <Typography color="white" fontWeight={500} style={{
               variant:'overline', fontFamily: 'Roboto', align: 'center', display: 'flex',
           }}>
           {content}
           </Typography>

        </Card>
    );
}
export const ParticipantCard = ({width, height, content}) => {
    return (
        <Card variant='outlined' style={{
            display: 'flex',
            flexDirection:'row',
            width: width,
            height:  height,
            backgroundColor: '#F0F0F0',
            marginBottom: '15px',
            paddingLeft: '10px',
            justifyContent:'space-between',
            alignItems: 'center',
        }}>
            {content}
        </Card>
    )
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

export const ChatMessagesCard = (props) => {

    let backgroundColor;
    let textColor;
    let textSenderColor;

    if (props.userType === "others") {
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
                <Typography sx={{color: textSenderColor}}>{props.content.props.username}</Typography>
                <Typography sx={{color: textColor}}>{props.content.props.content}</Typography>
            </CardContent>
        </Card>
    );
}

export const ColorEventCard = ({  width, backgroundColor, content, height }) => {
    return (
        <Card style={{
            borderRadius: '15px',
            marginLeft: '15px',
            marginRight: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
            backgroundColor: backgroundColor,
            height: height,
            paddingTop: '8px',
            width: width,



        }} variant='outlined'>

            <CardContent style={{ backgroundColor: `${backgroundColor}` }}>
                <Typography color="#ffffff" fontWeight={500} style={{
                    fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                    backgroundColor: `${backgroundColor}`, borderRadius: '15px',

                }}>
                    {content}

                </Typography>

            </CardContent>

        </Card>
    )
}

