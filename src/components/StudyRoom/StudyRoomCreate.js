import * as React from "react";
import {Checkbox} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PrimaryButton} from "../CustomMUIComponents/CustomButtons";
import "./customButton.css"
import axios from "axios";
import {useNavigate} from "react-router";
import {useState} from "react";
import {RoomDataComponents, StudyRoomCard} from "./CommonResources";
import {GetAuthentication} from "../Authentication/Authentification";

export default function RoomCreation() {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([])
    const [checked, setChecked] = React.useState([]);
    const [roomData, setRoomData] = React.useState({
        title:'',
        owner:'',
        color: '',
        avatarText:'',
        description:'',
        participants:[],
        createdAt:''
    });
    const user = GetAuthentication();

    React.useEffect(()=> {
        setRoomData({...roomData, owner: user.email})
        fetchData();
        },[])
    // API call to get the list of friends for the logged-in user
    function fetchData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/${user.email}`)
            .then(res => {
                setFriends( res.data);
                console.log(res.data)
            })
    }
    const handleCheck =(e) =>{
        let updatedList = [...checked];
        if(e.target.checked){
            updatedList = [...checked, e.target.value];
        }else{
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
        setRoomData({...roomData, participants:updatedList});
    }

    const handleRoomCreation = (e) =>{
        e.preventDefault();
        //add the owner to the list
        roomData.participants.push(roomData.owner);

        //API call the post study room info to create a new room
        axios.post(`${process.env.REACT_APP_BASE_URL}room/`,roomData)
            .then(() => {
                navigate("/study-room-home");
            })
            .catch(err => {console.log('Error:', err)});
        window.location.reload();
    }

    const createRoom = (
        <React.Fragment>
            <form style={{alignItems: 'center'}} onSubmit={handleRoomCreation}>
                <RoomDataComponents roomState={roomData} roomStateSetter={setRoomData} />
                <div style={{width: '90vw', height: '35vh', marginTop: '10px'}}>
                    <Typography style={{fontWeight: 'bold'}}>
                        Select group members:
                    </Typography>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center', overflow:'auto', height:'30vh', border:'3px solid rgba(0, 0, 0, 0.05'}}>
                        {friends.map((friend,index) => (
                            <div key={index} style={{ margin:'-5px'}}>
                                <StudyRoomCard width={'81vw'} height={'40px'}
                                                 content={<> {friend}
                                                     <Checkbox
                                                         value={friend}
                                                         onChange={handleCheck}
                                                         inputProps={{'aria-label': 'controlled'}}
                                                         style={{color: '#057D78'}}
                                                     />
                                                 </>}/>
                            </div>
                        ))}
                    </div>
                </div>
                <PrimaryButton width={'90vw'} content="Create" />
            </form>
        </React.Fragment>
    )
    return(createRoom)
}