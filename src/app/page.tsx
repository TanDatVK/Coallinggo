'use client'

import Link from 'next/link'
import Image from '@/components/CustomImage'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Zap, Users, Trophy, BookOpen } from 'lucide-react'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => (
        <div className="w-64 h-64 bg-white/20 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-6xl">💻</span>
        </div>
    )
})

// Tech items with icons
const techItems = [
    { text: 'Python', icon: '/images/python.png' },
    { text: 'JavaScript', icon: '/images/java-script.png' },
    { text: 'TypeScript', icon: '/images/typescript.png' },
    { text: 'React', icon: null },
    { text: 'Node.js', icon: null },
    { text: 'CSS', icon: '/images/css-file.png' },
    { text: 'HTML', icon: null },
    { text: 'MySQL', icon: '/images/mysql.png' },
    { text: 'AI', icon: null },
    { text: 'API', icon: null },
    { text: 'Git', icon: null },
    { text: 'Cloud', icon: null },
]

const programmingLanguages = [
    { id: 'python', name: 'PYTHON', icon: '/images/python.png' },
    { id: 'javascript', name: 'JAVASCRIPT', icon: '/images/java-script.png' },
    { id: 'typescript', name: 'TYPESCRIPT', icon: '/images/typescript.png' },
    { id: 'c', name: 'C', icon: '/images/c-.png' },
    { id: 'css', name: 'CSS', icon: '/images/css-file.png' },
    { id: 'mysql', name: 'MYSQL', icon: '/images/mysql.png' },
    { id: 'database', name: 'DATABASE', icon: '/images/database.png' },
    { id: 'nlp', name: 'NLP', icon: '/images/nlp.png' },
]

// Floating element with random trajectory - optimized for instant start
function FloatingElement({ item, index }: { item: { text: string; icon: string | null }; index: number }) {
    const trajectories = ['diagonal-1', 'diagonal-2', 'diagonal-3', 'diagonal-4', 'horizontal', 'vertical']
    const trajectory = trajectories[index % trajectories.length]
    const duration = 15 + (index % 5) * 3
    // Use negative delay to start animation at different points in its cycle
    const negativeDelay = -((index * 3) % duration)

    return (
        <div
            className={`absolute animate-${trajectory} flex items-center gap-2`}
            style={{
                animationDelay: `${negativeDelay}s`,
                animationDuration: `${duration}s`,
                top: `${10 + (index * 7) % 80}%`,
                left: `${(index * 13) % 100}%`,
            }}
        >
            {item.icon ? (
                <div className="w-8 h-8 opacity-40 hover:opacity-60 transition-opacity">
                    <Image src={item.icon} alt={item.text} width={32} height={32} className="object-contain" />
                </div>
            ) : (
                <span className="font-mono text-base font-bold text-blue-500/30 hover:text-blue-500/50 transition-colors">
                    {`<${item.text} />`}
                </span>
            )}
        </div>
    )
}

// Bubble component - optimized for instant start
function Bubble({ delay, size, left, duration }: { delay: number; size: number; left: number; duration: number }) {
    // Use negative delay to start bubble at different points in animation
    const negativeDelay = -(delay % duration)

    return (
        <div
            className="absolute bottom-0 rounded-full bg-gradient-to-br from-blue-400/40 to-cyan-400/20 backdrop-blur-sm animate-bubble"
            style={{
                width: size,
                height: size,
                left: `${left}%`,
                animationDelay: `${negativeDelay}s`,
                animationDuration: `${duration}s`
            }}
        />
    )
}

export default function Home() {
    const [languageIndex, setLanguageIndex] = useState(0)
    const [bubbles, setBubbles] = useState<{ id: number; delay: number; size: number; left: number; duration: number }[]>([])

    const visibleCount = 6
    const maxIndex = Math.max(0, programmingLanguages.length - visibleCount)

    useEffect(() => {
        const newBubbles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            delay: i * 0.8,
            size: 30 + Math.random() * 40,
            left: Math.random() * 100,
            duration: 8 + Math.random() * 4
        }))
        setBubbles(newBubbles)
    }, [])

    const scrollLeft = () => setLanguageIndex(prev => Math.max(0, prev - 1))
    const scrollRight = () => setLanguageIndex(prev => Math.min(maxIndex, prev + 1))
    const visibleLanguages = programmingLanguages.slice(languageIndex, languageIndex + visibleCount)

    return (
        <main className="min-h-screen relative overflow-x-hidden">
            {/* CSS for animations */}
            <style jsx global>{`
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
        }
        
        @keyframes diagonal-1 {
          0% { transform: translate(-100px, 100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100vw, -100vh); opacity: 0; }
        }
        
        @keyframes diagonal-2 {
          0% { transform: translate(100vw, 100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-100px, -100vh); opacity: 0; }
        }
        
        @keyframes diagonal-3 {
          0% { transform: translate(-100px, -100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100vw, 100vh); opacity: 0; }
        }
        
        @keyframes diagonal-4 {
          0% { transform: translate(100vw, -100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-100px, 100vh); opacity: 0; }
        }
        
        @keyframes horizontal {
          0% { transform: translateX(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        
        @keyframes vertical {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        
        .animate-bubble { animation: bubble 10s ease-in-out infinite; }
        .animate-diagonal-1 { animation: diagonal-1 20s linear infinite; }
        .animate-diagonal-2 { animation: diagonal-2 22s linear infinite; }
        .animate-diagonal-3 { animation: diagonal-3 18s linear infinite; }
        .animate-diagonal-4 { animation: diagonal-4 24s linear infinite; }
        .animate-horizontal { animation: horizontal 25s linear infinite; }
        .animate-vertical { animation: vertical 20s linear infinite; }
      `}</style>

            {/* Animated Tech Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 pointer-events-none overflow-hidden">
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(#1e3a5f 1px, transparent 1px),
                              linear-gradient(90deg, #1e3a5f 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Gradient Orbs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-300/25 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

                {/* Floating Bubbles */}
                {bubbles.map(bubble => (
                    <Bubble key={bubble.id} {...bubble} />
                ))}

                {/* Floating Tech Elements with random trajectories */}
                {techItems.map((item, index) => (
                    <FloatingElement key={index} item={item} index={index} />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src="/images/logo.png" alt="CoerLingo" width={40} height={40} className="rounded-xl" />
                                <span className="text-2xl font-black text-[#1e3a5f]">Coallingo</span>
                            </Link>

                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <button className="px-4 py-2 text-[#1e3a5f] font-bold rounded-xl hover:bg-gray-100 transition-colors">Đăng nhập</button>
                                </Link>
                                <Link href="/onboarding">
                                    <button className="px-5 py-2 bg-[#58cc02] text-white font-bold rounded-xl shadow-[0_3px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-0.5 transition-all">Bắt đầu</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-24 pb-16">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-12 py-8">
                            <div className="flex-1 flex justify-center">
                                <LottieMascot size={400} animationFile="Welcome.json" />
                            </div>

                            <div className="flex-1 text-center lg:text-left">
                                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-gray-900 leading-tight mb-6">
                                    Cách học lập trình
                                    <br />
                                    <span className="text-[#1e3a5f]">miễn phí, vui vẻ</span>
                                    <br />
                                    <span className="text-[#58cc02]">và hiệu quả!</span>
                                </h1>

                                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                                    Học coding với AI thông minh, theo phong cách game hóa.
                                    Kiếm XP, mở khóa levels và trở thành developer chuyên nghiệp!
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                                    <Link href="/onboarding" className="flex-1">
                                        <button className="w-full py-4 px-8 bg-[#58cc02] text-white font-extrabold text-lg rounded-2xl uppercase tracking-wide shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all">
                                            Bắt đầu học
                                        </button>
                                    </Link>
                                    <Link href="/login" className="flex-1">
                                        <button className="w-full py-4 px-8 bg-white text-[#1e3a5f] font-extrabold text-lg rounded-2xl uppercase tracking-wide border-2 border-gray-200 hover:border-[#1e3a5f] hover:bg-gray-50 shadow-sm transition-all">
                                            Đăng nhập
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="py-8 bg-[#1e3a5f] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                            backgroundSize: '20px 20px'
                        }} />
                    </div>
                    <div className="container max-w-6xl mx-auto px-4 relative">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
                            <div><div className="text-3xl font-black">10K+</div><div className="text-white/70 text-sm">Học viên</div></div>
                            <div><div className="text-3xl font-black">8+</div><div className="text-white/70 text-sm">Ngôn ngữ</div></div>
                            <div><div className="text-3xl font-black">500+</div><div className="text-white/70 text-sm">Bài học</div></div>
                            <div><div className="text-3xl font-black">AI</div><div className="text-white/70 text-sm">Hỗ trợ 24/7</div></div>
                        </div>
                    </div>
                </section>

                {/* Language Bar */}
                <section className="py-6 bg-white/60 backdrop-blur-sm border-y border-gray-200">
                    <div className="container max-w-5xl mx-auto px-4">
                        <div className="flex items-center gap-2">
                            <button onClick={scrollLeft} disabled={languageIndex === 0}
                                className={`p-2 rounded-full transition-all ${languageIndex === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-[#1e3a5f] hover:bg-gray-100'}`}>
                                <ChevronLeft size={24} />
                            </button>
                            <div className="flex-1 flex items-center justify-between gap-4">
                                {visibleLanguages.map((lang) => (
                                    <Link key={lang.id} href="/learn" className="flex items-center gap-2 hover:scale-105 transition-transform">
                                        <div className="w-8 h-8 relative"><Image src={lang.icon} alt={lang.name} fill className="object-contain" /></div>
                                        <span className="text-sm font-bold text-gray-600 uppercase tracking-wider hidden sm:block">{lang.name}</span>
                                    </Link>
                                ))}
                            </div>
                            <button onClick={scrollRight} disabled={languageIndex >= maxIndex}
                                className={`p-2 rounded-full transition-all ${languageIndex >= maxIndex ? 'text-gray-300' : 'text-gray-500 hover:text-[#1e3a5f] hover:bg-gray-100'}`}>
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 bg-white/40">
                    <div className="container max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-12">
                            Tại sao chọn <span className="text-[#1e3a5f]">Coallingo</span>?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Zap, color: '#58cc02', title: 'Học nhanh 5x', desc: 'AI phân tích và đưa bài học phù hợp' },
                                { icon: BookOpen, color: '#1cb0f6', title: 'Game hóa học tập', desc: 'Kiếm XP, streak và mở khóa thành tựu' },
                                { icon: Trophy, color: '#ff9600', title: 'Bảng xếp hạng', desc: 'Cạnh tranh với bạn bè và cộng đồng' },
                                { icon: Users, color: '#ce82ff', title: 'Cộng đồng lớn', desc: 'Học cùng hàng ngàn developers' },
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-white rounded-2xl text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${item.color}15` }}>
                                        <item.icon className="w-7 h-7" style={{ color: item.color }} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section - Free Fun Effective */}
                <section className="py-20 bg-gradient-to-br from-blue-50/50 to-cyan-50/30">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1">
                                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                                    miễn phí. vui.<br /><span className="text-[#58cc02]">hiệu quả.</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Học lập trình với Coallingo thật vui, và <span className="text-[#1e3a5f] font-bold">nghiên cứu chứng minh hiệu quả</span>!
                                    Với các bài học ngắn gọn, bạn sẽ kiếm điểm và mở khóa cấp độ mới.
                                </p>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <LottieMascot size={350} animationFile="Education Float.json" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section - Quiz Mode */}
                <section className="py-20 bg-white/60">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                            <div className="flex-1">
                                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                                    học bằng<br /><span className="text-[#1e3a5f]">quiz thú vị</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Các bài quiz tương tác giúp bạn kiểm tra kiến thức ngay lập tức với feedback từ AI.
                                </p>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <LottieMascot size={350} animationFile="Quiz mode.json" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Download Section */}
                <section className="py-20 bg-gradient-to-b from-blue-50 to-cyan-50/50">
                    <div className="container max-w-6xl mx-auto px-4 text-center">
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">học mọi lúc, mọi nơi</h2>
                        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">Tải ứng dụng và học lập trình bất cứ khi nào</p>

                        <div className="flex justify-center gap-4 mb-12">
                            <button className="flex items-center gap-3 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                                <Image src="/images/app.png" alt="App Store" width={28} height={28} />
                                <div className="text-left"><div className="text-[10px] opacity-70">Tải về trên</div><div className="font-semibold">App Store</div></div>
                            </button>
                            <button className="flex items-center gap-3 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                                <Image src="/images/android.png" alt="Google Play" width={28} height={28} />
                                <div className="text-left"><div className="text-[10px] opacity-70">Tải về trên</div><div className="font-semibold">Google Play</div></div>
                            </button>
                        </div>

                        <div className="flex justify-center items-center gap-6 flex-wrap">
                            {programmingLanguages.slice(0, 6).map((lang, index) => (
                                <div key={lang.id} className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer ${index % 2 === 0 ? 'rotate-[-5deg]' : 'rotate-[5deg]'}`}>
                                    <Image src={lang.icon} alt={lang.name} width={36} height={36} className="object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-white/70">
                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                            Sẵn sàng học<br /><span className="text-[#58cc02]">lập trình</span> chưa?
                        </h2>

                        <div className="mb-10">
                            <div className="w-48 h-56 mx-auto bg-white rounded-3xl border-4 border-[#1e3a5f] flex items-center justify-center shadow-xl overflow-hidden">
                                <LottieMascot size={160} animationFile="STUDENT.json" />
                            </div>
                        </div>

                        <Link href="/onboarding">
                            <button className="px-12 py-4 bg-[#58cc02] text-white font-extrabold text-lg rounded-2xl uppercase tracking-wide shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all">
                                Bắt đầu miễn phí
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Wave + Footer */}
                <div className="relative">
                    <svg className="w-full" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
                        <path d="M0 50L48 45.83C96 41.67 192 33.33 288 29.17C384 25 480 25 576 33.33C672 41.67 768 58.33 864 62.5C960 66.67 1056 58.33 1152 50C1248 41.67 1344 33.33 1392 29.17L1440 25V100H0V50Z" fill="#1e3a5f" />
                    </svg>
                </div>

                <footer className="bg-[#1e3a5f] text-white py-12">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <h4 className="font-bold text-lg mb-4">Về chúng tôi</h4>
                                <ul className="space-y-2 text-white/70 text-sm">
                                    <li><a href="#" className="hover:text-white">Khóa học</a></li>
                                    <li><a href="#" className="hover:text-white">Nhiệm vụ</a></li>
                                    <li><a href="#" className="hover:text-white">Nghiên cứu</a></li>
                                    <li><a href="#" className="hover:text-white">Việc làm</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4">Sản phẩm</h4>
                                <ul className="space-y-2 text-white/70 text-sm">
                                    <li><a href="#" className="hover:text-white">Coallingo Pro</a></li>
                                    <li><a href="#" className="hover:text-white">For Schools</a></li>
                                    <li><a href="#" className="hover:text-white">Podcast</a></li>
                                    <li><a href="#" className="hover:text-white">Blog</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4">Hỗ trợ</h4>
                                <ul className="space-y-2 text-white/70 text-sm">
                                    <li><a href="#" className="hover:text-white">Trung tâm trợ giúp</a></li>
                                    <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                                    <li><a href="#" className="hover:text-white">Hướng dẫn</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4">Pháp lý</h4>
                                <ul className="space-y-2 text-white/70 text-sm">
                                    <li><a href="#" className="hover:text-white">Điều khoản</a></li>
                                    <li><a href="#" className="hover:text-white">Bảo mật</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Image src="/images/logo.png" alt="CoerLingo" width={32} height={32} className="rounded-lg brightness-0 invert" />
                                <span className="text-lg font-black">Coallingo</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">📘</a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">🐦</a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">📸</a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">▶️</a>
                            </div>
                            <div className="text-sm text-white/60">© 2024 Coallingo</div>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    )
}
