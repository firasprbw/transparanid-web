import { z } from "zod"

export const createReportSchema = z.object({
  title: z
    .string()
    .min(10, "Judul minimal 10 karakter"),

  entityName: z
    .string()
    .min(3, "Nama entitas wajib diisi"),

  entityType: z
    .string()
    .min(1, "Pilih tipe entitas"),

  categoryId: z
    .string()
    .min(1, "Pilih kategori"),

  location: z
    .string()
    .min(3, "Lokasi wajib diisi"),

  incidentDate: z
    .string()
    .min(1, "Tanggal wajib diisi"),

  estimatedAmount: z
    .string()
    .optional(),

  description: z
    .string()
    .min(30, "Deskripsi minimal 30 karakter")
})

export type CreateReportFormData =
  z.infer<typeof createReportSchema>