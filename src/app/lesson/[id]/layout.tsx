import { mockUnits } from '@/data/mockData'

export function generateStaticParams() {
    // Generate params from actual lesson IDs in mock data
    const paths = mockUnits.flatMap(unit =>
        unit.lessons.map(lesson => ({ id: lesson.id }))
    )
    // Also add numeric IDs as fallback
    for (let i = 1; i <= 50; i++) {
        paths.push({ id: i.toString() })
    }
    return paths
}

export default function LessonLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
