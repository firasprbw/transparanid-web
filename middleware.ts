import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

const PROTECTED_ROUTES: Record<string, string[]> = {
  "/admin":         ["ADMIN"],
  "/moderator":     ["ADMIN", "MODERATOR"],
}

// Pages that require ANY login
const AUTH_REQUIRED_ROUTES = [
  // "/",
  "/dashboard",
  "/saved-reports",
  "/profile",
  "/buat-laporan",
]

const roleHomeMap: Record<string, string> = {
  ADMIN:     "/admin/dashboard",
  MODERATOR: "/moderator/dashboard",
  USER:      "/",
}

interface JWTUser {
  id: string
  role: string
  isBanned: boolean
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get("token")?.value

  let payload: JWTUser | null = null

  if (token) {
    try {
      const { payload: decoded } = await jwtVerify(token, SECRET)
      payload = decoded as unknown as JWTUser
    } catch {
      // token expired / invalid — treat as guest
    }
  }

  const role = payload?.role ?? "GUEST"
  const home = roleHomeMap[role] ?? "/"

  // Redirect logged-in users away from auth pages
  if (payload && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL(home, req.url))
  }

  // Redirect guests away from auth-required pages
  if (!payload && AUTH_REQUIRED_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Check role-based routes
  for (const [prefix, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(prefix)) {
      if (!payload) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      if (!allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(home, req.url))
      }
      break
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/moderator/:path*",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/saved-reports/:path*",
    "/profile/:path*",
    "/buat-laporan/:path*",
  ]
}