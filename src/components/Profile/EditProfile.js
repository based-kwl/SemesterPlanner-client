/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {InputAdornment, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {PrimaryButton2, SelectButton} from "../CustomMUIComponents/CustomButtons";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MockUser from "./Mocks/mockUser.json";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {BackgroundCard, CustomWhiteCard} from "../CustomMUIComponents/CustomCards";
import {faculties, programs} from "../Authentication/SignUp";
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import {useCallback, useEffect} from "react";


export default function EditProfile() {

    const [userData, setUserData] = React.useState({
        username: '',
        email: '',
        password: '',
        faculty: 'Art & Science',
        program: 'Actuarial Mathematics',
        privateProfile: true
    });

    const user = MockUser[0];
    const userEmail = JSON.parse(localStorage.getItem("email"));
    const [registrationError, setRegistrationError] = React.useState({
        message: "Error, please try again later",
        hasError: false
    });
    const [confirmPassword, setConfirmPassword] = React.useState({password: '', isEqualToPassword: false});
    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}student/email/${userEmail}`)
            .then((res) => {
                const data = res.data;
                setUserData({
                    ...userData,
                    username: data.username,
                    email: userEmail,
                    //faculty: data.faculty, TODO: Add this property to server
                    program: data.program,
                    // privateProfile: user.privateProfile TODO: Add this property to server
                })
            }
        );
        setUserData({
            ...userData,
            faculty: user.faculty,
            privateProfile: user.privateProfile
        })
    }, [])

    useEffect(() => {
        // TODO: fetch user from server
        fetchData();
    },[fetchData])

    function handleEditProfile() {
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {authorization: `Bearer ${token}`}
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/update/`+userEmail, userData, config)
            .then(res => {
                console.log(res.data);
                navigate('/calendar');
            })
            .catch(err => {
                setRegistrationError({...registrationError, message: "Error connecting to database. " + err});
                setRegistrationError({...registrationError, hasError: true});
            });
    }

    function handleProgramChange(e) {
        setUserData({...userData, program: e.target.value})
    }

    function handleUsernameChange(e) {
        setUserData({...userData, username: e.target.value})
    }

    function handlePasswordChange(e) {
        //todo: add validation to password (ie should have one number, 6 letters, etc)
        setUserData({...userData, password: e.target.value})
    }

    function handlePrivacyChange() {
        setUserData({...userData, privateProfile: !userData.privateProfile})
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword({...confirmPassword, password: e.target.value});
        if (e.target.value === userData.password) {
            setConfirmPassword({...confirmPassword, isEqualToPassword: true});
        } else {
            setConfirmPassword({...confirmPassword, isEqualToPassword: false});
        }
    }


    const PageError = registrationError.hasError ? (
            <Typography align="center" color="#DA3A16">
                {registrationError.message}
            </Typography>
        ) :
        (<React.Fragment/>);

    const ProgramSelect = (
        <Container maxWidth="md" component="main">
            <Grid container spacing={2} alignItems="flex-end">
                {faculties.map((item) => (
                    <Grid
                        item
                        key={item}
                        xs={6}
                        md={6}
                    >
                        <SelectButton userData={userData} setUserData={setUserData} content={item}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )

    const SignUpForm = (
        <React.Fragment>
            <form style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>{PageError}</div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <TextField
                        fullWidth
                        id='username'
                        value={userData.username}
                        required
                        label="Username"
                        variant='outlined'
                        onChange={handleUsernameChange}
                    />
                </div>

                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <TextField fullWidth
                               id='password'
                               type='password'
                               required
                               value={userData.password}
                               label="New Password"
                               variant='outlined'
                               onChange={handlePasswordChange}
                               InputProps={{
                                   endAdornment: <InputAdornment
                                       position="end"><VisibilityIcon/></InputAdornment>,
                               }}
                    />
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <TextField fullWidth
                               id='confirmPassword'
                               type='password'
                               required
                               error={!confirmPassword.isEqualToPassword && !(confirmPassword.password === '')}
                               helperText={confirmPassword.isEqualToPassword || confirmPassword.password === '' ? '' : 'Passwords must match'}
                               label="Confirm Password"
                               variant='outlined'
                               onChange={handleConfirmPasswordChange}
                               InputProps={{
                                   endAdornment: <InputAdornment
                                       position="end"><VisibilityIcon/></InputAdornment>,
                               }}
                    />
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <Typography>
                        Which faculty are you in?
                    </Typography>
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    {ProgramSelect}
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Program</InputLabel>
                        <Select
                            id="program"
                            value={userData.program}
                            label="Program"
                            onChange={handleProgramChange}
                        >
                            {programs[userData.faculty].map((item) => (
                                <MenuItem key={item} value={item}>
                                    <em>{item}</em>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '30px'}}>
                    <Typography>
                        Hide my profile
                    </Typography>
                    <FormControlLabel sx={{display: 'block'}} control={
                        <Switch
                            checked={userData.privateProfile}
                            onChange={handlePrivacyChange}
                        />
                    } label={userData.privateProfile ? "Public" : "Private"}/>
                </div>
                <PrimaryButton2 width='305px' colour={'#912338'} content="Register" onClick={handleEditProfile}/>
            </form>
        </React.Fragment>
    )

    const InfoEdit = (
        <CustomWhiteCard width='326px' height='780px' marginTop='30px' content={SignUpForm}/>
    )

    return (
        <React.Fragment>
            <PersistentDrawerLeft/>
            <div style={{paddingTop: '60px'}}>
                <BackgroundCard width='372px' height='920px' content={InfoEdit}/>
            </div>
        </React.Fragment>
    );
}