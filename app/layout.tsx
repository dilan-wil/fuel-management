import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/toaster'
export const metadata: Metadata = {
  title: 'Fuel Consumption',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (

    <html lang="en">
      <body>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
      </body>
    </html>
  )
}
