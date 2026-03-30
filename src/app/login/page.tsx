'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ChevronRight, Github, Chrome, Code2, Terminal, Cpu } from 'lucide-react'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-48 h-48 bg-primary-blue/10 rounded-full animate-pulse" />
})

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [rememberMe, setRememberMe] = useState(false)

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ'
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsLoading(true)

        await new Promise(resolve => setTimeout(resolve, 1500))

        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const user = JSON.parse(storedUser)
            user.isLoggedIn = true
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.setItem('user', JSON.stringify({
                name: 'Code Learner',
                email: formData.email,
                isLoggedIn: true
            }))
        }

        setIsLoading(false)
        router.push('/learn')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0d1f3c] flex">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                                              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />

                    {/* Gradient orbs */}
                    <div className="absolute top-20 left-20 w-72 h-72 bg-accent-blue/30 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-64 h-64 bg-duo-purple/30 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-400/20 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />

                    {/* Floating code elements */}
                    <div className="absolute top-10 left-10 text-accent-blue/40 animate-float">
                        <Code2 size={40} />
                    </div>
                    <div className="absolute top-20 right-20 text-duo-purple/40 animate-float" style={{ animationDelay: '1s' }}>
                        <Terminal size={36} />
                    </div>
                    <div className="absolute bottom-32 left-16 text-cyan-400/40 animate-float" style={{ animationDelay: '0.5s' }}>
                        <Cpu size={32} />
                    </div>

                    {/* Code snippets floating */}
                    <div className="absolute top-1/4 right-10 font-mono text-sm text-accent-blue/30 animate-float" style={{ animationDelay: '1.5s' }}>
                        {'<code />'}
                    </div>
                    <div className="absolute bottom-1/4 left-10 font-mono text-sm text-duo-purple/30 animate-float" style={{ animationDelay: '2s' }}>
                        {'function() {}'}
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
                    {/* Astronaut Animation */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent-blue/20 rounded-full blur-3xl scale-110" />
                        <LottieMascot
                            size={280}
                            animationFile="person/Cute astronaut read book on planet cartoon.json"
                        />
                    </div>

                    {/* Text */}
                    <div className="text-center mt-8">
                        <h2 className="text-3xl font-black text-white mb-4">
                            Khám phá vũ trụ <span className="text-accent-blue">lập trình</span>
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            Học coding như đang chơi game! Tham gia cùng hàng ngàn learners trên hành trình chinh phục kỹ năng IT.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mt-8">
                        {[
                            { value: '10K+', label: 'Học viên' },
                            { value: '50+', label: 'Khóa học' },
                            { value: '98%', label: 'Hài lòng' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl font-black text-white">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-duo-purple flex items-center justify-center shadow-lg shadow-accent-blue/30">
                                <Code2 className="text-white" size={28} />
                            </div>
                            <span className="text-2xl font-black text-[#58cc02]">coallingo</span>
                        </Link>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                        <h1 className="text-2xl font-black text-white text-center mb-2">Chào mừng trở lại!</h1>
                        <p className="text-gray-400 text-center mb-6">Đăng nhập để tiếp tục hành trình</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="email@example.com"
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all ${errors.email
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-white/10 focus:border-accent-blue'
                                            } focus:outline-none focus:bg-white/10`}
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-gray-300">Mật khẩu</label>
                                    <Link href="/forgot-password" className="text-sm text-accent-blue hover:underline">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all ${errors.password
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-white/10 focus:border-accent-blue'
                                            } focus:outline-none focus:bg-white/10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-2 border-white/20 bg-transparent text-accent-blue focus:ring-accent-blue cursor-pointer"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-accent-blue to-duo-purple text-white font-black text-lg rounded-xl shadow-lg shadow-accent-blue/30 hover:shadow-accent-blue/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Đăng nhập
                                        <ChevronRight size={24} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-sm text-gray-500 font-semibold">Hoặc</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl font-bold text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all">
                                <Chrome size={20} className="text-[#4285F4]" />
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl font-bold text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all">
                                <Github size={20} />
                                GitHub
                            </button>
                        </div>

                        {/* Register Link */}
                        <p className="text-center text-gray-400 mt-6">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" className="text-accent-blue font-bold hover:underline">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>

                    {/* Demo hint */}
                    <div className="mt-4 p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-xl">
                        <p className="text-sm text-accent-blue text-center">
                            <strong>💡 Demo:</strong> Nhập bất kỳ email/mật khẩu để thử nghiệm
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
