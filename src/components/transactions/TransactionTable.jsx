import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, CreditCard, ArrowUpDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const TransactionTable = ({ onEdit }) => {
    const { transactions, isAdmin, deleteTransaction } = useFinance();
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    if (transactions.length === 0) {
        return (
            <div className="py-32 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary animate-pulse">
                    <CreditCard size={32} />
                </div>
                <h3 className="text-xl font-black uppercase text-[var(--text-main)]">No Transactions Yet</h3>
                <p className="text-[var(--text-dim)] text-[10px] font-bold uppercase tracking-widest mt-2">Start by adding your first record</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto pb-2">
            <table className="w-full text-left min-w-[700px]">
                <thead className="bg-primary/5 border-b border-[var(--border)]">
                    <tr>
                        <th onClick={() => handleSort('date')} className="py-5 px-8 text-[9px] font-black text-[var(--text-dim)] uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                            <div className="flex items-center gap-1">Date <ArrowUpDown size={10} /></div>
                        </th>
                        <th onClick={() => handleSort('description')} className="py-5 px-8 text-[9px] font-black text-[var(--text-dim)] uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                            <div className="flex items-center gap-1">Description <ArrowUpDown size={10} /></div>
                        </th>
                        <th onClick={() => handleSort('category')} className="py-5 px-8 text-[9px] font-black text-[var(--text-dim)] uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                            <div className="flex items-center gap-1">Category <ArrowUpDown size={10} /></div>
                        </th>
                        <th onClick={() => handleSort('amount')} className="py-5 px-8 text-[9px] font-black text-[var(--text-dim)] uppercase tracking-widest cursor-pointer hover:text-primary transition-colors text-right">
                            <div className="flex items-center justify-end gap-1">Amount <ArrowUpDown size={10} /></div>
                        </th>
                        {isAdmin && <th className="py-5 px-8 text-[9px] font-black text-[var(--text-dim)] uppercase tracking-widest text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                    {sortedTransactions.map((t) => (
                        <tr key={t.id} className="group hover:bg-primary/5 transition-colors">
                            <td className="py-5 px-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary border border-[var(--border)] shadow-sm">
                                        <Calendar size={18} />
                                    </div>
                                    <span className="text-[12px] font-bold text-[var(--text-main)]">{t.date}</span>
                                </div>
                            </td>
                            <td className="py-5 px-8">
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-[var(--text-main)] group-hover:text-primary transition-colors">{t.description}</span>
                                    <span className="text-[8px] font-black text-[var(--text-dim)] uppercase opacity-60">ID: {t.id.slice(-6)}</span>
                                </div>
                            </td>
                            <td className="py-5 px-8">
                                <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${t.category === 'Salary' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-primary/5 text-primary border-primary/20'
                                    }`}>
                                    {t.category}
                                </span>
                            </td>
                            <td className="py-5 px-8 text-right">
                                <span className={`text-[15px] font-black ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {t.type === 'income' ? '+' : '-'} ₹{t.amount.toLocaleString('en-IN')}
                                </span>
                            </td>
                            {isAdmin && (
                                <td className="py-5 px-8 text-right">
                                    <div className="flex items-center justify-end gap-3 transition-all">
                                        <button onClick={() => onEdit(t)} className="p-2.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-primary hover:text-white rounded-xl transition-all border border-[var(--border)] shadow-sm">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => deleteTransaction(t.id)} className="p-2.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-[var(--border)] shadow-sm">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
