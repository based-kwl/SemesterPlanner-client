import * as React from 'react';
import {useEffect, useMemo, useRef, useState} from "react";
import {FileCard} from "./StudyRoomCards";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import {PrimaryButton2, FileSelectButton} from "../CustomMUIComponents/CustomButtons"
import axios from "axios";
import {Buffer} from 'buffer'

// // @ts-ignore
// window.Buffer = Buffer;

export default function ParticipantsList() {
    // const studyRoomID = window.location.href.split("/")[window.location.href.split("/").length - 1]; // TODO: uncomment after merging to sp-47
    const studyRoomID = '92rl1sf1l1'

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

    function getCourseNotes(){
        // axios.get(`${process.env.REACT_APP_BASE_URL}room/fetch/${studyRoomID}`) //TODO: uncomment after merging to sp-47 branch
        axios.get(`http://localhost:5000/room/fetch/${studyRoomID}`)
            .then(res => {
                // const newOwner = res.data.owner;
                // setOwner(newOwner);
                // const newParticipants = [owner != '' ? owner.toString() : [], res.data.participants ? res.data.participants.filter((participant) => participant != owner.toString()) : []].flat();
                // setParticipants(newParticipants)
                console.log(res.data);
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
    }
    useMemo(() => {
        getCourseNotes();
    }, null)

    const [errorMessage, setErrorMessage] = useState('')

    function handleDeleteCourseNotes(index) {
        let newFileList = fileList.filter((file) => {
            return file !== fileList[index];
        })
        setFileList(newFileList);
    }

    // TODO: when backend is implemented, update database with uploaded file
    async function handleUploadCourseNotes() {
        if (isFilePicked && selectedFile.type === "text/plain") {
            let bufferedFile = null;
            const reader = new FileReader();

            reader.readAsText(selectedFile);

            reader.onloadend = (event) => {
                bufferedFile = Buffer.from(event.target.result, "utf-8");
                console.log(bufferedFile.toString())

                axios.post('http://localhost:5000/room/file', {
                    sID: studyRoomID,
                    type: selectedFile.type,
                    email: JSON.parse(localStorage.getItem("email")),
                    file: bufferedFile
                })
                    .then(res => {
                        console.log(res);
                        setErrorMessage('');
                    })
                    .catch(err => {
                        console.log(`Error: ${err}`);
                        setErrorMessage(`${err}`.substring(44) === (401).toString() ? 'request could not be sent' : `${err}`)
                    });
            }
        } else if (!isFilePicked) {
            setErrorMessage("No file selected!")
        } else if (selectedFile.type !== "text/plain") {
            setErrorMessage("Only text files are supported!")
        }
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
        axios.get(`http://localhost:5000/room/file/${studyRoomID}&bz1gg`)
            .then(res => {
                const bufferedFile = Buffer.from(res.data[0].file.data.data, "base64");

                // file object
                const file = new Blob([bufferedFile], {type: 'text/plain'});

                // anchor link
                const element = document.createElement("a");
                element.href = URL.createObjectURL(file);
                element.download = "bz1gg" + Date.now() + ".txt";
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();

            })
            .catch(err => {
                console.log(`Error: ${err}`);
                setErrorMessage(`${err}`.substring(44) === (401).toString() ? 'request could not be sent' : `${err}`)
            });
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
                <div style={{color: 'red'}}>{errorMessage}</div>
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