import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserSignIn from './components/Authentication/userSignIn';

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
            <Route path="/login" element={<UserSignIn />} />
        </Routes>
    );
}

