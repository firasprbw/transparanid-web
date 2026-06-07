"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createComment, getComments, Comment } from "@/lib/api/comment"
import { MessageCircle, CornerDownRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface Props {
  reportId: string
}

interface CommentWithReplies extends Comment {
  replies: Comment[]
}

const buildCommentTree = (comments: Comment[]): CommentWithReplies[] => {
  const parents = comments.filter(c => !c.parent_comment_id)
  const children = comments.filter(c => !!c.parent_comment_id)

  return parents.map(parent => ({
    ...parent,
    replies: children.filter(c => c.parent_comment_id === parent.id)
  }))
}

export function CommentSection({ reportId }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [content, setContent]   = useState("")
  const [replyTo, setReplyTo]   = useState<{ id: string; username: string } | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")

  useEffect(() => { loadComments() }, [reportId])

  async function loadComments() {
    try {
      setError("")
      const data = await getComments(reportId)
      setComments(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load comments")
      setComments([])
    }
  }

  async function handleSubmit() {
    if (!content.trim()) return
    try {
      setLoading(true)
      const newComment = await createComment(reportId, content, replyTo?.id)
      setComments(prev => [...prev, newComment])
      setContent("")
      setReplyTo(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send comment")
    } finally {
      setLoading(false)
    }
  }

  const tree = buildCommentTree(comments)

  return (
    <div className="space-y-6">

      {/* INPUT */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Komentar
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({comments.length})
          </span>
        </h2>

        {replyTo && (
          <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm">
            <span className="text-muted-foreground">
              Membalas <span className="font-semibold text-foreground">@{replyTo.username}</span>
            </span>
            <button
              onClick={() => setReplyTo(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Batal
            </button>
          </div>
        )}

        <Textarea
          placeholder={replyTo ? `Balas @${replyTo.username}...` : "Tulis komentar..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Mengirim..." : replyTo ? "Kirim Balasan" : "Kirim"}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* COMMENT TREE — satu card per thread */}
      <div className="space-y-3">
        {tree.map((comment) => (
          <div key={comment.id} className="rounded-lg border divide-y">

            {/* PARENT */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold uppercase">
                    {comment.users.username[0]}
                  </div>
                  <span className="font-semibold text-sm">{comment.users.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: id })}
                  </span>
                </div>
                <button
                  onClick={() => setReplyTo({ id: comment.id, username: comment.users.username })}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="size-3" />
                  Balas
                </button>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>

            {/* REPLIES — dalam card yang sama */}
            {comment.replies.map((reply) => (
              <div key={reply.id} className="px-4 py-3 bg-muted/30">
                <div className="flex items-center gap-2 mb-1">
                  <CornerDownRight className="size-3 text-muted-foreground shrink-0" />
                  <div className="size-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold uppercase">
                    {reply.users.username[0]}
                  </div>
                  <span className="font-semibold text-sm">{reply.users.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true, locale: id })}
                  </span>
                </div>
                <p className="text-sm pl-5">{reply.content}</p>
              </div>
            ))}

          </div>
        ))}
      </div>

    </div>
  )
}