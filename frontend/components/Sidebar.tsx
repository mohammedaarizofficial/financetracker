import { useContext } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../src/context/SidebarContext';

interface SidebarProps{
    setIncomeModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setExpenseModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({setIncomeModalOpen,setExpenseModalOpen}:SidebarProps){
    const { isCollapsed, toggleSidebar } = useSidebar();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        auth?.logout();
        navigate('/');
    };

    return(
        <div className={`fixed left-0 top-0 h-screen bg-zinc-900/50 border-r border-zinc-800 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex flex-col h-full">
                {/* Header with Logo and Name */}
                <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                            <svg className="h-8 w-8 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {!isCollapsed && (
                                <span className="text-xl font-semibold tracking-tight text-white">Finance Tracker</span>
                            )}
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="text-zinc-400 hover:text-white transition-colors shrink-0"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isCollapsed ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex-1 p-6 flex flex-col gap-3">
                    <button 
                        type="button" 
                        className={`px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'}`}
                        onClick={()=>setIncomeModalOpen(true)}
                        title={isCollapsed ? "Add Income" : undefined}
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {!isCollapsed && <span>Add Income</span>}
                    </button>
                    <button 
                        type="button" 
                        className={`px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-red-500/20 flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'}`}
                        onClick={()=>setExpenseModalOpen(true)}
                        title={isCollapsed ? "Add Expense" : undefined}
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                        {!isCollapsed && <span>Add Expense</span>}
                    </button>
                </div>

                {/* Logout Button at Bottom */}
                <div className="p-6 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors duration-200 flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'}`}
                        title={isCollapsed ? "Log Out" : undefined}
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {!isCollapsed && <span>Log Out</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;