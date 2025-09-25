/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { CheckCircle, XCircle, Mail } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setStatus('error');
                setMessage('Token de verificação não encontrado');
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}auth/verify-email?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message);
                } else {
                    setStatus('error');
                    setMessage(data.message);
                }
            } catch (error) {
                setStatus('error');
                setMessage('Erro ao verificar email. Tente novamente.');
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md border-2 border-blue-400/30 rounded-xl p-8 max-w-md w-full text-center">
                <Logo size="lg" className="justify-center mb-6" showText />

                {status === 'loading' && (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                        <h2 className="text-2xl font-cinzel text-white mb-4">Verificando email...</h2>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-cinzel text-white mb-4">Email Verificado!</h2>
                        <p className="text-blue-200 mb-6">{message}</p>
                        <Link
                            to="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
                        >
                            Fazer Login
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-cinzel text-white mb-4">Erro na Verificação</h2>
                        <p className="text-blue-200 mb-6">{message}</p>
                        <div className="space-y-3">
                            <Link
                                to="/resend-verification"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
                            >
                                <Mail className="w-5 h-5 inline mr-2" />
                                Reenviar Email
                            </Link>
                            <Link
                                to="/login"
                                className="text-blue-300 hover:text-blue-100 inline-block ml-4"
                            >
                                Voltar ao Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};