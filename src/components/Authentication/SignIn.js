import * as React from 'react';
import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Box, InputAdornment, Link, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {BackgroundCard, CustomWhiteCard} from '../CustomMUIComponents/CustomCards';
import {PrimaryButton} from '../CustomMUIComponents/CustomButtons';
import axios from 'axios';
import {useNavigate} from "react-router";


export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    // const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("email")){
            if(localStorage.getItem("email") === "")
                window.location = "/calendar"
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        }

        //API call
        axios.post(`${process.env.REACT_APP_BASE_URL}/login/`, user)
            .then(res => {
                console.log(res);
                SetLocalStorage(res);
                navigate('/calendar');
            })
            .catch(err => {console.log(`Error: ${err}`); setErrorMessage(`${err}`.substring(44) === 401 ? 'Incorrect username or password.' : `${err}`)});
    }
    
    const signInForm = (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Box>
                    <Typography align='center' style={{fontFamily: 'Roboto', fontSize: '30px', fontWeight: 'bold'}}>Sign
                        in</Typography>
                    <div align='center' style={{paddingTop: '16px', paddingBottom: '20px'}}>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                            <TextField
                                fullWidth
                                id='email'
                                type='email'
                                required
                                label="Email"
                                variant='outlined'
                                onChange={(e) => setEmail(e.target.value)}
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
                                       onChange={(e) => setPassword(e.target.value)}
                                       InputProps={{
                                           endAdornment: <InputAdornment
                                               position="end"><VisibilityIcon/></InputAdornment>,
                                       }}
                            />
                        </div>
                        <div style={{color:'red'}}>{errorMessage}</div>
                        <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
                            <PrimaryButton width='305px' content="Sign in" />
                        </div>
                        <Typography style={{paddingTop: '16px', paddingBottom: '20px'}}>
                            Don't have an account?&nbsp;
                            <Link href='/signup'
                                  style={{color: '#912338', textDecorationColor: '#912338'}}>
                                {'Register here'}
                            </Link>
                        </Typography>
                    </div>
                </Box>
            </form>
        </React.Fragment>
    )
    
    const signInCard = (
        <React.Fragment>
            <p align='center' style={{
                fontFamily: 'Roboto',
                fontSize: '34px',
                fontWeight: 'bold',
                backgroundColor: '#E9E3D3',
                marginTop: '110px',
                marginBottom: '16px'
            }}>
                Semester Planner
            </p>
            <CustomWhiteCard width='326px' height='400px' marginTop='50px' content={signInForm} />
        </React.Fragment>

    );

    return (
        <BackgroundCard width='372px' height='785px' content={signInCard}/>
    );
}

export function SetLocalStorage(res) {
    localStorage.setItem("email", JSON.stringify(res.data.profile.email));
    localStorage.setItem("token", JSON.stringify(res.data.token));
}