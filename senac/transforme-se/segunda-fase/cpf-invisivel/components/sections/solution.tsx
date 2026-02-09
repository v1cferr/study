"use client"

import { UserPlus, Link2, TrendingUp, BadgeCheck, ArrowRight, CheckCircle2 } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Crie sua conta",
    description: "Cadastro em menos de 2 minutos. Apenas CPF e email.",
    highlight: "Gratis",
  },
  {
    step: "02",
    icon: Link2,
    title: "Conecte suas contas",
    description: "Vincule contas de luz, internet, streaming que voce ja paga.",
    highlight: "Automatico",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Construa historico",
    description: "Cada pagamento em dia contribui para seu perfil de credito.",
    highlight: "Continuo",
  },
  {
    step: "04",
    icon: BadgeCheck,
    title: "Acesse credito justo",
    description: "Cartoes, emprestimos e financiamentos com taxas justas.",
    highlight: "Resultado",
  },
]

const benefits = [
  { title: "Sem taxa de adesao", description: "Comece de graca, sempre." },
  { title: "Dados protegidos", description: "LGPD compliant e criptografado." },
  { title: "Resultados em 30 dias", description: "Score visivel rapidamente." },
]

export function Solution() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6">
            <span className="text-sm font-medium">A solucao</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
            Como o CPF Invisivel funciona
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transformamos seus pagamentos do dia a dia em historico de credito real.
          </p>
        </div>

        {/* Steps - Bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {steps.map((item, index) => (
            <div 
              key={index} 
              className="group relative p-6 lg:p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-primary/60">{item.step}</span>
                <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10">{item.highlight}</span>
              </div>
              
              {/* Icon */}
              <div className="p-3 rounded-2xl bg-primary/10 w-fit mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              
              {/* Arrow connector (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits row */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-5 rounded-2xl bg-card/40 border border-border/30"
            >
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-display font-semibold">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
