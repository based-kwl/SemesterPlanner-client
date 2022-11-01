import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import EditProfile from "./components/Profile/EditProfile";
import Calendar from './components/Calendar/Calendar';
import StudyRoom from './components/StudyRoom/StudyRoom';
import StudyRoomHome from "./components/StudyRoom/StudyRoomHome";
import StudyRoomSettings from "./components/StudyRoom/StudyRoomSettings";

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
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/study-room" element={<StudyRoom />} />
            <Route path="/study-room-home" element={<StudyRoomHome />} />
            <Route path="/study-room-settings" element={<StudyRoomSettings />} />
            <Route exact path='/' element={<SignIn />} />
        </Routes>
    );
}

