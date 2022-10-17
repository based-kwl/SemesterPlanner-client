import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {PrimaryButton2, SelectButton} from '../CustomMUIComponents/CustomButtons';
import {useNavigate} from "react-router";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {BackgroundCard, CustomWhiteCard} from '../CustomMUIComponents/CustomCards';
import {InputAdornment, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export const faculties = ['Art & Science', 'Fine Arts', 'Engineering', 'Business'];
export const programs = {
    'Art & Science' : [
        'Actuarial Mathematics',
        'Adult Education',
        'Anthropology',
        'Athletic Therapy',
        'Behavior NeuroScience',
        'Biochemistry',
        'Biology',
        'Chemistry'
    ],
    'Fine Arts' : [
        'Art History',
        'Ceramics',
        'Computation Arts',
        'Contemporary Dance',
        'Design',
        'Film Animation',
        'Game Design',
        'Music'
    ],
    'Engineering': [
        'Aerospace Engineering',
        'Building Engineering',
        'Civil Engineering',
        'Computer Engineering',
        'Electrical Engineering',
        'Industrial Engineering',
        'Mechinical Engineering',
        'Software Engineering'
    ],
    'Business': [
        'Accountancy',
        'Administration',
        'Data Intelligence',
        'Economics',
        'Entrepreneurship',
        'Finance',
        'Management',
        'Marketing',
        'Real Estate'
    ]
};

export default function SignUp() {

    const [userData, setUserData] = React.useState({
        username: '',
        email: '',
        password: '',
        faculty: 'Art & Science',
        program: 'Actuarial Mathematics',
        privateProfile: true
    });
    const [registrationError, setRegistrationError] = React.useState({message: "Error, please try again later", hasError: false});
    const [confirmPassword, setConfirmPassword] = React.useState({ password: '', isEqualToPassword: false});
    const navigate = useNavigate();

    function handleRegistration() {
        console.log(userData);
        axios.post('http://localhost:5000/users/add', userData)
            .then(()=> {
                console.log();
                navigate('/login');
            })
            .catch(err => {
                console.log(err)
                setRegistrationError({ ...registrationError, message: "Error connecting to database"});
                setRegistrationError({ ...registrationError, hasError: true});
                console.log(registrationError);
                console.log(`Error: ${err}`)});
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
        //todo: add validation to password (ie should have one number, 6 letters, etc)
        setUserData({...userData, password: e.target.value})
    }

    function handlePrivacyChange(e) {
        setUserData({...userData, privateProfile: !userData.privateProfile})
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword({...confirmPassword, password: e.target.value});
        if (e.target.value === userData.password) {
            setConfirmPassword( { ...confirmPassword, isEqualToPassword: true});
        }
        else {
            setConfirmPassword( { ...confirmPassword, isEqualToPassword: false});
        }
    }


    const PageError =  registrationError.hasError ? (
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
                        <SelectButton userData={userData} setUserData={setUserData} content={item}  />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )

    const SignUpForm = (
        <React.Fragment>
            <form style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>{PageError}</div>
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
                        } label={userData.privateProfile ? "Public" : "Private"} />
                </div>
                <PrimaryButton2 width='305px' content="Register" onClick={handleRegistration} />
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
            <CustomWhiteCard width='326px' height='780px' marginTop='30px' content={SignUpForm} />
        </React.Fragment>

)

    return (
        <BackgroundCard width='372px' height='920px' content={InfoEdit}/>
    );


}
