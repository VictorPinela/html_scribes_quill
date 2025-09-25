import React from 'react';

interface SkeletonLoaderProps {
    type?: 'card' | 'list' | 'text';
    count?: number;
    className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    type = 'card',
    count = 1,
    className = ''
}) => {
    const renderCardSkeleton = () => (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-blue-400/20 animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-2 flex-1">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
            </div>
            <div className="h-2 bg-gray-300 rounded mb-2"></div>
            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
        </div>
    );

    const renderListSkeleton = () => (
        <div className="space-y-3">
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderTextSkeleton = () => (
        <div className="space-y-2">
            {Array.from({ length: count }, (_, i) => (
                <div
                    key={i}
                    className="h-4 bg-gray-300 rounded"
                    style={{ width: `${100 - (i * 10)}%` }}
                ></div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (type) {
            case 'card':
                return Array.from({ length: count }, (_, i) => (
                    <div key={i} className={className}>
                        {renderCardSkeleton()}
                    </div>
                ));
            case 'list':
                return renderListSkeleton();
            case 'text':
                return renderTextSkeleton();
            default:
                return null;
        }
    };

    return <>{renderContent()}</>;
};