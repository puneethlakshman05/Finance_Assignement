import { Moon, Sun, Bell, Menu } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Header = ({ title, onMenuOpen }) => {
    const { theme, toggleTheme, categoryFilter, setCategoryFilter } = useFinance();
    const { currentUser } = useAuth();

    return (
        <header className="h-20 shrink-0 px-6 md:px-10 flex items-center justify-between bg-transparent relative z-20">
            <div className="flex items-center gap-6">
                <button
                    onClick={onMenuOpen}
                    className="p-2.5 lg:hidden glass-panel hover:bg-primary/5 transition-all text-primary"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden sm:block">
                    <h2 className="text-xl font-black tracking-tight uppercase text-[var(--text-main)]">{title}<span className="text-primary">.</span></h2>
                    <p className="text-[9px] font-bold text-[var(--text-dim)] uppercase tracking-widest">
                        Logged in as: {currentUser?.name}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-2xl glass-panel hover:bg-primary/5 transition-all text-primary border-primary/20"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button className="hidden md:block p-3 rounded-2xl glass-panel hover:bg-primary/5 transition-all relative text-primary border-primary/20">
                        <Bell size={18} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-[var(--bg-main)]"></span>
                    </button>

                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-rose-500/20 ring-2 ring-white/10 uppercase">
                        {currentUser?.name?.[0]}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
