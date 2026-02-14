import {useState,useContext} from 'react';
import { FinanceContext } from '../src/context/FinanceContext';

interface IncomeFormProps{
    setIncomeModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function IncomeForm({setIncomeModalOpen}:IncomeFormProps){
    const finance = useContext(FinanceContext);
    const [source, setSource]= useState<string>('');
    const [amount, setAmount]=useState<string>('');
    const [date, setDate]=useState<string>('');

    const handleSubmit =async(e:React.FormEvent)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        try{
            const data = await fetch('http://localhost:4321/income',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify({
                        source:source,
                        amount:Number(amount),
                        date:new Date(date)
                    })
                }
            )
            // const newIncome = await data.json();
            console.log(data);
            setIncomeModalOpen(false);
            finance?.fetchFinancialData();
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div 
            className="modal-backdrop fade show"
            onClick={() => setIncomeModalOpen(false)}
            ></div>

            {/* Modal */}
            <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 shadow">

                {/* Header */}
                <div className="modal-header">
                    <h5 className="modal-title">Add Income</h5>
                    <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIncomeModalOpen(false)}
                    ></button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>

                    <div className="form-floating mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Income Source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                        />
                        <label>Income Source</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        />
                        <label>Income Amount</label>
                    </div>

                    <div className="mb-3">
                        <label>Date</label>
                        <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Add Income
                    </button>

                    </form>
                </div>

                </div>
            </div>
            </div>
        </>
    )
}

export default IncomeForm;