import {FileSelectButton, PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import CreateEvent from "./Event/CreateEvent";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import {delay} from "../CommonHelperFunctions/CommonHelperFunctions";

export default function ImageUpload(props) {
    const [image, setImage] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [event, setEvent] = useState({});

    function handleFile() {
        if (isFilePicked) {
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

    const imageUploadDrawer = (
        <>
            <div style={{marginBottom: '30px'}}>
                <p>preview image</p>
                <div style={{width: '90vw', height: '40vh', border: '1px solid black'}}>
                    {isFilePicked ? <img src={URL.createObjectURL(image)} style={{height: '100%', width: 'auto'}}
                                         alt={"upload"}/> : <></>}
                </div>
            </div>
            <div style={{color: 'red', height: '5vh'}}>{errorMessage}</div>
            <div style={{marginBottom: '10px'}}>
                <FileSelectButton data_test={"selectImageButton"} width={"90vw"} onChange={handleFilePreview} name={'Select Image'}/>
            </div>
            <div id={"uploadButton"} style={{marginBottom: '10px'}}>
                <PrimaryButton2 data_test={"uploadButton"} content={"Upload"} colour={'#912338'} width={"90vw"} onClick={handleFile}/>
            </div>
            <div style={{visibility: 'hidden'}}>
                <BottomDrawer icon={<button id={'addEventDrawer'}></button>} title={'Add Event'}
                              content={<CreateEvent event={event} onDrawerClose={props.onDrawerClose}/>}/>
            </div>
        </>

    )
    return (
        imageUploadDrawer
    );
}