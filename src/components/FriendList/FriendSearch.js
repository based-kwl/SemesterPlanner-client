import * as React from "react";
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {StudyRoomCard} from "../StudyRoom/CommonResources";
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import {useNavigate} from "react-router";

const ownerEmail = JSON.parse(localStorage.getItem("email"));
const ownerUsername = JSON.parse(localStorage.getItem("username"));

export default function FriendSearch() {
    const [added, setAdded] = React.useState(false);
    const [found, setFound] = React.useState(false);
    const [searchName, setSearchName] = React.useState(null);
    const [friend, setFriend] = React.useState('');
    const [list, setList] = React.useState('');
    const [text, setText] = React.useState('no one found');
    const navigate = useNavigate();

    React.useEffect(() => {
        //user needs to be logged in to access
        if (ownerEmail === undefined || ownerEmail === '') {
            navigate("/login");
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/${ownerEmail}`)
            .then(res => {
                setList(res.data);
            })
            .catch(err => {
                console.log('Error', err);
            })

    }, [text])

    //send a friend request
    function handleAdd(e) {
        e.preventDefault();
        setAdded(true);
        axios.post(`${process.env.REACT_APP_BASE_URL}friend/add`, {senderEmail: ownerEmail, receiverEmail: friend})
            .then(() => {
                console.log('sent');
            })
            .catch(err => {
                console.log('Error:', err)
            });
        window.location.reload();
    }

    function handleSearch(e) {
        e.preventDefault();
        let data = null;
        // can't search the owner
        if (searchName === ownerEmail || searchName === ownerUsername) {
            setText("this is the owner");
        } else {
            console.log('data', data);
            //check to see if the searchNAme is a username
            axios.get(`${process.env.REACT_APP_BASE_URL}student/username/${searchName}`)
                .then(res => {
                    data = res.data;
                    if (data != null) {
                        console.log("username");
                        //make sure they are not friends
                        const isInFriends = list.indexOf(res.data.email) > -1;
                        if (isInFriends) {
                            setText("already a friend");
                            console.log('is already a friend:', isInFriends);
                        } else {
                            setFriend(res.data.email);
                            setFound(true);
                        }
                    }
                })
                .catch(err => {
                    console.log('Error', err);
                })
            if (data == null) {
                //check to see if the searchNAme is an email
                axios.get(`${process.env.REACT_APP_BASE_URL}student/email/${searchName}`)
                    .then(res => {
                        let data = res.data;
                        if (data != null) {
                            const isInFriends = list.indexOf(res.data.email) > -1;
                            //make sure they are not friends
                            if (isInFriends) {
                                setText("already a friend");
                                console.log('is already a friend:', isInFriends);
                            } else {
                                setFriend(res.data.email);
                                setFound(true);
                            }
                        }
                    })
                    .catch(err => {
                        console.log('Error', err);
                    })
            }
                setText("no one found");

        }
    }

    const friendSearch = (
        <React.Fragment>
            <Typography variant="body1" style={{marginTop: '20px', marginBottom: '10px'}}> Find other students by
                username or email</Typography>
            <form style={{alignItems:'center'}} onSubmit={handleSearch}>
                <TextField
                    fullWidth
                    id='search'
                    label='Search...'
                    variant='outlined'
                    onChange={(e) => {
                        setSearchName(e.target.value);
                        setText('')
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position='end'><Button type="submit"
                                                   style={{color: '#912338'}}><SearchIcon/></Button></InputAdornment>
                    }}
                />
            </form>
            {found ?
                <div style={{width: '90vw', height: '45vh'}}>
                    <Typography variant="body1" style={{marginTop: '40px', marginBottom: '20px'}}>A student was found.
                        Do you
                        want to add them?</Typography>
                    {added ?
                        <StudyRoomCard
                            width={'90vw'}
                            height={'40px'}
                            backgroundColor={'#DFECCF'}
                            content={<> <p style={{color: '#057D78', fontStyle: 'italic'}}> friend request was sent
                                to {searchName}</p><Button
                                disabled={true}
                                variant="text"
                                sx={{borderColor: "none"}}
                            ><CheckIcon
                                style={{color: '#057D78'}}/></Button></>}/> :
                        <StudyRoomCard
                            width={'90vw'}
                            height={'40px'}
                            content={<>{searchName}<Button onClick={handleAdd}
                                                           variant="text"
                                                           sx={{borderColor: "none"}}
                            ><AddIcon
                                style={{color: '#057D78'}}/></Button></>}/>}

                </div>
                : <div style={{marginTop: '30px', width: '90vw'}}>{text}</div>}
        </React.Fragment>
    )
    return (friendSearch)
}