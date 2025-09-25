import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Eye, EyeOff, Sword, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email e senha são obrigatórios');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {

            const response = await authService.login({ email, password });

            login(response.token, response.user);

            let redirectPath = '/dashboard';

            if (location.state?.from) {
                const fromPath = location.state.from;
                const invalidPaths = ['/login', '/register', '/load'];

                if (typeof fromPath === 'string' && !invalidPaths.includes(fromPath)) {
                    redirectPath = fromPath;
                }
            }

            navigate(redirectPath, { replace: true });

        } catch (error: unknown) {
            let errorMessage = 'Erro ao fazer login';

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage = String(error.message);
            }

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md border-2 border-blue-400/30 rounded-xl shadow-2xl p-6 border-opacity-20 w-full space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <Logo size="xl" className="justify-center mb-4" showText />
                    <h2 className="text-3xl font-cinzel text-white">Entre na sua conta</h2>
                    <p className="text-blue-200 mt-2">
                        Ou{' '}
                        <Link
                            to="/register"
                            className="font-medium text-blue-300 hover:text-blue-100"
                        >
                            crie uma nova conta
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-cinzel text-white mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-blue-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-blue-200"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        {/* Senha */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-cinzel text-white mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-3 border border-blue-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 pr-12"
                                    placeholder="Sua senha secreta"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-cinzel px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <Sword size={20} />
                                    <span>Entrar na Aventura</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Decoração temática */}
                <div className="text-center pt-6 border-t border-blue-400/20">
                    <div className="inline-flex items-center space-x-1 text-blue-200">
                        <span className="text-lg">✨</span>
                        <span className="text-lg italic">Que seus dados sejam sempre altos</span>
                        <span className="text-lg">✨</span>
                    </div>
                </div>
            </div>
        </div>
    );
};