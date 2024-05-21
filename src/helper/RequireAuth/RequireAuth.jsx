import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.config';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
    // const [user, loading] = useAuthState(auth);
    const { authUser, loading } = useSelector(store => store.user);
    const location = useLocation();

    if (loading) {
        return <p>Loading...</p>
    }
    if (!authUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;