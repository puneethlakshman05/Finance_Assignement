import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const COLORS = [
    '#e11d48', // Rose
    '#0ea5e9', // Sky
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#8b5cf6', // Violet
    '#f43f5e', // Pink
    '#6366f1'  // Indigo
];

const CategoryChart = () => {
    const { transactions, theme } = useFinance();
    const isDark = theme === 'dark';

    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    let data = Object.keys(categoryTotals).map(name => ({
        name,
        value: categoryTotals[name]
    })).sort((a, b) => b.value - a.value);

    // Limit categories to top 4 and group others
    if (data.length > 4) {
        const top4 = data.slice(0, 4);
        const othersValue = data.slice(4).reduce((sum, item) => sum + item.value, 0);
        data = [...top4, { name: 'Other', value: othersValue }];
    }

    return (
        <div className="h-[300px] w-full mt-4">
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={5}
                            cornerRadius={6}
                            dataKey="value"
                            stroke={isDark ? '#0f172a' : '#ffffff'}
                            strokeWidth={3}
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                                borderColor: 'rgba(225, 29, 72, 0.2)',
                                borderRadius: '16px',
                                // color: isDark ? '#f8fafc' : '#0f172a',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                border: '1px solid var(--border)'
                            }}
                            itemStyle={{ fontWeight: 'bold', color: isDark ? '#f8fafc' : '#0f172a' }}
                            labelStyle={{ color: isDark ? '#94a3b8' : '#64748b' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-[var(--text-dim)] font-black uppercase text-[10px] tracking-widest italic">
                    No categorical data
                </div>
            )}
        </div>
    );
};

export default CategoryChart;
