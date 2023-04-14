import {useNavigate} from "react-router";
import {useCallback} from "react";
import * as React from "react";
import axios from "axios";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import {RoomDataComponents} from "./CommonResources";
import {GetAuthentication} from "../Authentication/Authentification";


export default function StudyRoomSettings() {
    const navigate = useNavigate();
    const[loading,setLoading] = React.useState(true);
    const [isOwner, setIsOwner] = React.useState(false);
    const [roomData, setRoomData] = React.useState({
        owner:'',
        studyRoomID:'',
        title:'',
        color: '',
        avatarText:'',
        description:'',
        participants:[],
    });
    const [error, setError] = React.useState('');
    const user = GetAuthentication();

    const fetchData = useCallback(() => {
        const studyRoomID = window.location.href.split("/")[window.location.href.split("/").length - 1];
        // populate settings page for owner of page
        axios.get(`${process.env.REACT_APP_BASE_URL}room/fetch/${studyRoomID}`)
            .then(res => {
                const data = res.data;
                setRoomData(data);
                if (data.owner === user.email) { // set room settings to visible if the user is the room owner
                    setIsOwner(true);
                }
            })
            .catch(err => {
                console.log('Error:', err)
                setError(err.message);
            });
        setLoading(false);
    }, [])

    React.useEffect(()=>{
        fetchData();
    },[loading])

    // sends updated field to db
    function handleUpdate(e) {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_BASE_URL}room/`, roomData).then(() => {
            window.location.reload();
        })
            .catch(err => {
                setError(err.response.data.errors[0]);
            });
    }

    //deletes the room in db
    function handleDelete(){
        axios.delete(`${process.env.REACT_APP_BASE_URL}room`, {data: {email: roomData.owner, studyRoomID: roomData.studyRoomID}})
            .then(() => {
                navigate("/study-room-home");
            })
            .catch(err => {
                setError(err.message);
                console.log('Error:', err);
            });
    }

    const updateRoom = (
        <div style={{height: '50vh'}}>
            {isOwner ?
                (<React.Fragment>
                    <form style={{alignItems: 'center'}}>
                        <div style={{width: '85vw', height: '65vh', marginTop: '10px'}}>
                            <RoomDataComponents roomState={roomData} roomStateSetter={setRoomData}/>
                        </div>
                        <div style={{color: 'red'}}>{error}</div>
                        <div>
                            <Stack direction='row' spacing={7} marginTop={2}>
                                <PrimaryButton2 width={'41vw'} colour={'#057D78'} content="Update"
                                                onClick={handleUpdate}/>
                                <div data-test={'Delete'}>
                                <PrimaryButton2 width={'41vw'} colour={'#912338'} content="Delete"
                                                onClick={handleDelete}/>
                                </div>
                            </Stack>
                        </div>
                    </form>
                </React.Fragment>) :
                <div style={{color: 'red'}}>Room settings can only be accessed by the room owner.</div>}
        </div>
    )
    return(updateRoom);
}




