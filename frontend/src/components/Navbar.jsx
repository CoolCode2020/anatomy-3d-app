import React from 'react';
import { Link } from 'react-router-dom';
import { PiBone } from 'react-icons/pi';
import { FaGlobe } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="text-white bg-[#291090] flex justify-between items-center h-24 w-full mx-auto px-4 fixed z-50">
            {/* Logo oder Titel mit Link zur Startseite */}
            <Link
                to="/"
                className="text-3xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition"
            >
                <div className="bg-white rounded-full p-1">
                    <PiBone size={40} className="text-[#291090]" />
                </div>
                Anatomy 3D App
            </Link>

            {/* Navigation */}
            <ul className="flex">
                <li className="p-4">
                    <Link to="/quiz1">
                        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#655CFF] transition shadow-md hover:shadow-lg">
                            Quiz 1
                        </button>
                    </Link>
                </li>
                <li className="p-4">
                    <Link to="/quiz2">
                        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#655CFF] transition shadow-md hover:shadow-lg">
                            Quiz 2
                        </button>
                    </Link>
                </li>
                <li className="p-4">
                    <Link to="/info">
                        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#655CFF] transition shadow-md hover:shadow-lg">
                            Info
                        </button>
                    </Link>
                </li>
                <li className="p-2">
                    <button className="p-2 hover:text-[#655CFF] transition" title="Sprache wählen">
                        <FaGlobe size={40} />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
