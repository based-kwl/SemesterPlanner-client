import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import EditProfile from "./components/Profile/EditProfile";
import Calendar from './components/Calendar/Calendar';
import CreateEvent from './components/Calendar/Event/CreateEvent';
import ColorSettings from './components/Calendar/EventColorSelector/EventColorDisplay'
import EventColorSelector from './components/Calendar/EventColorSelector/EventColorSelector'
import StudyRoom from './components/StudyRoom/StudyRoom';
import StudyRoomHome from "./components/StudyRoom/StudyRoomHome";
import React from 'react';
import FriendListHome from "./components/FriendList/FriendListHome";

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

function AppRoutes() {
    return (
        <Routes>
            <Route exact path='/' element={<SignIn />} />
            <Route path="/event" element={<CreateEvent />} />
            <Route path="/colorsetting" element={<ColorSettings />} />
            <Route path="/colorselector" element={<EventColorSelector />} />

            <Route path="/login" element={<React.StrictMode><SignIn /></React.StrictMode>} />
            <Route path="/signup" element={<React.StrictMode><SignUp /></React.StrictMode>} />
            <Route path="/calendar" element={<React.StrictMode><Calendar /></React.StrictMode>} />
            <Route path="/editProfile" element={<React.StrictMode><EditProfile /></React.StrictMode>} />
            <Route path="/study-room/:sID" element={<StudyRoom />} />
            <Route path="/study-room-home" element={<StudyRoomHome />} />
            <Route path="/friend-list-home" element={<FriendListHome />}/>
            <Route exact path='/' element={<React.StrictMode><SignIn /></React.StrictMode>} />
        </Routes>
    );
}

