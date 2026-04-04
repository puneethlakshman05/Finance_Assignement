import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, Banknote } from 'lucide-react';

const Register = ({ onSwitch }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'viewer'
    });
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = register(formData);
        if (!result.success) setError(result.message);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full glass-panel p-6 md:p-10 border-primary/20 shadow-2xl transition-all duration-500"
        >
            <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-700 text-white rounded-[20px] flex items-center justify-center mb-6 shadow-xl shadow-rose-500/20">
                    <Banknote size={32} />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-[var(--text-main)] uppercase">Finance<span className="text-primary italic">Flow</span></h2>
                <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-[0.3em] mt-1 text-center">Join Our Financial Platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest ml-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="cyber-input"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest ml-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="cyber-input"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest ml-1">Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="cyber-input font-bold appearance-none bg-[var(--bg-main)]"
                        >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="cyber-input"
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-rose-500 text-[10px] font-black bg-rose-500/5 p-3 rounded-xl border border-rose-500/20 text-center uppercase">
                        {error}
                    </div>
                )}

                <button type="submit" className="btn-glow w-full mt-2">
                    Create Account
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
                <p className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest">
                    Already have an account?
                    <button onClick={onSwitch} className="text-primary ml-2 hover:underline decoration-2 underline-offset-4">
                        Sign In
                    </button>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;
