import type { Metadata } from 'next'
import '@/styles/globals.css'
import 'ldrs/react/Quantum.css'
import 'ldrs/react/Mirage.css'
import 'ldrs/react/LineSpinner.css'

export const metadata: Metadata = {
  title: 'Florecitas 🌸?? :0',
  description: 'Creado con amor y weba por mí pendeja, quien más?',
  icons: {
    icon: '/peonia.svg'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
