import NavDrawer from "../NavDrawer/navDrawer";
import {BackgroundCard, StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import * as React from "react";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import Typography from "@mui/material/Typography";
import FriendSearch from "./FriendSearch";
import Badge from '@mui/material/Badge';
import axios from "axios";
import {useCallback, useState} from "react";
import FriendNotification from "./FriendsNotification";
import GroupIcon from '@mui/icons-material/Group';
import GetAuthentication from "../Authentication/Authentification";


export default function FriendListHome(){
    const [loading,setLoading] = useState(true);
    const [friends, setFriends] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const email = GetAuthentication().email;


    // sends the updated friend list to database
    function handleUpdate(){
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/updateFriendList`,{email:email, friends: friends})
            .then(() => setFriends((prevState) => {
                // keep only friends that are in the updated friends array
                prevState.filter((friend) => friends.some((el) => el === friend))
            }))
    }

    function handleCancel(){
         getFriends();
    }

    function handleDelete(index){
        const updatedList = friends.filter((_, i) => i !== index);
        setFriends(updatedList);
    }

    React.useEffect(()=> {
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/incoming-requests/${email}`)
            .then(res => {
                let count = res.data.length;
                if (count > 0){
                    setVisible(true);
                }
            })
            .catch(err => {console.log('Error',err);})
            getFriends();
    },[loading, visible])

    //API call to get Friend list
    const getFriends = useCallback( ( ) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/${email}`)
            .then(res => {
                setFriends(res.data);
            })
            .catch(err => {console.log('Error',err);})
        setLoading(false);
    },[loading])

    const friendList = (
        <React.Fragment>
            <NavDrawer/>
            <StudyRoomChatCard width='92vw' height='8vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{fontSize:'22px', fontWeight:'bold'}} ><Typography variant="1">Friends List</Typography></div>}/>
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
            bottomLeftRadius='0px' bottomRightRadius='0px' content={
                    <div style={{overflow: 'auto', height: '60vh'}}>
                        {friends && friends.map((friend, index) => (
                            <div key={index}>
                                <StudyRoomCard data-test={`${friend}`} width={'81vw'} height={'40px'}
                                               content={<> {friend}
                                                   <Button
                                                       data-test={`delete-friend-${friend}`}
                                                       variant="text"
                                                       onClick={() => handleDelete(index)}><ClearIcon
                                                       style={{color: '#912338'}}/>
                                                   </Button>
                                               </>}/>
                            </div>
                        ))}
                    </div>
            }/>

            {/*confirmation buttons*/}
            <StudyRoomChatCard width='92vw' height='8vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<Stack   direction="row"
                                                                                                justifyContent="center"
                                                                                                alignItems="center"
                                                                                                spacing={2}
                                                                                                width='100%'>

                <PrimaryButton2 data_test="apply-changes" width={'36vw'} colour={'#057D78'} content="Confirm changes" onClick={handleUpdate} />
                <PrimaryButton2 width={'36vw'} colour={'#912338'} content="Cancel changes" onClick={handleCancel}/>
            </Stack>}/>
            {/*bottom drawer components*/}
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>
                <StudyRoomChatCard width='46vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<PersonSearchIcon data-test="search"  style={{color: '#912338', height: '5vh', width: '5vh'}}/>}
                               title={'Search'} content={<FriendSearch/>}/></div>}/>
                <StudyRoomChatCard width='46vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<Badge data-test="friendRequestsLink"  variant="dot" overlap="circular" invisible={!visible} sx={{
                    "& .MuiBadge-badge": {
                        border: `3px solid black`,
                        color: "white",
                        backgroundColor: "#000000"
                    },
                    ".MuiBadge-dot":{
                        height: 15,
                        minWidth: 15,
                        borderRadius: 10

                    }
                }} >
                    <GroupIcon style={{color: '#912338', height: '5vh', width: '5vh'}}/>
                </Badge>
                }
                               title={'Requests Notification'} content={<FriendNotification/>}/></div>}/>
            </div>

            </React.Fragment>
    )
    return(<BackgroundCard width='96vw' height='99vh' content={friendList}/>)

}