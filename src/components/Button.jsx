import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ 
    title, 
    path, 
    func, 
    invert, 
    className, 
    id, 
    element,
    isLoading = false
}) => {

    let themeClass = invert
        ? 'bg-amber-400 text-neutral-800 border-neutral-950 hover:bg-neutral-800 hover:text-zinc-50 hover:border-amber-400'
        : 'bg-neutral-800 text-zinc-50 border-amber-400 hover:bg-amber-400 hover:text-neutral-800 hover:border-neutral-950';

    let defaultClass = `
        px-5 py-2 rounded-lg border-3 cursor-pointer text-lg text-nowrap font-bold transition-all
        disabled:opacity-60 disabled:cursor-not-allowed
    `;

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center gap-2">
                    <span className="h-3 w-3 border-2 border-t-transparent border-current rounded-full animate-spin"></span>
                </div>
            );
        }

        return title;
    };

    if (element) {
        return (
            <a href={element} className="flex-1">
                <button
                    id={id}
                    disabled={isLoading}
                    className={`w-full ${defaultClass} ${themeClass} ${className || ''}`}
                >
                    {renderContent()}
                </button>
            </a>
        )
    }

    if (func) {
        return (
            <button
                id={id}
                onClick={!isLoading ? func : undefined}
                disabled={isLoading}
                className={`flex-1 ${defaultClass} ${themeClass} ${className || ''}`}
            >
                {renderContent()}
            </button>
        )
    }

    return (
        <Link to={path ?? '/'} className="flex-1">
            <button
                id={id}
                disabled={isLoading}
                className={`w-full ${defaultClass} ${themeClass} ${className || ''}`}
            >
                {renderContent()}
            </button>
        </Link>
    )
}

export default Button
