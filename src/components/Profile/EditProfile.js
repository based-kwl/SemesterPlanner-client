/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {InputAdornment, Typography} from "@mui/material";
import {PrimaryButton2} from "../CustomMUIComponents/CustomButtons";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {BackgroundCard, StudyRoomChatCard, CustomWhiteCard} from "../CustomMUIComponents/CustomCards";
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import {useEffect, useRef} from "react";
import {FacultySelect, ProfileToggle, ProgramSelect} from "../CustomMUIComponents/CommonForms";
import {GetAuthentication} from "../Authentication/Authentification";


export default function EditProfile() {

    const [userData, setUserData] = React.useState({
        username: '',
        email: '',
        password: '',
        faculty: 'Art & Science',
        program: 'Actuarial Mathematics',
        privateProfile: true
    });

    const newPassword = useRef('');

    const [registrationError, setRegistrationError] = React.useState("");
    const navigate = useNavigate();
    const auth = GetAuthentication();

    function fetchData() {
        axios.get(`${process.env.REACT_APP_BASE_URL}student/email/${auth.email}`)
            .then((res) => {
                const data = res.data;
                setUserData({
                    ...userData,
                    username: auth.username,
                    email: auth.email,
                    password: undefined,
                    faculty: data.faculty,
                    program: data.program,
                    privateProfile: data.privateProfile
                })
            }
        ).catch((err) => {
            setRegistrationError(err.message)
        });
    }

    useEffect(() => {
        fetchData();
    },[])

    function handleEditProfile() {
        axios.post(`${process.env.REACT_APP_BASE_URL}student/update`, userData)
            .then(() => {
                localStorage.setItem("username", JSON.stringify(userData.username))
                navigate('/calendar');
            })
            .catch(err => {
                setRegistrationError(err.message)
            });
    }

    function handleProgramChange(e) {
        setUserData({...userData, program: e.target.value})
    }

    function handleUsernameChange(e) {
        setUserData({...userData, username: e.target.value})
    }

    function handlePasswordChange(e) {
        newPassword.current = e.target.value;
        setUserData({...userData, password: e.target.value})
    }

    function handlePrivacyChange() {
        setUserData((prevState) => ({...userData, privateProfile: !prevState.privateProfile}))
    }

    function handleConfirmPasswordChange(e) {
        if (e.target.value === userData.password) {
            if (registrationError === "Both passwords should match") {
                setRegistrationError("");
            }
        } else {
            setRegistrationError("Both passwords should match")
        }
    }

    const PageError =  React.useMemo(() => (registrationError !== ""
        ? (
            <Typography align="center" color="#DA3A16">
                {registrationError}
            </Typography>
        )
        : null), [registrationError]);

    const SignUpForm = (
        <React.Fragment>
          <div style={{overflow: 'auto', height: '80vh'}}>
          <form style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>{PageError}</div>
                <div style={{paddingTop: '0px', paddingBottom: '10px'}}>
          
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
                    <FacultySelect userData={userData} setUserData={setUserData} />
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <ProgramSelect userData={userData} handleProgramChange={handleProgramChange} />
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '30px'}}>
                    <ProfileToggle userData={userData} handlePrivacyChange={handlePrivacyChange} />
                </div>
                <div align={'center'} >
                <PrimaryButton2 width='80vw' style={{position: 'absolute'}} colour={'#912338'} content="Update" onClick={handleEditProfile}/>
                </div>
            </form>
          </div>
            
        </React.Fragment>
    )

    const InfoEdit = (
        
        <StudyRoomChatCard width='92vw' height='auto' marginTop='2px' 
       content={SignUpForm}/>
    )

    const TitleCard = (
        <StudyRoomChatCard width='92vw' height='8vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
        
        content={<div style={{fontSize: '22px', fontWeight: 'bold'}}><Typography variant="1">Edit Profile
            </Typography></div>}/>
    )
    return (
        <React.Fragment>
            <PersistentDrawerLeft/>
            <div >
                <BackgroundCard  width='95vw' height='auto' content={[TitleCard,InfoEdit]}/>
            </div>
        </React.Fragment>
    );
}
