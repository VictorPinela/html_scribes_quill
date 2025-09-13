import React from 'react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    size = 'md',
    className = '',
    showText = true
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl'
    };

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <img
                src="/src/assets/Logo Scribes Quill.png"
                alt="Scribe's Quill Logo"
                className={`${sizeClasses[size]} object-contain`}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                }}
            />

            <div className={`${sizeClasses[size]} bg-gold rounded-full flex items-center justify-center border-2 border-ink hidden`}>
                <span className="text-ink font-medieval font-bold text-xs">D20</span>
            </div>

            {showText && (
                <div className="flex flex-col">
                    <span className={`font-medieval font-bold text-ink ${textSizes[size]} leading-none`}>
                        SCRIBE'S QUILL
                    </span>
                    <span className="text-xs text-ink/70 italic">Escreva sua lenda</span>
                </div>
            )}
        </div>
    );
};