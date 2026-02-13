import {useState} from 'react';
import type { ExpenseType } from '../types/expense';

interface ExpenseProps{
    setExpenses:React.Dispatch<React.SetStateAction<ExpenseType[]>>;
}

function ExpenseForm({setExpenses}:ExpenseProps){
    const [category, setCategory]= useState<string>('');
    const [amount, setAmount]=useState<string>('');
    const [date, setDate]=useState<string>('');

    const handleSubmit =async(e:React.FormEvent)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        try{
            const data = await fetch('http://localhost:4321/expense',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify({
                        category:category,
                        amount:Number(amount),
                        date:new Date(date)
                    })
                }
            )
            const newExpense = await data.json();
            setExpenses(prev=>[...prev,newExpense]);
            setCategory('');
            setAmount('');
            setDate('');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="container d-flex justify-content-center mt-4">
            <div className="col-12 col-md-6 col-lg-4">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal text-center">Add Expense</h1>

                <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label>Category</label>
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

                <button className="btn btn-primary w-100 py-2" type="submit">
                Add Expense
                </button>
            </form>
            </div>
        </div>
    );
}

export default ExpenseForm;