import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types'
import { useContext, createContext, useEffect, useState } from 'react'
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
        try {
            const { currentAccount } = await getCurrentUser();
            
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                });
    
                setIsAuthenticated(true);
                return true;
            }
    
            setIsAuthenticated(false); // Ensure auth state is false if no user is found
            return false;
        } catch (error) {
            console.log("Auth check error:", error);
            setIsAuthenticated(false); // Ensure auth state resets
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        if(
            localStorage.getItem('cookieFallback') ==='[]' ||
            localStorage.getItem('cookieFallback') === null 
     ) {
      navigate('/sign-in')
     }  

     checkAuthUser();
    }, [])
    

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