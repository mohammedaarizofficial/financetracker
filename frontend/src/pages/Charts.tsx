import Navbar from "../../components/Navbar";
import DashboardChart from "../../components/DashboardChart";
import {  useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";


function Charts(){
    const finance = useContext(FinanceContext);
    const income = finance?.incomes??[];
    const expense = finance?.expenses??[];
    const totalIncome = income.reduce((sum, income)=>sum+income.amount,0);
    const totalExpense = expense.reduce((sum, expense)=>sum+expense.amount,0);
    return(
        <>
        <Navbar />
        <h1>This is charts page</h1>
        <DashboardChart
            totalIncome={totalIncome}
            totalExpense={totalExpense}
        />
        </>
    )
}

export default Charts;