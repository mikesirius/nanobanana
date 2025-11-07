import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

function getEnv(key: string) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`缺少环境变量 ${key}`)
  }
  return value
}

async function fileToDataUrl(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const mimeType = file.type || "image/png"
  return `data:${mimeType};base64,${buffer.toString("base64")}`
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? ""

    let prompt = ""
    let imageFile: File | null = null

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      prompt = (formData.get("prompt") as string | null) ?? ""
      const uploaded = formData.get("image")
      if (uploaded instanceof File) {
        imageFile = uploaded
      }
    }

    if (!prompt.trim()) {
      return NextResponse.json({ error: "提示词不能为空" }, { status: 400 })
    }

    if (!imageFile) {
      return NextResponse.json({ error: "请上传参考图片" }, { status: 400 })
    }

    const dataUrl = await fileToDataUrl(imageFile)

    const userContent = [
      {
        type: "text",
        text: prompt.trim(),
      },
      {
        type: "image_url",
        image_url: {
          url: dataUrl,
        },
      },
    ]

    const body = {
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: userContent,
        },
      ],
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getEnv("OPENROUTER_API_KEY")}`,
        ...(process.env.OPENROUTER_SITE_URL ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL } : {}),
        ...(process.env.OPENROUTER_SITE_NAME ? { "X-Title": process.env.OPENROUTER_SITE_NAME } : {}),
      },
      body: JSON.stringify(body),
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      const message = result?.error?.message ?? result?.error ?? "生成失败，请稍后重试"
      return NextResponse.json({ error: message }, { status: response.status || 502 })
    }

    const images =
      result?.choices?.[0]?.message?.images
        ?.map((image: any) => image?.image_url?.url)
        .filter((url: unknown): url is string => typeof url === "string" && url.length > 0) ?? []

    if (!images.length) {
      return NextResponse.json({ error: "API 未返回图片结果" }, { status: 502 })
    }

    return NextResponse.json({ images })
  } catch (error) {
    const message = error instanceof Error ? error.message : "生成失败，请稍后重试"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
