interface SidebarProps{
    setIncomeModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setExpenseModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({setIncomeModalOpen,setExpenseModalOpen}:SidebarProps){
    return(
        <div className="col-12 col-md-3 col-lg-2 p-0 position-fixed d-flex flex-column flex-shrink-0 text-bg-dark vh-100"style={{ width: "250px", top: "80px" }} >
            <ul className="mt-5 nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <button type="button" className="btn btn-primary mb-3" onClick={()=>setIncomeModalOpen(true)}>Add Income</button>
                </li>
                <li className='nav-item'>
                    <button type="button" className='btn btn-primary' onClick={()=>setExpenseModalOpen(true)}>Add Expense</button>
                </li>
            </ul>
            <hr />

        </div>
    )
}

export default Sidebar;