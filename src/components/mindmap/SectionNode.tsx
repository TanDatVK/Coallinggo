'use client'

import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { CheckCircle, Circle, Clock } from 'lucide-react'

interface SectionNodeProps {
    data: {
        label: string
        duration: number
        completed: boolean
        order: number
        onClick?: () => void
    }
}

function SectionNode({ data }: SectionNodeProps) {
    return (
        <div
            className="relative cursor-pointer transition-transform hover:scale-105"
            onClick={data.onClick}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="w-2 h-2 !bg-slate-400 !border-2 !border-slate-900"
            />

            <div className={`w-44 flex items-center gap-2 p-3 rounded-lg border transition-all ${data.completed
                    ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500'
                    : 'bg-slate-800/80 border-slate-600 hover:border-cyan-500'
                }`}>
                {data.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                    <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                    <span className={`text-xs block truncate ${data.completed ? 'text-slate-400' : 'text-slate-200'
                        }`}>
                        {data.order}. {data.label}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px]">{data.duration} min</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SectionNode)
