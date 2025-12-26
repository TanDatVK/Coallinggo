import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import RightSidebar from '@/components/RightSidebar'
import LessonPath from '@/components/LessonPath'

export default function LearnPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar />

            {/* Main Content */}
            <main className="pt-16 lg:pl-64 xl:pr-80">
                <div className="min-h-screen bg-white">
                    <LessonPath />
                </div>
            </main>

            <RightSidebar />
        </div>
    )
}
