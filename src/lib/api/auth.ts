export async function login(
  email: string,
  password: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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

  const data =
    await response.json()

  if (!response.ok) {
    throw new Error(
      data.message
    )
  }

  return data
}

export async function register(data: {
  username: string
  email: string
  password: string
  phoneNumber: string
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || "Register failed"
    )
  }

  return result
}

export async function getCurrentUser() {
  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
      {
        credentials: "include"
      }
    )

  if (!response.ok) {
    return null
  }

  const result =
    await response.json()

  return result.data
}


export async function logoutUser() {

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include"
    }
  )
}