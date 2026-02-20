import { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import IncomeForm from '../../components/IncomeForm.tsx';
import { FinanceContext } from '../context/FinanceContext.tsx';
import Sidebar from "../../components/Sidebar.tsx";
import ExpenseForm from '../../components/ExpenseForm.tsx';
import DashboardChart from '../../components/DashboardChart.tsx';
import ExpenseByCategoryChart from '../../components/ExpenseByCategoryChart.tsx';
import TransactionList from '../../components/TransactionList.tsx';
import { formatCurrency } from '../lib/utils';
import { useSidebar } from '../context/SidebarContext';

type userData = {
    username:string,
}

function Dashboard(){
    const[data, setData] = useState<userData|null>(null);
    const auth = useContext(AuthContext);
    const finance = useContext(FinanceContext);
    const income = finance?.incomes??[];
    const expense = finance?.expenses??[];
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { isCollapsed } = useSidebar();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [source, setSource] = useState<string>('');
    const [amount, setAmount]= useState<string>('');
    const [date, setDate] = useState<string>('');
    const [selectedId, setSelectedId]=useState<string>('');
    const totalIncome = income.reduce((sum, income)=> sum + income.amount,0);
    const totalExpense = expense.reduce((sum, expense)=> sum + expense.amount,0);
    const balance = totalIncome - totalExpense;
    const [incomeModalOpen, setIncomeModalOpen] = useState<boolean>(false);
    const [expenseModalOpen, setExpenseModalOpen]=useState<boolean>(false);
    const [transactionType, setTransactionType] = useState<string>('');
    const [category, setCategory]= useState<string>('');
    // const [transactionData, setTransactionData]=useState<incomeTransaction[] | expenseTransaction[]>([]);

    const transactions = [
        ...income.map(i => ({
            id: i.id,
            type: "income" as const,
            description: i.source,
            category: "Income",
            amount: i.amount,
            date: i.date
        })),
        ...expense.map(e => ({
            id: e.id,
            type: "expense" as const,
            description: e.category,
            category: "Expense",
            amount: e.amount,
            date: e.date
        }))
    ];

    useEffect(()=>{
        const fetchData = async()=>{
            if(token){
                auth?.login();
            }
            try{
                const data = await fetch('https://financetracker-production-766b.up.railway.app/users/dashboard-data',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                }
                );
                if (data.status === 401) {
                auth?.logout();
                navigate("/");
            }
                const credentials = await data.json();
                setData(credentials);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[])

    const handleUpdate = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            if(transactionType==='income'){
                const data = await fetch(`https://financetracker-production-766b.up.railway.app/income/${selectedId}`,{
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify(
                        {
                            source,
                            amount:Number(amount),
                            date:new Date(date)
                        }
                    )
                })
                const updatedIncome= await data.json();
                finance?.setIncomes((prev)=>prev.map((item)=>item.id===updatedIncome.id?updatedIncome:item));
                setSource('');
            }else{
                const response = await fetch(
                    `https://financetracker-production-766b.up.railway.app/expense/${selectedId}`,
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

                const updatedExpense= await response.json();
                finance?.setExpenses(prev =>prev.map((item) =>item.id === updatedExpense.id ? updatedExpense : item));
                setCategory('');
            }
            setIsModalOpen(false);
            setAmount('');
            setDate('');
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <div className="min-h-screen bg-zinc-950">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar 
                    setIncomeModalOpen={setIncomeModalOpen} 
                    setExpenseModalOpen={setExpenseModalOpen} 
                />

                {/* Main Content */}
                <div className={`flex-1 p-8 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight font-futuristic">
                            Welcome, {data?.username}
                        </h1>
                        <p className="text-zinc-400 text-sm">Track your finances at a glance</p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Income Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <svg className="h-7 w-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400 mb-1">Total Income</p>
                                    <p className="text-2xl font-bold text-emerald-500 font-futuristic">
                                        {formatCurrency(totalIncome)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Expense Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-red-500/50 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <svg className="h-7 w-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17l5-5m0 0l-5-5m5 5H6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400 mb-1">Total Expenses</p>
                                    <p className="text-2xl font-bold text-red-500 font-futuristic">
                                        {formatCurrency(totalExpense)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Balance Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                    <svg className="h-7 w-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400 mb-1">Balance</p>
                                    <p className={`text-2xl font-bold font-futuristic ${balance >= 0 ? "text-indigo-500" : "text-red-500"}`}>
                                        {formatCurrency(balance)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <DashboardChart />
                        <ExpenseByCategoryChart />
                    </div>

                    {/* Transactions */}
                    <TransactionList transactions={transactions} setSelectedId={setSelectedId} setIsModalOpen={setIsModalOpen} setTransactionType={setTransactionType}/>
                </div>
            </div>
        </div>

        {incomeModalOpen&&<IncomeForm setIncomeModalOpen={setIncomeModalOpen} />}
        {expenseModalOpen&&<ExpenseForm setExpenseModalOpen={setExpenseModalOpen} />}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                            <h3 className="text-xl font-semibold text-white">Update Transaction</h3>
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
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                                        {transactionType==="income"?"Source":"Category"}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder={transactionType==="income"?"Source":"Category"}
                                        value={transactionType=="income"?source:category}
                                        onChange={transactionType==="income"?(e) => setSource(e.target.value):(e)=>setCategory(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Amount</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
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

export default Dashboard;