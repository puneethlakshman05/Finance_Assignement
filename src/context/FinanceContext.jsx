import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const { currentUser, isAdmin } = useAuth();
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('finance_transactions_v3');
        return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('finance_theme');
        if (!saved) return 'dark'; // Force DARK by default for new users
        return saved;
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('finance_transactions_v3', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        // Apply theme to document
        localStorage.setItem('finance_theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const addTransaction = (transaction) => {
        if (!isAdmin) return;
        const newTransaction = { ...transaction, id: Date.now().toString() };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id) => {
        if (!isAdmin) return;
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const updateTransaction = (id, updated) => {
        if (!isAdmin) return;
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
    };

    const exportData = (format = 'json') => {
        let content, type, ext;
        if (format === 'csv') {
            const headers = "Date,Description,Category,Type,Amount\n";
            const rows = transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`).join("\n");
            content = headers + rows;
            type = 'text/csv';
            ext = 'csv';
        } else {
            content = JSON.stringify(transactions, null, 2);
            type = 'application/json';
            ext = 'json';
        }
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `finance_report_${Date.now()}.${ext}`;
        link.click();
    };

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const value = {
        transactions: filteredTransactions,
        allTransactions: transactions,
        isAdmin,
        theme,
        toggleTheme,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        isLoading,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        exportData
    };

    return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => useContext(FinanceContext);
