import * as React from 'react';
import {useState} from "react";
import {ParticipantCard} from "./StudyRoomCards";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {PrimaryButton2, FileSelectButton} from "../CustomMUIComponents/CustomButtons"


export default function ParticipantsList() {
    const [fileList, setFileList] = useState([
        "person1",
        "person2",
        "person3",
        "person4",
        "person5",
        "person6",
        "person7",
        "person8",
        "person9",
        "person10",
        "person11",
        "person12"
    ])

    function handleDeleteCourseNotes(index) {
        let newFileList = fileList.filter((file) => {
            return file !== fileList[index];
        })
        setFileList(newFileList);
    }

    // TODO: when backend is implemented, update database with participants of the study room using the respective endpoint
    function handleAddCourseNotes() {
        console.log(fileList); // remove this line after connecting to backend
        console.log(selectedFile); // remove this line after connecting to backend
    }

    //--------------------------------------------------------
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
        }
    };

    const courseNotesList = (
        <>
            <div>
                <div style={{overflow: "auto", maxHeight: `${isFilePicked ? "43vh" : "60vh"}`}}>
                    {fileList.map((participant, index) => <ParticipantCard id={index} key={index} width={'90vw'}
                                                                           height={'40px'}
                                                                           content={<>{participant}<Button
                                                                               variant="text"
                                                                               sx={{borderColor: "none"}}
                                                                               onClick={() => handleDeleteCourseNotes(index)}><ClearIcon
                                                                               style={{color: '#912338'}}/></Button></>}/>)}
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "fixed",
                bottom: "30px",
            }}>
                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : null}
                <div style={{marginBottom: '10px'}}>
                    <FileSelectButton width={"90vw"} onChange={changeHandler}/>
                </div>
                <div id={"uploadButton"}>
                    <PrimaryButton2 content={"Upload"} width={"90vw"} onClick={handleAddCourseNotes}/>
                </div>
            </div>
        </>
    )

    return (
        courseNotesList
    );
}