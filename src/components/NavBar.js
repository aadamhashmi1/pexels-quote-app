// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Quote App</Link>
                <button className="bg-white text-blue-500 px-4 py-2 rounded">Button</button>
            </div>
        </nav>
    );
};

export default NavBar;
