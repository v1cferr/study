"use client"

import { XCircle, CheckCircle, ArrowRight, Zap } from "lucide-react"

const comparisons = [
  {
    old: "Precisa pegar emprestimo para ter score",
    new: "Use pagamentos que voce ja faz",
  },
  {
    old: "Anos para construir historico",
    new: "Resultados em 30 dias",
  },
  {
    old: "Processo burocrático e lento",
    new: "Cadastro em 2 minutos",
  },
  {
    old: "Dados espalhados em varios bureaus",
    new: "Tudo centralizado em um lugar",
  },
  {
    old: "Sem transparencia sobre seu score",
    new: "Acompanhe evolucao em tempo real",
  },
]

export function Differentiator() {
  return (
    <section id="seguranca" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Nossa abordagem</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
            Quebrando o modelo antigo
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            O sistema tradicional foi feito para excluir. Nos construimos algo diferente.
          </p>
        </div>

        {/* Comparison - Bento style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {/* Old way card */}
          <div className="rounded-3xl bg-card/40 border border-destructive/20 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-display text-lg font-semibold text-muted-foreground">Modelo tradicional</h3>
            </div>
            <ul className="space-y-4">
              {comparisons.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <XCircle className="h-5 w-5 text-destructive/60 flex-shrink-0 mt-0.5" />
                  <span>{item.old}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New way card */}
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-card/60 border border-primary/30 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary">CPF Invisivel</h3>
            </div>
            <ul className="space-y-4">
              {comparisons.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item.new}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-card/40 border border-border/50">
            <p className="text-xl lg:text-2xl font-display font-medium text-muted-foreground mb-2">
              Nao e sobre <span className="line-through decoration-destructive/50">consertar voce</span>.
            </p>
            <p className="text-xl lg:text-2xl font-display font-bold text-foreground">
              E sobre <span className="text-primary">consertar o sistema</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
