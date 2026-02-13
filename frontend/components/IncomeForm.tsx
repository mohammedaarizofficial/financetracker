import {useState} from 'react';

function IncomeForm(){
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
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Add Income</h1>
                <div className="form-floating">
                    <input type="text" className="form-control mb-3" id="floatingInput" placeholder="Internship" value={source} onChange={(e)=>setSource(e.target.value)}/>
                    <label htmlFor="floatingInput">Income Source:</label>
                </div>
                <div className="form-floating">
                    <input type="number" className="form-control mb-3" id="floatingAmount" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                    <label htmlFor="floatingAmount">Income Amount:</label>
                </div>
                <div>
                    <label htmlFor="floatingDate">Date:</label><span>
                    <input type="date" className="form-control mb-3" id="floatingDate" value={date} onChange={(e)=>setDate(e.target.value)}/></span>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Add Income</button>
            </form>
        </>
    )
}

export default IncomeForm;