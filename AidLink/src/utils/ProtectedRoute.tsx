import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { getRoleFromToken } from './jwt.utils';

interface ProtectedRouteProps {
   requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({requiredRole}) => {
    const {isAuthenticated} = useAuth();
    const token = localStorage.getItem("token");
    const is_role = getRoleFromToken(token!);

    if(!isAuthenticated){
        return <Navigate to={'/login'} replace/>;
    }

    if(requiredRole && is_role !== requiredRole.toString()){
        return <Navigate to="/unauthorized" replace/>
    }

  return <Outlet/>
}

export default ProtectedRoute