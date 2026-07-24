"use client"

import { XCircle, CreditCard, Home, Briefcase, Car, AlertTriangle } from "lucide-react"

const consequences = [
  {
    icon: CreditCard,
    title: "Credito negado",
    description: "Pedidos de cartao e emprestimo rejeitados automaticamente, mesmo sem dividas.",
    stat: "78%",
    statLabel: "das solicitacoes",
  },
  {
    icon: Home,
    title: "Aluguel impossivel",
    description: "Imobiliarias exigem fiador ou pagamento antecipado por falta de historico.",
    stat: "65%",
    statLabel: "exigem garantias",
  },
  {
    icon: Briefcase,
    title: "Empregos perdidos",
    description: "Empresas consultam score em processos seletivos — e rejeitam quem nao tem.",
    stat: "30%",
    statLabel: "das empresas checam",
  },
  {
    icon: Car,
    title: "Juros abusivos",
    description: "Quando consegue credito, paga ate 4x mais juros que alguem com historico.",
    stat: "4x",
    statLabel: "mais caro",
  },
]

export function Problem() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/20 bg-destructive/5 text-destructive mb-6">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">O problema real</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
            O custo de ser invisivel
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Voce nao esta devendo nada. Mas o sistema financeiro te trata como se estivesse.
          </p>
        </div>

        {/* Bento Grid for consequences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {consequences.map((item, index) => (
            <div 
              key={index}
              className="group relative p-6 lg:p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-destructive/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-destructive/10">
                  <item.icon className="h-6 w-6 text-destructive" />
                </div>
                <XCircle className="h-5 w-5 text-destructive/60" />
              </div>
              
              {/* Stat */}
              <div className="mb-4">
                <span className="text-3xl lg:text-4xl font-bold font-display text-destructive">{item.stat}</span>
                <span className="text-sm text-muted-foreground ml-2">{item.statLabel}</span>
              </div>
              
              {/* Content */}
              <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats callout - redesigned */}
        <div className="mt-12 lg:mt-16 p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-destructive/10 via-card/80 to-card/60 border border-destructive/20 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-2">
                <span className="text-destructive">R$ 15 bilhoes</span>
              </p>
              <p className="text-lg text-muted-foreground">
                em credito negado por ano a brasileiros sem historico
              </p>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-sm text-muted-foreground">
                Fonte: Banco Central do Brasil, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
