import type { Metadata } from 'next'
import '@/styles/globals.css'
import 'ldrs/react/Quantum.css'
import 'ldrs/react/Mirage.css'
import 'ldrs/react/LineSpinner.css'

export const metadata: Metadata = {
  title: 'Peonias by Write_Color',
  description: 'Creado con amor y weba por Write_Color',
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
