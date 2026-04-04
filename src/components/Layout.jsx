import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children, activeTab, setActiveTab }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getTitle = () => {
        switch (activeTab) {
            case 'dashboard': return 'Dashboard';
            case 'transactions': return 'Transactions';
            case 'insights': return 'Insights';
            default: return 'Dashboard';
        }
    };

    return (
        <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <Header
                    title={getTitle()}
                    onMenuOpen={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
                    <div className="max-w-7xl mx-auto w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
