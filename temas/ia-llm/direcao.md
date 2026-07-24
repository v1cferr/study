# Direção de estudo em IA/LLM

> Documento de contexto: análise da direção de estudo e a justificativa por trás do roadmap. Ver o [README](./README.md) para o roadmap e o checklist por camada.

Sim, vale aprofundar. Mas com uma correção importante: a IA consegue executar bastante coisa "sozinha" depois que recebe um objetivo, ferramentas, permissões, contexto e critérios de parada. Um agente pode planejar, usar ferramentas, observar resultados, corrigir a rota e repetir esse ciclo sem um humano aprovando cada passo. Ainda assim, o sistema inteiro continua dependendo de decisões humanas anteriores: qual problema resolver, quais dados usar, o que significa sucesso, quais ações são permitidas e quando uma falha é aceitável. [1]

Portanto, não é exatamente:

> humano faz o macro e IA faz o micro.

Está se tornando mais parecido com:

> humano define direção, restrições e critérios; IA pode decompor e executar partes do macro e do micro; humano avalia o sistema e assume responsabilidade pelas consequências.

Em tarefas simples e reversíveis, o humano pode ficar apenas **on the loop**, acompanhando métricas e exceções. Em ações sensíveis, irreversíveis ou de alto impacto, a recomendação atual continua sendo colocar supervisão humana em pontos críticos. [2]

## Por que aprofundar continua valendo

À medida que a geração de código e texto fica mais barata, o diferencial migra da execução mecânica para a capacidade de:

- formular corretamente o problema;
- fornecer contexto de qualidade;
- escolher a arquitetura;
- integrar dados e sistemas;
- identificar erros plausíveis;
- avaliar resultados;
- controlar custos, latência e segurança;
- entender o domínio em que a IA está operando.

Há evidência recente, inclusive no uso de agentes de programação, de que conhecimento de domínio continua ampliando os resultados obtidos: pessoas com mais expertise conseguem direcionar, revisar e aproveitar melhor os agentes, em vez de serem simplesmente substituídas por eles. [3]

Ou seja, quanto melhor a IA fica, mais produtivo você se torna com ela, desde que consiga distinguir uma implementação correta de uma resposta apenas convincente.

Esse é o problema de permanecer na superfície: você consegue produzir protótipos rapidamente, mas não consegue responder perguntas como:

- Por que a recuperação está retornando documentos irrelevantes?
- O problema está no embedding, no chunking, no reranker ou no prompt?
- Por que a inferência consome tanta VRAM?
- Por que aumentar o contexto degradou a resposta?
- Como avaliar um agente que produz trajetórias diferentes a cada execução?
- Como impedir uma ferramenta de executar duas vezes uma operação financeira?
- Como detectar regressões depois de trocar o modelo?
- Como separar erro do modelo de erro do harness?

A pessoa que apenas conhece APIs fica dependente da tentativa e erro. A pessoa que entende as camadas consegue diagnosticar o sistema.

## O roadmap está correto

A sequência montada é melhor do que estudar apenas "prompt engineering":

> fundamentos de ML, transformers e LLMs, inferência e GPUs, prompting/contexto, RAG, tool calling e agentes, harness, avaliação, observabilidade e produção.

Ela também está alinhada ao posicionamento atual de AI Engineer como alguém que constrói e entrega sistemas de IA, não necessariamente como alguém que pesquisa novos modelos fundamentais. O roadmap de AI Engineer citado continua sendo apresentado como um guia específico para essa função em 2026. [4]

Mas não é preciso atingir profundidade de pesquisador em todas as camadas. O ideal é um perfil em **T**:

**Base horizontal sólida:** ML, transformers, inferência e fundamentos matemáticos suficientes para compreender o comportamento dos modelos.

**Profundidade vertical:** contexto, RAG, agentes, harness, avaliação, observabilidade, segurança e produção.

Isso combina diretamente com o trabalho na FAI.UFSCar.

## A profundidade adequada em cada camada

### Fundamentos de ML

Compreender bem:

- treino, validação e teste;
- generalização e overfitting;
- funções de perda;
- gradiente e otimização;
- classificação, regressão e métricas;
- embeddings e representação vetorial;
- distribuição de dados e data leakage.

Não é necessário inicialmente implementar algoritmos complexos do zero, mas é preciso entender por que um sistema aprende, falha e generaliza.

### Transformers e LLMs

Compreender:

- tokenização;
- embeddings;
- self-attention;
- positional encoding;
- camadas e parâmetros;
- pretraining;
- supervised fine-tuning;
- alinhamento e preference optimization;
- sampling, temperatura e top-p;
- context window;
- alucinação e limitações de representação.

O objetivo não é treinar um modelo fundacional, mas conseguir raciocinar sobre o comportamento dele sem tratá-lo como uma API mágica.

### Inferência e GPUs

Especialmente relevante com a Intel Arc B580 e a workstation da FAI:

- VRAM e movimentação de memória;
- quantização;
- KV cache;
- batching;
- throughput versus latência;
- tamanho do modelo versus memória;
- precisão FP32, FP16, BF16 e INT8/INT4;
- runtimes de inferência;
- PyTorch e backends de hardware;
- paralelismo e offloading.

Isso permite entender por que um modelo cabe ou não cabe, por que está lento e qual otimização realmente faz diferença.

### Prompting e engenharia de contexto

Prompting é apenas uma parte. Engenharia de contexto envolve selecionar e organizar tudo o que chega ao modelo:

- instruções;
- histórico;
- memória;
- documentos;
- resultados de ferramentas;
- exemplos;
- estado da tarefa;
- políticas;
- formatos de saída.

A Anthropic caracteriza context engineering como uma evolução natural do prompt engineering, especialmente em agentes que acumulam grandes quantidades de informação ao longo de várias etapas. [5]

### RAG

Ir além de "embedding + banco vetorial":

- ingestão e normalização;
- chunking semântico;
- metadados;
- busca vetorial, lexical e híbrida;
- filtros;
- reranking;
- query rewriting;
- contextual compression;
- permissões documentais;
- atualização e versionamento;
- avaliação de retrieval;
- avaliação de geração grounded.

Em sistemas institucionais, segurança e procedência dos dados são tão importantes quanto relevância semântica.

### Tool calling e agentes

A dificuldade real não está apenas em definir ferramentas. Está em torná-las confiáveis:

- schemas estritos;
- validação de argumentos;
- retries;
- timeouts;
- idempotência;
- controle de permissões;
- sandboxing;
- confirmação de ações críticas;
- persistência de estado;
- tratamento de execução parcial;
- recuperação de falhas.

Um agente é um sistema distribuído probabilístico operando sobre ferramentas determinísticas. Essa combinação produz categorias de erro diferentes das aplicações convencionais.

### Harness engineering

O harness é a camada que transforma o modelo em um sistema operacionalmente útil. Ele controla:

- montagem do contexto;
- loop do agente;
- ferramentas;
- memória;
- estado;
- checkpoints;
- roteamento entre modelos;
- budgets;
- limites de iteração;
- políticas;
- aprovação humana;
- recuperação após falhas.

É provavelmente uma das especializações mais coerentes com a direção atual. O modelo é substituível; o harness contém a inteligência arquitetural da aplicação.

### Avaliação, observabilidade e produção

Esta é a camada que separa uma demonstração de um sistema real:

- datasets de avaliação;
- regressão entre versões;
- evals determinísticas e baseadas em modelos;
- avaliação humana;
- tracing;
- logs estruturados;
- custos por execução;
- latência;
- taxa de falha de ferramentas;
- qualidade de retrieval;
- segurança;
- feedback de produção.

Avaliar agentes é mais difícil do que avaliar respostas isoladas porque eles executam várias etapas, alteram estados e podem chegar a resultados por trajetórias diferentes. Por isso, avaliações de agentes normalmente precisam analisar tanto o resultado final quanto a trajetória de ferramentas e decisões. [6]

## O ativo mais durável não será saber usar determinado modelo

APIs, frameworks e modelos mudarão. O que tende a permanecer é a capacidade de compreender:

```text
problema institucional
        ↓
dados e restrições
        ↓
arquitetura de IA
        ↓
contexto e ferramentas
        ↓
execução controlada
        ↓
avaliação
        ↓
observabilidade
        ↓
melhoria contínua
```

Essa é a diferença entre alguém que "usa IA" e alguém que **projeta sistemas de IA**.

Aprofundar vale especialmente porque já existe o que muita gente só obtém depois: problemas reais, usuários reais, infraestrutura, documentos institucionais, sistemas legados e necessidade de colocar soluções em produção. O estudo teórico não fica desconectado; cada conceito pode ser associado a uma dificuldade concreta.

Avaliação geral: a direção está correta. Não é preciso virar cientista de modelos, mas é preciso conhecer os fundamentos o suficiente para não construir a carreira inteira sobre abstrações que não se consegue inspecionar. A especialização principal pode ficar em **AI systems engineering: contexto, RAG, agentes, harness, avaliação e produção**, sustentada por uma base séria de ML, transformers e inferência.

## Referências

1. [Trustworthy agents in practice, Anthropic](https://www.anthropic.com/research/trustworthy-agents)
2. [A practical guide to building agents, OpenAI](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
3. [Agentic coding and persistent returns to expertise, Anthropic](https://www.anthropic.com/research/claude-code-expertise)
4. [AI Engineer Roadmap, roadmap.sh](https://roadmap.sh/ai-engineer)
5. [Effective context engineering for AI agents, Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
6. [Demystifying evals for AI agents, Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
