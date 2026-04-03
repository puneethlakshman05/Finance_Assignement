import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const TrendChart = () => {
    const { transactions, theme } = useFinance();
    const isDark = theme === 'dark';

    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Aggregate transactions by month
    const monthlyData = {};
    let currentBalance = 0;

    sortedTransactions.forEach(curr => {
        const amount = curr.type === 'income' ? curr.amount : -curr.amount;
        currentBalance += amount;

        const dateObj = new Date(curr.date);
        const month = dateObj.toLocaleString('en-US', { month: 'short' });
        const year = dateObj.getFullYear();
        const monthKey = `${month} ${year}`;
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                month: month, // unique short month for display
                balance: 0,
                netChange: 0
            };
        }
        monthlyData[monthKey].netChange += amount;
        monthlyData[monthKey].balance = currentBalance;
    });

    const chartData = Object.values(monthlyData);

    return (
        <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#e11d48" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorStroke" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#e11d48" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 'bold' }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 'bold' }}
                        tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#0f172a' : '#ffffff',
                            borderColor: 'rgba(225, 29, 72, 0.2)',
                            borderRadius: '16px',
                            color: isDark ? '#f8fafc' : '#0f172a',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            border: '1px solid var(--border)'
                        }}
                        itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 'bold' }}
                        labelStyle={{ color: isDark ? '#94a3b8' : '#64748b' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="url(#colorStroke)"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                        activeDot={{ r: 6, fill: '#e11d48', stroke: isDark ? '#0f172a' : '#ffffff', strokeWidth: 3 }}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
