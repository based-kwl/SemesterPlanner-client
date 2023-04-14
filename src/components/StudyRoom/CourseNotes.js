import * as React from 'react';
import {useEffect, useMemo, useRef, useState} from "react";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import {PrimaryButton2, FileSelectButton} from "../CustomMUIComponents/CustomButtons"
import axios from "axios";
import {Buffer} from 'buffer'
import {StudyRoomCard} from "./CommonResources";

export default function CourseNotes() {
    const studyRoomID = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const [fileList, setFileList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const fileListTop = useRef(null);

    function handleErrorMessage(err){
        setErrorMessage(`${err}`.substring(44) === (401).toString() ? 'request could not be sent' : `${err}`)
    }

    function getCourseNotes(){
        axios.get(`${process.env.REACT_APP_BASE_URL}room/files/${studyRoomID}`)
            .then(res => {
                setErrorMessage(null);

                res.data.forEach((item) => {
                    item.inProgress = false;
                })

                setFileList(res.data.reverse());
            })
            .catch(err => {
                setErrorMessage(`${err}`.substring(44) === (401).toString() ? 'Request could not be sent' : `${err.response.data}`)
            });
    }

    function handleDeleteCourseNotes(index) {
        axios.delete(`${process.env.REACT_APP_BASE_URL}room/file/${fileList[index].courseNotesID}`)
            .then(() => {
                setErrorMessage(null);

                getCourseNotes();
            })
            .catch(err => {
                setErrorMessage(`${err}`.substring(44) === (401).toString() ? 'Request could not be sent' : `${err.response.data}`)
            });
        getCourseNotes();
    }

    async function handleUploadCourseNotes() {
        if (isFilePicked) {
            setUploadInProgress(true);
            let formData = new FormData();
            formData.append('studyRoomID', studyRoomID);
            formData.append('email', JSON.parse(localStorage.getItem("email")));
            formData.append('file', selectedFile);

            axios.post(`${process.env.REACT_APP_BASE_URL}room/file`, formData)
                .then(() => {
                    setErrorMessage(null);
                    getCourseNotes();
                    setSelectedFile(null);
                    setIsFilePicked(false);
                })
                .catch(err => {
                    setErrorMessage(`${err}`.substring(44) === (401).toString() ? 'Request could not be sent' : `${err.response.data.message}`);
                })
                .finally(() => {
                    setUploadInProgress(false);
                });
        } else if (!isFilePicked)
            setErrorMessage("No file selected!");
    }

    const handleFileSelect = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            setErrorMessage(null);
        } else {
            setSelectedFile(null);
            setIsFilePicked(false);
        }
    };

    function handleFileClick(index) {
        axios.get(`${process.env.REACT_APP_BASE_URL}room/file/${fileList[index].courseNotesID}`)
            .then(res => {
                setErrorMessage(null);

                const bufferedFile = Buffer.from(res.data.bufferedFile.data, "base64");

                // file object
                const file = new Blob([bufferedFile], {type: res.data.filetype});

                // anchor link
                const element = document.createElement("a");
                element.href = URL.createObjectURL(file);
                element.download = fileList[index].filename;
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
            })
            .catch(err => {
                setErrorMessage(`${err}`.substring(44) === (401).toString() ? 'Request could not be sent' : `${err.response.data}`)
            })
            .finally(() => {
                toggleProgress(index);
            });
    }

    const toggleProgress = (index) => {
        const tempFileList = [...fileList]
        tempFileList[index].inProgress = !tempFileList[index].inProgress;
        setFileList(tempFileList);
    }

    useEffect(() => {
        fileListTop.current?.scrollIntoView({behavior: 'smooth'})
    }, [fileList])

    useMemo(() => {
        getCourseNotes();
    }, [])

    const courseNotesList = (
        <>
            <div style={{width: '90vw'}}>
                <div style={{overflow: "auto", maxHeight: `${isFilePicked ? "43vh" : "60vh"}`}}>
                    <div ref={fileListTop}/>
                    {fileList.map((file, index) => <StudyRoomCard id={index} key={file._id} width={'90vw'}
                                                             height={'80px'}
                                                             content={<>
                                                                 <Button data-test={`${file.filename}`} style={{
                                                                     display: 'flex',
                                                                     justifyContent: 'left',
                                                                     width: '100%',
                                                                     color: 'black'
                                                                 }} onClick={() => {
                                                                     toggleProgress(index);
                                                                     handleFileClick(index);
                                                                 }}>
                                                                     <div>
                                                                         <p style={{
                                                                             margin: "0px",
                                                                             display: 'flex',
                                                                             alignContent: 'left'
                                                                         }}>name: {file.filename}</p>
                                                                         <p style={{
                                                                             margin: "0px",
                                                                             display: 'flex',
                                                                             alignContent: 'left'
                                                                         }}>size: {parseFloat(file.filesize).toFixed(1).toString()} KB</p>
                                                                         <p style={{
                                                                             margin: "0px",
                                                                             display: 'flex',
                                                                             alignContent: 'left'
                                                                         }}>uploaded: {file.createdAt.split("T")[0]}</p>
                                                                     </div>
                                                                 </Button>
                                                                 <Button
                                                                     data-test={`Delete-${file.filename}`}
                                                                     disabled={file.inProgress}
                                                                     style={{color: "black", height: '100%'}}
                                                                     onClick={() => {
                                                                         handleDeleteCourseNotes(index);
                                                                     }}>{file.inProgress ? <CircularProgress size={25} /> : <ClearIcon
                                                                     style={{color: '#912338'}}/>}</Button></>}/>)}
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
                        <p>Size: {selectedFile.size} KB</p>
                        <p>
                            Last Modified: {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : null}
                <div style={{color: 'red'}}>{errorMessage}</div>

                <div style={{marginBottom: '10px'}}>
                    <FileSelectButton width={"90vw"} disabled={uploadInProgress} onChange={handleFileSelect} name={'Select File'}/>
                </div>
                {/*<div style={{color: 'red'}}>{errorMessage}</div>*/}
                <div id={"uploadButton"}>
                    <PrimaryButton2 content={"Upload"} colour={'#912338'} width={"90vw"} disable={uploadInProgress}
                                    onClick={handleUploadCourseNotes}/>
                </div>
                <div style={{marginTop: '10px'}}>
                    {uploadInProgress ? <LinearProgress /> : <div style={{height: '4px'}}></div>}
                </div>
            </div>
        </>
    )

    return (
        courseNotesList
    );
}