import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {SelectButton} from "./CustomButtons";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {styled} from "@mui/material/styles";

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

/**
 * @Author: Jasmin Guay
 * Reusable FacultySelect ButtonGrid Component.
 * @param userData : student object (Schema definition)
 * @param setUserData : function handling the change of userData.
 * @returns {JSX.Element} The reusable ButtonGrid.
 */
export const FacultySelect = ({userData, setUserData}) => (
    <Container maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
            {faculties?.map((item) => (
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
);

/**
 * @Author: Jasmin Guay.
 * Reusable ProgramSelect Select input.
 * @param userData.faculty : (Map<String,[]>) map of key : program, value : array of faculty (string[])
 * @param userData.program : String[] : array of program (String[])
 * @param handleProgramChange : function handling the change of userData.faculty
 * @returns {JSX.Element} the reusable select input.
 * @constructor
 */
export const ProgramSelect = ({userData, handleProgramChange}) => (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Program</InputLabel>
        <Select
            id="program"
            value={userData.program}
            label="Program"
            onChange={handleProgramChange}
        >
            {programs[userData.faculty]?.map((item) => (
                <MenuItem key={item} value={item}>
                    <em>{item}</em>
                </MenuItem>
            ))}
        </Select>
    </FormControl>
)

/**
 * @Author: Jasmin Guay.
 * Reusable ProfileToggle Toggle input.
 * @param userData.privateProfile : boolean representing if the student has a privateProfile (true) or not (false).
 * @param handlePrivacyChange : function handling the changes of userData.privateProfile
 * @returns {JSX.Element} : The reusable component.
 */
export const ProfileToggle = ({userData, handlePrivacyChange}) => (
    <React.Fragment>
        <Typography>
            Profile Privacy
        </Typography>
        <FormControlLabel
            sx={{m: 1, marginY: '5px'}}
            control={<CustomToggle checked={!userData.privateProfile} onChange={handlePrivacyChange} />}
            label={ <ProfileToggleLabel text={userData.privateProfile ? "Private" : "Public"} />} />
        <Typography sx={{color: '#DA3A16'}}>
            Hiding my profile will disable users from adding me to their study groups
        </Typography>
    </React.Fragment>
)

const ProfileToggleLabel = (props) => (
        <div style={{marginLeft: '8px'}}>
            <Typography> {props.text}</Typography>
        </div>
);

export const CustomToggle = styled((props) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))

(({ theme }) => ({
    width: 40,
    height: 26,
    padding: 3,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        color: '#C8C8C8',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#C8C8C8',
            '& + .MuiSwitch-track': {
                backgroundColor: '#8CC63E',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#8CC63E',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#912338' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));