import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
    title: 'coallingo - Học lập trình cùng AI',
    description: 'Học lập trình như chơi game! Trải nghiệm học tập được cá nhân hóa bởi AI.',
    keywords: 'học lập trình, AI tutor, coding, Python, JavaScript, coallingo',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="vi">
            <body className={inter.className}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    )
}
