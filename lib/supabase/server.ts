import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error("缺少 Supabase 环境变量：NEXT_PUBLIC_SUPABASE_URL 或 NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        // 仅在 Route Handler/Server Action 环境可用
        const anyStore: any = cookieStore as any
        if (typeof anyStore.set === "function") {
          anyStore.set(name, value, { httpOnly: true, sameSite: "lax", secure: true, ...options })
        }
      },
      remove(name: string, options: any) {
        const anyStore: any = cookieStore as any
        if (typeof anyStore.set === "function") {
          anyStore.set(name, "", { httpOnly: true, sameSite: "lax", secure: true, maxAge: 0, ...options })
        }
      },
    },
  })
}
