import Navbar from "../../components/Navbar";
import { useState,useEffect } from "react";
import ExpenseForm from '..//../components/ExpenseForm.tsx';
import type {ExpenseType} from '../../types/expense.ts';
import DeleteExpense from '../../components/DeleteExpense.tsx';
import UpdateExpense from '../../components/UpdateExpense.tsx';

function Expenses(){
    const [expenses, setExpenses]=useState<ExpenseType[]>([]);
    const [isModalOpen, setIsModalOpen] =useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const token = localStorage.getItem("token");
    const[selectedId, setSelectedId] = useState<string>('');

    useEffect(()=>{
        const fetchData = async()=>{
            const data = await fetch('http://localhost:4321/expense',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const expense = await data.json();
            setExpenses(expense);
        }
        fetchData();
    },[])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();   // ✅ THIS is where preventDefault goes

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:4321/expense/${selectedId}`,
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

        const updatedExpense = await response.json();

        setExpenses(prev =>
            prev.map(item =>
                item.id === updatedExpense.id ? updatedExpense : item
            )
        );

        setIsModalOpen(false);
    };

    return(
        <>
        <Navbar />
        <h1>This is the expenses page</h1>
        <ExpenseForm setExpenses={setExpenses}/>
        <div className='container'>
            <div className='row mt-2 mb-3 text-center'>
                {expenses.map((details,index)=>(
                    <div className='card col-4 mx-1 my-2'  key={index}>
                        <div className='card-body'>
                            <h3>Amount:{details.amount}</h3>
                            <h3>Category:{details.category}</h3>
                            <h3>Date:{new Date(details.date).toLocaleDateString()}</h3>
                        </div>
                        <DeleteExpense id={details.id} setExpenses={setExpenses}/>
                        <UpdateExpense id={details.id} setIsModalOpen={setIsModalOpen} setSelectedId={setSelectedId}/>
                    </div>
                ))}
            </div>
        </div>
        {isModalOpen && (
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header">
                    <h5 className="modal-title">Update</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsModalOpen(false)}
                    ></button>
                    </div>

                    <div className="modal-body">
                    <form onSubmit={handleUpdate}>
                        <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Source"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label>Category:</label>
                        </div>

                        <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <label>Amount</label>
                        </div>

                        <div className="mb-3">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        </div>
                        <button
                        type="submit"
                        className="btn btn-primary w-100"
                        >
                        Update
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Expenses;