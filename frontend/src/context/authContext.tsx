import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface UserContextProp {
    user: any;
    loading: boolean;
    refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextProp | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('User must be within the user provider');
    }
    return context;
}

export const UserProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchUser = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_CONTROLLER}context/middleware`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const request = await response.json();
            if (!response.ok || request.status === false) {
                setUser(null);
                return;
            }

            setUser(request.data);
        }

        catch (error) {
            setUser(null);
        }

        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const value = {
        user,
        refreshUser: fetchUser,
        loading,
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}