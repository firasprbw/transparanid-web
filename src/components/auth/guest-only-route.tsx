"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/contexts/auth-context"

export function GuestOnlyRoute({
  children
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const {
    user,
    loading
  } = useAuth()

  useEffect(() => {

    if (
      !loading &&
      user
    ) {

      router.replace("/")

    }

  }, [
    user,
    loading,
    router
  ])

  if (loading) {

    return (
      <div>
        Loading...
      </div>
    )
  }

  if (user) {
    return null
  }

  return children
}