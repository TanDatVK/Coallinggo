'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false)
    const [displayChildren, setDisplayChildren] = useState(children)
    const previousPathname = useRef(pathname)

    useEffect(() => {
        // Only show loading if pathname actually changed
        if (previousPathname.current === pathname) {
            setDisplayChildren(children)
            return
        }

        previousPathname.current = pathname

        // Start loading animation
        setIsLoading(true)

        // Quick transition - reduced from 800ms to 300ms
        const timer = setTimeout(() => {
            setDisplayChildren(children)
            setIsLoading(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [pathname, children])

    return (
        <>
            {/* Simple Loading Overlay - no heavy animation */}
            <div
                className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-200 ${isLoading
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Simple CSS spinner instead of Lottie */}
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-blue rounded-full animate-spin" />
                </div>
            </div>

            {/* Page Content with fade transition */}
            <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
                {displayChildren}
            </div>
        </>
    )
}
