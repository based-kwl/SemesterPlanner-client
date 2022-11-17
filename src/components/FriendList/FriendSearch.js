import * as React from "react";
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import CheckIcon from '@mui/icons-material/Check';

export default function FriendSearch(){
    const [added, setAdded] = React.useState(false);
    const friends = ['bob', 'bub', 'beb', 'bab','bib'];
    console.log("added before click",added);

    function handleAdd(){
        console.log("im in handle add");
        setAdded(true);
        console.log("added:", added);
    }



    const friendSearch = (
        <React.Fragment>
            <Typography variant="h5" style={{marginTop:'20px', marginBottom:'10px'}}> Find other students by username or email</Typography>
            <TextField
                fullWidth
                id='search'
                label='Search...'
                variant='outlined'
                InputProps={{
                    endAdornment:<InputAdornment
                        position='end'><SearchIcon/></InputAdornment>
                }}
            />
            <Typography variant="h5" style={{marginTop:'40px', marginBottom:'40px'}}>A student was found. Do you want to add them?</Typography>
            {added ?
                <StudyRoomCard
                    width={'90vw'}
                    height={'40px'}
                    backgroundColor={'#DFECCF'}
                    content={<> <p style={{color:'#057D78', fontStyle:'italic'}}> friend request was sent to {friends[0]}</p><Button
                        disabled={true}
                        variant="text"
                        sx={{borderColor: "none"}}
                    ><CheckIcon
                        style={{color: '#057D78'}}/></Button></>}/> :
                <StudyRoomCard
                width={'90vw'}
                height={'40px'}

                content={<>{friends[0]}<Button onClick={handleAdd}
                variant="text"
                sx={{borderColor: "none"}}
                ><AddIcon
                style={{color: '#057D78'}}/></Button></>}/>}
        </React.Fragment>
    )
    return(friendSearch)
}