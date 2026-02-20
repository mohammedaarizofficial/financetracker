import { FinanceContext } from "./FinanceContext";
import {useState,useEffect} from 'react';
import type { ReactNode } from "react";
import type { ExpenseType } from "../../types/expense";
import type { IncomeType } from "../../types/income";

export function FinanceProvider({children}:{children:ReactNode}){
    const [incomes, setIncomes]=useState<IncomeType[]>([]);
    const [expenses, setExpenses]=useState<ExpenseType[]>([]);

    const fetchFinancialData = async()=>{

        const token = localStorage.getItem("token");
        const incomeRes = await fetch('https://financetracker-production-766b.up.railway.app/income',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const expenseRes = await fetch('https://financetracker-production-766b.up.railway.app/expense',{
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