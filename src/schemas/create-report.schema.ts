import { z } from "zod"

export const createReportSchema = z.object({
  title: z
    .string()
    .min(10, "Judul minimal 10 karakter"),

  categoryId: z
    .string()
    .min(1, "Kategori wajib dipilih"),

  entityName: z
    .string()
    .min(3, "Nama entitas terlalu pendek"),

  entityType: z
    .string()
    .min(1, "Tipe entitas wajib dipilih"),

  description: z
    .string()
    .min(30, "Deskripsi minimal 30 karakter"),

  incidentDate: z
    .string()
    .min(1, "Tanggal kejadian wajib diisi"),

  location: z
    .string()
    .min(3, "Lokasi wajib diisi"),

  estimatedAmount: z
    .number()
    .min(1, "Estimasi kerugian wajib diisi")
})

export type CreateReportFormData =
  z.infer<typeof createReportSchema>