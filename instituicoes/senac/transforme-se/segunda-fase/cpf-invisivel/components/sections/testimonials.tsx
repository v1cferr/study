"use client"

import { Star, Quote, Users, CreditCard, TrendingUp, CheckCircle2 } from "lucide-react"

const testimonials = [
  {
    name: "Lucas Mendes",
    age: 23,
    location: "Sao Paulo, SP",
    text: "Tentei 4 cartoes de credito e fui negado em todos. Em 3 meses usando o CPF Invisivel, consegui meu primeiro cartao com limite de R$2.000.",
    result: "Primeiro cartao aprovado",
  },
  {
    name: "Ana Carolina",
    age: 26,
    location: "Belo Horizonte, MG",
    text: "Queria alugar um apartamento mas nao tinha fiador. Mostrei meu historico do CPF Invisivel e a imobiliaria aceitou sem fiador.",
    result: "Aluguel sem fiador",
  },
  {
    name: "Pedro Henrique",
    age: 21,
    location: "Rio de Janeiro, RJ",
    text: "Sabia que pagava tudo em dia mas isso nao aparecia em lugar nenhum. Agora tenho como provar e meu score subiu 180 pontos.",
    result: "+180 pontos no score",
  },
]

const metrics = [
  { value: "50.000+", label: "Usuarios ativos", icon: Users },
  { value: "R$ 12M+", label: "Credito liberado", icon: CreditCard },
  { value: "4.8/5", label: "Avaliacao media", icon: Star },
  { value: "92%", label: "Taxa de aprovacao", icon: TrendingUp },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Prova social</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
            Historias de quem saiu da invisibilidade
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Milhares de brasileiros ja estao construindo seu historico de credito.
          </p>
        </div>

        {/* Metrics - Bento style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-12 lg:mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="p-6 lg:p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-display text-3xl lg:text-4xl font-bold mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials - Bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`relative p-6 lg:p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 ${
                index === 0 ? "lg:row-span-1" : ""
              }`}
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 lg:top-8 lg:right-8 h-8 w-8 text-primary/10" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                {`"${testimonial.text}"`}
              </p>

              {/* Result badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {testimonial.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center font-display font-bold text-sm">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}, {testimonial.age}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
