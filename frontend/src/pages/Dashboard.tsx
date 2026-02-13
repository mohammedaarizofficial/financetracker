import Navbar from '../../components/Navbar.tsx';
import { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import IncomeForm from '../../components/IncomeForm.tsx';

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
    const [incomes, setIncomes] = useState<incomeType[]>([]);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
    const [source, setSource] = useState<string>('');
    const [amount, setAmount]= useState<string>('');
    const [date, setDate] = useState<string>('');
    const [selectedId, setSelectedId]=useState<string>('');

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
        const fetchIncome = async()=>{
            try{
                const data = await fetch(`http://localhost:4321/income`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                const incomes = await data.json();
                setIncomes(incomes);
            }catch(err){
                console.log(err);
            }
        }
        fetchIncome();
    },[incomes])

    const handleDelete = async(_id:string)=>{
        const data = await fetch(`http://localhost:4321/income/${_id}`,{
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        // const income = await data.json();
        console.log(data);
        setIncomes(prev=>prev.filter(incomes => incomes._id != _id));
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
            setIncomes((prev)=>prev.map((item)=>item._id===updatedData._id?updatedData:item));
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
        <h1>Welcome, {data?.username}</h1>
        <IncomeForm />
        <div className="container">
            <div className="row mt-2 mb-3 text-center ">
                {incomes.map((details,index)=>(
                    <div className="card col-4 mx-1 my-2" key={index}>
                        <div className="card-body">
                            <h3>Source:{details.source}</h3>
                            <h3>Amount:{details.amount}</h3>
                            <h3>Date:{new Date(details.date).toLocaleDateString()}</h3>
                        </div>  
                        <button type="button" className=" btn btn-danger" aria-label="Close" onClick={()=>handleDelete(details._id)}>Delete</button>
                        <button type='button' className="btn btn-primary mt-2" onClick={()=>{
                            setSelectedId(details._id);
                            setIsModelOpen(true)
                            }}>Update</button>
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

export default Dashboard;