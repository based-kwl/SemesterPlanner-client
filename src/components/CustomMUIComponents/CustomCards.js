import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Menu, Typography } from "@mui/material";

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

export const EventCard = ({ width, height, marginTop, justifyContent, content, backgroundColor }) => {
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
            overflow: "hidden",

        }} variant='outlined'>
            {content}
        </Card>
    );
}

//do i need three contents ?

export const ColorEventCard = ({  width, backgroundColor, content, height }) => {
    return (
        <Card style={{
            borderRadius: '15px',
            marginLeft: '15px',
            marginRight: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
            width: '80px',
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