"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { login } from "@/lib/api/auth"
import { CommandIcon } from "lucide-react"



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

const [email, setEmail] =
  useState("")

const [password, setPassword] =
  useState("")

const [loading, setLoading] =
  useState(false)

const [error, setError] =
  useState("")

  async function handleSubmit(event: React.FormEvent) {
  event.preventDefault()
  try {
    setLoading(true)
    setError("")

    const data = await login(email, password)
    const role = data?.data?.user?.role

    if (role === "ADMIN") {
      window.location.href = "/admin/dashboard"
    } else if (role === "MODERATOR") {
      window.location.href = "/moderator/dashboard"
    } else {
      window.location.href = "/"
    }

  } catch (error) {
    setError(error instanceof Error ? error.message : "Login gagal")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2">
        <CommandIcon>
        </CommandIcon>
    <span className="text-2xl font-bold tracking-tight">TransparanID</span>
  </div>
      <Card>
        <CardHeader>
          <CardTitle>Login ke akun anda</CardTitle>
          <CardDescription>
            Masukkan email Anda di bawah ini untuk login ke akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
                <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
              </Field>
              <Field>
                {
                  error && (

                    <p className="text-sm text-destructive">

                      {error}

                    </p>

                  )
                }
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Belum punya akun? <a href="/register">Daftar</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
