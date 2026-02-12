import { useNavigate } from 'react-router-dom';

interface LoginProps{
    Username:string,
    Password:string,
    setUsername:React.Dispatch<React.SetStateAction<string>>,
    setPassword:React.Dispatch<React.SetStateAction<string>>,
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
}

function Login({Username,Password,setUsername, setPassword,setIsAuthenticated}:LoginProps){
    const navigate = useNavigate();

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const credentials = await fetch('http://localhost:4321/users/login',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    username:Username,
                    password:Password
                })
            });
            const data = await credentials.json();
            if(credentials.ok){
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                navigate('/dashboard');
            }else{
                console.log('not able to navigate');
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-2 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input type="text" className="form-control mb-2" id="floatingInput" placeholder="username" value={Username} onChange={(e)=>setUsername(e.target.value)} required/>
                    <label htmlFor="floatingInput">Username:</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control mb-2" id="floatingPassword" placeholder="Password" value={Password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <label htmlFor="floatingPassword">Password:</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit" >Sign In</button>
            </form>
        </>
    )
}

export default Login;