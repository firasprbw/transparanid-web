"use client"

import {
  useEffect,
  useState
} from "react"

import {
  AuthContext
} from "@/contexts/auth-context"

import {
  getCurrentUser,
  logoutUser
} from "@/lib/api/auth"

import {
  User
} from "@/types/user"

import { useRouter }
from "next/navigation"

export function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [
    user,
    setUser
  ] =
    useState<User | null>(
      null
    )

  const [
    loading,
    setLoading
  ] =
    useState(true)

  const refreshUser =
    async () => {

      try {

        const userData =
          await getCurrentUser()

        setUser(userData)

      } catch {

        setUser(null)

      } finally {

        setLoading(false)

      }
    }

  const logout =
    async () => {

      await logoutUser()

      setUser(null)
    }

  useEffect(() => {

    refreshUser()

  }, [])

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  )
}