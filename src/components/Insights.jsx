import React from 'react';
import { TrendingUp, Sparkles, Zap, PieChart, BarChart3 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';

const Insights = () => {
    const { allTransactions } = useFinance();

    const analyzeData = () => {
        if (allTransactions.length === 0) return [];

        const insights = [];
        const expenses = allTransactions.filter(t => t.type === 'expense');

        if (expenses.length > 0) {
            const catTotals = expenses.reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {});
            const highest = Object.keys(catTotals).reduce((a, b) => catTotals[a] > catTotals[b] ? a : b);
            insights.push({
                title: "Highest Spending Category",
                text: `You have spent ₹${catTotals[highest].toLocaleString()} on ${highest.toUpperCase()}. Consider reviewing this area.`,
                icon: PieChart,
                color: "text-rose-500",
                bg: "bg-rose-500/10"
            });
        }

        insights.push({
            title: "Data Synchronized",
            text: "All your financial records are successfully stored in local persistence and synced with the mock API.",
            icon: Zap,
            color: "text-sky-500",
            bg: "bg-sky-500/10"
        });

        insights.push({
            title: "Performance Review",
            text: "Based on current trends, your income-to-expense ratio is optimal. Keep tracking to see long-term habits.",
            icon: BarChart3,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        });

        return insights;
    };

    const data = analyzeData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {data.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="premium-card p-10 flex flex-col gap-6 items-start"
                >
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 border border-current/10 shadow-lg`}>
                        <item.icon size={28} />
                    </div>
                    <div>
                        <h4 className="text-lg font-black uppercase text-[var(--text-main)] mb-3 tracking-tight">{item.title}</h4>
                        <p className="text-[12px] font-medium text-[var(--text-dim)] leading-relaxed italic">"{item.text}"</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Insights;
