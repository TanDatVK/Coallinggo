'use client'

import Link from 'next/link'
import Image from '@/components/CustomImage'
import dynamic from 'next/dynamic'
import Logo from '@/components/Logo'
import { Crown, Menu, X, BookOpen, Trophy, User, Settings, LogIn } from 'lucide-react'
import { useState, useEffect } from 'react'
import { mockUser } from '@/data/mockData'

// Dynamic import Lottie
const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
})

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Check login status
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const userData = JSON.parse(user)
            setIsLoggedIn(userData.isLoggedIn)
        }
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Logo className="w-9 h-9" />
                        <span className="hidden sm:block text-xl font-black text-[#58cc02] tracking-tight">
                            coallingo
                        </span>
                    </Link>

                    {isLoggedIn ? (
                        /* Stats Bar - Desktop (when logged in) */
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Streak */}
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-duo-orange/10 rounded-xl hover:bg-duo-orange/20 transition-colors cursor-pointer">
                                <LottieMascot size={28} animationFile="Fire Streak Orange.json" />
                                <span className="font-bold text-duo-orange">{mockUser.streak}</span>
                            </div>

                            {/* Hearts */}
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-duo-red/10 rounded-xl hover:bg-duo-red/20 transition-colors cursor-pointer">
                                <LottieMascot size={28} animationFile="Like.json" />
                                <span className="font-bold text-duo-red">{mockUser.hearts}</span>
                            </div>

                            {/* Gems */}
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-accent-blue/10 rounded-xl hover:bg-accent-blue/20 transition-colors cursor-pointer">
                                <LottieMascot size={28} animationFile="Stone.json" />
                                <span className="font-bold text-accent-blue">{mockUser.gems}</span>
                            </div>

                            {/* Level */}
                            <div className="flex items-center gap-1.5 px-3 py-2 bg-duo-yellow/10 rounded-xl hover:bg-duo-yellow/20 transition-colors cursor-pointer">
                                <Crown className="w-5 h-5 text-duo-yellow" fill="#ffc800" />
                                <span className="font-bold text-gray-700">Lv.{mockUser.level}</span>
                            </div>
                        </div>
                    ) : (
                        /* Auth Buttons - Desktop (when not logged in) */
                        <div className="hidden lg:flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-5 py-2.5 text-primary-blue font-bold rounded-xl hover:bg-primary-blue/5 transition-all"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 bg-duo-green text-white font-bold rounded-xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all"
                            >
                                Đăng ký miễn phí
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-primary-blue hover:bg-primary-blue/5 rounded-xl transition-all"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="container px-4 py-4">
                        {isLoggedIn ? (
                            <>
                                {/* Mobile Stats */}
                                <div className="flex justify-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-1 px-3 py-2 bg-duo-orange/10 rounded-xl">
                                        <LottieMascot size={24} animationFile="Fire Streak Orange.json" />
                                        <span className="font-bold text-duo-orange text-sm">{mockUser.streak}</span>
                                    </div>
                                    <div className="flex items-center gap-1 px-3 py-2 bg-duo-red/10 rounded-xl">
                                        <LottieMascot size={24} animationFile="Like.json" />
                                        <span className="font-bold text-duo-red text-sm">{mockUser.hearts}</span>
                                    </div>
                                    <div className="flex items-center gap-1 px-3 py-2 bg-accent-blue/10 rounded-xl">
                                        <LottieMascot size={24} animationFile="Stone.json" />
                                        <span className="font-bold text-accent-blue text-sm">{mockUser.gems}</span>
                                    </div>
                                </div>

                                {/* Mobile Nav Links */}
                                <nav className="space-y-2">
                                    <Link
                                        href="/learn"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-blue/5 rounded-xl transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <BookOpen size={20} className="text-primary-blue" />
                                        <span className="font-semibold">Học</span>
                                    </Link>
                                    <Link
                                        href="/leaderboard"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-duo-yellow/5 rounded-xl transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Trophy size={20} className="text-duo-yellow" />
                                        <span className="font-semibold">Xếp hạng</span>
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-blue/5 rounded-xl transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User size={20} className="text-primary-blue" />
                                        <span className="font-semibold">Hồ sơ</span>
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Settings size={20} className="text-gray-500" />
                                        <span className="font-semibold">Cài đặt</span>
                                    </Link>
                                </nav>
                            </>
                        ) : (
                            /* Mobile Auth Buttons */
                            <div className="space-y-3">
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-primary-blue font-bold border-2 border-primary-blue rounded-xl hover:bg-primary-blue/5 transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <LogIn size={20} />
                                    Đăng nhập
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center justify-center w-full px-4 py-3 bg-duo-green text-white font-bold rounded-xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Đăng ký miễn phí
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
