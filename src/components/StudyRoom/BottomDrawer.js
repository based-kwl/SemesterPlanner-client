import * as React from 'react';
import PropTypes from 'prop-types';
import {Global} from '@emotion/react';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {grey} from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 0;

const Root = styled('div')(({theme}) => ({
    height: '100%'
}));

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
    const {window} = props;
    const [open, setOpen] = React.useState(false);
    const [globalCSS, setGlobalCSS] = React.useState(false);

    const toggleDrawer = (newOpen) => async () => {
        setOpen(newOpen);

        if (globalCSS) // if global CSS is set (i.e. drawer is open), wait for 300ms until bottom drawer dismisses before removing global CSS
            await delay(300);
        if (globalCSS) // disabling global CSS when bottom drawer is closed and enabling it when bottom drawer is open
            setGlobalCSS(false);
        else
            setGlobalCSS(true);
    };

    // method to create delays in the code
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <CssBaseline/>
            {globalCSS ?
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                            height: `calc(90% - ${drawerBleeding}px)`,
                            overflow: 'visible',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px'
                        },
                    }}
                />
                :
                <></>
            }
            {/*<Box sx={{ textAlign: 'center', pt: 1 }}>*/}
            <Button style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                    onClick={toggleDrawer(true)}>{props.icon}</Button>
            {/*</Box>*/}
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: false,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller/>
                    <div style={{
                        marginTop: '20px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h2 style={{fontFamily: 'roboto'}}>{props.title}</h2>
                        <div style={{marginTop: '0px', fontFamily: 'roboto'}}>{props.content}</div>
                    </div>
                </Box>
            </SwipeableDrawer>
        </Root>
    );
}

SwipeableEdgeDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
