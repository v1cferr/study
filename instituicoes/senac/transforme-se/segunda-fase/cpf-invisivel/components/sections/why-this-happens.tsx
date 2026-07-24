"use client"

import { Building2, Clock, FileX, Users, HelpCircle } from "lucide-react"

const reasons = [
  {
    icon: FileX,
    title: "Sistema baseado em dividas",
    description: "O score tradicional so sobe quando voce pega emprestimo e paga. Sem divida, sem score.",
  },
  {
    icon: Building2,
    title: "Comportamento ignorado",
    description: "Pagar aluguel em dia, contas de luz e internet nao contam para seu historico.",
  },
  {
    icon: Clock,
    title: "Ciclo vicioso",
    description: "Precisa de historico para ter credito. Precisa de credito para ter historico.",
  },
  {
    icon: Users,
    title: "Jovens mais afetados",
    description: "Quem esta entrando no mercado de trabalho nao tem tempo suficiente de historico.",
  },
]

const stats = [
  { value: "45%", label: "jovens 18-24 sem score" },
  { value: "67M", label: "brasileiros invisiveis" },
  { value: "82%", label: "sem cartao de credito" },
  { value: "3 anos", label: "historico tradicional" },
]

export function WhyThisHappens() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-background pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/50 mb-6">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Entenda o problema</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
            Por que isso acontece?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A culpa nao e sua. O sistema de credito brasileiro foi construido para excluir quem esta comecando.
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Reasons - 2x2 grid on left */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {reasons.map((reason, index) => (
              <div 
                key={index} 
                className="p-6 lg:p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-border transition-colors duration-300"
              >
                <div className="p-3 rounded-2xl bg-secondary w-fit mb-5">
                  <reason.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>

          {/* Stats column on right */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-card/60 border border-primary/20 p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="font-display text-lg font-semibold mb-6 text-primary">Os numeros falam</h3>
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-baseline gap-3">
                  <span className="font-display text-3xl lg:text-4xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6">Fonte: IBGE, Serasa, Banco Central</p>
          </div>
        </div>
      </div>
    </section>
  )
}
