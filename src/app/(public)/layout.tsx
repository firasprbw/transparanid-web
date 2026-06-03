import { TransparanLayout } from "@/components/layout/transparan-layout"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TransparanLayout>
      {children}
    </TransparanLayout>
  )
}