'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from '@/components/CustomImage'
import { ChevronLeft, ChevronRight, Check, User } from 'lucide-react'

// Tech items for floating animation
const techItems = [
    { text: 'Python', icon: '/images/python.png' },
    { text: 'JavaScript', icon: '/images/java-script.png' },
    { text: 'TypeScript', icon: '/images/typescript.png' },
    { text: 'React', icon: null },
    { text: 'CSS', icon: '/images/css-file.png' },
    { text: 'MySQL', icon: '/images/mysql.png' },
    { text: 'AI', icon: null },
    { text: 'API', icon: null },
]

// Survey data
const questions = [
    {
        id: 1,
        title: 'Tên của bạn là gì?',
        subtitle: 'Chúng tôi sẽ gọi bạn bằng tên này',
        type: 'input',
        placeholder: 'Nhập tên của bạn...',
        options: []
    },
    {
        id: 2,
        title: 'Bạn biết Coallingo từ đâu?',
        subtitle: 'Giúp chúng tôi cải thiện',
        type: 'single',
        options: [
            { id: 'social', label: 'Mạng xã hội', emoji: '📱' },
            { id: 'friend', label: 'Bạn bè giới thiệu', emoji: '👥' },
            { id: 'search', label: 'Tìm kiếm Google', emoji: '🔍' },
            { id: 'ads', label: 'Quảng cáo', emoji: '📺' },
            { id: 'other', label: 'Khác', emoji: '💫' },
        ]
    },
    {
        id: 3,
        title: 'Mục tiêu học của bạn là gì?',
        subtitle: 'Chọn một hoặc nhiều mục tiêu',
        type: 'multiple',
        options: [
            { id: 'job', label: 'Có việc làm IT', emoji: '💼' },
            { id: 'freelance', label: 'Làm freelancer', emoji: '🏠' },
            { id: 'startup', label: 'Xây dựng startup', emoji: '🚀' },
            { id: 'hobby', label: 'Sở thích cá nhân', emoji: '❤️' },
            { id: 'school', label: 'Học tập ở trường', emoji: '🎓' },
            { id: 'upskill', label: 'Nâng cao kỹ năng', emoji: '📈' },
        ]
    },
    {
        id: 4,
        title: 'Bạn quan tâm đến lĩnh vực nào?',
        subtitle: 'Chọn lĩnh vực nghề nghiệp phù hợp',
        type: 'single',
        options: [
            { id: 'frontend', label: 'Web Design', icon: '/images/web-design.png', desc: 'Thiết kế giao diện website' },
            { id: 'fullstack', label: 'Full Stack', icon: '/images/full-stack.png', desc: 'Lập trình front-end & back-end' },
            { id: 'webdev', label: 'Web Developer', icon: '/images/world-wide-web.png', desc: 'Xây dựng ứng dụng web' },
            { id: 'datascience', label: 'Data Analyst', icon: '/images/business-analysis.png', desc: 'Phân tích dữ liệu kinh doanh' },
            { id: 'tester', label: 'Tester/QA', icon: '/images/testing.png', desc: 'Kiểm thử phần mềm' },
            { id: 'pm', label: 'Project Manager', icon: '/images/task-management.png', desc: 'Quản lý dự án IT' },
        ]
    },
    {
        id: 5,
        title: 'Bạn muốn học ngôn ngữ lập trình nào?',
        subtitle: 'Chọn một ngôn ngữ để bắt đầu',
        type: 'single',
        options: [
            { id: 'python', label: 'Python', icon: '/images/python.png', desc: 'AI, Data Science, Web' },
            { id: 'javascript', label: 'JavaScript', icon: '/images/java-script.png', desc: 'Web, App, Full-stack' },
            { id: 'typescript', label: 'TypeScript', icon: '/images/typescript.png', desc: 'Enterprise, React' },
            { id: 'c', label: 'C', icon: '/images/c-.png', desc: 'System, Embedded' },
            { id: 'mysql', label: 'MySQL', icon: '/images/mysql.png', desc: 'Database, Backend' },
            { id: 'css', label: 'CSS', icon: '/images/css-file.png', desc: 'Styling, Frontend' },
        ]
    },
    {
        id: 6,
        title: 'Trình độ lập trình của bạn?',
        subtitle: 'Giúp chúng tôi tùy chỉnh bài học phù hợp',
        type: 'single',
        options: [
            { id: 'beginner', label: 'Mới bắt đầu', emoji: '🌱', desc: 'Chưa biết gì về lập trình' },
            { id: 'basic', label: 'Cơ bản', emoji: '📚', desc: 'Biết một chút, đang tự học' },
            { id: 'intermediate', label: 'Trung cấp', emoji: '💻', desc: 'Đã làm dự án nhỏ' },
            { id: 'advanced', label: 'Nâng cao', emoji: '🚀', desc: 'Làm việc chuyên nghiệp' },
        ]
    },
    {
        id: 7,
        title: 'Bạn có thể dành bao nhiêu thời gian mỗi ngày?',
        subtitle: 'Chúng tôi sẽ đặt mục tiêu phù hợp',
        type: 'single',
        options: [
            { id: '5min', label: '5 phút/ngày', emoji: '⚡', desc: 'Casual - Học nhẹ nhàng' },
            { id: '10min', label: '10 phút/ngày', emoji: '🔥', desc: 'Regular - Tiến bộ đều' },
            { id: '15min', label: '15 phút/ngày', emoji: '💪', desc: 'Serious - Học nghiêm túc' },
            { id: '20min', label: '20+ phút/ngày', emoji: '🏆', desc: 'Intense - Tiến bộ nhanh' },
        ]
    }
]

// Floating element component - optimized for instant start
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
                top: `${10 + (index * 10) % 80}%`,
                left: `${(index * 15) % 100}%`,
            }}
        >
            {item.icon ? (
                <div className="w-8 h-8 opacity-40">
                    <Image src={item.icon} alt={item.text} width={32} height={32} className="object-contain" />
                </div>
            ) : (
                <span className="font-mono text-base font-bold text-blue-500/30">
                    {`<${item.text} />`}
                </span>
            )}
        </div>
    )
}

// Bubble component - optimized for instant start
function Bubble({ delay, size, left, duration }: { delay: number; size: number; left: number; duration: number }) {
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

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
    const [inputValue, setInputValue] = useState('')
    const [bubbles, setBubbles] = useState<{ id: number; delay: number; size: number; left: number; duration: number }[]>([])

    const currentQuestion = questions[currentStep]
    const totalSteps = questions.length
    const progress = ((currentStep + 1) / totalSteps) * 100

    useEffect(() => {
        const newBubbles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            delay: i * 0.8,
            size: 30 + Math.random() * 40,
            left: Math.random() * 100,
            duration: 8 + Math.random() * 4
        }))
        setBubbles(newBubbles)
    }, [])

    // Save to localStorage when completing survey
    const handleComplete = () => {
        // Save name and survey data to localStorage
        localStorage.setItem('onboardingName', inputValue || answers[1] as string || '')
        localStorage.setItem('onboardingData', JSON.stringify(answers))
    }

    const handleSelect = (optionId: string) => {
        if (currentQuestion.type === 'multiple') {
            const current = (answers[currentQuestion.id] as string[]) || []
            if (current.includes(optionId)) {
                setAnswers({ ...answers, [currentQuestion.id]: current.filter(id => id !== optionId) })
            } else {
                setAnswers({ ...answers, [currentQuestion.id]: [...current, optionId] })
            }
        } else {
            setAnswers({ ...answers, [currentQuestion.id]: optionId })
        }
    }

    const handleInputChange = (value: string) => {
        setInputValue(value)
        setAnswers({ ...answers, [currentQuestion.id]: value })
    }

    const isSelected = (optionId: string) => {
        const answer = answers[currentQuestion.id]
        if (Array.isArray(answer)) return answer.includes(optionId)
        return answer === optionId
    }

    const canProceed = () => {
        const answer = answers[currentQuestion.id]
        if (currentQuestion.type === 'input') return inputValue.trim().length > 0
        if (Array.isArray(answer)) return answer.length > 0
        return !!answer
    }

    const handleNext = () => { if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1) }
    const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1) }

    return (
        <div className="min-h-screen relative overflow-hidden">
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

            {/* Animated Background */}
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

                {/* Bubbles */}
                {bubbles.map(bubble => (
                    <Bubble key={bubble.id} {...bubble} />
                ))}

                {/* Floating Elements */}
                {techItems.map((item, index) => (
                    <FloatingElement key={index} item={item} index={index} />
                ))}
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/images/logo.png" alt="CoerLingo" width={36} height={36} className="rounded-xl" />
                            <span className="text-xl font-black text-[#1e3a5f]">Coallingo</span>
                        </Link>
                        <div className="flex-1 max-w-xs mx-8">
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#58cc02] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                        <span className="text-sm text-gray-500 font-semibold">{currentStep + 1} / {totalSteps}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 pt-24 pb-32">
                <div className="container max-w-2xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">{currentQuestion.title}</h1>
                        <p className="text-gray-500 text-lg">{currentQuestion.subtitle}</p>
                    </div>

                    {/* Input Type */}
                    {currentQuestion.type === 'input' && (
                        <div className="max-w-md mx-auto">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder={currentQuestion.placeholder}
                                    className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 text-xl font-semibold placeholder:text-gray-300 focus:outline-none focus:border-[#58cc02] focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    )}

                    {/* Options */}
                    {currentQuestion.type !== 'input' && (
                        <div className={`grid gap-4 ${currentQuestion.options.length <= 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelect(option.id)}
                                    className={`relative p-5 rounded-2xl border-2 transition-all text-left bg-white shadow-sm ${isSelected(option.id)
                                        ? 'border-[#58cc02] bg-[#58cc02]/5 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                        }`}
                                >
                                    {isSelected(option.id) && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-[#58cc02] rounded-full flex items-center justify-center">
                                            <Check size={14} className="text-white" strokeWidth={3} />
                                        </div>
                                    )}
                                    {'icon' in option ? (
                                        <div className="w-12 h-12 mb-3 relative">
                                            <Image src={option.icon} alt={option.label} fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <div className="text-3xl mb-3">{option.emoji}</div>
                                    )}
                                    <div className="font-bold text-gray-900">{option.label}</div>
                                    {'desc' in option && <div className="text-sm text-gray-500 mt-1">{option.desc}</div>}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 py-4">
                <div className="container max-w-2xl mx-auto px-4">
                    <div className="flex items-center justify-between gap-4">
                        {currentStep > 0 ? (
                            <button onClick={handleBack} className="px-6 py-3 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                                <ChevronLeft size={20} /> Quay lại
                            </button>
                        ) : <div />}

                        {currentStep < totalSteps - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={`px-8 py-3 font-bold rounded-xl flex items-center gap-2 transition-all ${canProceed()
                                    ? 'bg-[#58cc02] text-white shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Tiếp tục <ChevronRight size={20} />
                            </button>
                        ) : (
                            <Link href="/register" onClick={handleComplete}>
                                <button
                                    disabled={!canProceed()}
                                    className={`px-8 py-3 font-bold rounded-xl flex items-center gap-2 transition-all ${canProceed()
                                        ? 'bg-[#58cc02] text-white shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Hoàn thành <Check size={20} />
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
