"use client"

import {
  useAuth
} from "@/contexts/auth-context"

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import {
  Button
} from "@/components/ui/button"

import Link from "next/link"

import { TransparanLayout } from "@/components/layout/transparan-layout"

export default function ProfilePage() {

  const {
    user,
    loading
  } = useAuth()

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        User not found
      </div>
    )
  }

  return (

    <TransparanLayout>

      <div className="container mx-auto max-w-4xl space-y-6 py-6">

      <Card>

        <CardHeader>

          <CardTitle>
            Profile
          </CardTitle>

          <CardDescription>
            Informasi akun Anda
          </CardDescription>

        </CardHeader>

        <CardContent>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">

            <Avatar className="h-20 w-20">

              <AvatarFallback>

                {
                  user.username
                    ?.charAt(0)
                    .toUpperCase()
                }

              </AvatarFallback>

            </Avatar>

            <div>

              <h2 className="text-2xl font-bold">
                {user.username}
              </h2>

              <p className="text-muted-foreground">
                {user.email}
              </p>

              <p className="mt-2 text-sm">
                Role: {user.role}
              </p>

            </div>

          </div>

        </CardContent>

      </Card>

      <div className="grid gap-4 md:grid-cols-3">

        <Card>

          <CardContent className="pt-6">

            <p className="text-sm text-muted-foreground">
              Total Reports
            </p>

            <h2 className="text-3xl font-bold">
              0
            </h2>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="pt-6">

            <p className="text-sm text-muted-foreground">
              Saved Reports
            </p>

            <h2 className="text-3xl font-bold">
              0
            </h2>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="pt-6">

            <p className="text-sm text-muted-foreground">
              Trust Received
            </p>

            <h2 className="text-3xl font-bold">
              0
            </h2>

          </CardContent>

        </Card>

      </div>

      <Card>

        <CardHeader>

          <CardTitle>
            Account Actions
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Link
            href={"/profile/edit"}
          >

            <Button>
              Edit Profile
            </Button>

          </Link>

        </CardContent>

      </Card>

    </div>

    </TransparanLayout>

  )
}