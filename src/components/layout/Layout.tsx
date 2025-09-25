// components/layout/Layout.tsx
import React, { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
            {/* Menu Lateral (só aparece quando aberto) */}
            <Navigation
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
            />

            {/* Conteúdo Principal */}
            <div className="flex flex-col min-h-screen">
                {/* Header (sempre visível) */}
                <Header onMenuToggle={handleMenuToggle} />

                {/* Conteúdo */}
                <main className="flex-1 overflow-auto p-4 sm:p-6">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};