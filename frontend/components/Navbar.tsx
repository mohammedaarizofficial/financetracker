
import { useContext } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar(){
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        auth?.logout();
        navigate('/');
    };

    return(
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
            <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <a href="/dashboard" className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors">
                    <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xl font-semibold tracking-tight">Finance Tracker</span>
                </a>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                >
                    Log Out
                </button>
            </header>
        </div>
    )
}

export default Navbar;