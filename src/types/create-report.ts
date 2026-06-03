export interface CreateReportForm {
  title: string

  category_id: string

  entity_name: string

  entity_type: string

  description: string

  location: string

  incident_date: string

  estimated_amount?: number
}