"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  registerSchema,
  RegisterFormData
} from "@/schemas/register.schema"

import { register } from "@/lib/api/auth"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { CommandIcon } from "lucide-react"

export function RegisterForm(
  props: React.ComponentProps<typeof Card>
) {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const {
    register: registerField,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(
        registerSchema
      ),

    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(
    values: RegisterFormData
  ) {

    try {

      setLoading(true)
      setError("")

      await register({
        username:
          values.username,

        email:
          values.email,

        phoneNumber:
          values.phoneNumber,

        password:
          values.password
      })

      router.push("/login")

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Register failed"
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <Card {...props}>
      <div className="flex flex-col items-center gap-2">
              <CommandIcon>
              </CommandIcon>
          <span className="text-2xl font-bold tracking-tight">TransparanID</span>
        </div>

      <CardHeader>

        <CardTitle>
          Buat akun baru
        </CardTitle>

        <CardDescription>
          Masukkan informasi Anda di bawah ini
          untuk membuat akun Anda
        </CardDescription>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }
        >

          <FieldGroup>

            <Field>

              <FieldLabel>
                Username
              </FieldLabel>

              <Input
                placeholder="firas"
                {...registerField(
                  "username"
                )}
              />

              {errors.username && (

                <p className="text-sm text-destructive">

                  {
                    errors
                      .username
                      .message
                  }

                </p>

              )}

            </Field>

            <Field>

              <FieldLabel>
                Email
              </FieldLabel>

              <Input
                type="email"
                placeholder="firas@gmail.com"
                {...registerField(
                  "email"
                )}
              />

              <FieldDescription>

                Kami tidak akan pernah membagikan
                email Anda.

              </FieldDescription>

              {errors.email && (

                <p className="text-sm text-destructive">

                  {
                    errors
                      .email
                      .message
                  }

                </p>

              )}

            </Field>

            <Field>

              <FieldLabel>
                Nomor Telepon
              </FieldLabel>

              <Input
                placeholder="08123456789"
                {...registerField(
                  "phoneNumber"
                )}
              />

              {errors.phoneNumber && (

                <p className="text-sm text-destructive">

                  {
                    errors
                      .phoneNumber
                      .message
                  }

                </p>

              )}

            </Field>

            <Field>

              <FieldLabel>
                Password
              </FieldLabel>

              <Input
                type="password"
                {...registerField(
                  "password"
                )}
              />

              <FieldDescription>

                Password harus terdiri dari minimal
                8 karakter.

              </FieldDescription>

              {errors.password && (

                <p className="text-sm text-destructive">

                  {
                    errors
                      .password
                      .message
                  }

                </p>

              )}

            </Field>

            <Field>

              <FieldLabel>
                Konfirmasi Password
              </FieldLabel>

              <Input
                type="password"
                {...registerField(
                  "confirmPassword"
                )}
              />

              {errors.confirmPassword && (

                <p className="text-sm text-destructive">

                  {
                    errors
                      .confirmPassword
                      .message
                  }

                </p>

              )}

            </Field>

            {error && (

              <p className="text-sm text-destructive">

                {error}

              </p>

            )}

            <Field>

              <Button
                type="submit"
                disabled={loading}
              >

                {
                  loading
                    ? "Membuat akun..."
                    : "Buat Akun"
                }

              </Button>

              <FieldDescription className="text-center">

                Sudah punya akun?{" "}

                <Link
                  href="/login"
                  className="underline"
                >
                  Sign in
                </Link>

              </FieldDescription>

            </Field>

          </FieldGroup>

        </form>

      </CardContent>

    </Card>

  )
}