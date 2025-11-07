export default function AuthErrorPage({ searchParams }: { searchParams: { message?: string } }) {
  const message = searchParams?.message || "认证出现问题，请重试"
  return (
    <main className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold">登录失败</h1>
        <p className="text-gray-600 break-words">{message}</p>
        <a href="/" className="inline-block px-4 py-2 rounded bg-black text-white">返回首页</a>
      </div>
    </main>
  )
}

