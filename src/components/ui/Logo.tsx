import React from 'react';
import logoImage from '../../assets/logo.png';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    size = 'xl',
    className = '',
    showText = false,
}) => {
    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24',
        xl: 'w-28 h-28'
    };

    const textSizeClass = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl',
        xl: 'text-5xl'
    };

    const suTtextSizeClass = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl'
    };

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <img
                src={logoImage}
                alt="Scribe's Quill"
                className={`${sizeClasses[size]} object-contain`}
            />
            {showText && (
                <div className="flex flex-col">
                    <span className={`font-medieval font-bold text-whit ${textSizeClass[size]} leading-none`}>
                        SCRIBE'S QUILL
                    </span>
                    <span className={`${suTtextSizeClass[size]} text-blue-200 italic`}>Escreva sua lenda</span>
                </div>
            )}
        </div>
    );
};