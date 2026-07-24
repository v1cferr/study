# IA / LLM

Estudo de engenharia de sistemas de IA, com foco em AI systems engineering: contexto, RAG, agentes, harness, avaliacao e producao, sustentado por uma base de ML, transformers e inferencia.

## Objetivo

Perfil em T:

- Base horizontal solida: ML, transformers, inferencia e fundamentos matematicos suficientes para compreender o comportamento dos modelos.
- Profundidade vertical: contexto, RAG, agentes, harness, avaliacao, observabilidade, seguranca e producao.

A meta nao e virar cientista de modelos fundacionais, e sim conseguir distinguir uma implementacao correta de uma resposta apenas convincente, e diagnosticar o sistema camada a camada.

## Roadmap

1. Fundamentos de ML
2. Transformers e LLMs
3. Inferencia e GPUs
4. Prompting e engenharia de contexto
5. RAG
6. Tool calling e agentes
7. Harness engineering
8. Avaliacao, observabilidade e producao

## Profundidade por camada

### 1. Fundamentos de ML

- [ ] Treino, validacao e teste
- [ ] Generalizacao e overfitting
- [ ] Funcoes de perda
- [ ] Gradiente e otimizacao
- [ ] Classificacao, regressao e metricas
- [ ] Embeddings e representacao vetorial
- [ ] Distribuicao de dados e data leakage

### 2. Transformers e LLMs

- [ ] Tokenizacao
- [ ] Embeddings
- [ ] Self-attention
- [ ] Positional encoding
- [ ] Camadas e parametros
- [ ] Pretraining
- [ ] Supervised fine-tuning
- [ ] Alinhamento e preference optimization
- [ ] Sampling, temperatura e top-p
- [ ] Context window
- [ ] Alucinacao e limitacoes de representacao

### 3. Inferencia e GPUs

- [ ] VRAM e movimentacao de memoria
- [ ] Quantizacao
- [ ] KV cache
- [ ] Batching
- [ ] Throughput versus latencia
- [ ] Tamanho do modelo versus memoria
- [ ] Precisao FP32, FP16, BF16 e INT8/INT4
- [ ] Runtimes de inferencia
- [ ] PyTorch e backends de hardware
- [ ] Paralelismo e offloading

### 4. Prompting e engenharia de contexto

- [ ] Instrucoes, historico e memoria
- [ ] Documentos e resultados de ferramentas
- [ ] Exemplos e estado da tarefa
- [ ] Politicas e formatos de saida

### 5. RAG

- [ ] Ingestao e normalizacao
- [ ] Chunking semantico
- [ ] Metadados
- [ ] Busca vetorial, lexical e hibrida
- [ ] Filtros
- [ ] Reranking
- [ ] Query rewriting
- [ ] Contextual compression
- [ ] Permissoes documentais
- [ ] Atualizacao e versionamento
- [ ] Avaliacao de retrieval
- [ ] Avaliacao de geracao grounded

### 6. Tool calling e agentes

- [ ] Schemas estritos
- [ ] Validacao de argumentos
- [ ] Retries e timeouts
- [ ] Idempotencia
- [ ] Controle de permissoes
- [ ] Sandboxing
- [ ] Confirmacao de acoes criticas
- [ ] Persistencia de estado
- [ ] Tratamento de execucao parcial
- [ ] Recuperacao de falhas

### 7. Harness engineering

- [ ] Montagem do contexto
- [ ] Loop do agente
- [ ] Ferramentas, memoria e estado
- [ ] Checkpoints
- [ ] Roteamento entre modelos
- [ ] Budgets e limites de iteracao
- [ ] Politicas e aprovacao humana
- [ ] Recuperacao apos falhas

### 8. Avaliacao, observabilidade e producao

- [ ] Datasets de avaliacao
- [ ] Regressao entre versoes
- [ ] Evals deterministicas e baseadas em modelos
- [ ] Avaliacao humana
- [ ] Tracing e logs estruturados
- [ ] Custos por execucao e latencia
- [ ] Taxa de falha de ferramentas
- [ ] Qualidade de retrieval
- [ ] Seguranca
- [ ] Feedback de producao

## Documentos

- [estrategia.md](./estrategia.md): ordem de estudo (matematica, ML, PyTorch, transformers, inferencia), as duas linhas paralelas e o mapa de conexoes teoria para aplicacao.
- [direcao.md](./direcao.md): analise completa da direcao de estudo e a justificativa por tras deste roadmap.

## Referencias

1. [Trustworthy agents in practice, Anthropic](https://www.anthropic.com/research/trustworthy-agents)
2. [A practical guide to building agents, OpenAI](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
3. [Agentic coding and persistent returns to expertise, Anthropic](https://www.anthropic.com/research/claude-code-expertise)
4. [AI Engineer Roadmap, roadmap.sh](https://roadmap.sh/ai-engineer)
5. [Effective context engineering for AI agents, Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
6. [Demystifying evals for AI agents, Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
