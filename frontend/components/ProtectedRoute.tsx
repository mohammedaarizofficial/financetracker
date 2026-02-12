import {Navigate} from 'react-router-dom';
import { useContext} from 'react';
import { AuthContext } from '../src/context/AuthContext';



function ProtectedRoute({children}:{children:React.ReactNode}){
    const auth = useContext(AuthContext);
    if(!auth?.isAuthenticated){
        return <Navigate to='/' />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;