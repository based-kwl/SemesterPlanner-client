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

export const SelectButton = ({isSelected, content, handleButtonSelect}) => {

    const buttonColor = () => {
        return (!isSelected ? '#057D78' : '#CBB576');
    }

        return (
            <Button
                variant="contained"
                fullWidth
                onClick={handleButtonSelect}
                style={{backgroundColor: buttonColor()}}>
                {content}
            </Button>
        )
}