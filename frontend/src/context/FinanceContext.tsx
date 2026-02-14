import { createContext} from "react";
import type { ExpenseType } from "../../types/expense";
import type {IncomeType} from '../../types/income';

type FinanceContextType = {
    incomes:IncomeType[],
    expenses:ExpenseType[],
    setIncomes:React.Dispatch<React.SetStateAction<IncomeType[]>>,
    setExpenses:React.Dispatch<React.SetStateAction<ExpenseType[]>>,
    fetchFinancialData:()=>void
}

export const FinanceContext = createContext<FinanceContextType | null>(null);

