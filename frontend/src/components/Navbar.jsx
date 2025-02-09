import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const authRoutes = [
    { name: 'Dashboard', slug: "/dashboard" },
    { name: "Add Habit", slug: "/add-habit" },
    { name: "Manage Habits", slug: "/manage-habits" },
    { name: "Ai-Features", slug: "/ai-features" },
    { name: "Settings", slug: "/settings" },
];

const notAuthRoutes = [
    { name: 'Login', slug: "/login" },
    { name: 'Sign Up', slug: "/signup" },
];

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <nav className="w-full z-[100] fixed top-0 left-0 py-3 px-5 md:px-8 shadow-md bg-gray-50 flex justify-between items-center">
            {/* Brand */}
            <Link to="/">
                <div className="text-teal-600 text-2xl font-bold">Habitify</div>
            </Link>

            {/* Hamburger Menu (Mobile) */}
            <div className="flex items-center text-2xl ml-auto lg:hidden">
                <RxHamburgerMenu
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="cursor-pointer"
                />
            </div>

            {/* Links for Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
                <ul className="flex gap-8">
                    {authStatus
                        ? (
                            <>
                                {authRoutes.map((route) => (
                                    <li key={route.name}>
                                        <NavLink
                                            to={route.slug}
                                            className={({ isActive }) =>
                                                `text-lg font-medium text-gray-800 hover:text-teal-500 transition-colors duration-300 ${isActive ? 'underline underline-offset-8 decoration-teal-600' : ''}`
                                            }
                                        >
                                            {route.name}
                                        </NavLink>
                                    </li>
                                ))
                                }
                                <li>
                                    <Logout />
                                </li>
                            </>
                        )
                        : notAuthRoutes.map((route) => (
                            <li key={route.name}>
                                <NavLink
                                    to={route.slug}
                                    className={({ isActive }) =>
                                        `text-lg font-medium text-gray-800 hover:text-teal-500 transition-colors duration-300 ${isActive ? 'underline underline-offset-8 decoration-teal-600' : ''}`
                                    }
                                >
                                    {route.name}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute top-14 left-0 w-full bg-gray-50 shadow-md overflow-hidden transition-[max-height] duration-500 ease-in-out ${navbarOpen ? 'max-h-[500px]' : 'max-h-0'}`}
            >
                <ul className="flex flex-col items-center gap-4 py-4">
                    {authStatus
                        ? (
                            <>
                                {authRoutes.map((route) => (
                                    <li key={route.name}>
                                        <NavLink
                                            to={route.slug}
                                            className={({ isActive }) =>
                                                `text-lg font-medium text-gray-800 hover:text-teal-500 transition-colors duration-300 ${isActive ? 'underline underline-offset-8 decoration-teal-600' : ''}`
                                            }
                                        >
                                            {route.name}
                                        </NavLink>
                                    </li>
                                ))
                                }
                                <li>
                                    <Logout />
                                </li>
                            </>
                        )
                        : notAuthRoutes.map((route) => (
                            <li key={route.name}>
                                <NavLink
                                    to={route.slug}
                                    className={({ isActive }) =>
                                        `text-lg font-medium text-gray-800 hover:text-teal-500 transition-colors duration-300 ${isActive ? 'underline underline-offset-8 decoration-teal-600' : ''}`
                                    }
                                    onClick={() => setNavbarOpen(false)} // Close menu on link click
                                >
                                    {route.name}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;