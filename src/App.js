import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import EditProfile from "./components/Profile/EditProfile";
import Calendar from './components/Calendar/Calendar';
import StudyRoom from './components/StudyRoom/StudyRoom';
import StudyRoomHome from "./components/StudyRoom/StudyRoomHome";
import StudyRoomSettings from "./components/StudyRoom/StudyRoomSettings";
import React from 'react';

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
            <Route path="/login" element={<React.StrictMode><SignIn /></React.StrictMode>} />
            <Route path="/signup" element={<React.StrictMode><SignUp /></React.StrictMode>} />
            <Route path="/calendar" element={<React.StrictMode><Calendar /></React.StrictMode>} />
            <Route path="/editProfile" element={<React.StrictMode><EditProfile /></React.StrictMode>} />
            <Route path="/study-room/:sID" element={<StudyRoom />} />
            <Route path="/study-room-home" element={<StudyRoomHome />} />
            <Route exact path='/' element={<React.StrictMode><SignIn /></React.StrictMode>} />
        </Routes>
    );
}

