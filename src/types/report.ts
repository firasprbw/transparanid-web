import { ReactNode } from "react"

export interface Report {
  report_category: any
  has_response: any
  impact: any
  reaction_count: ReactNode
  comment_count: ReactNode
  report_categories: any
  entities: any
  id: string

  reporter_user_id: string

  target_entities_id: string

  categories_id: string

  title: string

  slug: string

  description: string

  incident_date: string

  location: string | null

  estimated_amount: number | null

  status: string

  public_visible: boolean

  view_count: number

  created_at: string

  updated_at: string

  entity: {
    display_name: string
  }

  category: {
    name: string
  }

  evidences: {
    file_url: string
  }[]
}