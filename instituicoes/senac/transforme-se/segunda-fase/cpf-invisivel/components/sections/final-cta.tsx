"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, Shield, Zap, Clock, Loader2 } from "lucide-react"

const benefits = [
  { icon: Zap, text: "Cadastro em menos de 2 minutos" },
  { icon: Shield, text: "Dados protegidos por criptografia" },
  { icon: Clock, text: "Primeiros resultados em 30 dias" },
]

const objections = [
  { question: "E gratis mesmo?", answer: "Sim. O cadastro e 100% gratuito. Recursos premium sao opcionais." },
  { question: "Preciso de cartao de credito?", answer: "Nao. Voce nao precisa ter nenhum produto financeiro para comecar." },
  { question: "Meus dados estao seguros?", answer: "Totalmente. Criptografia de ponta e conformidade com a LGPD." },
]

export function FinalCTA() {
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="cadastro" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px]" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left content */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6 leading-tight">
              Sua jornada para sair da invisibilidade comeca agora
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed">
              Milhares de brasileiros ja deram o primeiro passo. Nao deixe mais um dia passar sendo ignorado.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/40 border border-border/30"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Objections - accordion style */}
            <div className="space-y-3">
              {objections.map((item, index) => (
                <div 
                  key={index} 
                  className="p-5 rounded-2xl bg-card/40 border border-border/30 hover:border-border/50 transition-colors"
                >
                  <div className="font-medium text-sm mb-1">{item.question}</div>
                  <div className="text-sm text-muted-foreground">{item.answer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-6">
            <div className="p-8 lg:p-10 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl shadow-background/50">
              {!isSubmitted ? (
                <>
                  <h3 className="font-display text-2xl font-bold mb-2">Comece gratis agora</h3>
                  <p className="text-muted-foreground mb-8">
                    Preencha seus dados e comece a construir seu historico.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-13 rounded-xl bg-secondary/50 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="cpf" className="block text-sm font-medium mb-2">
                        CPF
                      </label>
                      <Input
                        id="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(formatCpf(e.target.value))}
                        maxLength={14}
                        required
                        className="h-13 rounded-xl bg-secondary/50 border-border/50 focus:border-primary"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group shadow-lg shadow-primary/25 rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Criando sua conta...
                        </>
                      ) : (
                        <>
                          Criar minha conta gratis
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="mt-6 text-xs text-center text-muted-foreground">
                    Ao criar sua conta, voce concorda com nossos{" "}
                    <a href="#" className="text-primary hover:underline">Termos de Uso</a>
                    {" "}e{" "}
                    <a href="#" className="text-primary hover:underline">Politica de Privacidade</a>.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">Conta criada com sucesso!</h3>
                  <p className="text-muted-foreground mb-8">
                    Enviamos um email para <strong className="text-foreground">{email}</strong> com as instrucoes para comecar.
                  </p>
                  <Button 
                    variant="outline" 
                    className="bg-transparent"
                    onClick={() => {
                      setIsSubmitted(false)
                      setEmail("")
                      setCpf("")
                    }}
                  >
                    Criar outra conta
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
