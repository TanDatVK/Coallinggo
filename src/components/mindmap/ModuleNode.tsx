'use client'

import { memo } from 'react'
import { Handle, Position } from 'reactflow'

interface ModuleNodeProps {
    data: {
        label: string
        description?: string
        completed: boolean
        lessonCount: number
        completedCount: number
        completionPercentage: number
        moduleNumber: number
        onClick?: () => void
    }
}

function ModuleNode({ data }: ModuleNodeProps) {
    return (
        <div
            className="relative cursor-pointer transition-transform hover:scale-105"
            onClick={data.onClick}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 !bg-purple-400 !border-2 !border-slate-900"
            />

            <div className={`w-48 p-4 rounded-xl border-2 transition-all ${data.completionPercentage === 100
                    ? 'bg-emerald-500/20 border-emerald-500'
                    : 'bg-slate-800 border-purple-500 hover:border-purple-400'
                }`}>
                {/* Progress Ring */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center">
                    <span className={`text-xs font-bold ${data.completionPercentage === 100 ? 'text-emerald-400' : 'text-purple-400'
                        }`}>
                        {data.completionPercentage.toFixed(0)}%
                    </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${data.completionPercentage === 100
                            ? 'bg-emerald-500 text-white'
                            : 'bg-purple-500 text-white'
                        }`}>
                        {data.moduleNumber}
                    </div>
                    <h3 className="font-semibold text-white text-sm flex-1 truncate">{data.label}</h3>
                </div>

                {data.description && (
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{data.description}</p>
                )}

                {/* Progress Bar */}
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${data.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-purple-500'
                            }`}
                        style={{ width: `${data.completionPercentage}%` }}
                    />
                </div>
                <div className="text-xs text-slate-500 mt-1 text-right">
                    {data.completedCount}/{data.lessonCount}
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 !bg-purple-400 !border-2 !border-slate-900"
            />
        </div>
    )
}

export default memo(ModuleNode)
