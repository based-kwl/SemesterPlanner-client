import * as React from 'react';
import {useState} from "react";
import {ParticipantCard} from "./StudyRoomCards";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons"


export default function ParticipantsList() {
    const [participants, setParticipants] = useState([
        "person1",
        "person2",
        "person3"
    ])

    const [availableFriends, setAvailableFriends] = useState([
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

    function handleDelete(index) {
        let newAvailableFriends = [participants[index], ...availableFriends];
        setAvailableFriends(newAvailableFriends);

        let newParticipants = participants.filter((participant) => {
            return participant !== participants[index];
        })
        setParticipants(newParticipants);
    }

    function handleAdd(index) {
        let newParticipants = [...participants, availableFriends[index]];
        setParticipants(newParticipants);

        let newAvailableFriends = availableFriends.filter((availableFriend) => {
            return availableFriend !== availableFriends[index];
        })
        setAvailableFriends(newAvailableFriends);
    }

    // TODO: when backend is implemented, update database with participants of the study room using the respective endpoint
    function handleSave() {
        console.log(participants); // remove this line after connecting to backend
        console.log(availableFriends); // remove this line after connecting to backend
    }

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
                <PrimaryButton2 content={"Save"} width={"90vw"} onClick={handleSave}/>
            </div>
        </>
    )

    return (
        participantsList
    );
}