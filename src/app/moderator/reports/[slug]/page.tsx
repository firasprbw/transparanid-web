"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  Tag,
  DollarSign,
  FileImage,
  Loader2
} from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { id } from "date-fns/locale"
import type { ModeratorReportDetail } from "@/lib/api/admin"

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING_REVIEW: { label: "Menunggu Review", variant: "secondary" },
  PUBLISHED:      { label: "Dipublikasikan",  variant: "default" },
  REJECTED:       { label: "Ditolak",         variant: "destructive" },
}

export default function ModeratorReportDetailPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [report, setReport]               = useState<ModeratorReportDetail | null>(null)
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError]     = useState<string | null>(null)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason]   = useState("")

  // ── FETCH DETAIL ─────────────────────────────────────────
  const fetchDetail = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${slug}/detail`,
        { credentials: "include" }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message || "Gagal memuat laporan")
      setReport(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { fetchDetail() }, [fetchDetail])

  // ── PUBLISH ───────────────────────────────────────────────
  const handlePublish = async () => {
    setActionLoading(true)
    setActionError(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${report!.id}/publish`,
        { method: "PATCH", credentials: "include" }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)
      router.push("/moderator/dashboard")
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Gagal mempublikasikan")
    } finally {
      setActionLoading(false)
    }
  }

  // ── REJECT ────────────────────────────────────────────────
  const handleReject = async () => {
    if (!rejectionReason.trim()) return
    setActionLoading(true)
    setActionError(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${report!.id}/reject`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rejectionReason })
        }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)
      router.push("/moderator/dashboard")
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Gagal menolak laporan")
    } finally {
      setActionLoading(false)
      setShowRejectDialog(false)
    }
  }

  // ── LOADING STATE ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive text-sm">{error || "Laporan tidak ditemukan"}</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
      </div>
    )
  }

  const status = STATUS_MAP[report.status] ?? { label: report.status, variant: "outline" as const }
  const isPending = report.status === "PENDING_REVIEW"

  // ── RENDER ────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="shrink-0 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
        </Button>

        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      {/* ACTION ERROR */}
      {actionError && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {actionError}
        </div>
      )}

      {/* TITLE CARD */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-snug">{report.title}</CardTitle>
          <p className="text-xs text-muted-foreground">
            Dilaporkan {formatDistanceToNow(new Date(report.created_at), { addSuffix: true, locale: id })}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* META */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4 shrink-0" />
              <span>{report.entities?.display_name}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="w-4 h-4 shrink-0" />
              <span>{report.report_categories?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{report.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{format(new Date(report.incident_date), "d MMMM yyyy", { locale: id })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground col-span-2">
              <DollarSign className="w-4 h-4 shrink-0" />
              <span className="font-medium text-foreground">
                Rp {report.estimated_amount?.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <Separator />

          {/* DESCRIPTION */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Deskripsi</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{report.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* EVIDENCE */}
      {report.evidences?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileImage className="w-4 h-4" />
              Bukti ({report.evidences.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {report.evidences.map((ev) => (
                <a
                  key={ev.id}
                  href={ev.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg overflow-hidden border bg-muted aspect-video hover:opacity-80 transition-opacity"
                >
                  {ev.file_type?.startsWith("image/") ? (
                    <img
                      src={ev.file_url}
                      alt="Bukti"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                      {ev.file_type ?? "File"}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ACTIONS — only show if PENDING */}
      {isPending && (
        <div className="flex gap-3 pt-2">
          <Button
            className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
            disabled={actionLoading}
            onClick={handlePublish}
          >
            {actionLoading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <CheckCircle className="w-4 h-4" />
            }
            Publish Laporan
          </Button>

          <Button
            variant="outline"
            className="flex-1 gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            disabled={actionLoading}
            onClick={() => { setShowRejectDialog(true); setRejectionReason("") }}
          >
            <XCircle className="w-4 h-4" />
            Tolak Laporan
          </Button>
        </div>
      )}

      {/* REJECT DIALOG */}
      <Dialog open={showRejectDialog} onOpenChange={(o) => !o && setShowRejectDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Laporan</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Berikan alasan penolakan laporan ini.
            </p>
            <Textarea
              placeholder="Contoh: Bukti tidak cukup, informasi tidak lengkap..."
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectionReason.trim() || actionLoading}
              onClick={handleReject}
            >
              {actionLoading ? "Menolak..." : "Tolak Laporan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}