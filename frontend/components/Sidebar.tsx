interface SidebarProps{
    setIncomeModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setExpenseModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({setIncomeModalOpen,setExpenseModalOpen}:SidebarProps){
    return(
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-zinc-900/50 border-r border-zinc-800 p-6">
            <div className="flex flex-col gap-3">
                <button 
                    type="button" 
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
                    onClick={()=>setIncomeModalOpen(true)}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Income
                </button>
                <button 
                    type="button" 
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-red-500/20 flex items-center justify-center gap-2"
                    onClick={()=>setExpenseModalOpen(true)}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default Sidebar;