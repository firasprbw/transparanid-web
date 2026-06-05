export type UserRole =
  | "USER"
  | "ADMIN"
  | "MODERATOR"
  | "SUPER_ADMIN"
  | "ENTITY_ADMIN"

export interface User {
  id: string
  username: string
  email: string
  phone_number?: string

  role: UserRole

  is_banned: boolean
  ban_reason?: string

  created_at: string
  updated_at: string
}