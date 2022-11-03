import * as React from 'react';
import Card from '@mui/material/Card';

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