import {FileSelectButton, PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import CreateEvent from "./Event/CreateEvent";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import {delay} from "../CommonHelperFunctions/CommonHelperFunctions";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import ScheduleEvent from "./Event/ScheduleEvent";



export default function ImageUpload(props) {
    const [imageType, setImageType] = useState('event')
    const [image, setImage] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [event, setEvent] = useState({});

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: '#0072A8'
        }
    });
    function handleFile() {
        if (isFilePicked) {
            if(imageType === 'event') {
                let data = new FormData();
                data.append('img', image);
                axios.post(`${process.env.REACT_APP_BASE_URL}tesseract/img`, data)
                    .then((res) => {
                        setEvent(res.data);
                        setErrorMessage("Image uploaded!");

                        delay(0).then(() => { // delay call is needed for add event drawer to populate data properly
                            document.getElementById('addEventDrawer').click();
                        })
                    })
                    .catch(err => {
                        console.log('Error:', err)
                    });
            } else if (imageType === 'schedule'){
                delay(0).then(() => { // delay call is needed for add event drawer to populate data properly
                    document.getElementById('scheduleSummaryDrawer').click();
                })
            }
        } else {
            setErrorMessage("No image selected!");
        }
    }

    function handleFilePreview(e) {
        e.preventDefault();
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setIsFilePicked(true);
        } else {
            setImage(null);
            setIsFilePicked(false);
        }
    }
    function handleImageType(e, newImageType){
        if(newImageType != null){
            setImageType(newImageType)
        }
        console.log('image:', imageType)
    }

    const toggleButton = (
        <ToggleButtonGroup
            value={imageType}
            exclusive
            onChange={handleImageType}
            aria-label="image type"
        >
            <ToggleButton value="event" aria-label="event">
                Event
            </ToggleButton>
            <ToggleButton value="schedule" aria-label="schedule">
                Schedule
            </ToggleButton>
        </ToggleButtonGroup>
    )

    const imageUploadDrawer = (
        <>
            <div style={{marginBottom: '30px', textAlign:'center'}}>
                {toggleButton}
                <p>preview image</p>
                <div style={{width: '90vw', height: '40vh', border: '1px solid black'}}>
                    {isFilePicked ? <img src={URL.createObjectURL(image)} style={{height: '100%', width: '100%', objectFit:'contain'}}
                                         alt={"upload"}/> : <></>}
                </div>
            </div>
            <div style={{color: 'red', height: '5vh'}}>{errorMessage}</div>
            <div style={{marginBottom: '10px'}}>
                <FileSelectButton width={"90vw"} onChange={handleFilePreview} name={'Select Image'}/>
            </div>
            <div id={"uploadButton"} style={{marginBottom: '10px'}}>
                <PrimaryButton2 content={"Upload"} colour={'#912338'} width={"90vw"} onClick={handleFile}/>
            </div>
            <div style={{visibility: 'hidden'}}>
                <BottomDrawer icon={<button id={'addEventDrawer'}></button>} title={'Add Event'}
                              content={<CreateEvent event={event} onDrawerClose={props.onDrawerClose}/>}/>
            </div>
            <div style={{visibility: 'hidden'}}>
                <BottomDrawer icon={<button id={'scheduleSummaryDrawer'}></button>} title={'Schedule Summary'}
                              content={<ScheduleEvent event={event} onDrawerClose={props.onDrawerClose}/>}/>
            </div>
        </>

    )
    return (
        imageUploadDrawer
    );
}