import { useContext } from "react";
import { FinanceContext } from "../src/context/FinanceContext";

interface ExpenseProps{
    id:string,
}


function DeleteExpense({id}:ExpenseProps){
    const finance = useContext(FinanceContext);
    const handleDelete = async()=>{
        const token = localStorage.getItem("token");
        const data = await fetch(`http://localhost:4321/expense/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(data);
        finance?.setExpenses(prev=>prev.filter(expenses=>expenses.id !== id))
    }
    return(
        <>
        <button type="button" className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteExpense;