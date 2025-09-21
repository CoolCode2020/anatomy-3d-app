import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBone } from 'react-icons/pi';
import { FaGlobe } from 'react-icons/fa';

const Navbar = () => {
    const [lang, setLang] = useState('DE'); // 'DE' oder 'EN'
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // gespeicherte Sprache laden
    useEffect(() => {
        const saved = localStorage.getItem('lang');
        if (saved === 'DE' || saved === 'EN') setLang(saved);
    }, []);

    // Klick außerhalb schließt Dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const choose = (code) => {
        setLang(code);
        localStorage.setItem('lang', code);
        setOpen(false);
    };

    return (
        <div className="text-white bg-[#291090] flex justify-between items-center h-24 w-full mx-auto px-4 fixed z-50">
            {/* Logo / Titel */}
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
            <ul className="flex items-center">
                <li className="p-4">
                    <Link to="/quiz1">
                        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#655CFF] transition shadow-md hover:shadow-lg">
                            Quiz Spiel
                        </button>
                    </Link>
                </li>
                <li className="p-4">
                    <Link to="/quiz2">
                        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#655CFF] transition shadow-md hover:shadow-lg">
                            Knochenatlas
                        </button>
                    </Link>
                </li>
                 <li className="p-4">
                    <Link to="/populate">
                        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#655CFF] transition shadow-md hover:shadow-lg">
                            Datenbank Laden
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

                {/* Language Picker */}
                <li className="p-2 relative" ref={menuRef}>
                    <button
                        className="p-2 hover:text-[#655CFF] transition relative flex items-center justify-center"
                        title="Sprache wählen"
                        aria-haspopup="menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {/* Globus */}
                        <FaGlobe size={40} />
                        {/* Sprachcode zentriert im Globus */}
                        <span
                            className="absolute text-xs font-bold pointer-events-none"
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
              {lang}
            </span>
                    </button>

                    {/* Dropdown */}
                    <div
                        role="menu"
                        className={`absolute right-0 mt-2 w-28 rounded-lg bg-white text-gray-800 shadow-lg border border-gray-100 z-50 ${
                            open ? 'block' : 'hidden'
                        }`}
                    >
                        <button
                            role="menuitem"
                            className={`w-full px-3 py-2 text-left hover:bg-gray-100 rounded-t-lg ${
                                lang === 'DE' ? 'font-semibold' : ''
                            }`}
                            onClick={() => choose('DE')}
                        >
                            Deutsch (DE)
                        </button>
                        <button
                            role="menuitem"
                            className={`w-full px-3 py-2 text-left hover:bg-gray-100 rounded-b-lg ${
                                lang === 'EN' ? 'font-semibold' : ''
                            }`}
                            onClick={() => choose('EN')}
                        >
                            English (EN)
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
