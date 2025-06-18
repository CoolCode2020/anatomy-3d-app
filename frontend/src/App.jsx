import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen bg-gray-100 overflow-hidden">
          <Outlet />
        </div>
      </>
  );
}
