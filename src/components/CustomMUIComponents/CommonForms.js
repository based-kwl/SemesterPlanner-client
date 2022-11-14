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
            {programs[userData.faculty].map((item) => (
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
 * @param userdata.privateProfile : boolean representing if the student has a privateProfile (true) or not (false).
 * @param handlePrivacyChange : function handling the changes of userData.privateProfile
 * @returns {JSX.Element} : The reusable component.
 */
export const ProfileToggle = ({userData, handlePrivacyChange}) => (
    <React.Fragment>
        <Typography>
            Profile Privacy
        </Typography>
        <FormControlLabel sx={{display: 'block'}} control={
            <Switch
                checked={userData.privateProfile}
                onChange={handlePrivacyChange}
            />
        } label={userData.privateProfile ? "Public" : "Private"} />
        <p>

        </p>
    </React.Fragment>
)