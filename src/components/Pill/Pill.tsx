import React from 'react'
import { IPill } from './types'
import classNames from 'classnames'

const Pill: React.FC<IPill> = ({ title, color }) => {
    const pillClass = classNames({
        // Using tailwindcss classes
        "text-white text-sm font-semibold leading-none px-2 py-1 rounded-full inline-block": true,
        "bg-red-500": color === 'red',
        
    });
    return (
        <div className = "w-auto"> 
            <div className = {pillClass}> {title} </div>
        </div>
    )
}

export default Pill