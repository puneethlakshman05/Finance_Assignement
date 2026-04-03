import React, { useState } from 'react';
import { Search, Plus, Filter, Download } from 'lucide-react';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import { useFinance } from '../../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';

const Transactions = () => {
    const { isAdmin, exportData, searchTerm, setSearchTerm } = useFinance();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Control Bar */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                <div className="relative group w-full lg:w-[400px]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-rose-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="cyber-input pl-14"
                    />
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 flex-1 lg:flex-none">
                        <button onClick={() => exportData('json')} className="flex-1 lg:px-4 py-3 text-[9px] font-black uppercase text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-all">
                            <Download size={14} /> JSON
                        </button>
                        <button onClick={() => exportData('csv')} className="flex-1 lg:px-4 py-3 text-[9px] font-black uppercase text-slate-400 hover:text-white border-l border-white/5 flex items-center justify-center gap-2 transition-all">
                            <Download size={14} /> CSV
                        </button>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => {
                                setEditingTransaction(null);
                                setIsFormOpen(true);
                            }}
                            className="btn-glow flex items-center gap-2 flex-1 lg:flex-none justify-center"
                        >
                            <Plus size={16} strokeWidth={3} />
                            Add Record
                        </button>
                    )}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel overflow-hidden border border-white/5"
            >
                <TransactionTable onEdit={handleEdit} />
            </motion.div>

            <AnimatePresence>
                {isFormOpen && (
                    <TransactionForm
                        isOpen={isFormOpen}
                        onClose={() => {
                            setIsFormOpen(false);
                            setEditingTransaction(null);
                        }}
                        transaction={editingTransaction}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Transactions;
