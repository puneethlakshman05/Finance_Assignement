import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Banknote, Shield } from 'lucide-react';

const Login = ({ onSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (!result.success) setError(result.message);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full glass-panel p-6 md:p-12 border-primary/20 shadow-2xl transition-all duration-500"
        >
            <div className="flex flex-col items-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 text-white rounded-[24px] flex items-center justify-center mb-6 shadow-xl shadow-rose-500/20">
                    <Banknote size={40} />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-[var(--text-main)] uppercase">Finance<span className="text-primary italic">Flow</span></h2>
                <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-[0.3em] mt-2 text-center">Personal Wealth & Asset Management</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest ml-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="cyber-input"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest ml-1">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="cyber-input"
                    />
                </div>

                {error && (
                    <div className="text-rose-500 text-[10px] font-black bg-rose-500/5 p-4 rounded-xl border border-rose-500/20 text-center uppercase">
                        {error}
                    </div>
                )}

                <button type="submit" className="btn-glow w-full py-5 flex items-center justify-center gap-3">
                    <Shield size={18} />
                    Sign In Securely
                </button>
            </form>

            <div className="mt-10 pt-8 border-t border-[var(--border)] text-center">
                <p className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest">
                    Don't have an account?
                    <button onClick={onSwitch} className="text-primary ml-2 hover:underline decoration-2 underline-offset-4">
                        Register Now
                    </button>
                </p>
            </div>
        </motion.div>
    );
};

export default Login;
