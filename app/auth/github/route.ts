import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const origin = request.nextUrl.origin
  const redirectTo = `${origin}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  })

  if (error || !data?.url) {
    const message = encodeURIComponent(error?.message || "GitHub 登录初始化失败")
    return NextResponse.redirect(`${origin}/auth/error?message=${message}`)
  }

  return NextResponse.redirect(data.url)
}
