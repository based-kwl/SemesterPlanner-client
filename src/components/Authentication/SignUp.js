import * as React from 'react';
import {BackgroundCard, CustomWhiteCard} from '../CustomMUIComponents/CustomCards';
import {Box, InputAdornment, Link, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { PrimaryButton, SelectButton } from '../CustomMUIComponents/CustomButtons';
import {useNavigate} from "react-router";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function SignUp() {

    const [userData, setUserData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
        faculty: 'Art & Science',
        program: 'null',
        privateProfile: true
    });
    const navigate= useNavigate();
    const faculties = ['Art & Science', 'Fine Arts', 'Engineering', 'Business'];
    const programs = {
        'Art & Science' : [
            'Actuarial Mathematics',
            'Adult Education',
            'Anthropoly',
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
            'Contemporay Dance',
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

    const handleSubmit = (e) => {
        //API call
        axios.post('http://localhost:5000/register/', userData)
            .then(res => {
                console.log(res.data);
                // setLogin(true)
                navigate('/home');
            })
            .catch(err => console.log(`Error: ${err}`));
    }

    function ValidateEmail(e) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(e);
    }
    function handleProgramSelect() {
        // todo
    }

    function handleProgramChange(e) {
        //todo
    }


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
                        <SelectButton isSelected={item === userData.faculty} content={item} handleButtonSelect={handleProgramSelect()} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )

    const SignUpForm = (
        <React.Fragment>
            <form onSubmit={handleSubmit} style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                    <TextField
                        fullWidth
                        id='username'
                        required
                        label="Username"
                        variant='outlined'
                        onChange={(e) => setUserData({...userData, username: e})}
                    />
                </div>
                <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                    <TextField
                        fullWidth
                        id='email'
                        type='email'
                        required
                        label="Email"
                        variant='outlined'
                        onChange={(e) => setUserData({...userData, email: e})}
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
                               label="Password"
                               variant='outlined'
                               onChange={(e) => setUserData({...userData, password: e})}
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
                               onChange={(e) => setUserData({...userData, confirmP: e})}
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
                        <InputLabel id="demo-simple-select-label">Please Select Your Program</InputLabel>
                    <Select
                        id="program"
                        value={userData.faculty}
                        label="Program"
                        onChange={handleProgramChange()}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '30px'}}>
                    <Typography>
                        Hide my profile
                    </Typography>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} label="Public" />
                    </FormGroup>
                </div>
                <PrimaryButton width='305px' content="Register" />
            </form>
        </React.Fragment>
    )

    const CardContent = (
        <CustomWhiteCard width='326px' height='780px' marginTop='50px' content={SignUpForm} />
    )

    const SignUpPage = (
        <BackgroundCard width='372px' height='850px' content={CardContent} />
    );

    return SignUpPage;


}