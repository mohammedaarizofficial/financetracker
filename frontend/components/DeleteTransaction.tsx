import { useContext } from "react";
import { FinanceContext } from "../src/context/FinanceContext";

interface ExpenseProps{
    id:string,
    type:string
}


function DeleteTransaction({id,type}:ExpenseProps){
    const finance = useContext(FinanceContext);
    const handleDelete = async()=>{
        const token = localStorage.getItem("token");
        const data = await fetch(type==="expense"?`http://localhost:4321/expense/${id}`:`http://localhost:4321/income/${id}`,{
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
        <>
        <button type="button" className='btn btn-sm btn-outline-danger' onClick={handleDelete}>
            <i className="bi bi-trash-fill"></i>
        </button>
        </>
    )
}

export default DeleteTransaction;