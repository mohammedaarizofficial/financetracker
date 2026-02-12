import Navbar from '../../components/Navbar.tsx';
import { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';



type userData = {
    username:string,
}

function Dashboard(){
    const[data, setData] = useState<userData|null>(null);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async()=>{
            const token = localStorage.getItem("token");
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

    return(
        <>
        <Navbar />
        <h1>{data?.username}</h1>
        </>
    )
}

export default Dashboard;