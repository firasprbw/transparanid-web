import { apiFetch } from "./client"

export const authApi = {
  login: (body: {
    email: string
    password: string
  }) =>
    apiFetch(
      "/api/v1/auth/login",
      {
        method: "POST",
        body: JSON.stringify(body)
      }
    ),

  register: (body: {
    username: string
    email: string
    password: string
  }) =>
    apiFetch(
      "/api/v1/auth/register",
      {
        method: "POST",
        body: JSON.stringify(body)
      }
    )
}

export async function login(
  email: string,
  password: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    )

  return response.json()
}

export async function getMe() {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
      {
        credentials: "include"
      }
    )

  return response.json()
}

export async function logout() {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
      {
        method: "POST",
        credentials: "include"
      }
    )

  return response.json()
}