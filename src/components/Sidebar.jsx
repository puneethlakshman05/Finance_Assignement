import {
    LayoutDashboard,
    ReceiptIndianRupee,
    TrendingUp,
    LogOut,
    X,
    Banknote
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFinance } from '../context/FinanceContext';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
    const { currentUser, logout } = useAuth();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions', label: 'Transactions', icon: ReceiptIndianRupee },
        { id: 'insights', label: 'Insights', icon: TrendingUp },
    ];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-sidebar)] border-r border-[var(--border)] h-screen
                transform transition-all duration-300 lg:static lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col overflow-y-auto
            `}>
                <div className="p-8 shrink-0">
                    <div className="flex justify-end lg:hidden mb-6">
                        <button
                            onClick={onClose}
                            className="p-2.5 bg-primary/10 rounded-xl text-primary transition-all hover:bg-primary/20 shadow-sm"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                            <Banknote size={22} />
                        </div>
                        <h1 className="text-xl font-black tracking-tight text-[var(--text-main)] uppercase">Finance<span className="text-primary italic">Flow</span></h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-2">
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={`nav-item ${activeTab === item.id ? 'nav-item-active' : 'hover:bg-primary/5 hover:text-primary'}`}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="p-6 mt-auto border-t border-[var(--border)] space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-md uppercase">
                            {currentUser?.name?.[0]}
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="text-[11px] font-black uppercase truncate text-[var(--text-main)]">{currentUser?.name}</h4>
                            <p className="text-[9px] font-bold text-primary uppercase tracking-widest">{currentUser?.role}</p>
                        </div>
                    </div>

                    <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-3.5 text-[var(--text-dim)] font-bold text-[10px] uppercase tracking-widest hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
