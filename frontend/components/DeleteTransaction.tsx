import { useContext } from "react";
import { FinanceContext } from "../src/context/FinanceContext";

interface ExpenseProps{
    id:string,
    type:string
}


function DeleteTransaction({id,type}:ExpenseProps){
    const API_URL = import.meta.env.VITE_API_URL;
    const finance = useContext(FinanceContext);
    const handleDelete = async()=>{
        const token = localStorage.getItem("token");
        const data = await fetch(type==="expense"?`${API_URL}/expense/${id}`:`${API_URL}/income/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log(data);
        if(type==="expense"){
            finance?.setExpenses(prev=>prev.filter(expenses=>expenses.id !== id))  
        }else{
            finance?.setIncomes(prev=>prev.filter(incomes => incomes.id != id));
        }
    }
    return(
        <button 
            type="button" 
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors duration-200"
            onClick={handleDelete}
        >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    )
}

export default DeleteTransaction;