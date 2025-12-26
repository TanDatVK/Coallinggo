'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ArrowLeft, Heart, Zap, Clock, Check, X, ChevronRight, Code, Play, RotateCcw, Trophy, Star } from 'lucide-react'
import Link from 'next/link'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
})

interface Question {
    id: number
    type: 'multiple-choice' | 'fill-blank' | 'code-order' | 'true-false'
    question: string
    code?: string
    options?: string[]
    correctAnswer: string | number
    explanation?: string
}

// Sample questions for different modes
const reviewQuestions: Question[] = [
    {
        id: 1,
        type: 'multiple-choice',
        question: 'Kết quả của đoạn code sau là gì?',
        code: 'x = 5\ny = 3\nprint(x + y)',
        options: ['8', '53', '15', 'Error'],
        correctAnswer: 0,
        explanation: 'Python sẽ cộng hai số nguyên 5 và 3, kết quả là 8.'
    },
    {
        id: 2,
        type: 'true-false',
        question: 'Trong Python, biến có thể bắt đầu bằng số.',
        correctAnswer: 1,
        explanation: 'Tên biến trong Python không được bắt đầu bằng số, chỉ được bắt đầu bằng chữ cái hoặc dấu gạch dưới.'
    },
    {
        id: 3,
        type: 'fill-blank',
        question: 'Để khai báo một biến tên "age" có giá trị 25, ta viết:',
        code: '___ = 25',
        correctAnswer: 'age',
        explanation: 'Trong Python, khai báo biến bằng cách viết tên biến, dấu = và giá trị.'
    },
    {
        id: 4,
        type: 'multiple-choice',
        question: 'Kiểu dữ liệu của giá trị "Hello" là gì?',
        options: ['int', 'float', 'str', 'bool'],
        correctAnswer: 2,
        explanation: '"Hello" là một chuỗi ký tự (string) trong Python.'
    },
    {
        id: 5,
        type: 'code-order',
        question: 'Sắp xếp các dòng code để in ra "Hello World":',
        options: ['print(message)', 'message = "Hello World"'],
        correctAnswer: '1,0',
        explanation: 'Phải khai báo biến trước, sau đó mới in ra.'
    }
]

const modeInfo = {
    review: {
        title: 'Ôn tập',
        description: 'Ôn lại các bài đã học',
        color: 'primary-blue',
        gradient: 'from-primary-blue to-accent-blue',
        questions: reviewQuestions
    },
    mistakes: {
        title: 'Sửa lỗi sai',
        description: 'Luyện tập các câu bạn đã sai',
        color: 'duo-orange',
        gradient: 'from-duo-orange to-duo-red',
        questions: reviewQuestions.slice(0, 3)
    },
    speed: {
        title: 'Tốc độ',
        description: 'Trả lời nhanh trong thời gian giới hạn',
        color: 'duo-yellow',
        gradient: 'from-duo-yellow to-duo-orange',
        questions: reviewQuestions
    },
    challenge: {
        title: 'Thử thách hôm nay',
        description: '10 câu hỏi ngẫu nhiên',
        color: 'duo-purple',
        gradient: 'from-duo-purple to-primary-blue',
        questions: reviewQuestions
    }
}

export default function TrainingPage() {
    const params = useParams()
    const router = useRouter()
    const mode = params.mode as keyof typeof modeInfo || 'review'

    const currentMode = modeInfo[mode] || modeInfo.review
    const questions = currentMode.questions

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [hearts, setHearts] = useState(5)
    const [xp, setXp] = useState(0)
    const [streak, setStreak] = useState(0)
    const [showExplanation, setShowExplanation] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(mode === 'speed' ? 30 : 0)
    const [fillAnswer, setFillAnswer] = useState('')

    // Timer for speed mode
    useEffect(() => {
        if (mode === 'speed' && timeLeft > 0 && !isAnswered) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleTimeout()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [timeLeft, isAnswered, mode])

    const handleTimeout = () => {
        setIsAnswered(true)
        setIsCorrect(false)
        setHearts(prev => Math.max(0, prev - 1))
        setStreak(0)
    }

    const question = questions[currentQuestion]

    const checkAnswer = () => {
        if (selectedAnswer === null && question.type !== 'fill-blank') return

        let correct = false
        if (question.type === 'fill-blank') {
            correct = fillAnswer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase()
        } else {
            correct = selectedAnswer === question.correctAnswer
        }

        setIsAnswered(true)
        setIsCorrect(correct)
        setShowExplanation(true)

        if (correct) {
            setXp(prev => prev + (mode === 'speed' ? 20 : 10))
            setStreak(prev => prev + 1)
        } else {
            setHearts(prev => Math.max(0, prev - 1))
            setStreak(0)
        }
    }

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setFillAnswer('')
            setIsAnswered(false)
            setShowExplanation(false)
            if (mode === 'speed') setTimeLeft(30)
        } else {
            setIsCompleted(true)
        }
    }

    const progress = ((currentQuestion + (isAnswered ? 1 : 0)) / questions.length) * 100

    // Completion screen
    if (isCompleted) {
        const correctAnswers = questions.filter((_, i) => i <= currentQuestion).length
        const accuracy = Math.round((xp / (questions.length * (mode === 'speed' ? 20 : 10))) * 100)

        return (
            <div className="min-h-screen bg-gradient-to-br from-duo-green/20 via-primary-blue/10 to-accent-blue/10 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center">
                    <div className="mb-6">
                        <LottieMascot size={150} animationFile="Trophy.json" />
                    </div>

                    <h1 className="text-3xl font-black text-gray-800 mb-2">Hoàn thành!</h1>
                    <p className="text-gray-600 mb-6">Bạn đã hoàn thành bài luyện tập</p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-duo-yellow/10 p-4 rounded-2xl">
                            <div className="text-2xl font-black text-duo-yellow">{xp}</div>
                            <div className="text-xs text-gray-500">XP kiếm được</div>
                        </div>
                        <div className="bg-duo-green/10 p-4 rounded-2xl">
                            <div className="text-2xl font-black text-duo-green">{accuracy}%</div>
                            <div className="text-xs text-gray-500">Độ chính xác</div>
                        </div>
                        <div className="bg-duo-orange/10 p-4 rounded-2xl">
                            <div className="text-2xl font-black text-duo-orange">{streak}</div>
                            <div className="text-xs text-gray-500">Streak cao nhất</div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/practice" className="flex-1">
                            <button className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                Về trang luyện tập
                            </button>
                        </Link>
                        <button
                            onClick={() => {
                                setCurrentQuestion(0)
                                setSelectedAnswer(null)
                                setFillAnswer('')
                                setIsAnswered(false)
                                setIsCompleted(false)
                                setXp(0)
                                setHearts(5)
                                setStreak(0)
                                if (mode === 'speed') setTimeLeft(30)
                            }}
                            className="flex-1 py-3 bg-duo-green text-white font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Làm lại
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Game over screen
    if (hearts <= 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-duo-red/20 via-duo-orange/10 to-duo-yellow/10 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center">
                    <div className="mb-6">
                        <LottieMascot size={150} animationFile="Confused.json" />
                    </div>

                    <h1 className="text-3xl font-black text-gray-800 mb-2">Hết tim rồi!</h1>
                    <p className="text-gray-600 mb-6">Đừng lo, bạn có thể thử lại</p>

                    <div className="bg-duo-yellow/10 p-4 rounded-2xl mb-6">
                        <div className="text-2xl font-black text-duo-yellow">{xp} XP</div>
                        <div className="text-xs text-gray-500">XP đã kiếm được</div>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/practice" className="flex-1">
                            <button className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                Về trang luyện tập
                            </button>
                        </Link>
                        <button
                            onClick={() => {
                                setCurrentQuestion(0)
                                setSelectedAnswer(null)
                                setFillAnswer('')
                                setIsAnswered(false)
                                setXp(0)
                                setHearts(5)
                                setStreak(0)
                                if (mode === 'speed') setTimeLeft(30)
                            }}
                            className="flex-1 py-3 bg-duo-green text-white font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700 px-4 py-3">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <Link href="/practice">
                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-400" />
                        </button>
                    </Link>

                    {/* Progress bar */}
                    <div className="flex-1 mx-4">
                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${currentMode.gradient} rounded-full transition-all duration-500`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4">
                        {mode === 'speed' && (
                            <div className={`flex items-center gap-1 font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
                                <Clock className="w-5 h-5" />
                                {timeLeft}s
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className={`w-5 h-5 ${i < hearts ? 'text-red-500' : 'text-slate-600'}`}
                                    fill={i < hearts ? '#ff4b4b' : 'none'}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 font-bold">
                            <Zap className="w-5 h-5" />
                            {xp}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-2xl w-full">
                    {/* Streak indicator */}
                    {streak >= 2 && (
                        <div className="text-center mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-duo-orange/10 text-duo-orange font-bold rounded-full animate-bounce">
                                <LottieMascot size={24} animationFile="Fire Streak Orange.json" />
                                {streak} streak!
                            </span>
                        </div>
                    )}

                    {/* Question card */}
                    <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                        <div className="text-sm text-slate-400 mb-2">
                            Câu {currentQuestion + 1} / {questions.length}
                        </div>

                        <h2 className="text-xl font-bold text-slate-100 mb-4">
                            {question.question}
                        </h2>

                        {question.code && (
                            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-700 mb-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-xs text-slate-400 font-mono">code.py</span>
                                </div>
                                <pre className="p-4 text-sm font-mono text-emerald-400 overflow-x-auto">{question.code}</pre>
                            </div>
                        )}

                        {/* Answer options based on type */}
                        {question.type === 'multiple-choice' && (
                            <div className="space-y-3">
                                {question.options?.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !isAnswered && setSelectedAnswer(index)}
                                        disabled={isAnswered}
                                        className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${isAnswered
                                            ? index === question.correctAnswer
                                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                                : selectedAnswer === index
                                                    ? 'bg-red-500/20 border-red-500 text-red-400'
                                                    : 'border-slate-600 text-slate-500 opacity-40'
                                            : selectedAnswer === index
                                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                                : 'border-slate-600 hover:border-cyan-500 hover:bg-slate-800 text-slate-200'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {isAnswered && index === question.correctAnswer && (
                                                <Check className="w-5 h-5 text-emerald-400" />
                                            )}
                                            {isAnswered && selectedAnswer === index && index !== question.correctAnswer && (
                                                <X className="w-5 h-5 text-red-400" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {question.type === 'true-false' && (
                            <div className="flex gap-4">
                                {['Đúng', 'Sai'].map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !isAnswered && setSelectedAnswer(index)}
                                        disabled={isAnswered}
                                        className={`flex-1 p-4 rounded-xl border-2 font-bold transition-all ${isAnswered
                                            ? index === question.correctAnswer
                                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                                : selectedAnswer === index
                                                    ? 'bg-red-500/20 border-red-500 text-red-400'
                                                    : 'border-slate-600 text-slate-500 opacity-40'
                                            : selectedAnswer === index
                                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                                : 'border-slate-600 hover:border-cyan-500 hover:bg-slate-800 text-slate-200'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {question.type === 'fill-blank' && (
                            <div>
                                <input
                                    type="text"
                                    value={fillAnswer}
                                    onChange={(e) => !isAnswered && setFillAnswer(e.target.value)}
                                    disabled={isAnswered}
                                    placeholder="Nhập câu trả lời..."
                                    className={`w-full p-4 rounded-xl border-2 font-mono transition-all outline-none bg-slate-900 ${isAnswered
                                        ? isCorrect
                                            ? 'border-emerald-500 text-emerald-400'
                                            : 'border-red-500 text-red-400'
                                        : 'border-slate-600 focus:border-cyan-500 text-slate-100 placeholder:text-slate-500'
                                        }`}
                                />
                                {isAnswered && !isCorrect && (
                                    <div className="mt-2 text-sm text-emerald-400 font-semibold">
                                        Đáp án đúng: {question.correctAnswer}
                                    </div>
                                )}
                            </div>
                        )}

                        {showExplanation && question.explanation && (
                            <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                                <div className={`font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng'}
                                </div>
                                <p className="text-sm text-slate-300">{question.explanation}</p>
                            </div>
                        )}
                    </div>

                    {/* Action button */}
                    <div className="mt-6">
                        {!isAnswered ? (
                            <button
                                onClick={checkAnswer}
                                disabled={selectedAnswer === null && fillAnswer === ''}
                                className={`w-full py-4 font-bold rounded-xl text-lg transition-all ${(selectedAnswer !== null || fillAnswer !== '')
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90'
                                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                Kiểm tra
                            </button>
                        ) : (
                            <button
                                onClick={nextQuestion}
                                className="w-full py-4 font-bold rounded-xl text-lg transition-all bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 flex items-center justify-center gap-2"
                            >
                                {currentQuestion < questions.length - 1 ? 'Tiếp tục' : 'Hoàn thành'}
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
