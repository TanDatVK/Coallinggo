'use client'

import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { BookOpen } from 'lucide-react'

interface CourseNodeProps {
    data: {
        label: string
        description?: string
        icon: string
        language: string
    }
}

function CourseNode({ data }: CourseNodeProps) {
    return (
        <div className="relative">
            <div className="w-56 p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl shadow-cyan-500/30 text-center border-2 border-white/20">
                <div className="text-4xl mb-2">{data.icon}</div>
                <h2 className="text-lg font-bold text-white">{data.label}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <BookOpen className="w-4 h-4 text-white/70" />
                    <span className="text-xs text-white/70">{data.language}</span>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 !bg-cyan-400 !border-2 !border-white"
            />
        </div>
    )
}

export default memo(CourseNode)
