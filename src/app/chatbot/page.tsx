import { TransparanLayout } from "@/components/layout/transparan-layout"
import { ChatBot } from "@/components/chatbot/chat-bot"

export default function ChatbotPage() {
  return (
    <TransparanLayout>
      <div className="max-w-2xl mx-auto h-[calc(100vh-8rem)]">
        <div className="mb-4">
          <h1 className="text-xl font-bold">Asisten Laporan</h1>
          <p className="text-muted-foreground">
            Buat laporan atau tanyakan apa saja tentang TransparanID
          </p>
        </div>
        <div className="h-[calc(100%-5rem)] rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <ChatBot />
        </div>
      </div>
    </TransparanLayout>
  )
}