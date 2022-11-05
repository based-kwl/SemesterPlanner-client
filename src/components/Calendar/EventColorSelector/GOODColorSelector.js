import { SketchPicker, BlockPicker, CirclePicker } from "react-color";
import { useState } from "react";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import * as React from 'react';
import { BackgroundCard, CustomWhiteCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import { PrimaryButton2 } from '../../CustomMUIComponents/CustomButtons'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
  const [blockPickerColor, setBlockPickerColor] = React.useState({
    box1: '#37d67a',
    box2: '#37d67a',
    box3: '#37d67a',
    box4: '#37d67a',
    box5: '#37d67a',
    box6: '#37d67a',

  });
  const [colorArray, setColorArray] = React.useState([
    '#37d67a', '#555555', '#dce775', '#ff8a65', '#ba68c8'
  ])
  const [color, setColor] = useState({ thecolor: '' })


  function changeColor() {
    let colorj = document.getElementById('colorArray').value;
  }
  function colorChosen1(e) {
    setBlockPickerColor({ ...blockPickerColor, box1: color.hex })
  }
  function colorChosen2(e) {
    setBlockPickerColor({ ...blockPickerColor, box2: e.target.value })
  }
  function colorChosen3(e) {
    setBlockPickerColor({ ...blockPickerColor, box3: e.target.value })
  }
  function colorChosen4(e) {
    setBlockPickerColor({ ...blockPickerColor, box4: e.target.value })
  }
  function colorChosen5(e) {
    setBlockPickerColor({ ...blockPickerColor, box5: e.target.value })
  }
  function colorChosen6(e) {
    setBlockPickerColor({ ...blockPickerColor, box6: e.target.value })
  }

  // const savedColor = (

  // )
  const colorPicker = (
    <React.Fragment>
      <div className="saved"></div>
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
        onClick={colorChosen2}
      />
      <div>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
      </div>
      <div>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
      </div>
      <div>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
        <Button
          id='box1'
          variant="contained"
          value={blockPickerColor.box1}
          onChange={colorChosen1}
          style={{ backgroundColor: blockPickerColor }}>
          Secondary
        </Button>
      </div>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <PersistentDrawerLeft />
      <div style={{ paddingTop: '60px' }}>
        <BackgroundCard width='372px' height='885px' content={colorPicker} />
      </div>
    </React.Fragment>
  );
}

export default Selector;
