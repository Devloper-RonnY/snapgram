import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import { useContext, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER: IUser = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
};

const INITIAL_STATE: IContextType = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const checkAuthUser = async () => {
        setIsLoading(true);
    
        try {
            const user = await getCurrentUser(); // Directly store the response
    
            console.log("Fetched User:", user); // Debug log
    
            if (user) {
                setUser({
                    id: user.accountId, // Ensure the correct ID is used
                    name: user.name || "User", // Fallback for missing name
                    username: user.username || "",
                    email: user.email || "",
                    imageUrl: user.imageUrl || "/assets/icons/profile-placeholder.svg",
                    bio: user.bio || "",
                });
    
                setIsAuthenticated(true);
                return true;
            }
    
            console.warn("⚠️ No authenticated user found.");
            setUser(INITIAL_USER); // Reset user state
            setIsAuthenticated(false);
            return false;
        } catch (error) {
            console.error("❌ Auth check error:", error);
            setUser(INITIAL_USER);
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        console.log("AuthProvider Mounted");
        if (
            localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null
        ) {
            // console.log("Redirecting to sign-in...");
            navigate('/sign-in');
        }

        checkAuthUser().then((result) => {
            console.log("Auth Check Result:", result);
            console.log("Updated User State:", user); 
        })
    }, [isAuthenticated]); // Added dependency to re-check authentication state

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated,
            setUser,
            setIsAuthenticated,
            checkAuthUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
