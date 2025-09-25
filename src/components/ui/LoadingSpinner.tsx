import React from 'react';

interface LoadingSpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'white' | 'gray' | 'gold' | 'metallic';
    className?: string;
    text?: string;
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'blue',
    className = '',
    text,
    fullScreen = false
}) => {
    // Tamanhos
    const sizeClasses = {
        xs: 'w-4 h-4',
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    // Cores
    const colorClasses = {
        blue: 'border-blue-200 border-t-blue-600',
        white: 'border-gray-200 border-t-white',
        gray: 'border-gray-200 border-t-gray-600',
        gold: 'border-yellow-200 border-t-yellow-600',
        metallic: 'border-blue-300 border-t-blue-500'
    };

    // Texto baseado no tamanho
    const textSizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center">
            <div
                className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full animate-spin ${className}`}
            />
            {text && (
                <p className={`mt-2 ${textSizes[size]} text-gray-600 font-medium`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

// Spinner com tema D&D
export const DndLoadingSpinner: React.FC<{ theme?: 'default' | 'magic' | 'fire' }> = ({
    theme = 'default'
}) => {
    const themes = {
        default: 'border-gray-200 border-t-blue-600',
        magic: 'border-purple-200 border-t-purple-600',
        fire: 'border-orange-200 border-t-orange-600'
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div className={`w-12 h-12 border-4 ${themes[theme]} rounded-full animate-spin`} />
            <div className="text-sm text-gray-600 font-cinzel">Preparando magia...</div>
        </div>
    );
};

// Spinner com dados (D20)
export const DiceLoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative w-16 h-16">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center animate-bounce">
                    <span className="text-white font-bold text-xl">20</span>
                </div>
            </div>
            <div className="text-sm text-gray-600 font-cinzel">Rolando dados...</div>
        </div>
    );
};

// Spinner para carregamento de conteúdo
export const ContentLoadingSpinner: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
    return (
        <div className="space-y-3">
            {Array.from({ length: lines }, (_, i) => (
                <div
                    key={i}
                    className="h-4 bg-gray-200 rounded animate-pulse"
                    style={{
                        width: `${100 - (i * 15)}%`,
                        animationDelay: `${i * 0.1}s`
                    }}
                />
            ))}
        </div>
    );
};

// Spinner para botões
export const ButtonLoadingSpinner: React.FC<{ variant?: 'primary' | 'secondary' }> = ({
    variant = 'primary'
}) => {
    const colors = {
        primary: 'border-white border-t-transparent',
        secondary: 'border-gray-600 border-t-transparent'
    };

    return (
        <div className={`w-5 h-5 border-2 ${colors[variant]} rounded-full animate-spin`} />
    );
};