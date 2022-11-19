import NavDrawer from "../NavDrawer/navDrawer";
import {BackgroundCard, StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import * as React from "react";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import Typography from "@mui/material/Typography";
import FriendSearch from "./FriendSearch";
import Badge from '@mui/material/Badge';
import FriendNotification from "./FriendsNotification";
import axios from "axios";
import {useNavigate} from "react-router";
import {useCallback, useState} from "react";
import RemoveIcon from '@mui/icons-material/Remove';

const email = JSON.parse(localStorage.getItem("email"));

export default function FriendListHome(){
    const navigate = useNavigate();
    const[loading,setLoading] = useState(true);
    const [count, setCount] = React.useState(0);
    const [friends, setFriends] = React.useState([]);
    const [deletedFriends, setDeletedFriends] = React.useState([]);
    const [removed, setRemoved] = React.useState(false);


    // sends the updated friend list to database
    function handleUpdate(){
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/updateFriendList`,{email:email, friends: friends})
            .then(() => {
                console.log(friends);
                console.log('info sent');
            })
            .catch(err => {console.log('Error:', err)});
        window.location.reload();
    }

    function handleCancel(){
        console.log("in cancel");
        setRemoved(false);
        console.log(removed);
         getFriends();
    }

    function handleDelete(index){
        console.log("in delete");
        console.log('initial state friend:', friends);
        const updatedList = friends.filter((_, i) => i !== index);
        console.log(updatedList);
        setFriends(updatedList);
        console.log('friend array', friends);
    }

    function friendCount(){
        setCount(friends.length);
        console.log("count: ", count);
    }

    React.useEffect(()=> {
        //user needs to be logged in to access
        if (email === undefined || email === '') {
            navigate("/login");
        }
            getFriends();
            friendCount();
            console.log("count:", count);
            console.log('deleted array initial:', deletedFriends);

        // console.log('in use effect: initial state deleted:', deletedFriends);

    },[loading])

    //API call to get Friend list
    //todo:takes a while before the data populates
    const getFriends = useCallback( ( ) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/${email}`)
            .then(res => {
                console.log(res.data);
                setFriends(res.data);
                console.log('friends:', friends);
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
                        {friends.map((friend, index) => (
                            <div key={index}>
                                <StudyRoomCard width={'81vw'} height={'40px'}
                                               content={<> {friend}
                                                   <Button
                                                       variant="text"
                                                       onClick={() => handleDelete(index)}><ClearIcon
                                                       style={{color: '#912338'}}/>
                                                   </Button>
                                               </>}/>
                            </div>
                        ))}
                        {/*{deletedFriends.map((friend, index) => (*/}
                        {/*    <div key={index}>*/}
                        {/*{removed ?*/}
                        {/*    <StudyRoomCard width={'81vw'} height={'40px'} backgroundColor={'#E9D3D7'}*/}
                        {/*                   content={<> <p*/}
                        {/*                       style={{color: '#912338', fontStyle: 'italic'}}> {friend} </p>*/}
                        {/*                       <Button*/}
                        {/*                           disabled={true}*/}
                        {/*                           variant="text"*/}
                        {/*                       ><RemoveIcon*/}
                        {/*                           style={{color: '#912338'}}/>*/}
                        {/*                       </Button>*/}
                        {/*                   </>}/>*/}
                        {/*    : <></>*/}

                        {/*}*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                // </div>
            }/>

            {/*confirmation buttons*/}
            <StudyRoomChatCard width='92vw' height='8vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<Stack   direction="row"
                                                                                                justifyContent="center"
                                                                                                alignItems="center"
                                                                                                spacing={2}
                                                                                                width='100%'>

                <PrimaryButton2 width={'36vw'} colour={'#057D78'} content="Confirm" onClick={handleUpdate} />
                <PrimaryButton2 width={'36vw'} colour={'#912338'} content="Cancel" onClick={handleCancel}/>
            </Stack>}/>
            {/*bottom drawer components*/}
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>
                <StudyRoomChatCard width='46vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<PersonSearchIcon style={{color: '#912338', height: '5vh', width: '5vh'}}/>}
                               title={'Search'} content={<FriendSearch/>}/></div>}/>
                <StudyRoomChatCard width='46vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<Badge badgeContent={0}  showZero   overlap="circular" sx={{
                    "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "#000000"
                    }
                }} > <MarkEmailUnreadIcon style={{color: '#912338', height: '4vh', width: '4vh'}}/></Badge>}
                               title={'Requests Notification'} content={<FriendNotification/>}/></div>}/>
            </div>
            </React.Fragment>
    )
    return(<BackgroundCard width='96vw' height='99vh' content={friendList}/>)

}