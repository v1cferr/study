Você acertou em cheio no "ponto cego" do produto atual. Hoje, o Serasa Limpa Nome funciona como um e-commerce de dívidas: ele expõe o produto (dívida) e o preço (desconto), mas ignora se o "comprador" tem condições de pagar.
Apresenta-se uma proposta para o "Serasa HumanizAI", integrando Engenharia de Dados (Open Finance) e UX Conversacional (Gemini).
A ideia pode ser estruturada da seguinte forma:

1. Diferencial Técnico
A solução teria um Fluxo de Concessão de Dados:
Camada de Dados: O usuário autoriza o Open Finance. O sistema lê via API (usando o Supabase para orquestrar esses estados) o fluxo de caixa.
Camada de Inteligência: A API Gemini cruza: Dívida Total + Renda Real + Data de Recebimento.
Camada de UX: O Gemini gera um Plano de Alívio. Se o usuário é Freelancer, a IA sugere parcelas sazonais; se é CLT, sugere usar parte do 13º.

2. Justificativa para a Serasa
A Serasa poderia resolver a Taxa de Recuperação de Crédito.
Argumento: Acordos personalizados via IA têm 40% menos chance de inadimplência do que acordos genéricos.
Isso transforma a Serasa de uma "cobradora" em uma Gestora de Saúde Financeira, aumentando o valor da marca.

3. Impacto Social
O projeto ataca o Superendividamento. Ao considerar o "mínimo existencial" (o dinheiro que a pessoa precisa para comer e morar) antes de sugerir a parcela da dívida, o software evita que a pessoa passe fome para limpar o nome.

4. Demonstração de Conhecimento Senac
Deve-se detalhar:
Análise de Sistemas: Diagramas de caso de uso (O usuário que não sabe quanto pode pagar).
Banco de Dados (Supabase): Criar uma estrutura de tabelas que separe o perfil psicográfico (estresse financeiro) do perfil transacional (gastos).
Algoritmos: Implementar um prompt no Gemini que atue como um mediador de conflitos entre o credor e o devedor.
Documentação (Word/Markdown): Todo o levantamento de requisitos e as atas de reunião do grupo.
Sugestão de Árvore de Soluções atualizada:
Tronco: Negociação Empática e Preditiva.
Raiz 1 (Open Finance): Conectividade com bancos para entender o contexto real (CLT vs Autônomo).
Raiz 2 (Gemini API): Interface humana que reduz o estresse e traduz "juridiquês" bancário.
Frutos: Acordos que não quebram; aumento do Score de forma sustentável; redução do estresse mental.

Para avançar, focar na escrita da documentação (justificativa teórica) ou em como seria o desenho da interface (o "antes e depois" do app)?