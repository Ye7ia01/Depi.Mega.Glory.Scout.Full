import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FaSpinner } from "react-icons/fa";

const ProtectedRoute = ({ children }) => {
     const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return  <div style={{position: 'fixed',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',fontSize: '3rem',zIndex: 1000,}}><FaSpinner className="loading-login"/></div>;
    }

    if (!user?.token) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;