import React from 'react';
import logoImage from '../../assets/logo.png';

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

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <img
                src={logoImage}
                alt="Scribe's Quill"
                className={`${sizeClasses[size]} object-contain`}
            />
            {showText && (
                <div className="flex flex-col">
                    <span className="font-medieval font-bold text-white text-lg leading-none">
                        SCRIBE'S QUILL
                    </span>
                    <span className="text-xs text-blue-200 italic">Escreva sua lenda</span>
                </div>
            )}
        </div>
    );
};