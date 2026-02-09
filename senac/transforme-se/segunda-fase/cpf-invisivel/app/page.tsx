import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Problem } from "@/components/sections/problem"
import { WhyThisHappens } from "@/components/sections/why-this-happens"
import { MidPageCTA } from "@/components/sections/mid-page-cta"
import { Solution } from "@/components/sections/solution"
import { Testimonials } from "@/components/sections/testimonials"
import { Differentiator } from "@/components/sections/differentiator"
import { FinalCTA } from "@/components/sections/final-cta"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problem />
      <WhyThisHappens />
      <MidPageCTA />
      <Solution />
      <Testimonials />
      <Differentiator />
      <FinalCTA />
      <Footer />
    </main>
  )
}
