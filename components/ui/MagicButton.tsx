import React from 'react';

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const MagicButton: React.FC<MagicButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`magic relative inline-flex items-center justify-center transition-all duration-300 ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default MagicButton;
