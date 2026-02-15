import Navbar from "../../components/Navbar";
import { useState,useContext } from "react";
import { FinanceContext } from "../context/FinanceContext.tsx";
import { formatCurrency } from "../lib/utils";
import { useSidebar } from "../context/SidebarContext";

function Expenses(){
    const finance = useContext(FinanceContext);
    const expense = finance?.expenses??[];
    const [isModalOpen, setIsModalOpen] =useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const totalExpense = expense.reduce((sum, num)=> sum+num.amount,0);



    finance?.fetchFinancialData();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();   // ✅ THIS is where preventDefault goes

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:4321/expense/${selectedId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    category,
                    amount: Number(amount),
                    date: new Date(date)
                })
            }
        );

        const updatedExpense = await response.json();

        finance?.setExpenses(prev =>
            prev.map(item =>
                item.id === updatedExpense.id ? updatedExpense : item
            )
        );

        setIsModalOpen(false);
    };

    const { isCollapsed } = useSidebar();
    return(
        <>
        <div className={`min-h-screen bg-zinc-950 p-8 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 tracking-tight font-futuristic">Expenses</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {expense.map((details,index)=>(
                        <div 
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-zinc-700 transition-all duration-300" 
                            key={index}
                        >
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-zinc-400 mb-1">Amount</p>
                                    <p className="text-xl font-bold text-red-500 font-futuristic">{formatCurrency(details.amount)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400 mb-1">Category</p>
                                    <p className="text-lg font-semibold text-white">{details.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400 mb-1">Date</p>
                                    <p className="text-sm text-zinc-300">{new Date(details.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white font-futuristic">Total Expenses</h2>
                        <p className="text-3xl font-bold text-red-500 font-futuristic">{formatCurrency(totalExpense)}</p>
                    </div>
                </div>
            </div>
        </div>
        
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md">
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                        <h3 className="text-xl font-semibold text-white">Update Expense</h3>
                        <button
                            type="button"
                            className="text-zinc-400 hover:text-white transition-colors"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Amount</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default Expenses;