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
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import axios from "axios";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import FriendNotification from "../FriendList/FriendsNotification";

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
    <ForumIcon style={{color: '#573996'}}/>,
    <GroupIcon style={{color:'E5A712'}}/>]
const ListIconsB = [<LogoutIcon style={{color: '#6e6e6e'}}/>]

PersistentDrawerLeft.defaultProps = {navbarTitle: ''}

export default function PersistentDrawerLeft(params) {
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [count, setCount] = React.useState(0);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    React.useEffect(()=> {
        const email = JSON.parse(localStorage.getItem("email"));
        axios.get(`${process.env.REACT_APP_BASE_URL}friend/incoming-requests-count/${email}`)
            .then(res => {
                setCount(res.data);
            })
            .catch(err => {console.log('Error',err);})
    },[])


    const navigate = useNavigate();

    function handleLogout() {
        localStorage.setItem("token", '');
        localStorage.setItem("email", '');
        localStorage.setItem("username", '');
        navigate('/login');
    }

    const redirect = (buttonName) => {
        switch (buttonName) {
            case 'Home':
                navigate('/calendar');
                break;
            case 'Profile':
                navigate('/editProfile');
                break;
            case 'Progress Report':
                navigate('/'); //TODO: set the proper path to the progress report page once it is implemented
                break;
            case 'Study Groups':
                navigate('/study-room-home');
                break;
            case 'Friends List':
                navigate('/friend-list-home');
                break;
            case 'Logout':
                handleLogout();
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
                        <BottomDrawer icon={<Badge badgeContent={count}  showZero   overlap="circular" sx={{
                            "& .MuiBadge-badge": {
                                color: "white",
                                backgroundColor: "#000000"
                            }}}>
                            <NotificationsIcon style={{color: 'white', height: '3vh', width: '3vh'}}/></Badge>}
                                      title={'Notifications'} content={<FriendNotification/>}/>
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
                    {['Home', 'Profile', 'Progress Report', 'Study Groups', 'Friends List'].map((text, index) => (
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
    )
}
