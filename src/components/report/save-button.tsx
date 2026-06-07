"use client"

import { useState } from "react"

import {
  Bookmark
} from "lucide-react"

import {
  saveReport,
  unsaveReport
} from "@/lib/api/saved-reports"

interface Props {
  reportId: string
  initialSaved?: boolean
}

export function SaveButton({
  reportId,
  initialSaved = false
}: Props) {

  const [
    saved,
    setSaved
  ] = useState(
    initialSaved
  )

  const [
    loading,
    setLoading
  ] = useState(false)

  async function handleSave() {

    if (loading) {
      return
    }

    try {

      setLoading(true)

      if (saved) {

        await unsaveReport(
          reportId
        )

        setSaved(false)

      } else {

        await saveReport(
          reportId
        )

        setSaved(true)

      }

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  return (

    <button
      onClick={handleSave}
      disabled={loading}
      className="
        flex
        items-center
        gap-2
      "
    >

      <Bookmark
        className={
          saved
            ? "fill-current"
            : ""
        }
      />

      <span>

        {
          saved
            ? "Tersimpan"
            : "Simpan"
        }

      </span>

    </button>
  )
}