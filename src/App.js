import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import EditProfile from "./components/Profile/EditProfile";
import Calendar from './components/Calendar/Calendar';

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
            <Route exact path='/' element={<SignIn />} />
        </Routes>
    );
}

