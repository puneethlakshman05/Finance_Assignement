import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/transactions/Transactions';
import Insights from './components/Insights';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useAuth } from './context/AuthContext';

function App() {
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[var(--bg-main)] overflow-y-auto flex flex-col items-center py-8 px-4">
                <div className="w-full max-w-md my-auto pb-8">
                    {authMode === 'login' ? (
                        <Login onSwitch={() => setAuthMode('register')} />
                    ) : (
                        <Register onSwitch={() => setAuthMode('login')} />
                    )}
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'transactions':
                return <Transactions />;
            case 'insights':
                return <Insights />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
        </Layout>
    );
}

export default App;
