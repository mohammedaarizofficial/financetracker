import Navbar from '../../components/Navbar.tsx';
import { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import IncomeForm from '../../components/IncomeForm.tsx';
import { FinanceContext } from '../context/FinanceContext.tsx';
import Sidebar from "../../components/Sidebar.tsx";
import ExpenseForm from '../../components/ExpenseForm.tsx';
import DashboardChart from '../../components/DashboardChart.tsx';
import ExpenseByCategoryChart from '../../components/ExpenseByCategoryChart.tsx';


type incomeType={
    _id:string,
    source:string,
    amount:number,
    date:Date,
}

type userData = {
    username:string,
}

function Dashboard(){
    const[data, setData] = useState<userData|null>(null);
    const auth = useContext(AuthContext);
    const finance = useContext(FinanceContext);
    const income = finance?.incomes??[];
    const expense = finance?.expenses??[];
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
    const [source, setSource] = useState<string>('');
    const [amount, setAmount]= useState<string>('');
    const [date, setDate] = useState<string>('');
    const [selectedId, setSelectedId]=useState<string>('');
    const totalIncome = income.reduce((sum, income)=> sum + income.amount,0);
    const totalExpense = expense.reduce((sum, expense)=> sum + expense.amount,0);
    const balance = totalIncome - totalExpense;
    const [incomeModalOpen, setIncomeModalOpen] = useState<boolean>(false);
    const [expenseModalOpen, setExpenseModalOpen]=useState<boolean>(false);

    useEffect(()=>{
        const fetchData = async()=>{
            if(token){
                auth?.login();
            }
            try{
                const data = await fetch('http://localhost:4321/users/dashboard-data',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                }
                );
                if (data.status === 401) {
                auth?.logout();
                navigate("/");
            }
                const credentials = await data.json();
                setData(credentials);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[])

    const handleDelete = async(_id:string)=>{
        const data = await fetch(`http://localhost:4321/income/${_id}`,{
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        // const income = await data.json();
        console.log(data);
        finance?.setIncomes(prev=>prev.filter(incomes => incomes._id != _id));
        finance?.fetchFinancialData();
    }

    const handleUpdate = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const data = await fetch(`http://localhost:4321/income/${selectedId}`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(
                    {
                        source,
                        amount,
                        date
                    }
                )
            })
            const updatedData:incomeType = await data.json();
            finance?.setIncomes((prev)=>prev.map((item)=>item._id===updatedData._id?updatedData:item));
            finance?.fetchFinancialData();
            setIsModelOpen(false);
            setSource('');
            setAmount('');
            setDate('');
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <Navbar />
        <div className="container-fluid" style={{ marginTop: "70px" }}>
            <div className="row">

                {/* Sidebar */}
                <div className="col-12 col-md-3 col-lg-2 p-0">
                <Sidebar 
                    setIncomeModalOpen={setIncomeModalOpen} 
                    setExpenseModalOpen={setExpenseModalOpen} 
                />
                </div>

                {/* Main Content */}
                <div className="col-12 col-md-9 col-lg-10 p-4">

                <h1>Welcome, {data?.username}</h1>

                {/* Summary Cards */}
                <div className="container mt-4">
                    <div className="row g-4">
                    {/* Income Card */}
            <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex align-items-center">
                
                {/* Icon */}
                <div
                    className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                    style={{ width: "55px", height: "55px" }}
                >
                    <i className="bi bi-arrow-up-circle-fill text-success fs-4"></i>
                </div>

                {/* Text */}
                <div>
                    <h6 className="text-muted mb-1">Total Income</h6>
                    <h4 className="fw-bold text-success mb-0">
                    ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </h4>
                </div>

                </div>
            </div>
            </div>

            {/* Expense Card */}
            <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex align-items-center">

                {/* Icon */}
                <div
                    className="rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                    style={{ width: "55px", height: "55px" }}
                >
                    <i className="bi bi-arrow-down-circle-fill text-danger fs-4"></i>
                </div>

                {/* Text */}
                <div>
                    <h6 className="text-muted mb-1">Total Expenses</h6>
                    <h4 className="fw-bold text-danger mb-0">
                    ${totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </h4>
                </div>

                </div>
            </div>
            </div>

            {/* Balance Card */}
            <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex align-items-center">

                {/* Icon */}
                <div
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                    style={{ width: "55px", height: "55px" }}
                >
                    <i className="bi bi-wallet2 text-primary fs-4"></i>
                </div>

                {/* Text */}
                <div>
                    <h6 className="text-muted mb-1">Balance</h6>
                    <h4
                    className={`fw-bold mb-0 ${
                        balance >= 0 ? "text-primary" : "text-danger"
                    }`}
                    >
                    ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </h4>
                </div>
            </div>
        </div>
     </div>
                    </div>
                </div>

                <div className="container mt-4">
                    <div className="row g-4">

                        {/* Card 1 */}
                        <div className="col-12 col-md-6">
                        <DashboardChart totalIncome={totalIncome} totalExpense={totalExpense}/>
                        </div>

                        {/* Card 2 */}
                        <div className="col-12 col-md-6">
                        <ExpenseByCategoryChart />
                        </div>

                    </div>
                </div>


                {/* Income Cards */}
                <div className="container mt-4">
                    <div className="row text-center">
                    {income.map((details,index)=>(
                        <div className="col-12 col-md-4 mb-3" key={index}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                            <h5>Source: {details.source}</h5>
                            <h5>Amount: {details.amount}</h5>
                            <h6>{new Date(details.date).toLocaleDateString()}</h6>
                            </div>
                            <button type="button" className="btn btn-danger" onClick={()=>handleDelete(details._id)}>Delete</button>
                            <button type="button" className="btn btn-secondary mt-2" onClick={()=>{
                                setSelectedId(details._id);
                                setIsModelOpen(true)}}>Update</button>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                </div>

            </div>
            </div>


            {incomeModalOpen&&<IncomeForm setIncomeModalOpen={setIncomeModalOpen} />}
            {expenseModalOpen&&<ExpenseForm setExpenseModalOpen={setExpenseModalOpen} />}

            {isModalOpen && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header">
                        <h5 className="modal-title">Update</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setIsModelOpen(false)}
                        ></button>
                        </div>

                        <div className="modal-body">
                        <form onSubmit={handleUpdate}>
                            <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Source"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            />
                            <label>Source</label>
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
                            <label>Date:</label>
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

export default Dashboard;