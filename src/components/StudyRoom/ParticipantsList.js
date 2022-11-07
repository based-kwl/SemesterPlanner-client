import * as React from 'react';
import {useEffect, useMemo, useState} from "react";
import {ParticipantCard} from "./StudyRoomCards";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons"
import axios from "axios";


export default function ParticipantsList() {
    const studyRoomID = window.location.href.split("/")[window.location.href.split("/").length - 1]

    const [participants, setParticipants] = useState([])

    const [errorMessage, setErrorMessage] = useState('')

    const [availableFriends, setAvailableFriends] = useState([])

    function handleDelete(index) {
        // let newAvailableFriends = [participants[index], ...availableFriends];
        // setAvailableFriends(newAvailableFriends);
        //
        // let newParticipants = participants.filter((participant) => {
        //     return participant !== participants[index];
        // })
        // setParticipants(newParticipants);

        // TODO: uncomment below code when delete friend route is implemented in backend
        // axios.post(`http://localhost:5000/room/delete`, {email:availableFriends[index], sID:studyRoomID})
        //     .then(res => {
        //         setParticipants(res.data.participants)
        //     })
        //     .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
        // getParticipants();
    }

    function handleAdd(index) {
        // let newParticipants = [...participants, availableFriends[index]];
        // setParticipants(newParticipants);
        //
        // let newAvailableFriends = availableFriends.filter((availableFriend) => {
        //     return availableFriend !== availableFriends[index];
        // })
        // setAvailableFriends(newAvailableFriends);

        // TODO: uncomment below code when add friend route is fixed in backend
        // axios.post(`http://localhost:5000/room/add`, {email:availableFriends[index], sID:studyRoomID})
        //     .then(res => {
        //         setParticipants(res.data.participants)
        //     })
        //     .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
        // getParticipants();
    }

    // TODO: when backend is implemented, update database with participants of the study room using the respective endpoint
    function handleSave() {
        console.log(participants); // remove this line after connecting to backend
        console.log(availableFriends); // remove this line after connecting to backend
        document.elementFromPoint(0,0).click();
    }

    function getParticipants(){
        axios.get(`http://localhost:5000/room/fetch/${studyRoomID}`)
            .then(res => {
                setParticipants(res.data.participants)
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
    }

    useMemo(getParticipants,[])

    //TODO: check if this can be run ONLY after participants get request is fully completed (currently can see participants in availableFriends for a split second)
    useMemo(() => {
        axios.get(`http://localhost:5000/student/email/user_3v5bi5s61v@gmail.com`) //TODO: change user email to local storage email
            .then(res => {
                let newAvailableFriends = res.data.friends.filter((email) => !participants.includes(email));
                setAvailableFriends(newAvailableFriends);
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
    }, [participants])

    const participantsList = (
        <>
            <div>
                <div><h4>Current Participants:</h4></div>
                <div style={{overflow:"auto", maxHeight:"26vh"}}>
                    {participants.map((participant, index) => <ParticipantCard id={index} key={index} width={'90vw'}
                                                                               height={'40px'}
                                                                               content={<>{participant}<Button
                                                                                   variant="text"
                                                                                   sx={{borderColor: "none"}}
                                                                                   onClick={() => handleDelete(index)}><ClearIcon
                                                                                   style={{color: '#912338'}}/></Button></>}/>)}
                </div>
                <div><h4>Friends:</h4></div>
                <div style={{overflow:"auto", maxHeight:"26vh"}}>
                    {availableFriends.map((availableFriend, index) => <ParticipantCard id={index} key={index}
                                                                                       width={'90vw'}
                                                                                       height={'40px'}
                                                                                       content={<>{availableFriend}<Button
                                                                                           variant="text"
                                                                                           sx={{borderColor: "none"}}
                                                                                           onClick={() => handleAdd(index)}><AddIcon
                                                                                           style={{color: '#057D78'}}/></Button></>}/>)}
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                position: "fixed",
                bottom: "30px",
            }}>
                <PrimaryButton2 content={"Done"} width={"90vw"} onClick={handleSave}/>
            </div>
        </>
    )

    return (
        participantsList
    );
}