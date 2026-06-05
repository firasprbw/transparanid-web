"use client"

import {
  useAuth
} from "@/contexts/auth-context"

export default function TestPage() {

  const {
    user,
    loading
  } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <pre>
      {
        JSON.stringify(
          user,
          null,
          2
        )
      }
    </pre>
  )
}