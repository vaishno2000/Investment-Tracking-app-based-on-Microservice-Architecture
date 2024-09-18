import React from 'react'
import { Navigate } from 'react-router-dom';
const AuthProvider = (WrappedComponent) => {
    return (props) => {
        // Check if the user is authenticated (you can use your sessionStorage logic here)
        const isAuthenticated = sessionStorage.getItem('userId');
    
        // If authenticated, render the wrapped component; otherwise, redirect to the login page
        return isAuthenticated ? <WrappedComponent {...props} /> : <Navigate to="/" replace />;
      };    
}

export default AuthProvider
