"use client"

import {
  useState
} from "react"

import {
  useRouter
} from "next/navigation"

import {
  useAuth
} from "@/contexts/auth-context"

import {
  updateProfile
} from "@/lib/api/user"

import {
  Button
} from "@/components/ui/button"

import {
  Input
} from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import {
  Label
} from "@/components/ui/label"

export default function EditProfilePage() {

  const router =
    useRouter()

  const {
    user
  } = useAuth()

  const [
    username,
    setUsername
  ] = useState(
    user?.username ?? ""
  )

  const [
    email,
    setEmail
  ] = useState(
    user?.email ?? ""
  )

  const [
    loading,
    setLoading
  ] = useState(false)

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setLoading(true)

      await updateProfile(
  username,
  email
)

window.location.href =
  "/profile"

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="container mx-auto max-w-2xl py-6">

      <Card>

        <CardHeader>

          <CardTitle>
            Edit Profile
          </CardTitle>

          <CardDescription>
            Update informasi akun Anda
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >

            <div className="space-y-2">

              <Label>
                Username
              </Label>

              <Input
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="space-y-2">

              <Label>
                Email
              </Label>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

            <Button
              type="submit"
              disabled={loading}
            >

              {
                loading
                  ? "Saving..."
                  : "Save Changes"
              }

            </Button>

          </form>

        </CardContent>

      </Card>

    </div>

  )
}