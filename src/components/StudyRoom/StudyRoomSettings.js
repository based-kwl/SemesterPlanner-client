import {useNavigate} from "react-router";
import {useCallback, useState} from "react";
import * as React from "react";
import axios from "axios";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import {RoomDataComponents} from "./CommonResources";

export default function StudyRoomSettings() {
    const navigate = useNavigate();
    const[loading,setLoading] = useState(true);
    const [roomData, setRoomData] = React.useState({
        owner:'',
        sid:'',
        title:'',
        color: '',
        avatarText:'',
        description:'',
        participants:[],
    });

    const fetchData = useCallback(( ) => {
        const sID = window.location.href.split("/")[window.location.href.split("/").length-1];
        // populate settings page for owner of page
        axios.get(`${process.env.REACT_APP_BASE_URL}room/fetch/${sID}`)
            .then(res => {
                const data = res.data;
                setRoomData(data);
            })
            .catch(err => {console.log('Error:', err)});
        setLoading(false);
     },[])

    React.useEffect(()=>{
        fetchData();
        let email = JSON.parse(localStorage.getItem("email"));
        //user needs to be logged in to access
        if(email === undefined || email === ''){
            navigate("/login");
        }
        // only an owner can access the settings page
        if(roomData.owner !== email && roomData.owner !== ''){
            navigate("/study-room-home");
        }
    },[loading])

    // sends updated field to db
    function handleUpdate(e) {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_BASE_URL}room/`,roomData)
            .catch(err => {console.log('Error:', err)});
        window.location.reload();
    }

    //deletes the room in db
    function handleDelete(e){
        axios.post(`${process.env.REACT_APP_BASE_URL}room/delete`,{email:roomData.owner, sID:roomData.sID})
            .then(() => {
                navigate("/study-room-home");
            })
            .catch(err => {console.log('Error:', err)});
    }

    const updateRoom = (
        <div style={{height:'50vh'}}>
        <React.Fragment>
            <form style={{alignItems: 'center'}} >
                <div style={{width: '85vw', height: '65vh', marginTop: '10px'}}>
                    <RoomDataComponents roomState={roomData} roomStateSetter={setRoomData}/>
                </div>
                <div>
                <Stack direction='row' spacing={7} marginTop={2}>
                <PrimaryButton2 width={'41vw'} colour={'#057D78'} content="Update" onClick={handleUpdate} />
                <PrimaryButton2 width={'41vw'} colour={'#912338'} content="Delete" onClick={handleDelete}/>
                </Stack>
                </div>
            </form>
        </React.Fragment>
        </div>
    )
    return(updateRoom);
}




