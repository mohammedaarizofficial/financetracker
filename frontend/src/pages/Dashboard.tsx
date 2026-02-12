import Navbar from '../../components/Navbar.tsx';
import { useEffect,useState } from 'react';

type credentialsProps={
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
}

type userData = {
    username:string,
}

function Dashboard({setIsAuthenticated}:credentialsProps){
    const[data, setData] = useState<userData|null>(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const token = localStorage.getItem("token");
            if(token){
                setIsAuthenticated(true);
            }
            try{
                const data = await fetch('http://localhost:4321/users/dashboard-data',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                }
                );
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