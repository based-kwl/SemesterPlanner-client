import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Box, Button, Container, InputAdornment, Link, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import './button.css';


export default function UserSignIn() {


    return (
        <Container className='background' fixed>
        <Box>
            <Typography className="title">
                Semester Planner
            </Typography>
                <div>
                    <TextField
                        id='email'
                        type='email'
                        required
                        label="Email"
                        variant='outlined'
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><MailOutlineIcon/></InputAdornment>,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id='password'
                        type='password'
                        required
                        label="Password"
                        variant='outlined'
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><VisibilityIcon/></InputAdornment>,
                        }}
                    />
                </div>

                <div>
                    <Button variant="contained">Sign in</Button>
                </div>
                <Typography>
                    Don't have an account?
                    <Link href='/user-registration'>
                        {'Register here'}
                    </Link>
                </Typography>
        </Box>
        </Container>

    )
}