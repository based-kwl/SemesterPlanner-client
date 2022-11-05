import { SketchPicker, BlockPicker, CirclePicker } from "react-color";
import { useState } from "react";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import * as React from 'react';
import { BackgroundCard, CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'

function Selector() {
  //creating state to store our color and also set color using onChange event for sketch picker

  // destructuring rgba from state
 
//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: purple[500],
//       },
//       secondary: {
//         main: '#f44336',
//       },
//     },
//   });
  
  //creating state to store our color and also set color using onChange event for block picker
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");
  const [colorArray, setColorArray] = React.useState( [
    '#37d67a','#555555', '#dce775', '#ff8a65', '#ba68c8'
    ])
 const [color, setColor] = useState({thecolor:''})

 
  function changeColor(){
    let colorj = document.getElementById('colorArray').value; 
  }
  function colorChosen(e) {
    setBlockPickerColor({...blockPickerColor, thecolor: e.target.value})
}

const colorPicker = (
    <React.Fragment>
    <div
    style={{
      backgroundColor: `${blockPickerColor}`,
      width: 100,
      height: 50,
      border: "2px solid white",
    }}
  ></div>
  {/* Block Picker from react-color and handling color on onChange event */}
  <CirclePicker
    color={blockPickerColor}
    colors={colorArray}
    onChange={(color) => {
      setBlockPickerColor(color.hex);
    }}
    onClick={colorChosen}
  />
   <Card >
            <CardContent 
            // {...setcolorArray[2]}
            style={{backgroundColor: blockPickerColor}}>
            hi
            </CardContent>
            
        </Card>
        <Card >
            <CardContent 
            // {...setcolorArray[2]}
            style={{backgroundColor: blockPickerColor}}>
            hi
            </CardContent>
            
        </Card>
        <Card >
            <CardContent 
            // {...setcolorArray[2]}
            style={{backgroundColor: blockPickerColor}}>
            hi
            </CardContent>
            
        </Card>
        <Card >
            <CardContent 
            // {...setcolorArray[2]}
            style={{backgroundColor: blockPickerColor}}>
            hi
            </CardContent>
            
        </Card>
  </React.Fragment>
)

  return (
    <React.Fragment>
    <PersistentDrawerLeft />
    <div style={{ paddingTop: '60px' }}>
        <BackgroundCard width='372px' height='885px'  content={colorPicker} />
    </div>
</React.Fragment>
  );
}

export default Selector;
