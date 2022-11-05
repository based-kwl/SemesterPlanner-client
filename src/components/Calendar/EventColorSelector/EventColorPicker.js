import { SketchPicker, BlockPicker, CirclePicker } from "react-color";
import { useState } from "react";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import * as React from 'react';
import { BackgroundCard, ColorCategoryCard, CustomWhiteCard, EventCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import { PrimaryButton2 , EditButton} from '../../CustomMUIComponents/CustomButtons'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Menu, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function ColorSelector() {
    const [circlePickerColor, setCirclePickerColor] = useState("#37d67a");
    const navigate = useNavigate();

    const [colorArray, setColorArray] =
        useState([
            '#37d67a', '#555555', '#dce775', '#ff8a65', '#ba68c8'
        ])
    function editEventColor() {
        navigate('/calendar');
    }
    const colorPicker = (
        <React.Fragment>
            <div>
                <p>
                    Choose a color you like
                </p>
            </div>
            <div

                style={{
                    backgroundColor: `${circlePickerColor}`,
                    width: 100,
                    height: 50,
                    border: "2px solid white",
                }}
            ></div>
            {/* Block Picker from react-color and handling color on onChange event */}

            <CirclePicker
                color={circlePickerColor}
                colors={colorArray}
                onChange={(color) => {
                    setCirclePickerColor(color.hex);
                }}
            />
        </React.Fragment>
    )

    const ColorCardDisplay = (
        <React.Fragment>
            <Card style={{
                borderRadius: '15px',
                margin: 'auto',

                marginTop: '50px'
            }}>
                <CardContent style={{ backgroundColor: `${circlePickerColor}` }}>
                    <Typography color="#ffffff" fontWeight={500} style={{
                        fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                        backgroundColor: `${circlePickerColor}`, borderRadius: '15px',

                    }}>
                        Type1
                    </Typography>

                </CardContent>
            </Card>
         <EventCard/>
         <ColorCategoryCard backgroundColor={`${circlePickerColor}`} />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorCategoryCard backgroundColor={`${circlePickerColor}`} />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorCategoryCard backgroundColor={`${circlePickerColor}`} />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
            <div className="editColor">
                <Button  style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
            </div>
            <div className="center">
                <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
            </div>
            <Card style={{
                borderRadius: '15px',
                margin: 'auto',
                alignItems: 'center',
                justifyContent: 'auto',
                marginTop: '50px',
                width: '175px',
                backgroundColor: `${circlePickerColor}`
            }}>
                <CardContent style={{ backgroundColor: `${circlePickerColor}` }}>
                    <Typography color="#ffffff" fontWeight={500} style={{
                        fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                        backgroundColor: `${circlePickerColor}`, borderRadius: '15px',

                    }}>
                        Type
                    </Typography>

                </CardContent >
            </Card>
            <Card style={{
                borderRadius: '15px',
                margin: 'auto',

                marginTop: '50px'
            }}>
                <CardContent style={{ backgroundColor: `${circlePickerColor}` }}>
                    <Typography color="#ffffff" fontWeight={500} style={{
                        fontFamily: 'Roboto', alignItems: 'center', display: 'flex',
                        backgroundColor: `${circlePickerColor}`, borderRadius: '15px',

                    }}>
                        Type3
                    </Typography>

                </CardContent>
            </Card>
        </React.Fragment>

    )
    // const cardAndButton = (
        
    // )

    const addEventColorCard = (
        <React.Fragment>
            <div>
                <CustomWhiteCard width='326px' height='180px' marginTop='50px' content={colorPicker} />

            </div>
        </React.Fragment>
    )
    const colorPickerDisplay = (
        <React.Fragment>
            {ColorCardDisplay}
            {addEventColorCard}
        </React.Fragment>

    )
    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '30px' }}>
                <BackgroundCard width='372px' height='100%' content={colorPickerDisplay} />
            </div>
        </React.Fragment>
    );


}

