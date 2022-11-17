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


export default function FriendListHome(){
    const friends = ['bob', 'bub', 'beb', 'bab','bib'];
    const [count, setCount] = React.useState(0);

    function handleUpdate(e){
        e.preventDefault();
    }
    function handleDelete(e){
        e.preventDefault();
    }

    function friendCount(){
        setCount(friends.length);
        console.log("count: ", count);

    }
    React.useEffect(()=> {
        friendCount();
    },[])

    const friendList = (
        <React.Fragment>
            <NavDrawer/>
            <StudyRoomChatCard width='92vw' height='8vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{fontSize:'22px', fontWeight:'bold'}} ><Typography variant="1">Friends List</Typography></div>}/>
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
            bottomLeftRadius='0px' bottomRightRadius='0px' content={
                // <div style={{height:'65%',border: 'orangered solid 2px'}}>
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
                <PrimaryButton2 width={'36vw'} colour={'#912338'} content="Cancel" onClick={handleDelete}/>
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
                ><BottomDrawer icon={<Badge badgeContent={count} overlap="circular" sx={{
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