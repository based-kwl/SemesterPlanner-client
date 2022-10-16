import * as React from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {InputAdornment, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {PrimaryButton2, SelectButton} from "../CustomMUIComponents/CustomButtons";
import TextField from "@mui/material/TextField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {BackgroundCard, CustomWhiteCard} from "../CustomMUIComponents/CustomCards";
import {faculties, programs} from "../Authentication/SignUp";
import PersistentDrawerLeft from "../NavDrawer/navDrawer";
import {useEffect} from "react";

export default function EditProfile() {

    const [userData, setUserData] = React.useState(null);
    const [registrationError, setRegistrationError] = React.useState({
        message: "Error, please try again later",
        hasError: false
    });
    const [confirmPassword, setConfirmPassword] = React.useState({password: '', isEqualToPassword: false});
    const navigate = useNavigate();

    useEffect(() => {

    })

    function handleEditProfile() {
        console.log(userData);

        const config = {
            headers: {authorization: "Bearer " + "Tokens goes here"} //todo : define the token
        }
        axios.post('http://localhost:5000/users/update/', userData, config)
            .then(res => {
                console.log(res.data);
                // setLogin(true)
                navigate('/calendar');
            })
            .catch(err => {
                console.log(err)
                setRegistrationError({...registrationError, message: "Error connecting to database"});
                setRegistrationError({...registrationError, hasError: true});
                console.log(registrationError);
                console.log(`Error: ${err}`)
            });
    }

    function handleProgramChange(e) {
        setUserData({...userData, program: e.target.value})
    }

    function handleUsernameChange(e) {
        setUserData({...userData, username: e.target.value})
    }

    function handleEmailChange(e) {
        setUserData({...userData, email: e.target.value})
    }

    function handlePasswordChange(e) {
        //todo: add validation to password (ie should have one number, 6 letters, etc)
        setUserData({...userData, password: e.target.value})
    }

    function handlePrivacyChange(e) {
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
                <PrimaryButton2 width='305px' content="Register" onClick={handleEditProfile}/>
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