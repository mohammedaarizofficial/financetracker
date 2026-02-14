import {useState,useContext} from 'react';

import { FinanceContext } from '../src/context/FinanceContext';

interface ExperseFormProps{
    setExpenseModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}
function ExpenseForm({setExpenseModalOpen}:ExperseFormProps){
    const finance = useContext(FinanceContext)
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
            finance?.setExpenses(prev=>[...prev,newExpense]);
            setCategory('');
            setAmount('');
            setDate('');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
        <div
      className="modal-backdrop fade show"
      onClick={() => setExpenseModalOpen(false)}
    ></div>

    {/* Modal */}
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Add Expense</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setExpenseModalOpen(false)}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">

            {/* ⚠️ YOUR ORIGINAL FORM — UNCHANGED */}
            <form onSubmit={handleSubmit}>
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

              <button
                className="btn btn-primary w-100 py-2"
                type="submit"
              >
                Add Expense
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
    </>
    );
}

export default ExpenseForm;