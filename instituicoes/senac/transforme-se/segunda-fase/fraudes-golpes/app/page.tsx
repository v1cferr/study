"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  Users,
  TrendingDown,
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Search,
  Bell,
  Heart,
  Brain,
  Smartphone,
  Mail,
  Link2,
  KeyRound,
  MessageSquareWarning,
  UserX,
  CreditCard,
  ShieldCheck,
  Lightbulb,
  ExternalLink,
  ArrowRight,
  Fingerprint,
  ScanLine,
  CircleAlert,
  ShieldAlert,
  BadgeCheck,
  Clock,
  TrendingUp,
  Zap,
  Globe,
  FileWarning,
  UserCheck,
  RefreshCw,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <main>
        <HeroSection />
        <TrustBanner />
        <ProofOfValueSection />
        <PainIntensificationSection />
        <MidPageCTA />
        <ImpactDataSection />
        <SolutionsSection />
        <BenefitsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">Escudo Digital</span>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          <a href="#problema" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Como funciona
          </a>
          <a href="#solucoes" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Proteção
          </a>
          <a href="#beneficios" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Recursos
          </a>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Acessar conta
          </Button>
          <Button className="rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30">
            Criar conta gratis
          </Button>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          <div className="flex flex-col gap-1">
            <span className={`h-0.5 w-4 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-4 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            <a href="#problema" className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              Como funciona
            </a>
            <a href="#solucoes" className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              Proteção
            </a>
            <a href="#beneficios" className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              Recursos
            </a>
            <div className="mt-4 flex flex-col gap-2 border-t border-border/50 pt-4">
              <Button variant="ghost" className="justify-start text-sm font-medium text-muted-foreground">
                Acessar conta
              </Button>
              <Button className="rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                Criar conta gratis
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 lg:pt-32">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 ring-1 ring-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-primary">Plataforma de Proteção Digital</span>
            </div>

            <h1 className="mt-8 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Golpes digitais exploram
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 text-primary">falhas humanas.</span>
                <span className="absolute -bottom-1 left-0 h-3 w-full bg-primary/20" />
              </span>
              Proteja-se antes do prejuízo.
            </h1>

            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Fraudes acontecem quando vulnerabilidade, desinformação e baixa proteção se encontram. 
              Verifique informações, identifique riscos e proteja seus dados em tempo real.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                Quero me proteger agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-border bg-transparent px-8 text-base font-semibold text-foreground transition-all hover:bg-muted"
              >
                Ver como funciona
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-2 ring-background"
                  >
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">28 milhoes</span> de casos de golpes via Pix em 2025
              </p>
            </div>
          </div>

          {/* Visual - Glassmorphism cards */}
          <div className="relative order-1 flex justify-center lg:order-2">
            <div className="relative h-[420px] w-full max-w-[380px]">
              {/* Main card */}
              <div className="absolute left-0 top-0 w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Alerta detectado</p>
                      <p className="text-sm font-semibold text-foreground">Link suspeito</p>
                    </div>
                  </div>
                  <Badge className="bg-destructive/10 text-destructive">Risco alto</Badge>
                </div>

                <div className="mt-6 rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">URL analisada</p>
                  <p className="mt-1 truncate font-mono text-sm text-foreground">banco-falso.xyz/login</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-destructive">
                      <CircleAlert className="h-3.5 w-3.5" />
                      Dominio registrado ha 2 dias
                    </div>
                    <div className="flex items-center gap-2 text-xs text-destructive">
                      <CircleAlert className="h-3.5 w-3.5" />
                      Certificado SSL invalido
                    </div>
                    <div className="flex items-center gap-2 text-xs text-destructive">
                      <CircleAlert className="h-3.5 w-3.5" />
                      Nao corresponde ao banco oficial
                    </div>
                  </div>
                </div>

                <Button className="mt-6 w-full rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Bloquear e denunciar
                </Button>
              </div>

              {/* Floating secure card */}
              <div 
                className="absolute -right-4 bottom-16 w-64 animate-float rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-3/10">
                    <ShieldCheck className="h-4 w-4 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Site verificado</p>
                    <p className="text-sm font-semibold text-chart-3">Seguro para uso</p>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div 
                className="absolute -left-4 bottom-4 animate-float rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">7M+</p>
                    <p className="text-[10px] text-muted-foreground">Fraudes detectadas</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">24%</p>
                    <p className="text-[10px] text-muted-foreground">Brasileiros afetados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Saiba mais</span>
          <ChevronDown className="h-4 w-4 animate-scroll-indicator text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}

function TrustBanner() {
  return (
    <section className="border-y border-border/50 bg-muted/30 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 lg:gap-16">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>Dados criptografados</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4 text-primary" />
          <span>100% gratuito para comecar</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Fingerprint className="h-4 w-4 text-primary" />
          <span>Privacidade garantida</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          <span>Verificacao em segundos</span>
        </div>
      </div>
    </section>
  )
}

function ProofOfValueSection() {
  const problems = [
    {
      icon: Heart,
      title: "Vulnerabilidade emocional",
      description: "Golpistas exploram medo, urgencia e esperanca para manipular decisoes rapidamente.",
      stat: "62%",
      statLabel: "agem por impulso",
    },
    {
      icon: Brain,
      title: "Baixa alfabetizacao digital",
      description: "Muitos usuarios nao reconhecem sinais de fraude por falta de conhecimento tecnico.",
      stat: "45%",
      statLabel: "nao verificam links",
    },
    {
      icon: Eye,
      title: "Exposicao de dados",
      description: "Informacoes compartilhadas em redes sociais sao usadas para golpes personalizados.",
      stat: "78%",
      statLabel: "expoem dados pessoais",
    },
    {
      icon: KeyRound,
      title: "Senhas fracas e repetidas",
      description: "Uma unica senha vazada compromete todas as contas onde foi reutilizada.",
      stat: "59%",
      statLabel: "repetem senhas",
    },
    {
      icon: MessageSquareWarning,
      title: "Fake news como porta de entrada",
      description: "Desinformacao prepara o terreno emocional para golpes mais sofisticados.",
      stat: "71%",
      statLabel: "compartilham sem checar",
    },
    {
      icon: Globe,
      title: "Ataques em escala industrial",
      description: "Phishing, ransomware e engenharia social sao aplicados de forma automatizada.",
      stat: "150%",
      statLabel: "aumento em 3 anos",
    },
  ]

  return (
    <section id="problema" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-6 border-destructive/20 bg-destructive/10 text-destructive">
            <AlertTriangle className="mr-1.5 h-3 w-3" />
            O problema e sistematico
          </Badge>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Por que os golpes digitais crescem exponencialmente?
          </h2>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Fraudes digitais exploram uma combinacao de vulnerabilidades humanas e tecnologicas. 
            Entender esses padroes e o primeiro passo para a protecao efetiva.
          </p>
        </div>

        {/* Problem cards */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <problem.icon className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{problem.stat}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{problem.statLabel}</p>
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-foreground">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PainIntensificationSection() {
  const situations = [
    {
      icon: Link2,
      question: "Clicou em um link sem verificar a origem?",
      context: "Links maliciosos chegam por SMS, WhatsApp e e-mail disfarçados de bancos, lojas e servicos oficiais.",
    },
    {
      icon: Bell,
      question: "Agiu por causa de uma mensagem urgente?",
      context: "'Sua conta sera bloqueada em 24h!' — golpistas usam urgencia para impedir que voce pense com calma.",
    },
    {
      icon: CreditCard,
      question: "Passou dados pessoais por telefone ou chat?",
      context: "CPF, dados bancarios e senhas sao coletados por sites e ligacoes que imitam empresas confiaveis.",
    },
    {
      icon: FileWarning,
      question: "Compartilhou uma noticia sem verificar?",
      context: "Fake news criam o contexto emocional perfeito para golpes direcionados e manipulacao.",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-muted/30 py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-destructive/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Voce se reconhece em alguma dessas situacoes?
            </h2>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Nao e questao de inteligencia. Golpistas profissionais exploram padroes de comportamento 
              que todos nos compartilhamos — especialmente sob pressao.
            </p>

            <div className="mt-10 space-y-4">
              {situations.map((situation) => (
                <div
                  key={situation.question}
                  className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                      <situation.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{situation.question}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{situation.context}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Callout card */}
          <div className="relative">
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-foreground">
                Atencao especial para grupos vulneraveis
              </h3>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                Idosos e pessoas com baixa alfabetizacao digital sao alvos preferenciais. 
                O prejuizo medio para essa faixa etaria e de <span className="font-semibold text-primary">R$ 2.540</span> por golpe.
              </p>

              <div className="mt-8 flex items-center gap-4 rounded-xl bg-background/50 p-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">O prejuizo so e percebido quando ja e tarde.</span>
                  {" "}Proteja quem voce ama compartilhando conhecimento.
                </p>
              </div>
            </div>

            {/* Floating element */}
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-white/10 bg-card p-4 shadow-xl lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">R$ 2.540</p>
                  <p className="text-xs text-muted-foreground">Prejuizo medio por golpe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MidPageCTA() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Proteja suas decisoes
          <span className="mt-1 block text-primary">antes de proteger seu dinheiro.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Verificar um link leva 3 segundos. Recuperar um golpe pode levar 18 meses e muito estresse.
        </p>

        <div className="mt-10">
          <Button 
            size="lg" 
            className="h-14 rounded-full bg-primary px-10 text-lg font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30"
          >
            Comecar minha protecao gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-chart-3" />
            <span>Sem cartao de credito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-chart-3" />
            <span>Configuracao em 2 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-chart-3" />
            <span>Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ImpactDataSection() {
  const stats = [
    {
      value: "28M",
      label: "Casos de golpes via Pix",
      context: "Registrados no Brasil em 2025, segundo relatorios de seguranca",
      source: "Correio Braziliense, Nov/2025",
    },
    {
      value: "R$ 2.540",
      label: "Prejuizo medio por vitima",
      context: "Idosos sao os que mais sofrem perdas financeiras em golpes virtuais",
      source: "Folha de S.Paulo, Out/2025",
    },
    {
      value: "24%",
      label: "Populacao ja foi vitima",
      context: "Quase 1 em cada 4 brasileiros adultos ja sofreu algum tipo de golpe digital",
      source: "DataSenado, 2024",
    },
  ]

  return (
    <section className="bg-muted/30 py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-6 border-chart-2/20 bg-chart-2/10 text-chart-2">
            <TrendingUp className="mr-1.5 h-3 w-3" />
            Dados reais e atualizados
          </Badge>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            O impacto em numeros
          </h2>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Estatisticas oficiais mostram a dimensao do problema no Brasil. 
            Cada numero representa pessoas reais e prejuizos concretos.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-lg"
            >
              <p className="text-5xl font-bold tracking-tight text-primary lg:text-6xl">{stat.value}</p>
              <p className="mt-3 text-lg font-semibold text-foreground">{stat.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.context}</p>
              
              <div className="mt-6 flex items-center gap-2 border-t border-border/50 pt-4">
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{stat.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionsSection() {
  const tabs = [
    {
      id: "informacao",
      label: "Informacao",
      icon: BookOpen,
      title: "Conhecimento e o primeiro escudo",
      description: "Conteudo educativo acessivel que transforma usuarios em especialistas na identificacao de golpes.",
      features: [
        { icon: Lightbulb, title: "Guias praticos", description: "Tutoriais simples sobre como identificar fraudes comuns" },
        { icon: FileWarning, title: "Alertas de golpes", description: "Atualizacoes sobre novos tipos de fraudes em circulacao" },
        { icon: Users, title: "Conteudo para familias", description: "Material especial para proteger idosos e criancas" },
        { icon: RefreshCw, title: "Atualizacao constante", description: "Novos conteudos toda semana baseados em ameacas reais" },
      ],
    },
    {
      id: "verificacao",
      label: "Verificacao",
      icon: Search,
      title: "Verifique antes de confiar",
      description: "Ferramentas de analise instantanea que revelam se um link, e-mail ou site e seguro.",
      features: [
        { icon: Link2, title: "Checagem de links", description: "Analise automatica de URLs suspeitas em segundos" },
        { icon: Mail, title: "Verificacao de e-mails", description: "Identificacao de phishing e remetentes falsos" },
        { icon: ScanLine, title: "Scanner de sites", description: "Validacao de certificados e autenticidade de paginas" },
        { icon: Smartphone, title: "Verificacao mobile", description: "Analise de mensagens de SMS e WhatsApp suspeitas" },
      ],
    },
    {
      id: "protecao",
      label: "Protecao Ativa",
      icon: Shield,
      title: "Protecao que trabalha por voce",
      description: "Sistema de monitoramento e alertas que identifica ameacas antes que causem danos.",
      features: [
        { icon: Bell, title: "Alertas em tempo real", description: "Notificacoes instantaneas sobre atividades suspeitas" },
        { icon: Lock, title: "Monitoramento de dados", description: "Verificacao se seus dados vazaram na internet" },
        { icon: ShieldAlert, title: "Protecao preventiva", description: "Bloqueio automatico de sites maliciosos conhecidos" },
        { icon: BadgeCheck, title: "Recomendacoes personalizadas", description: "Sugestoes de seguranca baseadas no seu perfil" },
      ],
    },
  ]

  return (
    <section id="solucoes" className="py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-6 border-primary/20 bg-primary/10 text-primary">
            <Shield className="mr-1.5 h-3 w-3" />
            Solucoes completas
          </Badge>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Tres pilares de protecao digital
          </h2>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Uma abordagem integrada que combina educacao, ferramentas de verificacao 
            e monitoramento ativo para proteger voce em todas as frentes.
          </p>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="informacao" className="w-full">
            <TabsList className="mx-auto grid h-auto w-full max-w-lg grid-cols-3 gap-2 rounded-2xl bg-muted/50 p-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <tab.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-12">
                <div className="rounded-3xl border border-border/50 bg-card p-8 lg:p-12">
                  <div className="mx-auto max-w-2xl text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      {(() => { const Icon = tab.icon; return <Icon className="h-7 w-7 text-primary" />; })()}
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-foreground">{tab.title}</h3>
                    <p className="mt-3 text-muted-foreground">{tab.description}</p>
                  </div>

                  <div className="mt-12 grid gap-4 sm:grid-cols-2">
                    {tab.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex items-start gap-4 rounded-xl bg-muted/30 p-5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          {(() => { const Icon = feature.icon; return <Icon className="h-5 w-5 text-primary" />; })()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{feature.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 text-center">
                    <Button className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                      Comecar com {tab.label.toLowerCase()}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  const benefits = [
    {
      title: "Reducao de riscos",
      description: "Identifique ameacas antes que se tornem prejuizos reais",
      icon: ShieldCheck,
      size: "large",
    },
    {
      title: "Decisoes mais seguras",
      description: "Tenha confianca ao clicar, comprar e compartilhar online",
      icon: BadgeCheck,
      size: "small",
    },
    {
      title: "Protecao para a familia",
      description: "Cuide de quem voce ama com ferramentas simples",
      icon: Users,
      size: "small",
    },
    {
      title: "Educacao continua",
      description: "Aprenda sobre novas ameacas e como evita-las",
      icon: BookOpen,
      size: "medium",
    },
    {
      title: "Tranquilidade digital",
      description: "Navegue sem medo e recupere a confianca na internet",
      icon: Heart,
      size: "medium",
    },
  ]

  return (
    <section id="beneficios" className="bg-muted/30 py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-6 border-chart-3/20 bg-chart-3/10 text-chart-3">
            <CheckCircle2 className="mr-1.5 h-3 w-3" />
            Beneficios
          </Badge>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            O que voce ganha com a protecao
          </h2>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Mais do que evitar golpes — voce recupera a confianca 
            para aproveitar tudo que o mundo digital oferece.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Large card */}
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                {(() => { const Icon = benefits[0].icon; return <Icon className="h-7 w-7 text-primary" />; })()}
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">{benefits[0].title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{benefits[0].description}</p>

              <div className="mt-8 space-y-3">
                {["Detecta links maliciosos", "Bloqueia sites falsos", "Alerta sobre vazamentos"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-chart-3" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          </div>

          {/* Small cards */}
          {benefits.slice(1, 3).map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                {(() => { const Icon = benefit.icon; return <Icon className="h-5 w-5 text-primary" />; })()}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}

          {/* Medium cards */}
          {benefits.slice(3).map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                {(() => { const Icon = benefit.icon; return <Icon className="h-5 w-5 text-primary" />; })()}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Golpes exploram vulnerabilidades.
          <span className="mt-2 block text-primary">Protecao comeca com consciencia.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Comece hoje a reduzir riscos e aumentar sua capacidade de decisao digital. 
          E gratuito, sem compromisso e leva menos de 2 minutos.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button 
            size="lg" 
            className="h-14 w-full rounded-full bg-primary px-10 text-lg font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 sm:w-auto"
          >
            Criar minha conta gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 w-full rounded-full border-border bg-transparent px-10 text-lg font-semibold text-foreground hover:bg-muted sm:w-auto"
          >
            Falar com especialista
          </Button>
        </div>

        <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-muted/50 px-6 py-3">
          <ShieldCheck className="h-5 w-5 text-chart-3" />
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">100% gratuito</span> para comecar • Sem cartao de credito
          </span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const sources = [
    { name: "Correio Braziliense", description: "Relatorio de golpes via Pix, Nov/2025" },
    { name: "Folha de S.Paulo", description: "Pesquisa sobre prejuizo medio, Out/2025" },
    { name: "DataSenado", description: "Pesquisa sobre vitimas de golpes, 2024" },
    { name: "SINDPD", description: "Analise de fraudes digitais no Brasil, 2025" },
  ]

  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">Escudo Digital</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Plataforma de verificacao e protecao digital contra fraudes online. 
              Educacao, ferramentas e monitoramento para sua seguranca.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-semibold text-foreground">Plataforma</p>
            <ul className="mt-4 space-y-3">
              {["Como funciona", "Recursos", "Precos", "FAQ"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Empresa</p>
            <ul className="mt-4 space-y-3">
              {["Sobre nos", "Blog", "Contato", "Termos de uso"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Contato</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-4.358-.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sources section */}
        <div className="mt-12 rounded-2xl border border-border/50 bg-card p-6">
          <p className="text-sm font-semibold text-foreground">Fontes dos dados apresentados</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sources.map((source) => (
              <div key={source.name} className="flex items-start gap-2">
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-foreground">{source.name}</p>
                  <p className="text-xs text-muted-foreground">{source.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2025 Escudo Digital. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-4.358-.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
