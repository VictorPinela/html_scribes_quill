// components/layout/Header.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../ui/Logo';

interface HeaderProps {
    onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white/10 backdrop-blur-md border-b border-blue-400/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Lado Esquerdo - Botão Menu e Logo */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onMenuToggle}
                            className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700/50"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex items-center space-x-2">
                            <Logo size="sm" showText />
                            {/* <span className="text-white font-cinzel text-xl">Scribe's Quill</span> */}
                        </div>
                    </div>

                    {/* Lado Direito - Informações do Usuário */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3 bg-blue-600/20 px-4 py-2 rounded-lg">
                            <span className="text-blue-200">Bem-vindo,</span>
                            <span className="text-white font-medium">{user?.name}</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Sair</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};