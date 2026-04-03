import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('finance_users');
        return saved ? JSON.parse(saved) : [
            { id: '1', email: 'admin@finance.com', password: 'password', name: 'Admin User', role: 'admin' },
            { id: '2', email: 'user@finance.com', password: 'password', name: 'Regular User', role: 'viewer' }
        ];
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('finance_current_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        localStorage.setItem('finance_users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('finance_current_user', JSON.stringify(currentUser));
    }, [currentUser]);

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        const exists = users.find(u => u.email === userData.email);
        if (exists) {
            return { success: false, message: 'User already exists' };
        }
        const newUser = {
            ...userData,
            id: Date.now().toString(),
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        return { success: true };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        users,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
