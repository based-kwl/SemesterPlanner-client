import * as React from "react";
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {StudyRoomCard} from "../StudyRoom/CommonResources";

export default function FriendSearch(){

    const friends = ['bob', 'bub', 'beb', 'bab','bib'];
    function handleAdd(){

    }
    const friendSearch = (
        <React.Fragment>
            <Typography style={{marginBottom:'10px'}}> Find other students by username or email</Typography>
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
            <Typography>A student was found. Do you want to add them?</Typography>
            <StudyRoomCard
            width={'90vw'}
            height={'40px'}
            content={<>{friends[0]}<Button
            variant="text"
            sx={{borderColor: "none"}}
            onClick={() => handleAdd()}><AddIcon
            style={{color: '#057D78'}}/></Button></>}/>
        </React.Fragment>
    )
    return(friendSearch)
}