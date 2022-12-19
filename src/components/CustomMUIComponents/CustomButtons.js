import React from "react";
import { Button } from "@mui/material";

export const PrimaryButton = ({content, width, data_test}) => {
    return (
        <Button
            data-test={data_test}
            type='submit'
            variant="contained"
            style={{
                paddingTop: '10px', paddingBottom: '10px',
                width: width, backgroundColor: '#912338'
            }}>
            {content}
        </Button>  
    );
}


export const PrimaryButton2 = ({content, width, onClick, colour, disable, data_test}) => {
    return (
        <Button
            data-test={data_test}
            disabled={disable}
            onClick={onClick}
            variant="contained"
            style={{
                paddingTop: '10px', paddingBottom: '10px',
                width: width, backgroundColor: colour
            }}>
            {content}
        </Button>
    );
}

export const FileSelectButton = ({width, onChange, name}) => {
    return (
        <Button
            onClick={() => {
                document.getElementById('fileSelectButton').click()
            }}
            variant="contained"
            style={{
                paddingTop: '10px', paddingBottom: '10px',
                width: width, backgroundColor: '#057D78'
            }}>
            <input type="file" id="fileSelectButton" onChange={onChange} style={{display: "none"}}/>
            {name}
        </Button>
    );
}

export const SecondaryButton2 = ({content, width, onClick}) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            style={{
                paddingTop: '10px', paddingBottom: '10px',
                width: width, backgroundColor: '#C8C8C8'
            }}>
            {content}
        </Button>
    );
}

export const EditButton = ({content, width, onClick}) => {
    return (
        <Button
            onClick={onClick}
            style={{
                width: width,
                color: '#534F4F'
            }}
            >
            {content}
        </Button>
    );
}
export const SelectButton = ({ content, userData, setUserData}) => {

    const buttonColor = () => {
        return (!(content === userData.faculty) ? '#057D78' : '#CBB576');
    }

    function handleButtonSelect() {
        setUserData({ ...userData, faculty: content})
    }

        return (
            <Button
                variant="contained"
                fullWidth
                onClick={handleButtonSelect}
                style={{
                    backgroundColor: buttonColor(),
                    height: '60px'}}>
                {content}
            </Button>
        )
}