"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Users, Sparkles, CreditCard, Baseline as ChartLine, Lock } from "lucide-react"
import { useEffect, useState } from "react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [target])
  
  return <span>{count}{suffix}</span>
}

export function Hero() {
  const scrollToSignup = () => {
    document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Biophilic background - organic shapes with soft gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow - organic shape */}
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-primary/8 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[80px] animate-float" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] bg-primary/6 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[60px] animate-float-delayed" />
        {/* Subtle grain texture for depth */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3QgZmlsdGVyPSJ1cmwoI2EpIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIi8+PC9zdmc+')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Bento Grid Layout - 2026 trend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          
          {/* Main Hero Card - spans 8 columns */}
          <div className="lg:col-span-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 p-8 lg:p-12 flex flex-col justify-center min-h-[420px] lg:min-h-[520px] relative overflow-hidden group">
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Badge with liquid animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm w-fit mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-soft" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm text-primary font-medium">67 milhoes de brasileiros sao invisiveis</span>
            </div>

            {/* Headline with improved typography */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance mb-6 leading-[1.1]">
              Voce nao esta negativado.
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Voce esta invisivel.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Sem historico, sem chance. Construa seu credito do zero — mesmo que nunca tenha tido um cartao ou financiamento.
            </p>

            {/* CTA Buttons with micro-interactions */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out group shadow-lg shadow-primary/20"
                onClick={scrollToSignup}
              >
                Comecar agora — gratis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-6 bg-transparent border-border/50 hover:bg-secondary/50 hover:border-border transition-all duration-200"
                onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
              >
                Como funciona
              </Button>
            </div>
          </div>

          {/* Right column - stacked cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-5">
            
            {/* Stat Card 1 - Large number */}
            <div className="rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 p-6 lg:p-8 flex-1 flex flex-col justify-center group hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Brasileiros sem score</span>
              </div>
              <span className="text-4xl lg:text-5xl font-bold font-display">
                <AnimatedCounter target={67} suffix="M+" />
              </span>
              <p className="text-xs text-muted-foreground mt-2">Fonte: Serasa Experian, 2024</p>
            </div>

            {/* Stat Card 2 */}
            <div className="rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 p-6 lg:p-8 flex-1 flex flex-col justify-center group hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-destructive/10">
                  <TrendingUp className="h-5 w-5 text-destructive" />
                </div>
                <span className="text-sm text-muted-foreground">Mais juros pagos</span>
              </div>
              <span className="text-4xl lg:text-5xl font-bold font-display">
                <AnimatedCounter target={4} suffix="x" />
              </span>
              <p className="text-xs text-muted-foreground mt-2">Comparado a quem tem historico</p>
            </div>
          </div>

          {/* Bottom row - 3 feature cards */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 flex items-center gap-4 group hover:border-primary/40 transition-colors duration-300">
            <div className="p-3 rounded-2xl bg-primary/20">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">100% Gratuito</h3>
              <p className="text-sm text-muted-foreground">Para comecar a construir</p>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 p-6 flex items-center gap-4 group hover:border-primary/30 transition-colors duration-300">
            <div className="p-3 rounded-2xl bg-secondary">
              <Lock className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">LGPD Compliant</h3>
              <p className="text-sm text-muted-foreground">Seus dados protegidos</p>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 p-6 flex items-center gap-4 group hover:border-primary/30 transition-colors duration-300">
            <div className="p-3 rounded-2xl bg-secondary">
              <Sparkles className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">Score em 30 dias</h3>
              <p className="text-sm text-muted-foreground">Resultados rapidos</p>
            </div>
          </div>

        </div>

        {/* Trusted by section - subtle social proof */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Baseado em dados de fontes confiaveis</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            <span className="text-sm font-medium">Banco Central</span>
            <span className="text-sm font-medium">Serasa Experian</span>
            <span className="text-sm font-medium">IBGE</span>
            <span className="text-sm font-medium">SPC Brasil</span>
          </div>
        </div>
      </div>
    </section>
  )
}
