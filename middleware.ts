import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

// Route yang butuh role tertentu
const PROTECTED_ROUTES: Record<string, string[]> = {
  "/admin":     ["ADMIN"],
  "/moderator": ["ADMIN", "MODERATOR"]
}

const roleHomeMap: Record<string, string> = {
  ADMIN:     "/admin/dashboard",
  MODERATOR: "/moderator/dashboard",
  USER:      "/"
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get("token")?.value

  // ── DECODE TOKEN ────────────────────────────────────────
  interface JWTUser {
    id: string
    role: string
    isBanned: boolean
  }

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

  // ── SUDAH LOGIN → redirect dari auth pages ──────────────
  if (payload && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL(home, req.url))
  }

  // ── CEK AKSES PROTECTED ROUTES ───────────────────────────
  for (const [prefix, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(prefix)) {
      // Belum login
      if (!payload) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      // Role tidak sesuai → kirim ke home masing-masing
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
    "/admin/:path*",
    "/moderator/:path*",
    "/login",
    "/register"
  ]
}