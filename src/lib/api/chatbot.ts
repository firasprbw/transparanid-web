export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ReportData {
  title: string
  entityName: string
  entityType: string
  categoryId: string
  description: string
  incidentDate: string
  location: string
  estimatedAmount: number
}

export interface ChatResponse {
  success: boolean
  reply: string
  reportReady: boolean
  reportData: ReportData | null
}

export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<ChatResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to send message')
  }

  return result
}

export async function submitReportFromChat(
  reportData: ReportData,
  evidenceFiles: File[]
): Promise<void> {
  const formData = new FormData()

  formData.append('title', reportData.title)
  formData.append('entityName', reportData.entityName)
  formData.append('entityType', reportData.entityType)
  formData.append('categoryId', reportData.categoryId)
  formData.append('description', reportData.description)
  formData.append('incidentDate', reportData.incidentDate)
  formData.append('location', reportData.location)
  formData.append('estimatedAmount', String(reportData.estimatedAmount))

  evidenceFiles.forEach(file => {
    formData.append('evidences', file)
  })

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit report')
  }
}