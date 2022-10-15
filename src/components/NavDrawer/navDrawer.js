import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

/**
 * USAGE: import NavDrawer from "insertRelativePathHere" and insert <NavDrawer navbarTitle={'insertPageTitleHere'}/>
 * at the top of your html, where insertRelativePathHere is the relative path to the NavDrawer component from your
 * component, and insertPageTitleHere is the string to be displayed on the NavDrawer's bar on your specific page
 */

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        // width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const ListIconsA = [<CalendarViewMonthIcon style={{color: '#912338'}}/>,
    <PersonOutlineIcon style={{color: '#057D78'}}/>, <BarChartIcon style={{color: '#0072A8'}}/>,
    <ForumIcon style={{color: '#573996'}}/>]
const ListIconsB = [<LogoutIcon style={{color: '#6e6e6e'}}/>]

PersistentDrawerLeft.defaultProps = {navbarTitle: ''}

export default function PersistentDrawerLeft(params) {
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openSearch, setOpenSearch] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    // TODO: below method will be used when coding the search view open
    const handleSearchOpen = () => {
        setOpenSearch(true);
    };

    // TODO: below method will be used when coding the search view close; commented out to suppress warnings, as method is not currently in use
    // const handleSearchClose = () => {
    //     setOpenSearch(false);
    // };

    let navigate = useNavigate();
    const redirect = (buttonName) => {
        //TODO: remove below line; line exists to suppress warning due to currently unused 'openSearch' state
        if (openSearch === true)

            switch (buttonName) {
                case 'Home':
                    navigate('/'); //TODO: set the proper path to the calendar page once it is implemented
                    break;
                case 'Profile':
                    navigate('/'); //TODO: set the proper path to the profile page once it is implemented
                    break;
                case 'Progress Report':
                    navigate('/'); //TODO: set the proper path to the progress report page once it is implemented
                    break;
                case 'Study Groups':
                    navigate('/'); //TODO: set the proper path to the study groups page once it is implemented
                    break;
                case 'Logout':
                    navigate('/login'); //TODO: ensure that user tokens are destroyed when routing (once user tokens are implemented)
                    break;
                default:
                    break;
            }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={openDrawer} style={{backgroundColor: '#912338', textAlign: "center"}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{...(openDrawer && {display: 'transparent'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div"
                                style={{font: 'Roboto', margin: 'auto', alignSelf: 'center'}}>
                        {params.navbarTitle}
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open search"
                        onClick={handleSearchOpen}
                        edge="start"
                    >
                        <SearchIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Home', 'Profile', 'Progress Report', 'Study Groups'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => redirect(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {ListIconsA[index]}
                                </ListItemIcon>
                                <ListItemText primary={text} style={{marginLeft:'-15px'}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['Logout'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => redirect(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {ListIconsB[index]}
                                </ListItemIcon>
                                <ListItemText primary={text} style={{marginLeft:'-15px'}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
