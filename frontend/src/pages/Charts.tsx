import DashboardChart from "../../components/DashboardChart";
import {  useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import ExpenseByCategoryChart from "../../components/ExpenseByCategoryChart";
import { useSidebar } from "../context/SidebarContext";


function Charts(){
    const finance = useContext(FinanceContext);
    const income = finance?.incomes??[];
    const expense = finance?.expenses??[];
    const totalIncome = income.reduce((sum, income)=>sum+income.amount,0);
    const totalExpense = expense.reduce((sum, expense)=>sum+expense.amount,0);
    console.log(totalExpense, totalIncome);
    const { isCollapsed } = useSidebar();
    return(
        <>
        <div className={`min-h-screen bg-zinc-950 p-8 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 tracking-tight font-futuristic">Charts & Analytics</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DashboardChart />
                    <ExpenseByCategoryChart />
                </div>
            </div>
        </div>
        </>
    )
}

export default Charts;