import {Navigate} from 'react-router-dom';

interface RouteProps{
    isAuthenticated:boolean,
    children:React.ReactNode
}

function ProtectedRoute({isAuthenticated, children}:RouteProps){
    if(!isAuthenticated){
        return <Navigate to='/' />;
    }
    return children;
}

export default ProtectedRoute;