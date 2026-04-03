import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, LayoutDashboard, SearchX } from 'lucide-react';
import SummaryCard from './SummaryCard';
import TrendChart from './TrendChart';
import CategoryChart from './CategoryChart';
import { useFinance } from '../../context/FinanceContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { transactions, searchTerm } = useFinance();

    const balance = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

    if (transactions.length === 0 && searchTerm) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 glass-panel"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                    <SearchX size={40} />
                </div>
                <h2 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight mb-2">No Results Found<span className="text-primary">.</span></h2>
                <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest">Query: "{searchTerm}"</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8 pb-10 transition-all duration-500">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-[20px] flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                        <LayoutDashboard size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tight uppercase text-[var(--text-main)]">Financial Overview<span className="text-primary">.</span></h3>
                        <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest mt-0.5">Real-time Performance Metrics</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 relative z-10 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-[var(--border)] pt-6 md:pt-0 md:pl-10">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Efficiency</p>
                        <p className="text-xl font-black text-[var(--text-main)]">98.4%</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Status</p>
                        <p className="text-xl font-black text-secondary flex items-center gap-2 uppercase">
                            Healthy
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <SummaryCard title="Total Balance" amount={balance} type="balance" icon={IndianRupee} trend={12.5} />
                <SummaryCard title="Total Income" amount={totalIncome} type="income" icon={TrendingUp} trend={8.2} />
                <SummaryCard title="Total Expenses" amount={totalExpenses} type="expense" icon={TrendingDown} trend={-4.3} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 pb-10">
                <div className="premium-card p-8 md:p-10 group">
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                            <h3 className="text-lg font-black tracking-tight uppercase text-[var(--text-main)]">Balance Trend</h3>
                            <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest">Historical Asset Flow</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <TrendChart />
                </div>

                <div className="premium-card p-8 md:p-10 group">
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                            <h3 className="text-lg font-black tracking-tight uppercase text-[var(--text-main)]">Spending Breakdown</h3>
                            <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest">Categorical Analysis</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                            <TrendingDown size={20} />
                        </div>
                    </div>
                    <CategoryChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
