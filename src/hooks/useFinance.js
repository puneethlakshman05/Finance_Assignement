import { useFinance } from '../context/FinanceContext';

export const useFinanceData = () => {
    const { transactions, ...rest } = useFinance();

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpenses;

    return {
        transactions,
        totalIncome,
        totalExpenses,
        balance,
        ...rest
    };
};
