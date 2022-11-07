import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import {FileCard} from "./StudyRoomCards";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import {PrimaryButton2, FileSelectButton} from "../CustomMUIComponents/CustomButtons"
import axios from "axios";
// import { Buffer } from 'buffer'
//
// // @ts-ignore
// window.Buffer = Buffer;

export default function ParticipantsList() {
    const [fileList, setFileList] = useState([
        {name: "file1", uploadDate: "2022-11-04", size: 123},
        {name: "file2", uploadDate: "2022-11-04", size: 123},
        {name: "file3", uploadDate: "2022-11-04", size: 123},
        {name: "file4", uploadDate: "2022-11-04", size: 123},
        {name: "file5", uploadDate: "2022-11-04", size: 123},
        {name: "file6", uploadDate: "2022-11-04", size: 123},
        {name: "file7", uploadDate: "2022-11-04", size: 123},
        {name: "file8", uploadDate: "2022-11-04", size: 123},
        {name: "file9", uploadDate: "2022-11-04", size: 123},
        {name: "file10", uploadDate: "2022-11-04", size: 123}
    ])

    function handleDeleteCourseNotes(index) {
        let newFileList = fileList.filter((file) => {
            return file !== fileList[index];
        })
        setFileList(newFileList);
    }

    // TODO: when backend is implemented, update database with uploaded file
    function handleUploadCourseNotes() {
        console.log(fileList); // remove this line after connecting to backend
        console.log(selectedFile); // remove this line after connecting to backend

        if (isFilePicked) {
            let newFile = {
                name: selectedFile.name,
                uploadDate: new Date().toLocaleDateString(),
                size: (selectedFile.size / 1024).toFixed(1)
            }

            let bufferedFile = Buffer.from([10,20,30]);
            axios.post('http://localhost:5000/room/file',{sID:"lcm631kddt", type:selectedFile.type, username:"user_xxp0b3k89b", file: bufferedFile})
                .then(res => {
                    console.log(res);
                    // navigate("/study-room-home");
                })
                .catch(err => {console.log(`Error: ${err}`); console.log(`${err}`.substring(44) === 401 ? 'request could not be sent' : `${err}`)});

            let newFileList = [newFile, ...fileList];
            setFileList(newFileList);
            setSelectedFile(null);
            setIsFilePicked(false);
        }

        console.log(fileList); // remove this line after connecting to backend
    }

    //--------------------------------------------------------
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const fileListBottom = useRef(null);

    const handleFileSelect = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
        } else {
            setSelectedFile(null);
            setIsFilePicked(false);
        }
    };

    // TODO: fetch file from database and download
    function handleFileClick(index) {
        console.log(fileList[index]);
    }

    useEffect(() => {
        fileListBottom.current?.scrollIntoView({behavior: 'smooth'})
    }, [fileList])

    const courseNotesList = (
        <>
            <div>
                <div style={{overflow: "auto", maxHeight: `${isFilePicked ? "43vh" : "60vh"}`}}>
                    <div ref={fileListBottom}/>
                    {fileList.map((file, index) => <FileCard id={index} key={index} width={'90vw'}
                                                             height={'80px'}
                                                             content={<>
                                                                 <Button style={{
                                                                     display: 'flex',
                                                                     justifyContent: 'left',
                                                                     width: '100%',
                                                                     color: 'black'
                                                                 }} onClick={() => {
                                                                     handleFileClick(index)
                                                                 }}>
                                                                     <div>
                                                                         <p style={{
                                                                             margin: "0px",
                                                                             display: 'flex',
                                                                             alignContent: 'left'
                                                                         }}>name: {file.name}</p>
                                                                         <p style={{
                                                                             margin: "0px",
                                                                             display: 'flex',
                                                                             alignContent: 'left'
                                                                         }}>size: {file.size} kB</p>
                                                                         <p style={{
                                                                             margin: "0px",
                                                                             display: 'flex',
                                                                             alignContent: 'left'
                                                                         }}>uploaded: {file.uploadDate}</p>
                                                                     </div>
                                                                 </Button>
                                                                 <Button
                                                                     style={{color: "black", height: '100%'}}
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
                background: "white"
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
                    <FileSelectButton width={"90vw"} onChange={handleFileSelect}/>
                </div>
                <div id={"uploadButton"}>
                    <PrimaryButton2 content={"Upload"} width={"90vw"} onClick={handleUploadCourseNotes}/>
                </div>
            </div>
        </>
    )

    return (
        courseNotesList
    );
}