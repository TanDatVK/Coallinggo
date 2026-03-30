import React from 'react'

interface LogoProps {
    className?: string
    width?: number
    height?: number
    color?: string
}

export default function Logo({
    className = '',
    width = 40,
    height = 40,
    color = '#58cc02'
}: LogoProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Base Rounded Square (Duolingo Style) */}
            <rect width="100" height="100" rx="24" fill={color} />
            <rect y="10" width="100" height="90" rx="24" fill="black" fillOpacity="0.1" />

            {/* Mascot / Feathers shape */}
            <path
                d="M25 65C25 65 30 75 50 75C70 75 75 65 75 65M35 45C35 45 35 55 42 55C49 55 49 45 49 45M51 45C51 45 51 55 58 55C65 55 65 45 65 45"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Eyes */}
            <circle cx="35" cy="35" r="8" fill="white" />
            <circle cx="65" cy="35" r="8" fill="white" />
            {/* Pupils */}
            <circle cx="38" cy="35" r="3" fill="#1e3a5f" />
            <circle cx="62" cy="35" r="3" fill="#1e3a5f" />
            {/* Beak */}
            <path d="M50 42L45 50H55L50 42Z" fill="#ffc800" />
        </svg>
    )
}
