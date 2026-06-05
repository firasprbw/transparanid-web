"use client"

import {
  createContext,
  useContext
} from "react"

import { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext =
  createContext<AuthContextType | null>(
    null
  )

export function useAuth() {

  const context =
    useContext(AuthContext)

  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    )
  }

  return context
}