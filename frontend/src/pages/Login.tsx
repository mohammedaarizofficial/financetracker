import { useNavigate } from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
interface LoginProps{
    Username:string,
    Password:string,
    setUsername:React.Dispatch<React.SetStateAction<string>>,
    setPassword:React.Dispatch<React.SetStateAction<string>>,
}

function Login({Username,Password,setUsername, setPassword}:LoginProps){
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

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
                auth?.login();
                navigate('/dashboard');
            }else{
                console.log('not able to navigate');
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
            <div className="glass rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-zinc-400 text-sm">Sign in to your Finance Tracker</p>
                </div>

                {/* Demo Credentials */}
                <div className="mb-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                    <p className="text-xs text-zinc-400 mb-2 font-semibold uppercase tracking-wide">Demo Credentials</p>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-400">Username:</span>
                            <span className="text-white font-mono font-semibold">user</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-400">Password:</span>
                            <span className="text-white font-mono font-semibold">user123</span>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-2">
                            Username
                        </label>
                        <input 
                            type="text" 
                            id="username"
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="Enter your username"
                            value={Username} 
                            onChange={(e)=>setUsername(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="Enter your password"
                            value={Password} 
                            onChange={(e)=>setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;