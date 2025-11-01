import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ title, path, func , invert , className  , id}) => {

    let themeClass = invert ? (
        'bg-amber-400 text-neutral-800 border-neutral-950 hover:bg-neutral-800 hover:text-zinc-50 hover:border-amber-400'
    ) : 'bg-neutral-800 text-zinc-50 border-amber-400 hover:bg-amber-400 hover:text-neutral-800 hover:border-neutral-950';

    let defaultClass = 'px-5 py-2 rounded-lg border-3 cursor-pointer text-lg text-nowrap font-bold transition-all ';

    if (func) {
        return (
            <button id={id} onClick={func} className={`flex-1 ${defaultClass} ${themeClass} ${className || ''}`}>{title}</button>
        )
    } else {
        return (
            <Link to={path ?? '/'} className='flex-1'>
                <button id={id} className={`w-full ${defaultClass} ${themeClass} ${className || ''}`}>{title}</button>
            </Link>
        )
    }

}

export default Button