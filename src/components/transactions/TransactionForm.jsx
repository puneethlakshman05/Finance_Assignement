import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { motion } from 'framer-motion';

const TransactionForm = ({ isOpen, onClose, transaction }) => {
    const { addTransaction, updateTransaction } = useFinance();
    const [formData, setFormData] = useState(transaction || {
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transaction) {
            updateTransaction(transaction.id, formData);
        } else {
            addTransaction(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-panel w-full max-w-lg p-6 md:p-10 relative z-10 border border-primary/20 shadow-xl max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight">
                            {transaction ? 'Edit Transaction' : 'Add Transaction'}<span className="text-primary">.</span>
                        </h2>
                        <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest">Update your financial records</p>
                    </div>
                    <button onClick={onClose} className="p-2.5 bg-primary/5 hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/10 text-primary">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--text-dim)] tracking-widest ml-1">Amount (₹)</label>
                            <input
                                type="number"
                                required
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                                className="cyber-input text-lg font-black"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--text-dim)] tracking-widest ml-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="cyber-input font-bold appearance-none bg-[var(--bg-main)]"
                            >
                                {['Food', 'Rent', 'Salary', 'Shopping', 'Transport', 'Utilities', 'Investment'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-[var(--text-dim)] tracking-widest ml-1">Description</label>
                        <input
                            type="text"
                            required
                            placeholder="What was this for?"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="cyber-input"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--text-dim)] tracking-widest ml-1">Type</label>
                            <div className="flex bg-[var(--bg-main)] p-1 rounded-2xl border border-[var(--border)] gap-1">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'income' })}
                                    className={`flex-1 py-3 text-[9px] font-black uppercase rounded-xl transition-all ${formData.type === 'income' ? 'bg-emerald-500 text-white shadow-md' : 'text-[var(--text-dim)] hover:text-primary'
                                        }`}
                                >
                                    Income
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                                    className={`flex-1 py-3 text-[9px] font-black uppercase rounded-xl transition-all ${formData.type === 'expense' ? 'bg-rose-500 text-white shadow-md' : 'text-[var(--text-dim)] hover:text-primary'
                                        }`}
                                >
                                    Expense
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--text-dim)] tracking-widest ml-1">Date</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="cyber-input font-bold"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-glow w-full mt-4 flex items-center justify-center gap-3">
                        <Save size={18} />
                        Save Transaction
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default TransactionForm;
