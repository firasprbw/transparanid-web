"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminReport } from "@/lib/api/admin"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Trash2,
  Loader2
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface Props {
  reports: AdminReport[]
}

export function AdminReportsTable({ reports: initialReports }: Props) {
  const router = useRouter()

  const [reports, setReports]         = useState(initialReports)
  const [expandedId, setExpandedId]   = useState<string | null>(null)
  const [loadingId, setLoadingId]     = useState<string | null>(null)
  const [error, setError]             = useState<string | null>(null)

  // confirm dialog state
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "report" | "comment"
    reportId: string
    commentId?: string
    label: string
  } | null>(null)

  // ── DELETE REPORT ───────────────────────────────────────
  const handleDeleteReport = async (reportId: string) => {
    setLoadingId(reportId)
    setError(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${reportId}`,
        { method: "DELETE", credentials: "include" }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      setReports((prev) => prev.filter((r) => r.id !== reportId))
      setExpandedId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus laporan")
    } finally {
      setLoadingId(null)
      setConfirmDelete(null)
    }
  }

  // ── DELETE COMMENT ──────────────────────────────────────
  const handleDeleteComment = async (reportId: string, commentId: string) => {
    setLoadingId(commentId)
    setError(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${reportId}/comments/${commentId}`,
        { method: "DELETE", credentials: "include" }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId
            ? { ...r, report_comments: r.report_comments.filter((c) => c.id !== commentId) }
            : r
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus komentar")
    } finally {
      setLoadingId(null)
      setConfirmDelete(null)
    }
  }

  const handleConfirm = () => {
    if (!confirmDelete) return
    if (confirmDelete.type === "report") {
      handleDeleteReport(confirmDelete.reportId)
    } else {
      handleDeleteComment(confirmDelete.reportId, confirmDelete.commentId!)
    }
  }

  if (reports.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground text-sm">
        Belum ada laporan yang dipublikasikan
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
        {reports.map((report) => {
          const isExpanded = expandedId === report.id

          return (
            <Card key={report.id} className="overflow-hidden">

              {/* REPORT ROW */}
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-semibold truncate">{report.title}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{report.entities?.display_name}</span>
                    <span>·</span>
                    <span>{report.report_categories?.name}</span>
                    <span>·</span>
                    <span>{report.location}</span>
                    <span>·</span>
                    <span>
                      {formatDistanceToNow(new Date(report.created_at), {
                        addSuffix: true,
                        locale: id
                      })}
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    Rp {report.estimated_amount?.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* DELETE REPORT */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    disabled={loadingId === report.id}
                    onClick={() =>
                      setConfirmDelete({
                        type: "report",
                        reportId: report.id,
                        label: report.title
                      })
                    }
                  >
                    {loadingId === report.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />
                    }
                  </Button>

                  {/* EXPAND COMMENTS */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs"
                    onClick={() => setExpandedId(isExpanded ? null : report.id)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {report.report_comments?.length ?? 0}
                    {isExpanded
                      ? <ChevronUp className="w-3 h-3" />
                      : <ChevronDown className="w-3 h-3" />
                    }
                  </Button>
                </div>
              </div>

              {/* ACCORDION */}
              {isExpanded && (
                <div className="border-t bg-muted/30 p-4 space-y-5">

                  {/* EVIDENCES */}
                  {report.report_evidences?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Bukti ({report.report_evidences.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {report.report_evidences.map((evidence) => {
                          const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(evidence.file_url)
                          return isImage ? (
                            <a
                              key={evidence.id}
                              href={evidence.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={evidence.file_url}
                                alt="Bukti laporan"
                                className="w-24 h-24 object-cover rounded-lg border hover:opacity-80 transition-opacity"
                              />
                            </a>
                          ) : (
                            <a
                              key={evidence.id}
                              href={evidence.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-blue-600 underline"
                            >
                              Lihat file
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* COMMENTS */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Komentar ({report.report_comments?.length ?? 0})
                    </p>

                    {report.report_comments?.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Belum ada komentar</p>
                    ) : (
                      report.report_comments?.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-background rounded-lg border p-3 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold">
                              {comment.users?.username}
                            </span>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={comment.status === "VISIBLE" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {comment.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.created_at), {
                                  addSuffix: true,
                                  locale: id
                                })}
                              </span>
                              {/* DELETE COMMENT */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6 text-destructive hover:bg-destructive/10"
                                disabled={loadingId === comment.id}
                                onClick={() =>
                                  setConfirmDelete({
                                    type: "comment",
                                    reportId: report.id,
                                    commentId: comment.id,
                                    label: comment.content.slice(0, 60)
                                  })
                                }
                              >
                                {loadingId === comment.id
                                  ? <Loader2 className="w-3 h-3 animate-spin" />
                                  : <Trash2 className="w-3 h-3" />
                                }
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              )}

            </Card>
          )
        })}
      </div>

      {/* CONFIRM DELETE DIALOG */}
      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmDelete?.type === "report" ? "Hapus Laporan" : "Hapus Komentar"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tindakan ini tidak dapat dibatalkan. Yakin ingin menghapus{" "}
            <span className="font-medium text-foreground">"{confirmDelete?.label}"</span>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={!!loadingId}
              onClick={handleConfirm}
            >
              {loadingId ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}