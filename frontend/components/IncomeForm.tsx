import {useState,useContext} from 'react';
import { FinanceContext } from '../src/context/FinanceContext';

interface IncomeFormProps{
    setIncomeModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function IncomeForm({setIncomeModalOpen}:IncomeFormProps){
    const finance = useContext(FinanceContext);
    const [source, setSource]= useState<string>('');
    const [amount, setAmount]=useState<string>('');
    const [date, setDate]=useState<string>('');

    const handleSubmit =async(e:React.FormEvent)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        try{
            const data = await fetch('http://localhost:4321/income',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify({
                        source:source,
                        amount:Number(amount),
                        date:new Date(date)
                    })
                }
            )
            // const newIncome = await data.json();
            console.log(data);
            setIncomeModalOpen(false);
            finance?.fetchFinancialData();
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={() => setIncomeModalOpen(false)}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                        <h3 className="text-xl font-semibold text-white">Add Income</h3>
                        <button
                            type="button"
                            className="text-zinc-400 hover:text-white transition-colors"
                            onClick={() => setIncomeModalOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Income Source</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Income Source"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Income Amount</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Add Income
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IncomeForm;