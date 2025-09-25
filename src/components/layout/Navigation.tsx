// components/layout/Navigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Users,
    Sword,
    Gem,
    BookOpen,
    ScrollText,
    Map,
    Dice5,
    X,
    LogOut,
    User,
    Settings,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../ui/Logo';

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const navigationItems = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: Home,
            current: location.pathname === '/dashboard'
        },
        {
            name: 'Personagens',
            href: '/characters',
            icon: Users,
            current: location.pathname.startsWith('/characters')
        },
        {
            name: 'Classes',
            href: '/classes',
            icon: Sword,
            current: location.pathname.startsWith('/classes')
        },
        {
            name: 'Raças',
            href: '/races',
            icon: Users,
            current: location.pathname.startsWith('/races')
        },
        {
            name: 'Magias',
            href: '/spells',
            icon: Gem,
            current: location.pathname.startsWith('/spells')
        },
        {
            name: 'Backgrounds',
            href: '/backgrounds',
            icon: BookOpen,
            current: location.pathname.startsWith('/backgrounds')
        },
        {
            name: 'Itens',
            href: '/items',
            icon: ScrollText,
            current: location.pathname.startsWith('/items')
        },
        {
            name: 'Campanhas',
            href: '/campaigns',
            icon: Map,
            current: location.pathname.startsWith('/campaigns')
        },
        {
            name: 'Ferramentas',
            href: '/tools',
            icon: Dice5,
            current: location.pathname.startsWith('/tools')
        }
    ];

    const handleLogout = () => {
        logout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
            />

            {/* Menu Lateral */}
            <div className="fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-blue-900 to-blue-950 border-r border-blue-400/30 shadow-2xl z-50 animate-in slide-in-from-left duration-300">

                {/* Cabeçalho do Menu */}
                <div className="flex items-center justify-between p-6 border-b border-blue-400/20">
                    <div className="flex items-center space-x-3">
                        <Logo size="sm" showText />
                        <div>
                            {/* <h1 className="text-xl font-cinzel text-white">Scribe's Quill</h1>
                            <p className="text-blue-200 text-sm">Seu Grimório Digital</p> */}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 text-blue-200 hover:text-white hover:bg-blue-700/50 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Informações do Usuário */}
                <div className="p-6 border-b border-blue-400/20">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{user?.name}</p>
                            <p className="text-blue-200 text-sm truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navegação */}
                <nav className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={onClose}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${item.current
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-blue-200 hover:text-white hover:bg-blue-700/50'
                                    }`}
                            >
                                <item.icon size={20} className="flex-shrink-0" />
                                <span className="font-cinzel group-hover:translate-x-1 transition-transform">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Rodapé do Menu */}
                <div className="p-6 border-t border-blue-400/20">
                    <div className="space-y-2">
                        <Link
                            to="/settings"
                            onClick={onClose}
                            className="flex items-center space-x-3 px-4 py-2 text-blue-200 hover:text-white hover:bg-blue-700/50 rounded-lg transition-colors duration-200 group"
                        >
                            <Settings size={18} />
                            <span>Configurações</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-2 text-red-200 hover:text-red-100 hover:bg-red-600/20 rounded-lg transition-colors duration-200 w-full group"
                        >
                            <LogOut size={18} />
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};