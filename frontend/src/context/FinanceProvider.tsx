import { FinanceContext } from "./FinanceContext";
import {useState,useEffect} from 'react';
import type { ReactNode } from "react";
import type { ExpenseType } from "../../types/expense";
import type { IncomeType } from "../../types/income";

export function FinanceProvider({children}:{children:ReactNode}){
    const [incomes, setIncomes]=useState<IncomeType[]>([]);
    const [expenses, setExpenses]=useState<ExpenseType[]>([]);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchFinancialData = async()=>{

        const token = localStorage.getItem("token");
        const incomeRes = await fetch(`${API_URL}/income`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const expenseRes = await fetch(`${API_URL}/expense`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const incomeData = await incomeRes.json();
        const expenseData = await expenseRes.json();

        setIncomes(incomeData);
        setExpenses(expenseData);

    }

    useEffect(()=>{
        fetchFinancialData();
    },[]);
    
    return(
        <FinanceContext.Provider value={{ incomes, expenses, 
        setIncomes
        , setExpenses
        , fetchFinancialData}}>
            {children}
        </FinanceContext.Provider>
    )
}