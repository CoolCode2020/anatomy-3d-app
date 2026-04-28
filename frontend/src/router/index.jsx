import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Homepage from '../pages/Homepage';
import Quiz1 from '../pages/Quiz1';     // Quiz 1
import Quiz2 from '../pages/Quiz2'; // Quiz 2
import InfoPage from '../pages/Infopage';   // Info
import PopulatePage from '../pages/PopulatePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // Layout mit Navbar und Outlet
        children: [
            { path: '', element: <Homepage /> },
            { path: 'quiz1', element: <Quiz1 /> },
            { path: 'quiz2', element: <Quiz2 /> },
            { path: 'info', element: <InfoPage /> },
            { path: 'populate', element: <PopulatePage /> },
        ]
    }
]);
