'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff, ChevronRight, Github, Chrome, Code2, Rocket, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-48 h-48 bg-duo-green/10 rounded-full animate-pulse" />
})

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Load name from onboarding
    useEffect(() => {
        const savedName = localStorage.getItem('onboardingName')
        if (savedName) {
            setFormData(prev => ({ ...prev, name: savedName }))
        }
    }, [])

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập tên của bạn'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ'
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsLoading(true)

        await new Promise(resolve => setTimeout(resolve, 1500))

        localStorage.setItem('user', JSON.stringify({
            name: formData.name,
            email: formData.email,
            isLoggedIn: true
        }))

        setIsLoading(false)
        router.push('/learn')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0d1f3c] flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-6">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-duo-green to-accent-cyan flex items-center justify-center shadow-lg shadow-duo-green/30">
                                <Rocket className="text-white" size={28} />
                            </div>
                            <span className="text-2xl font-black text-white">Coallingo</span>
                        </Link>
                    </div>

                    {/* Register Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                        <h1 className="text-2xl font-black text-white text-center mb-2">Bắt đầu hành trình!</h1>
                        <p className="text-gray-400 text-center mb-6">Tạo tài khoản để học lập trình miễn phí</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Tên của bạn</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Nhập tên của bạn"
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all ${errors.name
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-white/10 focus:border-duo-green'
                                            } focus:outline-none focus:bg-white/10`}
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                            </div>

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
                                            : 'border-white/10 focus:border-duo-green'
                                            } focus:outline-none focus:bg-white/10`}
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Mật khẩu</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Tối thiểu 6 ký tự"
                                        className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all ${errors.password
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-white/10 focus:border-duo-green'
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

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Xác nhận mật khẩu</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="Nhập lại mật khẩu"
                                        className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all ${errors.confirmPassword
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-white/10 focus:border-duo-green'
                                            } focus:outline-none focus:bg-white/10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-duo-green to-accent-cyan text-white font-black text-lg rounded-xl shadow-lg shadow-duo-green/30 hover:shadow-duo-green/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        Tạo tài khoản
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

                        {/* Login Link */}
                        <p className="text-center text-gray-400 mt-6">
                            Đã có tài khoản?{' '}
                            <Link href="/login" className="text-duo-green font-bold hover:underline">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="text-center text-gray-500 text-xs mt-4">
                        Bằng cách đăng ký, bạn đồng ý với{' '}
                        <Link href="#" className="text-accent-blue hover:underline">Điều khoản</Link>
                        {' '}và{' '}
                        <Link href="#" className="text-accent-blue hover:underline">Chính sách bảo mật</Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(rgba(88, 204, 2, 0.3) 1px, transparent 1px),
                                              linear-gradient(90deg, rgba(88, 204, 2, 0.3) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />

                    {/* Gradient orbs */}
                    <div className="absolute top-20 right-20 w-72 h-72 bg-duo-green/30 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-cyan/30 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-duo-yellow/20 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />

                    {/* Floating elements */}
                    <div className="absolute top-16 right-16 text-duo-green/40 animate-float">
                        <Code2 size={40} />
                    </div>
                    <div className="absolute bottom-20 right-20 text-accent-cyan/40 animate-float" style={{ animationDelay: '1s' }}>
                        <Rocket size={36} />
                    </div>
                    <div className="absolute top-1/3 left-16 text-duo-yellow/40 animate-float" style={{ animationDelay: '0.5s' }}>
                        <Sparkles size={32} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
                    {/* Rocket Animation */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-duo-green/20 rounded-full blur-3xl scale-110" />
                        <LottieMascot
                            size={280}
                            animationFile="Rocket Lottie Animation.json"
                        />
                    </div>

                    {/* Text */}
                    <div className="text-center mt-8">
                        <h2 className="text-3xl font-black text-white mb-4">
                            Sẵn sàng <span className="text-duo-green">cất cánh</span>?
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            Tham gia cộng đồng lập trình viên tương lai! Học từ cơ bản đến nâng cao với hàng trăm bài học tương tác.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 gap-3 mt-8 w-full max-w-xs">
                        {[
                            { icon: '🎮', text: 'Học như chơi game' },
                            { icon: '🏆', text: 'Giành huy hiệu & thành tích' },
                            { icon: '📊', text: 'Theo dõi tiến độ chi tiết' },
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                <span className="text-2xl">{feature.icon}</span>
                                <span className="font-bold text-gray-300">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
