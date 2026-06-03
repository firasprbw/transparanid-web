export type EntityStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED"

export interface Entity {
  id: string

  display_name: string

  description?: string

  type: string

  status: EntityStatus

  is_claimed: boolean

  created_at: string
  updated_at: string
}