'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Paperclip, X, FileText, CheckCircle, Loader2 } from 'lucide-react'
import { sendChatMessage, submitReportFromChat } from '@/lib/api/chatbot'
import type { ChatMessage, ReportData } from '@/lib/api/chatbot'
import { useRouter } from 'next/navigation'

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: 'Halo! Saya asisten virtual TransparanID 👋\n\nSaya bisa membantu Anda:\n• **Membuat laporan** fraud/korupsi\n• **Menjawab pertanyaan** tentang platform ini\n\nKetik "buat laporan" untuk mulai melaporkan, atau tanyakan apa saja!'
}

interface ReportSummaryProps {
  data: ReportData
  files: File[]
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

function ReportSummary({ data, files, onConfirm, onCancel, loading }: ReportSummaryProps) {
  const fields = [
    { label: 'Judul', value: data.title },
    { label: 'Entitas', value: `${data.entityName} (${data.entityType})` },
    { label: 'Deskripsi', value: data.description },
    { label: 'Tanggal Kejadian', value: new Date(data.incidentDate).toLocaleDateString('id-ID', { dateStyle: 'long' }) },
    { label: 'Lokasi', value: data.location },
    { label: 'Estimasi Kerugian', value: `Rp ${Number(data.estimatedAmount).toLocaleString('id-ID')}` },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3 text-sm">
      <div className="flex items-center gap-2 text-primary font-semibold">
        <FileText className="w-4 h-4" />
        Ringkasan Laporan
      </div>

      <div className="space-y-2">
        {fields.map(f => (
          <div key={f.label} className="grid grid-cols-[120px_1fr] gap-2">
            <span className="text-muted-foreground shrink-0">{f.label}</span>
            <span className="font-medium break-words">{f.value}</span>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-[120px_1fr] gap-2">
          <span className="text-muted-foreground shrink-0">Bukti</span>
          <span className="font-medium">{files.length} file terlampir</span>
        </div>
      )}

      {files.length === 0 && (
        <p className="text-amber-600 text-xs bg-amber-50 rounded-lg px-3 py-2">
          ⚠️ Minimal 1 file bukti wajib dilampirkan sebelum mengirim laporan.
        </p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={onConfirm}
          disabled={loading || files.length === 0}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium text-sm disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
          ) : (
            <><CheckCircle className="w-4 h-4" /> Kirim Laporan</>
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
      .replace(/^•\s/gm, '• ')
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`
        shrink-0 w-8 h-8 rounded-full flex items-center justify-center
        ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
      `}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`
        max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
        ${isUser
          ? 'bg-primary text-primary-foreground rounded-tr-sm'
          : 'bg-muted text-foreground rounded-tl-sm'
        }
      `}>
        <span dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
      </div>
    </div>
  )
}

export function ChatBot() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, reportData])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: ChatMessage = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMessage]

    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setReportData(null)

    try {
      // Only send role+content to API (exclude welcome message from history)
      const apiMessages = newMessages.slice(1).map(m => ({
        role: m.role,
        content: m.content
      }))

      const response = await sendChatMessage(apiMessages)

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.reply
      }])

      if (response.reportReady && response.reportData) {
        setReportData(response.reportData)
      }

    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setEvidenceFiles(prev => {
      const combined = [...prev, ...files]
      return combined.slice(0, 5) // max 5 files
    })
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleConfirmSubmit = async () => {
    if (!reportData) return

    setSubmitting(true)
    try {
      await submitReportFromChat(reportData, evidenceFiles)

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '✅ Laporan Anda berhasil dikirim! Tim moderator kami akan meninjau laporan dalam 1-3 hari kerja. Terima kasih telah berkontribusi untuk Indonesia yang lebih transparan.'
      }])

      setReportData(null)
      setEvidenceFiles([])

      setTimeout(() => router.push('/dashboard'), 2000)

    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Gagal mengirim laporan: ${err.message}. Silakan coba lagi.`
      }])
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancelSubmit = () => {
    setReportData(null)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Pengiriman dibatalkan. Laporan belum dikirim. Ketik "buat laporan" jika ingin memulai ulang.'
    }])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Report Summary Card */}
        {reportData && !loading && (
          <div className="ml-11">
            <ReportSummary
              data={reportData}
              files={evidenceFiles}
              onConfirm={handleConfirmSubmit}
              onCancel={handleCancelSubmit}
              loading={submitting}
            />

            {/* File attachment for evidence */}
            <div className="mt-2 space-y-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Paperclip className="w-4 h-4" />
                Lampirkan bukti ({evidenceFiles.length}/5)
              </button>

              {evidenceFiles.length > 0 && (
                <div className="space-y-1">
                  {evidenceFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs bg-muted rounded-lg px-3 py-1.5">
                      <FileText className="w-3 h-3 shrink-0" />
                      <span className="truncate flex-1">{file.name}</span>
                      <button onClick={() => removeFile(i)} className="shrink-0 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
            style={{ height: 'auto' }}
            onInput={e => {
              const el = e.currentTarget
              el.style.height = 'auto'
              el.style.height = `${Math.min(el.scrollHeight, 128)}px`
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Enter untuk kirim · Shift+Enter untuk baris baru
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}