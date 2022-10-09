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
    // <div className="App">
    //   <header className="App-header">
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Semester Planner App
    //     </a>
    //   </header>
    // </div>

