import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import Calendar from './components/Calendar/Calendar';
import Calendar3 from './components/Calendar/Calendar3';

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
            <Route path="/calendar1" element={<Calendar />} />
            <Route path="/calendar3" element={<Calendar3 />} />

        </Routes>
    );
}