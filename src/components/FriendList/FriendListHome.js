import NavDrawer from "../NavDrawer/navDrawer";
import {BackgroundCard, CustomWhiteCard, StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import * as React from "react";
import {Stack} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

export default function FriendListHome(){

    function handleUpdate(e){
        e.preventDefault();
    }
    function handleDelete(e){
        e.preventDefault();
    }

    const friendList = (
        <React.Fragment>
            <NavDrawer/>
            <form style={{alignItems:'center'}}>
                <div style={{height: '65vh', marginTop: '70px',border:'deeppink solid 2px', marginLeft: '1.8vw', marginRight: '1.8vw'}}>
friends list
                </div>
            <div style={{marginLeft: '1.8vw', marginRight: '1.8vw',height:'10vh', border:'black solid 2px'}}>
                <Stack direction='row' spacing={2} marginTop={2} justifyContent="center">
                    <PrimaryButton2 width={'45vw'} colour={'#057D78'} content="Confirm" onClick={handleUpdate} />
                    <PrimaryButton2 width={'45vw'} colour={'#912338'} content="Cancel" onClick={handleDelete}/>
                </Stack>
            </div>
            </form>
            <div style={{ marginTop:'10px', height:'12vh', border:'blue solid 2px', display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>
                <StudyRoomChatCard width='45.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<PersonSearchIcon style={{color: '#912338', height: '6vh', width: '6vh'}}/>}
                               title={'Search'} content={"Search"}/></div>}/>
                <StudyRoomChatCard width='45.5vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<MarkEmailUnreadIcon style={{color: '#912338', height: '6vh', width: '6vh'}}/>}
                               title={'Requests Notification'} content={"Notifications"}/></div>}/>
            </div>
            </React.Fragment>
    )
    return(<BackgroundCard width='96vw' height='99vh' content={friendList}/>)

}