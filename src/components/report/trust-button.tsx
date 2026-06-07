"use client"

import {
  useEffect,
  useState
} from "react"

import {
  ThumbsUp
} from "lucide-react"

import {
  getTrustInfo,
  trustReport,
  untrustReport
} from "@/lib/api/reaction"

interface Props {
  reportId: string
}

export function TrustButton({
  reportId
}: Props) {

  const [
    trustCount,
    setTrustCount
  ] = useState(0)

  const [
    trusted,
    setTrusted
  ] = useState(false)

  const [
    loading,
    setLoading
  ] = useState(false)

  const [
    error,
    setError
  ] = useState("")

  useEffect(() => {

    loadTrustInfo()

  }, [])

  async function loadTrustInfo() {

    try {

      const data =
        await getTrustInfo(
          reportId
        )

      setTrustCount(
        data.trustCount
      )

      setTrusted(
        data.trusted
      )

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load trust info"
      )

    }
  }

  async function handleTrust() {

    if (loading) {
      return
    }

    setLoading(true)

    try {

      if (trusted) {

        await untrustReport(
          reportId
        )

        setTrusted(false)

        setTrustCount(
          prev => prev - 1
        )

      } else {

        await trustReport(
          reportId
        )

        setTrusted(true)

        setTrustCount(
          prev => prev + 1
        )

      }

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update trust status"
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <div>
      <button
        onClick={handleTrust}
        className="
          flex
          items-center
          gap-2
          w-8
          h-8
        "
        title={error || undefined}
      >

        <ThumbsUp
          className={
            trusted
              ? "fill-current"
              : ""
          }
        />

        <span>
          {trustCount}
        </span>

      </button>

      {error && (
        <p className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>

  )
}