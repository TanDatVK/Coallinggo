'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import RightSidebar from '@/components/RightSidebar'
import dynamic from 'next/dynamic'
import Image from '@/components/CustomImage'
import { useRouter } from 'next/navigation'
import { mockUser } from '@/data/mockData'
import { ShoppingBag, Heart, Zap, Clock, Shield, Star, Sparkles, Crown, Gift, Check, Lock, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
})

interface ShopItem {
    id: string
    name: string
    description: string
    icon: string | React.ReactNode
    price: number
    currency: 'gems' | 'money'
    category: 'hearts' | 'powerups' | 'cosmetics' | 'premium'
    popular?: boolean
    discount?: number
    limited?: boolean
}

export default function ShopPage() {
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'hearts' | 'powerups' | 'cosmetics' | 'premium'>('all')
    const [purchasedItems, setPurchasedItems] = useState<string[]>([])

    const categories = [
        { key: 'all', label: 'Tất cả', icon: ShoppingBag },
        { key: 'hearts', label: 'Hearts', icon: Heart },
        { key: 'powerups', label: 'Power-ups', icon: Zap },
        { key: 'cosmetics', label: 'Trang trí', icon: Star },
        { key: 'premium', label: 'Premium', icon: Crown },
    ]

    const shopItems: ShopItem[] = [
        // Hearts
        {
            id: 'heart-refill',
            name: 'Hồi đầy Hearts',
            description: 'Bổ sung đầy 5 hearts ngay lập tức',
            icon: <LottieMascot size={32} animationFile="Heartbeat pulsing - loader.json" />,
            price: 350,
            currency: 'gems',
            category: 'hearts',
            popular: true
        },
        {
            id: 'heart-unlimited',
            name: 'Hearts không giới hạn',
            description: 'Vô hạn hearts trong 1 giờ',
            icon: <LottieMascot size={32} animationFile="Heartbeat pulsing - loader.json" />,
            price: 500,
            currency: 'gems',
            category: 'hearts'
        },
        {
            id: 'heart-daily',
            name: 'Hearts vô hạn 24h',
            description: 'Học cả ngày không lo hết hearts',
            icon: <LottieMascot size={32} animationFile="Heartbeat pulsing - loader.json" />,
            price: 1000,
            currency: 'gems',
            category: 'hearts',
            limited: true
        },
        // Power-ups
        {
            id: 'streak-freeze',
            name: 'Streak Freeze',
            description: 'Bảo vệ streak khi bạn quên học 1 ngày',
            icon: <LottieMascot size={64} animationFile="Streak fire.json" />,
            price: 200,
            currency: 'gems',
            category: 'powerups'
        },
        {
            id: 'double-xp',
            name: 'Double XP 15 phút',
            description: 'Gấp đôi XP trong 15 phút tiếp theo',
            icon: <LottieMascot size={64} animationFile="booster.json" />,
            price: 150,
            currency: 'gems',
            category: 'powerups',
            popular: true
        },
        {
            id: 'double-xp-hour',
            name: 'Double XP 1 giờ',
            description: 'Gấp đôi XP trong 1 giờ tiếp theo',
            icon: <LottieMascot size={64} animationFile="booster.json" />,
            price: 400,
            currency: 'gems',
            category: 'powerups'
        },
        {
            id: 'skip-level',
            name: 'Bỏ qua bài học',
            description: 'Nhảy cóc 1 bài học bất kỳ',
            icon: <LottieMascot size={64} animationFile="next button.json" />,
            price: 300,
            currency: 'gems',
            category: 'powerups'
        },
        {
            id: 'hint-pack',
            name: 'Gói 5 gợi ý',
            description: 'Nhận 5 gợi ý cho các bài khó',
            icon: <LottieMascot size={64} animationFile="Creative Idea.json" />,
            price: 100,
            currency: 'gems',
            category: 'powerups'
        },
        // Cosmetics
        {
            id: 'avatar-robot',
            name: 'Avatar Robot',
            description: 'Avatar robot siêu cool cho hồ sơ',
            icon: '🤖',
            price: 500,
            currency: 'gems',
            category: 'cosmetics'
        },
        {
            id: 'avatar-ninja',
            name: 'Avatar Ninja',
            description: 'Avatar ninja bí ẩn',
            icon: '🥷',
            price: 500,
            currency: 'gems',
            category: 'cosmetics'
        },
        {
            id: 'avatar-astronaut',
            name: 'Avatar Phi hành gia',
            description: 'Avatar phi hành gia khám phá vũ trụ',
            icon: '👨‍🚀',
            price: 750,
            currency: 'gems',
            category: 'cosmetics',
            limited: true
        },
        {
            id: 'profile-frame-gold',
            name: 'Khung vàng',
            description: 'Khung avatar màu vàng sang trọng',
            icon: '🖼️',
            price: 1000,
            currency: 'gems',
            category: 'cosmetics'
        },
        {
            id: 'streak-flame-rainbow',
            name: 'Streak Flame Cầu vồng',
            description: 'Hiệu ứng streak với màu cầu vồng',
            icon: '🌈',
            price: 1500,
            currency: 'gems',
            category: 'cosmetics',
            popular: true
        },
        // Premium
        {
            id: 'premium-monthly',
            name: 'Coallingo Pro - Tháng',
            description: 'Hearts vô hạn, không quảng cáo, tính năng độc quyền',
            icon: <Crown className="w-6 h-6 text-duo-yellow" />,
            price: 99000,
            currency: 'money',
            category: 'premium',
            popular: true,
            discount: 20
        },
        {
            id: 'premium-yearly',
            name: 'Coallingo Pro - Năm',
            description: 'Tiết kiệm 50% so với gói tháng',
            icon: <Crown className="w-6 h-6 text-duo-yellow" />,
            price: 599000,
            currency: 'money',
            category: 'premium',
            discount: 50
        },
        {
            id: 'premium-family',
            name: 'Coallingo Pro - Gia đình',
            description: 'Chia sẻ với tối đa 6 thành viên',
            icon: <Crown className="w-6 h-6 text-duo-yellow" />,
            price: 149000,
            currency: 'money',
            category: 'premium'
        }
    ]

    const gemPackages = [
        { id: 'gems_100', gems: 100, price: 19000, bonus: 0 },
        { id: 'gems_300', gems: 300, price: 49000, bonus: 30 },
        { id: 'gems_750', gems: 750, price: 99000, bonus: 100, popular: true },
        { id: 'gems_1500', gems: 1500, price: 179000, bonus: 300 },
        { id: 'gems_3500', gems: 3500, price: 349000, bonus: 1000, best: true },
    ]

    const handleBuyGems = (packageId: string) => {
        router.push(`/payment?package=${packageId}`)
    }

    const handleBuyPremium = (itemId: string) => {
        const packageId = itemId === 'premium-monthly' ? 'pro_monthly' : 'pro_yearly'
        router.push(`/payment?package=${packageId}`)
    }

    const filteredItems = selectedCategory === 'all'
        ? shopItems
        : shopItems.filter(item => item.category === selectedCategory)

    const handlePurchase = (itemId: string) => {
        setPurchasedItems([...purchasedItems, itemId])
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar />

            <main className="pt-16 lg:pl-64 xl:pr-80">
                <div className="max-w-3xl mx-auto p-4 sm:p-6">
                    {/* Hero Header */}
                    <div className="relative mb-8 p-6 bg-gradient-to-br from-accent-blue/20 via-duo-purple/10 to-duo-yellow/10 rounded-3xl border border-accent-blue/30 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-duo-yellow/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-blue/20 rounded-full mb-3">
                                    <Image src="/images/shop.png" alt="Shop" width={24} height={24} />
                                    <span className="text-xs font-bold text-accent-blue uppercase tracking-wider">
                                        Cửa hàng
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                                    Cửa hàng Coallingo
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Mua power-ups, hearts và trang trí bằng gems
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <LottieMascot size={120} animationFile="person/The man carrying the purchases. Shopping.json" />
                            </div>
                        </div>

                        {/* Your Balance */}
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex-1 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 flex items-center gap-3">
                                <LottieMascot size={40} animationFile="Stone.json" />
                                <div>
                                    <div className="text-xs text-gray-500">Stone của bạn</div>
                                    <div className="text-xl font-black text-accent-blue">{mockUser.gems.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="flex-1 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 flex items-center gap-3">
                                <LottieMascot size={40} animationFile="Like.json" />
                                <div>
                                    <div className="text-xs text-gray-500">Hearts</div>
                                    <div className="text-xl font-black text-duo-red">{mockUser.hearts}/5</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buy Gems Section */}
                    <div className="bg-gradient-to-br from-accent-blue/10 to-duo-purple/10 rounded-3xl border border-accent-blue/20 p-6 shadow-lg mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <LottieMascot size={32} animationFile="Stone.json" />
                            <h2 className="text-xl font-black text-gray-800">Mua Stone</h2>
                        </div>


                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {gemPackages.map((pkg, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleBuyGems(pkg.id)}
                                    className={`relative bg-white p-4 rounded-2xl border-2 transition-all hover:shadow-lg cursor-pointer ${pkg.popular ? 'border-accent-blue shadow-md' :
                                        pkg.best ? 'border-duo-yellow shadow-md' :
                                            'border-gray-200 hover:border-accent-blue/50'
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            PHỔ BIẾN
                                        </div>
                                    )}
                                    {pkg.best && (
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-duo-yellow text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            TỐT NHẤT
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <LottieMascot size={40} animationFile="Stone.json" />
                                        <div className="font-black text-lg text-gray-800">{pkg.gems.toLocaleString()}</div>
                                        {pkg.bonus > 0 && (
                                            <div className="text-xs text-duo-green font-bold">+{pkg.bonus} bonus</div>
                                        )}
                                        <div className="mt-2 text-sm font-bold text-accent-blue">
                                            {formatPrice(pkg.price)}đ
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setSelectedCategory(cat.key as typeof selectedCategory)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${selectedCategory === cat.key
                                    ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Shop Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {filteredItems.map((item) => {
                            const isPurchased = purchasedItems.includes(item.id)
                            const canAfford = item.currency === 'gems' && mockUser.gems >= item.price

                            return (
                                <div
                                    key={item.id}
                                    className={`bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg ${item.popular ? 'border-duo-yellow' : 'border-gray-200'
                                        }`}
                                >
                                    {item.popular && (
                                        <div className="bg-duo-yellow text-white text-xs font-bold text-center py-1">
                                            PHỔ BIẾN NHẤT
                                        </div>
                                    )}
                                    {item.limited && (
                                        <div className="bg-duo-red text-white text-xs font-bold text-center py-1">
                                            GIỚI HẠN THỜI GIAN
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl shrink-0">
                                                {typeof item.icon === 'string' ? item.icon : item.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-gray-800">{item.name}</div>
                                                <div className="text-sm text-gray-500 line-clamp-2">{item.description}</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                {item.discount && (
                                                    <span className="text-xs text-gray-400 line-through mr-1">
                                                        {item.currency === 'gems'
                                                            ? `${Math.round(item.price / (1 - item.discount / 100))}`
                                                            : formatPrice(Math.round(item.price / (1 - item.discount / 100)))
                                                        }
                                                    </span>
                                                )}
                                                {item.currency === 'gems' ? (
                                                    <span className="font-bold text-accent-blue flex items-center gap-1">
                                                        <LottieMascot size={20} animationFile="Stone.json" />
                                                        {item.price.toLocaleString()}
                                                    </span>
                                                ) : (
                                                    <span className="font-bold text-duo-green">
                                                        {formatPrice(item.price)}đ
                                                    </span>
                                                )}
                                                {item.discount && (
                                                    <span className="ml-1 text-xs bg-duo-green/20 text-duo-green px-1.5 py-0.5 rounded font-bold">
                                                        -{item.discount}%
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => {
                                                    if (item.currency === 'money') {
                                                        handleBuyPremium(item.id)
                                                    } else {
                                                        handlePurchase(item.id)
                                                    }
                                                }}
                                                disabled={isPurchased || (item.currency === 'gems' && !canAfford)}
                                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${isPurchased
                                                    ? 'bg-duo-green text-white cursor-default'
                                                    : item.currency === 'gems' && !canAfford
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-primary-blue text-white hover:brightness-110 shadow-[0_2px_0_0_#152a45] active:shadow-none active:translate-y-0.5'
                                                    }`}
                                            >
                                                {isPurchased ? (
                                                    <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Đã mua</span>
                                                ) : item.currency === 'gems' && !canAfford ? (
                                                    <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Thiếu gems</span>
                                                ) : (
                                                    'Mua ngay'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Free Rewards Section */}
                    <div className="bg-gradient-to-br from-duo-green/10 to-duo-yellow/10 rounded-3xl border border-duo-green/20 p-6 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <LottieMascot size={32} animationFile="Gift.json" />
                            <h2 className="text-xl font-black text-gray-800">Phần thưởng miễn phí</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                                    <LottieMascot size={48} animationFile="Fire Streak Orange.json" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-gray-800">Streak 7 ngày</div>
                                    <div className="text-sm text-gray-500">Nhận 50 gems miễn phí</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-duo-orange">{mockUser.streak}/7</div>
                                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                        <div className="h-full bg-duo-orange rounded-full" style={{ width: `${(mockUser.streak / 7) * 100}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-duo-purple/20 flex items-center justify-center text-2xl">
                                    📺
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-gray-800">Xem quảng cáo</div>
                                    <div className="text-sm text-gray-500">Nhận 15 gems miễn phí</div>
                                </div>
                                <button className="px-4 py-2 bg-duo-green text-white font-bold rounded-xl text-sm hover:brightness-110 shadow-[0_2px_0_0_#46a302] active:shadow-none active:translate-y-0.5 transition-all">
                                    Xem ngay
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-blue/20 flex items-center justify-center text-2xl">
                                    👥
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-gray-800">Mời bạn bè</div>
                                    <div className="text-sm text-gray-500">Nhận 100 gems cho mỗi người bạn mời</div>
                                </div>
                                <button className="px-4 py-2 bg-primary-blue text-white font-bold rounded-xl text-sm hover:brightness-110 shadow-[0_2px_0_0_#152a45] active:shadow-none active:translate-y-0.5 transition-all">
                                    Mời ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main >

            <RightSidebar />
        </div >
    )
}
