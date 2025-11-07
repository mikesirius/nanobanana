"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Loader2, Sparkles, Upload } from "lucide-react"

export default function Hero() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [outputImages, setOutputImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("请选择图片文件")
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("图片大小不能超过 50MB")
      return
    }

    setError(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError("请先通过 Add Image 上传图片")
      return
    }

    if (!prompt.trim()) {
      setError("请输入 Main Prompt 提示词")
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      setOutputImages([])

      const formData = new FormData()
      formData.append("prompt", prompt.trim())
      formData.append("image", selectedFile)

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        throw new Error(errorBody?.error ?? "生成失败，请稍后重试")
      }

      const data = (await response.json()) as { images?: string[] }
      if (!data.images?.length) {
        setError("未收到生成结果，请尝试更换提示词")
        return
      }
      setOutputImages(data.images)
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-sm font-medium text-yellow-700">
            <Sparkles size={16} />
            Nano Banana · Gemini 2.5 Flash Image
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 text-balance">文本 + 图片，秒级生成</h1>
          <p className="text-lg md:text-xl text-gray-600 text-balance max-w-3xl mx-auto">
            上传参考图，输入提示词，点击 Generate Now 即可调用 Gemini 2.5 Flash Image (Nano Banana) 实时生成结果。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,3fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 space-y-6">
              <div>
                <Label className="mb-2 block text-sm font-semibold text-gray-700">Reference Image</Label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-yellow-300 bg-white transition hover:bg-yellow-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                >
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Uploaded" className="h-full w-full rounded-lg object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800">
                          <Upload size={16} />
                          更换图片
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                      <ImagePlus size={40} className="text-yellow-500" />
                      <div className="text-center text-sm">
                        <p className="font-semibold text-gray-900">Add Image</p>
                        <p>点击上传图片，支持 PNG、JPG，最大 50MB</p>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-semibold text-gray-700">
                  Main Prompt
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="例如：将角色服装替换为科幻风格盔甲，保持光影一致。"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  className="min-h-[140px] resize-none"
                />
              </div>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="h-12 w-full bg-yellow-400 text-black hover:bg-yellow-500"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    正在生成...
                  </span>
                ) : (
                  <span className="text-sm font-semibold uppercase tracking-wide">Generate Now</span>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-yellow-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Output Gallery</h2>
              {outputImages.length ? (
                <span className="text-sm text-gray-500">{outputImages.length} result(s)</span>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {isLoading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50"
                  >
                    <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                  </div>
                ))
              ) : outputImages.length ? (
                outputImages.map((image, index) => (
                  <div key={`${image}-${index}`} className="overflow-hidden rounded-xl border border-gray-200">
                    <img src={image} alt={`Generated ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center text-gray-500">
                  <ImagePlus size={36} className="text-yellow-500" />
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">生成结果将展示在此处</p>
                    <p className="text-sm text-gray-600">上传图片并输入提示词后点击 Generate Now</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
