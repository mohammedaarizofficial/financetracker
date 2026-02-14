import Navbar from "../../components/Navbar";
import { useState,useContext } from "react";
import { FinanceContext } from "../context/FinanceContext.tsx";
import UpdateExpense from '../../components/UpdateExpense.tsx';

function Expenses(){
    const finance = useContext(FinanceContext);
    const expense = finance?.expenses??[];
    const [isModalOpen, setIsModalOpen] =useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [selectedId, setSelectedId] = useState<string>('');
    const totalExpense = expense.reduce((sum, num)=> sum+num.amount,0);



    finance?.fetchFinancialData();

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

        finance?.setExpenses(prev =>
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
        <div className='container'>
            <div className='row mt-2 mb-3 text-center'>
                {expense.map((details,index)=>(
                    <div className='card col-4 mx-1 my-2'  key={index}>
                        <div className='card-body'>
                            <h3>Amount:{details.amount}</h3>
                            <h3>Category:{details.category}</h3>
                            <h3>Date:{new Date(details.date).toLocaleDateString()}</h3>
                        </div>
                        <UpdateExpense id={details.id} setIsModalOpen={setIsModalOpen} setSelectedId={setSelectedId}/>
                    </div>
                ))}
            </div>
        </div>
        <div className="card">
            <div className='card-header' id="totalExpense">
                The Total Expenses:{totalExpense}
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