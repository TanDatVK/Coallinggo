'use client'

import { useState, useRef } from 'react'
import Image from '@/components/CustomImage'
import { X, Upload, Check, Lock, Camera } from 'lucide-react'
import { mockAvatarCollection, Avatar } from '@/data/mockData'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
})

interface AvatarEditorModalProps {
    isOpen: boolean
    onClose: () => void
    currentAvatar: string
    customImage?: string
    onSave: (avatar: string, customImage?: string) => void
    userGems: number
}

export default function AvatarEditorModal({
    isOpen,
    onClose,
    currentAvatar,
    customImage,
    onSave,
    userGems
}: AvatarEditorModalProps) {
    const [activeTab, setActiveTab] = useState<'collection' | 'upload'>('collection')
    const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar)
    const [previewImage, setPreviewImage] = useState<string | undefined>(customImage)
    const [filter, setFilter] = useState<'all' | 'owned'>('all')
    const fileInputRef = useRef<HTMLInputElement>(null)

    if (!isOpen) return null

    const ownedAvatars = mockAvatarCollection.filter(a => a.owned)
    const shopAvatars = mockAvatarCollection.filter(a => !a.owned)
    const displayAvatars = filter === 'owned'
        ? ownedAvatars
        : mockAvatarCollection

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
                setSelectedAvatar('custom')
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = () => {
        if (selectedAvatar === 'custom' && previewImage) {
            onSave(selectedAvatar, previewImage)
        } else {
            const avatar = mockAvatarCollection.find(a => a.id === selectedAvatar)
            if (avatar?.emoji) {
                onSave(avatar.emoji)
            }
        }
        onClose()
    }

    const getRarityColor = (rarity: Avatar['rarity']) => {
        switch (rarity) {
            case 'common': return 'border-gray-300 bg-gray-50'
            case 'rare': return 'border-accent-blue bg-accent-blue/10'
            case 'epic': return 'border-duo-purple bg-duo-purple/10'
            case 'legendary': return 'border-duo-yellow bg-duo-yellow/10'
        }
    }

    const getRarityBadge = (rarity: Avatar['rarity']) => {
        switch (rarity) {
            case 'common': return null
            case 'rare': return <span className="text-[10px] bg-accent-blue text-white px-1.5 py-0.5 rounded-full font-bold">RARE</span>
            case 'epic': return <span className="text-[10px] bg-duo-purple text-white px-1.5 py-0.5 rounded-full font-bold">EPIC</span>
            case 'legendary': return <span className="text-[10px] bg-duo-yellow text-white px-1.5 py-0.5 rounded-full font-bold">LEGENDARY</span>
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-black text-gray-800">Chỉnh sửa Avatar</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Preview Section */}
                <div className="p-6 bg-gradient-to-br from-primary-blue/5 via-duo-purple/5 to-accent-blue/5 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                            <div className="text-xs text-gray-500 mb-2">Hiện tại</div>
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl border-2 border-gray-200">
                                {customImage ? (
                                    <Image src={customImage} alt="Current" width={80} height={80} className="rounded-full object-cover" />
                                ) : currentAvatar}
                            </div>
                        </div>
                        <div className="text-gray-300 text-2xl">→</div>
                        <div className="text-center">
                            <div className="text-xs text-primary-blue font-bold mb-2">Xem trước</div>
                            <div className="w-24 h-24 rounded-full bg-primary-blue/10 flex items-center justify-center text-5xl border-4 border-primary-blue shadow-lg">
                                {selectedAvatar === 'custom' && previewImage ? (
                                    <Image src={previewImage} alt="Preview" width={96} height={96} className="rounded-full object-cover" />
                                ) : (
                                    mockAvatarCollection.find(a => a.id === selectedAvatar)?.emoji || currentAvatar
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('collection')}
                        className={`flex-1 py-3 font-bold text-sm transition-all ${activeTab === 'collection'
                            ? 'text-primary-blue border-b-2 border-primary-blue'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Bộ sưu tập
                    </button>
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`flex-1 py-3 font-bold text-sm transition-all ${activeTab === 'upload'
                            ? 'text-primary-blue border-b-2 border-primary-blue'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Camera size={16} className="inline mr-1" />
                        Tải ảnh lên
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[40vh]">
                    {activeTab === 'collection' && (
                        <>
                            {/* Filter */}
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'all'
                                        ? 'bg-primary-blue text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Tất cả
                                </button>
                                <button
                                    onClick={() => setFilter('owned')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'owned'
                                        ? 'bg-duo-green text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Đã sở hữu ({ownedAvatars.length})
                                </button>
                            </div>

                            {/* Avatar Grid */}
                            <div className="grid grid-cols-4 gap-3">
                                {displayAvatars.map((avatar) => (
                                    <button
                                        key={avatar.id}
                                        onClick={() => avatar.owned && setSelectedAvatar(avatar.id)}
                                        disabled={!avatar.owned}
                                        className={`relative p-3 rounded-2xl border-2 transition-all ${avatar.owned
                                            ? selectedAvatar === avatar.id
                                                ? 'border-primary-blue bg-primary-blue/10 scale-105 shadow-lg'
                                                : `${getRarityColor(avatar.rarity)} hover:scale-105`
                                            : 'border-gray-200 bg-gray-100 opacity-60'
                                            }`}
                                    >
                                        {/* Selected Check */}
                                        {selectedAvatar === avatar.id && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-blue rounded-full flex items-center justify-center">
                                                <Check size={12} className="text-white" />
                                            </div>
                                        )}

                                        {/* Lock for unowned */}
                                        {!avatar.owned && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Lock size={16} className="text-gray-400" />
                                            </div>
                                        )}

                                        {/* Avatar */}
                                        <div className="text-3xl text-center mb-1">
                                            {avatar.emoji}
                                        </div>
                                        <div className="text-[10px] text-gray-600 text-center truncate">{avatar.name}</div>

                                        {/* Price for unowned */}
                                        {!avatar.owned && avatar.price && (
                                            <div className="mt-1 flex items-center justify-center gap-0.5 text-[10px] text-accent-blue font-bold">
                                                <LottieMascot size={12} animationFile="Stone.json" />
                                                {avatar.price}
                                            </div>
                                        )}

                                        {/* Rarity badge */}
                                        {avatar.owned && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                                                {getRarityBadge(avatar.rarity)}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'upload' && (
                        <div className="text-center py-8">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {previewImage && selectedAvatar === 'custom' ? (
                                <div className="space-y-4">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-blue shadow-xl">
                                        <Image src={previewImage} alt="Upload" width={128} height={128} className="object-cover" />
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Chọn ảnh khác
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-primary-blue hover:bg-primary-blue/5 transition-all group"
                                >
                                    <Upload size={48} className="mx-auto text-gray-300 group-hover:text-primary-blue mb-3" />
                                    <div className="font-bold text-gray-600 group-hover:text-primary-blue">
                                        Nhấn để tải ảnh lên
                                    </div>
                                    <div className="text-sm text-gray-400 mt-1">
                                        PNG, JPG, GIF (tối đa 5MB)
                                    </div>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-3 bg-primary-blue text-white font-bold rounded-xl shadow-[0_4px_0_0_#152a45] hover:brightness-110 active:shadow-none active:translate-y-1 transition-all"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    )
}
