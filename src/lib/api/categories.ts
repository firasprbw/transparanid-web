import { apiFetch } from "./client"
import { Category } from "@/types/category"

interface CategoriesResponse {
  success: boolean
  data: Category[]
}

export async function getCategories() {
  const response =
    await apiFetch<CategoriesResponse>(
      "/report-categories"
    )

  return response.data
}