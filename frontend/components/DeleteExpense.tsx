import type { ExpenseType } from "../types/expense";

interface ExpenseProps{
    id:string,
    setExpenses:React.Dispatch<React.SetStateAction<ExpenseType[]>>;
}


function DeleteExpense({id,setExpenses}:ExpenseProps){
    const handleDelete = async()=>{
        const token = localStorage.getItem("token");
        const data = await fetch(`http://localhost:4321/expense/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(data);
        setExpenses(prev=>prev.filter(expenses=>expenses.id !== id))
    }
    return(
        <>
        <button type="button" className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteExpense;