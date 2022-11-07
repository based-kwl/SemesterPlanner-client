import * as React from 'react';
import {useEffect, useMemo, useState} from "react";
import {ParticipantCard} from "./StudyRoomCards";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons"
import axios from "axios";


export default function ParticipantsList() {
    const studyRoomID = window.location.href.split("/")[window.location.href.split("/").length - 1];

    const [participants, setParticipants] = useState([])

    const [errorMessage, setErrorMessage] = useState('')

    const [availableFriends, setAvailableFriends] = useState([])

    const [owner, setOwner] = useState('');

    function handleDelete(index) {
        const emailToRemove = participants[index];
        axios.post(`${process.env.REACT_APP_BASE_URL}room/remove`, {email:emailToRemove, sID:studyRoomID})
            .then(res => {
                setParticipants(res.data.participants);
                getParticipants();
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
    }

    function handleAdd(index) {
        const emailToAdd = availableFriends[index];
        axios.post(`${process.env.REACT_APP_BASE_URL}room/add`, {email:emailToAdd, sID:studyRoomID})
            .then(res => {
                setParticipants(res.data.participants);
                getParticipants();
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
    }

    function handleSave() {
        document.elementFromPoint(0,0).click();
    }

    function getParticipants(){
        axios.get(`${process.env.REACT_APP_BASE_URL}room/fetch/${studyRoomID}`)
            .then(res => {
                const newOwner = res.data.owner;
                setOwner(newOwner);
                const newParticipants = [owner != '' ? owner.toString() : [], res.data.participants ? res.data.participants.filter((participant) => participant != owner.toString()) : []].flat();
                setParticipants(newParticipants)
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
    }

    useMemo(getParticipants,[])

    //TODO: check if this can be run ONLY after participants get request is fully completed (currently can see participants in availableFriends for a split second)
    useMemo(() => {
        let email = JSON.parse(localStorage.getItem("email"));
        axios.get(`${process.env.REACT_APP_BASE_URL}student/email/${email}`)
            .then(res => {
                let newAvailableFriends = (participants ? res.data.friends.filter((email) => !participants.includes(email)) : res.data.friends);
                setAvailableFriends(newAvailableFriends);
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) == 401 ? 'request could not be sent' : `${err}`)});
    }, [participants])

    const participantsList = (
        <>
            <div style={{width:'90vw'}}>
                <div><h4>Current Participants:</h4></div>
                <div style={{overflow:"auto", maxHeight:"26vh"}}>
                    {participants ? participants.map((participant, index) => <ParticipantCard id={index} key={index} width={'90vw'}
                                                                               height={'40px'}
                                                                               content={<>{participant}{participant != owner ? <Button
                                                                                   variant="text"
                                                                                   sx={{borderColor: "none"}}
                                                                                   onClick={() => handleDelete(index)}><ClearIcon
                                                                                   style={{color: '#912338'}}/></Button> : <></>}</>}/>) : <></>}
                </div>
                <div><h4>Friends:</h4></div>
                <div style={{overflow:"auto", maxHeight:"26vh"}}>
                    {availableFriends ? availableFriends.map((availableFriend, index) => <ParticipantCard id={index} key={index}
                                                                                       width={'90vw'}
                                                                                       height={'40px'}
                                                                                       content={<>{availableFriend}<Button
                                                                                           variant="text"
                                                                                           sx={{borderColor: "none"}}
                                                                                           onClick={() => handleAdd(index)}><AddIcon
                                                                                           style={{color: '#057D78'}}/></Button></>}/>) : <></>}
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