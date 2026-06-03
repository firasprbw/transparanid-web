export interface FeedReport {
  id: string

  title: string
  slug: string

  description: string

  location?: string

  estimated_amount?: number

  reaction_count: number
  comment_count: number

  created_at: string

  has_response: boolean

  category: {
    id: string
    name: string
  }

  entity: {
    id: string
    display_name: string
  }

  evidences: {
    id: string
    file_url: string
    file_type: string
  }[]
}