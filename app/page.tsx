import Header from "@/components/header"
import { createClient } from "@/lib/supabase/server"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Showcase from "@/components/showcase"
import Reviews from "@/components/reviews"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const uiUser = user
    ? {
        id: user.id,
        email: user.email,
        name: (user.user_metadata as any)?.name || (user.user_metadata as any)?.full_name || null,
        avatar_url: (user.user_metadata as any)?.avatar_url || null,
      }
    : null

  return (
    <main className="w-full">
      <Header user={uiUser} />
      <Hero />
      <Features />
      <Showcase />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  )
}
