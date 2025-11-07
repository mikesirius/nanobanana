import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const origin = url.origin

  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code)
    } catch (e) {
      const message = e instanceof Error ? e.message : "会话交换失败"
      return NextResponse.redirect(`${origin}/auth/error?message=${encodeURIComponent(message)}`)
    }
  }

  // 登录完成后返回首页（或你的控制台页）
  return NextResponse.redirect(`${origin}/`)
}
