"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PendingReport } from "@/lib/api/admin"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, ChevronRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface Props {
  reports: PendingReport[]
}

export function ModeratorReportsTable({ reports }: Props) {
  const router = useRouter()

  const [loadingId, setLoadingId]               = useState<string | null>(null)
  const [rejectTarget, setRejectTarget]         = useState<string | null>(null)
  const [rejectionReason, setRejectionReason]   = useState("")
  const [error, setError]                       = useState<string | null>(null)

  const handlePublish = async (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation() // jangan trigger card click
    setLoadingId(reportId)
    setError(null)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${reportId}/publish`,
        { method: "PATCH", credentials: "include" }
      )
      const result = await response.json()
      if (!response.ok) throw new Error(result.message)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mempublikasikan laporan")
    } finally {
      setLoadingId(null)
    }
  }

  const openRejectDialog = (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation() // jangan trigger card click
    setRejectTarget(reportId)
    setRejectionReason("")
  }

  const handleReject = async () => {
    if (!rejectTarget || !rejectionReason.trim()) return
    setLoadingId(rejectTarget)
    setError(null)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${rejectTarget}/reject`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rejectionReason })
        }
      )
      const result = await response.json()
      if (!response.ok) throw new Error(result.message)
      setRejectTarget(null)
      setRejectionReason("")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menolak laporan")
    } finally {
      setLoadingId(null)
    }
  }

  if (reports.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground text-sm">
        Tidak ada laporan yang menunggu review
      </Card>
    )
  }

  return (
    <>
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push(`/moderator/reports/${report.slug}`)}
          >
            <div className="flex items-start justify-between gap-4">

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">{report.title}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{report.entities?.display_name}</span>
                  <span>·</span>
                  <span>{report.report_categories?.name}</span>
                  <span>·</span>
                  <span>{report.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">
                    Rp {report.estimated_amount?.toLocaleString("id-ID")}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {formatDistanceToNow(new Date(report.created_at), {
                      addSuffix: true,
                      locale: id
                    })}
                  </Badge>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50 gap-1"
                  disabled={loadingId === report.id}
                  onClick={(e) => handlePublish(e, report.id)}
                >
                  <CheckCircle className="w-4 h-4" />
                  Publish
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1"
                  disabled={loadingId === report.id}
                  onClick={(e) => openRejectDialog(e, report.id)}
                >
                  <XCircle className="w-4 h-4" />
                  Tolak
                </Button>
              </div>

            </div>
          </Card>
        ))}
      </div>

      {/* REJECT DIALOG */}
      <Dialog
        open={!!rejectTarget}
        onOpenChange={(open) => !open && setRejectTarget(null)}
      >
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
            <Button variant="outline" onClick={() => setRejectTarget(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectionReason.trim() || loadingId === rejectTarget}
              onClick={handleReject}
            >
              {loadingId === rejectTarget ? "Menolak..." : "Tolak Laporan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}