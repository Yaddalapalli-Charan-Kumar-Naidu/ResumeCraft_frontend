import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const userContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Fetch user data when the token changes
    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                method: 'get',
                url: 'http://localhost:8267/user/profile',
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            };

            try {
                const response = await axios.request(config);
                setUserData(response.data);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]); // Re-run effect when token changes

    // Provide the context value
    const contextValue = {
        userData,
        setUserData,
        loading,
        error,
        token,
        setToken
    };

    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    );
};