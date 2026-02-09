"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function MidPageCTA() {
  const scrollToSignup = () => {
    document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-8 lg:p-16 overflow-hidden">
          {/* Background organic shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[40px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mude sua situacao hoje</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
              Chega de ser ignorado pelo sistema
            </h2>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Cada dia que passa e uma oportunidade perdida. Comece a construir seu historico agora.
            </p>

            <Button 
              size="lg" 
              className="text-base px-10 py-7 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shadow-lg shadow-primary/25"
              onClick={scrollToSignup}
            >
              Quero construir meu historico
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>

            <p className="mt-6 text-sm text-muted-foreground">
              Gratuito. Sem cartao de credito. Sem compromisso.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
