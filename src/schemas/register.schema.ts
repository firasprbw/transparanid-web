import { z } from "zod"

export const registerSchema =
  z.object({

    username: z
      .string()
      .min(3),

    email: z
      .email(),

    phoneNumber: z
      .string()
      .min(10),

    password: z
      .string()
      .min(8),

    confirmPassword: z
      .string()

  })
  .refine(
    data =>
      data.password ===
      data.confirmPassword,
    {
      path: [
        "confirmPassword"
      ],
      message:
        "Password tidak sama"
    }
  )

export type RegisterFormData =
  z.infer<
    typeof registerSchema
  >