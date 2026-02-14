import {NavLink} from 'react-router-dom';

function Navbar(){
    return(
        <>
            <div className="fixed-top bg-white" style={{width:"100"}}>
                <header className=" d-flex flex-wrap justify-content-center py-3 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" aria-hidden="true"><use xlinkHref="#bootstrap"></use></svg>
                        <span className="fs-4">Finance Tracker</span>
                    </a>
                    <ul className="nav nav-pills">
                        <NavLink to='/' className='nav-item mx-3 py-4 text-decoration-none'>Log Out</NavLink>
                    </ul>
                </header>
            </div>
        </>
    )
}

export default Navbar;