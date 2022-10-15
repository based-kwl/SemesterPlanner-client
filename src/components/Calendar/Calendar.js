import * as React from 'react';
import { Box, Button, InputAdornment, Link, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import { useState } from "react";
import Calendar from 'react-calendar';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import '../Calendar/calendar.css'


export default function ShowCalendar() {
   
    const [date, setDate] = useState(new Date()) // stores date, sets date using Date obj
   
    return (
        <Card variant='outlined' style={{
            width: '372px',
            height: '785px',
            justifyContent: 'center',
            backgroundColor: '#E9E3D3',
            margin: 'auto'
        }}>

            <Card style={{
                borderRadius: '15px',
                margin: 'auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '360px',
                height: '400px',
                marginTop: '50px'
            }} variant='outlined'>
                <Calendar onChange={setDate} value={date} />

            </Card>
            <Box sx={{ '& button': { m: 1 } }}>
                <div style={{ paddingTop: '16px', paddingLeft: '30px' }}>

                </div>
            </Box>

            <Grid>

                <Grid item md={3}>

                    <Card variant='outlined' style={{
                        borderRadius: '10px',
                        margin: 'auto',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'left',
                        width: '360px',
                        height: '30px',
                        marginTop: '5px',
                        backgroundColor: '#8CC63E',
                        paddingTop: '8px'
                    }}>

                        <CardContent>

                            <Typography color="#000000" fontWeight={500} style={{
                                fontFamily: 'Roboto', alignItems: 'center', display: 'flex',

                            }}>
                                School
                            </Typography>

                        </CardContent>


                    </Card>
                </Grid>


                <Grid item md={3}>

                    <Card variant='outlined' style={{
                        borderRadius: '15px',
                        margin: 'auto',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'left',
                        width: '360px',
                        height: '90px',
                        marginTop: '10px', overflow: 'auto'
                    }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                14:00-17:00
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} color="#000000" fontWeight={500} style={{ fontFamily: 'Roboto' }}>
                                School Meeting
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                Start from screen 16
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card variant='outlined' style={{
                        borderRadius: '15px',
                        margin: 'auto',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'left',
                        width: '360px',
                        height: '90px',
                        marginTop: '10px', overflow: 'auto'
                    }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                14:00-17:00
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} color="#000000" fontWeight={500} style={{ fontFamily: 'Roboto' }}>
                                School Meeting
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                Start from screen 16
                            </Typography>
                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </Card>
    )
}