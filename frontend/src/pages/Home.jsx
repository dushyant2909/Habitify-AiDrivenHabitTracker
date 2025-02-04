import React from 'react';
import backgroundImage from '../assets/HomePage_Bg.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    const style = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    };

    return (
        <div style={style} className="flex flex-col items-center justify-center min-h-screen">
            <section className="mb-14 max-w-4xl flex flex-col items-center gap-2 font-serif">
                <h1 className="text-4xl font-bold text-emerald-950 ">“We first make our habits,</h1>
                <h1 className="text-4xl font-bold text-emerald-950">then our habits make us”</h1>
            </section>
            <section className="text-center p-6 md:p-8 bg-blue-600 bg-opacity-80 text-white rounded-lg shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Build Better Habits</h1>
                <p className="text-base md:text-lg mb-6">
                    Track your progress and achieve your goals with our AI-driven habit tracker.
                </p>
                <Link to="/signup" className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    Get Started
                </Link>
            </section>
        </div>
    );
};

export default Home;