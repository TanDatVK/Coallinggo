'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import RightSidebar from '@/components/RightSidebar'
import dynamic from 'next/dynamic'
import Image from '@/components/CustomImage'
import { mockDailyQuests, mockUser } from '@/data/mockData'
import { Target, Gift, Clock, Check, Zap, Flame, Trophy, Star, Calendar, ChevronRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
})

// Helper function to render quest icon with animations
const renderQuestIcon = (icon: string | React.ReactNode) => {
    if (icon === '⭐') {
        return <LottieMascot size={40} animationFile="Star.json" />
    }
    return icon
}

export default function QuestsPage() {
    const [claimedDaily, setClaimedDaily] = useState(false)

    const weeklyQuests = [
        {
            id: 'w1',
            title: 'Học 7 ngày liên tiếp',
            description: 'Duy trì chuỗi học tập mỗi ngày',
            icon: <LottieMascot size={48} animationFile="Fire Streak Orange.json" />,
            progress: 5,
            maxProgress: 7,
            xpReward: 200,
            gemsReward: 20,
            completed: false,
            difficulty: 'Trung bình'
        },
        {
            id: 'w2',
            title: 'Kiếm 1000 XP',
            description: 'Tích lũy XP trong tuần này',
            icon: <LottieMascot size={48} animationFile="Star.json" />,
            progress: 750,
            maxProgress: 1000,
            xpReward: 150,
            gemsReward: 15,
            completed: false,
            difficulty: 'Dễ'
        },
        {
            id: 'w3',
            title: 'Hoàn thành 20 bài học',
            description: 'Học đều đặn mỗi ngày',
            icon: '📚',
            progress: 20,
            maxProgress: 20,
            xpReward: 250,
            gemsReward: 25,
            completed: true,
            difficulty: 'Khó'
        }
    ]

    const monthlyChallenge = {
        title: 'Thử thách tháng 12',
        description: 'Hoàn thành 100 bài học trong tháng để nhận phần thưởng đặc biệt',
        progress: 48,
        maxProgress: 100,
        rewards: [
            { at: 25, icon: <LottieMascot size={40} animationFile="Stone.json" />, label: '50 Gems', claimed: true },
            { at: 50, icon: '👕', label: 'Avatar đặc biệt', claimed: false },
            { at: 75, icon: <LottieMascot size={40} animationFile="Star.json" />, label: '200 XP', claimed: false },
            { at: 100, icon: <LottieMascot size={40} animationFile="Trophy.json" />, label: 'Badge Vàng', claimed: false },
        ],
        daysLeft: 5
    }

    const dailyRewardChests = [
        { day: 1, gems: 5, opened: true },
        { day: 2, gems: 10, opened: true },
        { day: 3, gems: 15, opened: true },
        { day: 4, gems: 20, opened: false, current: true },
        { day: 5, gems: 25, opened: false },
        { day: 6, gems: 30, opened: false },
        { day: 7, gems: 50, opened: false, special: true }
    ]

    const specialEvents = [
        {
            id: 'event1',
            title: 'Cuối tuần 2x XP',
            description: 'Kiếm gấp đôi XP vào cuối tuần này!',
            icon: '🚀',
            endsIn: '2 ngày',
            active: true
        },
        {
            id: 'event2',
            title: 'Thử thách Python',
            description: 'Hoàn thành 10 bài Python để nhận avatar đặc biệt',
            icon: '🐍',
            endsIn: '5 ngày',
            active: true
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar />

            <main className="pt-16 lg:pl-64 xl:pr-80">
                <div className="max-w-3xl mx-auto p-4 sm:p-6">
                    {/* Hero Header */}
                    <div className="relative mb-8 p-6 bg-gradient-to-br from-duo-purple/20 via-primary-blue/10 to-accent-blue/10 rounded-3xl border border-duo-purple/30 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-duo-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-blue/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-duo-purple/20 rounded-full mb-3">
                                    <Image src="/images/quest.png" alt="Quest" width={24} height={24} />
                                    <span className="text-xs font-bold text-duo-purple uppercase tracking-wider">
                                        Nhiệm vụ
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                                    Hoàn thành nhiệm vụ
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Kiếm thêm XP và Gems bằng cách hoàn thành các nhiệm vụ
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <LottieMascot size={120} animationFile="Quiz mode.json" />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-4 grid grid-cols-3 gap-3">
                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 text-center">
                                <div className="text-xl font-black text-duo-purple">{mockDailyQuests.filter(q => q.completed).length}/{mockDailyQuests.length}</div>
                                <div className="text-xs text-gray-500 font-semibold">Hôm nay</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 text-center">
                                <div className="text-xl font-black text-duo-yellow">{weeklyQuests.filter(q => q.completed).length}/{weeklyQuests.length}</div>
                                <div className="text-xs text-gray-500 font-semibold">Tuần này</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 text-center">
                                <div className="text-xl font-black text-duo-green">{mockUser.streak}</div>
                                <div className="text-xs text-gray-500 font-semibold">Streak</div>
                            </div>
                        </div>
                    </div>

                    {/* Special Events Banner */}
                    <div className="mb-6 space-y-3">
                        {specialEvents.map((event) => (
                            <div
                                key={event.id}
                                className="p-4 bg-gradient-to-r from-duo-yellow/20 to-duo-orange/20 rounded-2xl border border-duo-yellow/30 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-duo-yellow/20 flex items-center justify-center text-2xl shrink-0">
                                    {event.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-gray-800 flex items-center gap-2">
                                        {event.title}
                                        <span className="text-xs bg-duo-yellow text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                                            LIVE
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 truncate">{event.description}</div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xs text-gray-500">Còn {event.endsIn}</div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Daily Reward Streak */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-black text-gray-800">Phần thưởng hàng ngày</h2>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-duo-orange font-bold">
                                <LottieMascot size={36} animationFile="Fire Streak Orange.json" />
                                {mockUser.streak} ngày liên tiếp
                            </div>
                        </div>

                        <div className="flex justify-between items-end gap-2 overflow-x-auto py-4">
                            {dailyRewardChests.map((chest) => (
                                <div key={chest.day} className="flex flex-col items-center min-w-[60px]">
                                    <div
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all relative ${chest.opened
                                            ? 'bg-gray-100 text-gray-400'
                                            : chest.current
                                                ? 'bg-duo-yellow shadow-lg shadow-duo-yellow/30'
                                                : chest.special
                                                    ? 'bg-gradient-to-br from-duo-purple to-primary-blue'
                                                    : 'bg-primary-blue/10'
                                            } ${chest.current ? 'animate-bounce' : ''}`}
                                    >
                                        {chest.opened ? '✓' : chest.special ? <LottieMascot size={40} animationFile="Trophy.json" /> : <LottieMascot size={40} animationFile="Birthday Gifts.json" />}
                                        {chest.current && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-duo-red rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">!</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">Ngày {chest.day}</div>
                                    <div className="flex items-center gap-1 text-xs font-bold text-accent-blue">
                                        <LottieMascot size={16} animationFile="Stone.json" />
                                        {chest.gems}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setClaimedDaily(true)}
                            disabled={claimedDaily}
                            className={`w-full mt-4 py-3 font-bold rounded-2xl transition-all uppercase tracking-wider ${claimedDaily
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-duo-yellow text-white shadow-[0_4px_0_0_#e5ac00] hover:brightness-105 active:shadow-none active:translate-y-1'
                                }`}
                        >
                            {claimedDaily ? '✓ Đã nhận hôm nay' : 'Nhận phần thưởng hôm nay'}
                        </button>
                    </div>

                    {/* Monthly Challenge */}
                    <div className="bg-gradient-to-br from-duo-purple/10 via-primary-blue/5 to-accent-blue/10 rounded-3xl border border-duo-purple/20 p-6 shadow-lg mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-duo-purple" />
                                <h2 className="text-xl font-black text-gray-800">{monthlyChallenge.title}</h2>
                            </div>
                            <span className="text-sm text-duo-purple font-bold bg-duo-purple/10 px-3 py-1 rounded-full">
                                Còn {monthlyChallenge.daysLeft} ngày
                            </span>
                        </div>

                        <p className="text-gray-600 mb-4">{monthlyChallenge.description}</p>

                        {/* Progress bar with milestones */}
                        <div className="relative mb-6">
                            <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-duo-purple to-primary-blue rounded-full transition-all relative"
                                    style={{ width: `${(monthlyChallenge.progress / monthlyChallenge.maxProgress) * 100}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-sm font-bold text-duo-purple">{monthlyChallenge.progress} bài</span>
                                <span className="text-sm text-gray-500">{monthlyChallenge.maxProgress} bài</span>
                            </div>
                        </div>

                        {/* Milestone rewards */}
                        <div className="flex justify-between">
                            {monthlyChallenge.rewards.map((reward, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${reward.claimed
                                        ? 'bg-duo-green text-white'
                                        : monthlyChallenge.progress >= reward.at
                                            ? 'bg-duo-purple text-white animate-pulse'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {reward.claimed ? '✓' : reward.icon}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{reward.at} bài</div>
                                    <div className="text-xs font-bold text-gray-700 text-center">{reward.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Daily Quests */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-6 h-6 text-duo-orange" />
                                <h2 className="text-xl font-black text-gray-800">Nhiệm vụ hàng ngày</h2>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                Đặt lại sau <span className="font-bold text-duo-orange">8h</span>
                            </span>
                        </div>

                        <div className="space-y-4">
                            {mockDailyQuests.map((quest) => (
                                <div
                                    key={quest.id}
                                    className={`p-4 rounded-2xl border-2 transition-all ${quest.completed
                                        ? 'bg-duo-green/10 border-duo-green/30'
                                        : 'bg-white border-gray-200 hover:border-primary-blue/30 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${quest.completed ? 'bg-duo-green' : 'bg-gray-100'
                                            }`}>
                                            {quest.completed ? <Check className="w-7 h-7 text-white" /> : renderQuestIcon(quest.icon)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`font-bold text-lg ${quest.completed ? 'text-duo-green' : 'text-gray-800'}`}>
                                                {quest.title}
                                            </div>
                                            <div className="text-sm text-gray-500">{quest.description}</div>

                                            {!quest.completed && (
                                                <div className="mt-3">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-500">{quest.progress}/{quest.maxProgress}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-duo-yellow flex items-center gap-1">
                                                                <Zap className="w-3 h-3" /> {quest.xpReward} XP
                                                            </span>
                                                            <span className="font-bold text-accent-blue flex items-center gap-1">
                                                                <LottieMascot size={16} animationFile="Stone.json" /> {quest.gemsReward}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-primary-blue to-accent-blue rounded-full transition-all"
                                                            style={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {quest.completed && (
                                            <div className="text-duo-green font-bold text-sm shrink-0">
                                                +{quest.xpReward} XP ✓
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weekly Quests */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Target className="w-6 h-6 text-duo-purple" />
                                <h2 className="text-xl font-black text-gray-800">Nhiệm vụ tuần</h2>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                Còn <span className="font-bold text-duo-purple">3 ngày</span>
                            </span>
                        </div>

                        <div className="space-y-4">
                            {weeklyQuests.map((quest) => (
                                <div
                                    key={quest.id}
                                    className={`p-4 rounded-2xl border-2 transition-all ${quest.completed
                                        ? 'bg-duo-purple/10 border-duo-purple/30'
                                        : 'bg-white border-gray-200 hover:border-duo-purple/30 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${quest.completed ? 'bg-duo-purple' : 'bg-duo-purple/10'
                                            }`}>
                                            {quest.completed ? <Check className="w-7 h-7 text-white" /> : renderQuestIcon(quest.icon)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`font-bold text-lg ${quest.completed ? 'text-duo-purple' : 'text-gray-800'}`}>
                                                    {quest.title}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${quest.difficulty === 'Dễ' ? 'bg-duo-green/20 text-duo-green' :
                                                    quest.difficulty === 'Trung bình' ? 'bg-duo-yellow/20 text-duo-yellow' :
                                                        'bg-duo-red/20 text-duo-red'
                                                    }`}>
                                                    {quest.difficulty}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">{quest.description}</div>

                                            {!quest.completed && (
                                                <div className="mt-3">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-500">{quest.progress}/{quest.maxProgress}</span>
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-duo-yellow flex items-center gap-1">
                                                                <Zap className="w-3 h-3" /> {quest.xpReward} XP
                                                            </span>
                                                            <span className="font-bold text-accent-blue flex items-center gap-1">
                                                                <LottieMascot size={16} animationFile="Stone.json" /> {quest.gemsReward}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-duo-purple to-primary-blue rounded-full transition-all"
                                                            style={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {quest.completed && (
                                            <button className="px-4 py-2 bg-duo-purple text-white font-bold rounded-xl text-sm hover:brightness-105 transition-all shadow-lg shadow-duo-purple/20 flex items-center gap-1 shrink-0">
                                                <Sparkles className="w-4 h-4" />
                                                Nhận thưởng
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <RightSidebar />
        </div>
    )
}
