"use client"

import { useState } from "react"
import { AdminUser } from "@/lib/api/admin"
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
import { ShieldOff, ShieldCheck, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface Props {
  users: AdminUser[]
}

const roleBadgeVariant = (role: string) => {
  if (role === "ADMIN")     return "destructive" as const
  if (role === "MODERATOR") return "default" as const
  return "secondary" as const
}

export function AdminUsersTable({ users: initialUsers }: Props) {
  const [users, setUsers]         = useState(initialUsers)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError]         = useState<string | null>(null)
  const [confirmBan, setConfirmBan] = useState<{
    userId: string
    username: string
    action: "ban" | "unban"
  } | null>(null)

  // ── BAN / UNBAN ──────────────────────────────────────────
  const handleBanToggle = async () => {
    if (!confirmBan) return
    const { userId, action } = confirmBan

    setLoadingId(userId)
    setError(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/${action}`,
        { method: "PATCH", credentials: "include" }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_banned: action === "ban" } : u
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : `Gagal ${action} user`)
    } finally {
      setLoadingId(null)
      setConfirmBan(null)
    }
  }

  if (users.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground text-sm">
        Belum ada pengguna
      </Card>
    )
  }

  return (
    <>
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm mb-3">
          {error}
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-xs text-muted-foreground uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Username</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Bergabung</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  className={`border-b last:border-0 hover:bg-muted/20 transition-colors ${
                    i % 2 === 0 ? "" : "bg-muted/10"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{user.username}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={roleBadgeVariant(user.role)} className="text-xs">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {user.is_banned ? (
                      <Badge variant="destructive" className="text-xs">Banned</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                        Aktif
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {formatDistanceToNow(new Date(user.created_at), {
                      addSuffix: true,
                      locale: id
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {/* Jangan tampilkan tombol ban untuk ADMIN */}
                    {user.role !== "ADMIN" && (
                      user.is_banned ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-xs text-green-600 border-green-200 hover:bg-green-50"
                          disabled={loadingId === user.id}
                          onClick={() =>
                            setConfirmBan({
                              userId: user.id,
                              username: user.username,
                              action: "unban"
                            })
                          }
                        >
                          {loadingId === user.id
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : <ShieldCheck className="w-3 h-3" />
                          }
                          Unban
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                          disabled={loadingId === user.id}
                          onClick={() =>
                            setConfirmBan({
                              userId: user.id,
                              username: user.username,
                              action: "ban"
                            })
                          }
                        >
                          {loadingId === user.id
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : <ShieldOff className="w-3 h-3" />
                          }
                          Ban
                        </Button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CONFIRM BAN DIALOG */}
      <Dialog open={!!confirmBan} onOpenChange={(o) => !o && setConfirmBan(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmBan?.action === "ban" ? "Ban Pengguna" : "Unban Pengguna"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {confirmBan?.action === "ban"
              ? <>Pengguna <span className="font-medium text-foreground">@{confirmBan?.username}</span> tidak akan bisa login setelah di-ban.</>
              : <>Pengguna <span className="font-medium text-foreground">@{confirmBan?.username}</span> akan bisa login kembali.</>
            }
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmBan(null)}>
              Batal
            </Button>
            <Button
              variant={confirmBan?.action === "ban" ? "destructive" : "default"}
              disabled={!!loadingId}
              onClick={handleBanToggle}
            >
              {loadingId ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {confirmBan?.action === "ban" ? "Ban" : "Unban"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}