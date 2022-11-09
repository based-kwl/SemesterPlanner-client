import React from "react";
import { Button } from "@mui/material";

export const PrimaryButton = ({content, width}) => {
    return (
        <Button
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

export const PrimaryButton2 = ({content, width, onClick}) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            style={{
                paddingTop: '10px', paddingBottom: '10px',
                width: width, backgroundColor: '#912338'
            }}>
            {content}
        </Button>
    );
}

export const PrimaryButton3 = ({content, width, onClick}) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            style={{
                paddingTop: '10px', paddingBottom: '10px',
                width: width, backgroundColor: '#057D78'
            }}>
            {content}
        </Button>
    );
}

export const FileSelectButton = ({width, onChange}) => {
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
            Select File
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
                    backgroundColor: buttonColor(), height: '60px'}}>
                {content}
            </Button>
        )
}