import * as React from 'react';
import Card from '@mui/material/Card';

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

export const EventCard = ({width, height, marginTop, justifyContent, content, content2, backgroundColor}) => {
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
            overflow: 'auto',

        }} variant='outlined'>
            {content}
            {content2}

        </Card>
    );
}
// contains two cards
export const BackgroundCard2 = ({width, height, content, content2}) => {
    return (
        <Card variant='outlined' style={{
            width: width,
            height:  height,
            justifyContent: 'center',
            backgroundColor: '#E9E3D3',
            margin: 'auto'
        }}>
            {content}
            {content2}

        </Card>
    )
}