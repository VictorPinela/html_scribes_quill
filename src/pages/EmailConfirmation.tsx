import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Mail, Clock, AlertCircle } from 'lucide-react';

export const EmailConfirmation: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md border-2 border-blue-400/30 rounded-xl p-8 max-w-md w-full text-center">
                <Logo size="lg" className="justify-center mb-6" showText />

                <Mail className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-cinzel text-white mb-4">Verifique seu Email</h2>

                <div className="space-y-4 text-left mb-6">
                    <p className="text-blue-200">
                        Enviamos um link de confirmação para o seu endereço de email.
                    </p>

                    <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                        <p className="text-blue-200 text-sm">
                            O link expirará em 24 horas por motivos de segurança.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                        <p className="text-blue-200 text-sm">
                            Não recebeu o email? Verifique sua pasta de spam ou lixo eletrônico.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/resend-verification"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center w-full"
                    >
                        <Mail className="w-5 h-5 mr-2" />
                        Reenviar Email de Confirmação
                    </Link>

                    <Link
                        to="/login"
                        className="text-blue-300 hover:text-blue-100 inline-block"
                    >
                        Voltar para a página de Login
                    </Link>
                </div>
            </div>
        </div>
    );
};