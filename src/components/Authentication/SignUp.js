import * as React from 'react';
import {PrimaryButton2} from '../CustomMUIComponents/CustomButtons';
import {useNavigate} from "react-router";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {BackgroundCard, CustomWhiteCard} from '../CustomMUIComponents/CustomCards';
import {InputAdornment, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {FacultySelect, ProgramSelect} from "../CustomMUIComponents/CommonForms";


export default function SignUp() {

    const [userData, setUserData] = React.useState({
        username: '',
        email: '',
        password: '',
        faculty: 'Art & Science',
        program: 'Actuarial Mathematics',
        privateProfile: true
    });
    const [registrationError, setRegistrationError] = React.useState({message: "", hasError: false});
    const [confirmPassword, setConfirmPassword] = React.useState({ password: '', isEqualToPassword: false});
    const navigate = useNavigate();

    function handleRegistration() {
        axios.post(`${process.env.REACT_APP_BASE_URL}student/add`, userData)
            .then(()=> {
                navigate('/login');
            })
            .catch(err => {
                setRegistrationError({ ...registrationError, message: "Error connecting to database. Please try again later"});
        });
    }

    function handleProgramChange(e) {
        setUserData({ ...userData, program: e.target.value})
    }

    function handleUsernameChange(e) {
        setUserData({ ...userData, username: e.target.value})
    }

    function handleEmailChange(e) {
        setUserData({ ...userData, email: e.target.value})
    }

    function handlePasswordChange(e) {
        setUserData({...userData, password: e.target.value})
    }

    function handlePrivacyChange(e) {
        setUserData({...userData, privateProfile: !userData.privateProfile})
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword({...confirmPassword, password: e.target.value});
        if (e.target.value === userData.password) {
            setConfirmPassword( { ...confirmPassword, isEqualToPassword: true});
            if (registrationError.message === "Both passwords should match") {
                setRegistrationError({ ...registrationError, message: "", hasError: false})
            }
        }
        else {
            setRegistrationError({ ...registrationError, message: "Both passwords should match", hasError: true})
            setConfirmPassword( { ...confirmPassword, isEqualToPassword: false});
        }
    }


    const PageError =  React.useMemo(() => (registrationError.message !== ""
        ? (
        <Typography align="center" color="#DA3A16">
            {registrationError.message}
        </Typography>
        )
        : null), [registrationError]);


    const disableRegisterButton = React.useMemo(() => {
        return (
            registrationError.hasError
            || userData.username === ''
            || userData.email === ''
            || userData.password === ''
            || !confirmPassword.isEqualToPassword
        )}, [ registrationError, userData, confirmPassword]);

    const SignUpForm = (
        <React.Fragment>
            <form style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                    {PageError}
                </div>
                <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
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
                <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                    <TextField
                        fullWidth
                        id='email'
                        value={userData.email}
                        type='email'
                        required
                        label="Email"
                        variant='outlined'
                        onChange={handleEmailChange}
                        InputProps={{
                            endAdornment: <InputAdornment
                                position="end"><MailOutlineIcon/></InputAdornment>,
                        }}
                    />
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <TextField fullWidth
                               id='password'
                               type='password'
                               required
                               value={userData.password}
                               label="Password"
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
                    <FacultySelect userData={userData} setUserData={setUserData} />
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <ProgramSelect userData={userData} handleProgramChange={handleProgramChange} />
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
                        } label={userData.privateProfile ? "Public" : "Private"} />
                </div>
                <PrimaryButton2 width='305px' colour={'#912338'}  disable={disableRegisterButton} content="Register" onClick={handleRegistration} />
            </form>
        </React.Fragment>
    )

    const InfoEdit = (
        <React.Fragment>
            <Typography align='center' style={{fontFamily: 'Roboto', fontSize: '34px', fontWeight: 'bold'}}>
                Welcome!
            </Typography>
            <Typography align='center' style={{fontFamily: 'Roboto', fontSize: '18px', fontWeight: 'bold'}}>
                Create your account.
            </Typography>
            <CustomWhiteCard width='326px' height='800px' marginTop='30px' content={SignUpForm} />
        </React.Fragment>

)

    return (
        <BackgroundCard width='372px' height='920px' content={InfoEdit}/>
    );


}
