
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, amount, type, icon: Icon, trend }) => {
    const isPositive = trend > 0;

    const colorMap = {
        income: 'from-green-400 to-green-600 shadow-green-500/20',
        expense: 'from-sky-400 to-sky-600 shadow-sky-500/20',
        balance: 'from-rose-600 to-rose-800 shadow-rose-700/20'
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="premium-card p-8 group relative overflow-hidden"
        >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[type] || colorMap.balance} flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:rotate-6 ring-2 ring-white/10 text-white`}>
                    <Icon size={26} strokeWidth={2.5} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tight ${isPositive ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <p className="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-[0.2em] mb-3 transition-colors">{title}</p>
                <h3 className="text-3xl font-black tracking-tighter text-[var(--text-main)] transition-colors">
                    ₹{amount.toLocaleString('en-IN')}
                </h3>
            </div>
        </motion.div>
    );
};

export default SummaryCard;
