# Ideias de projeto

> Calibradas para dois ambientes: a maquina local com Intel Arc B580 (12 GB VRAM), i5-11400 e 16 GB de RAM em NixOS 26.05, e a workstation da FAI.UFSCar com RTX 5090 (CUDA). A Arc foi escolhida de proposito para explorar e levar ao limite a stack Intel, menos trilhada; o CUDA ja e estudado e estavel na 5090. Comparar os dois lados e um angulo de primeira classe aqui. Cada projeto conecta a uma ou mais camadas do roadmap (ver `README.md`).

## Ambientes e limites

- Intel Arc B580 (local), 12 GB VRAM: roda bem modelos de 7B a 14B quantizados (Q4 a Q8), embeddings e modelos pequenos de treino. Stack Intel (PyTorch XPU, IPEX-LLM, llama.cpp SYCL/Vulkan, OpenVINO). Boa parte dos tutoriais assume NVIDIA; adaptar para a Arc e o objetivo, nao um obstaculo: e terreno pouco explorado, onde da para aprender e documentar o que quase ninguem cobre.
- RTX 5090 (FAI.UFSCar): ambiente CUDA para cargas pesadas, treino e fine-tuning serio, e a base de referencia nas comparacoes. O CUDA ja e estudado e estavel; a 5090 e a linha de base contra a qual medir a Arc.
- 16 GB de RAM (local): e o gargalo mais apertado na maquina local. Limita offload de modelos grandes para a CPU e rodar muita coisa em paralelo. Modelos que cabem na VRAM funcionam bem. Cargas que dependem de muita RAM ou treino pesado vao para a 5090.
- i5-11400: suficiente para orquestracao, pre-processamento e inferencia em CPU de modelos pequenos.
- NixOS: reprodutibilidade declarativa. Vale versionar cada ambiente de projeto como um flake, o que ja e um diferencial de engenharia e evita o classico "funciona so na minha maquina".

## Progressao sugerida

Os projetos estao em ordem crescente de dificuldade e cada um reaproveita o anterior.

### 0. Flake de ambiente de IA local na Arc

Camada: inferencia e GPU, mais NixOS.

Um `flake.nix` que provisiona de forma declarativa a stack de inferencia na Arc: drivers (intel-compute-runtime, level-zero), PyTorch com backend XPU, IPEX-LLM, llama.cpp com SYCL ou Vulkan e OpenVINO. Entrega um `nix develop` reproduzivel com a GPU funcionando.

Valor: e a fundacao dos outros projetos e por si so ensina a stack Intel mais a configuracao de GPU no NixOS.

### 1. Bench de inferencia local

Camada: inferencia e GPU.

Rodar o mesmo modelo quantizado (por exemplo Llama 3.1 8B ou Qwen2.5 7B/14B) em backends diferentes (llama.cpp Vulkan, llama.cpp SYCL, IPEX-LLM, OpenVINO) e medir: tokens por segundo, uso de VRAM, tempo de prefill versus decoding, efeito da quantizacao (Q4 versus Q8) e efeito do context length no consumo de memoria. Gerar um relatorio.

Ensina na pratica: VRAM, quantizacao, KV cache, throughput versus latencia, prefill versus decoding. Conecta direto com a camada de inferencia.

Rodar o mesmo protocolo na RTX 5090 da FAI transforma isso num comparativo Intel versus NVIDIA (SYCL, Vulkan e OpenVINO versus CUDA e TensorRT-LLM). E material raro e diferenciado, e o tipo de resultado que quase ninguem publica sobre a Arc.

#### Protocolo detalhado

Modelos (todos precisam caber em 12 GB quantizados na Arc):
- Qwen2.5 7B e Llama 3.1 8B como base.
- Qwen2.5 14B em Q4 para testar o limite dos 12 GB.
- Um modelo de embeddings (bge-m3 ou e5) medido a parte.

Variaveis a varrer:
- Quantizacao: Q4_K_M, Q5_K_M, Q8_0 (e FP16 quando couber, o que so vale para modelos pequenos).
- Context length: 512, 2k, 8k e 32k tokens, observando VRAM e velocidade.
- Batch size: 1 versus lotes maiores, para ver o efeito no throughput e na latencia.
- Backend: llama.cpp Vulkan, llama.cpp SYCL, IPEX-LLM e OpenVINO na Arc; llama.cpp CUDA, vLLM e TensorRT-LLM na 5090.

Metricas:
- Prefill (prompt) em tokens por segundo e decoding (geracao) em tokens por segundo, medidos separadamente.
- Time to first token.
- VRAM de pico.
- Efeito do context length no VRAM e na velocidade.
- Se possivel, potencia e temperatura da GPU.

Metodo:
- Usar o `llama-bench` do llama.cpp como ponto de partida (ja padroniza prefill e decode).
- Prompts fixos, seed fixa, rodada de warmup e N repeticoes com media e desvio.
- Mudar uma variavel por vez; registrar versao de driver, backend e modelo.

Entrega:
- Um `flake.nix` que reproduz o ambiente de medicao (reaproveita o projeto 0).
- Um relatorio em markdown no repo com tabelas e graficos, e uma conclusao por pergunta: qual backend rende mais na Arc, onde a Arc se aproxima ou fica longe da 5090, e qual quantizacao tem o melhor custo de qualidade versus VRAM.

### 2. RAG institucional local

Camada: RAG (mais contexto).

RAG sobre documentos reais (regulamentos, manuais, documentos da FAI). Embeddings locais (bge-m3 ou e5) mais um vector store (Qdrant, LanceDB ou pgvector) mais um LLM local de 7B. Implementar busca hibrida (lexical mais vetorial), reranking, metadados e permissoes documentais, e avaliar o retrieval separadamente da geracao.

Ensina: embeddings, chunking, busca hibrida, reranking, avaliacao de retrieval, procedencia e permissoes. Cabe bem em 12 GB (embeddings mais geracao 7B). Problema real e diretamente ligado ao ecossistema da FAI.

### 3. Agente com tool calling confiavel

Camadas: tool calling e agentes, mais harness.

Um agente pequeno que usa ferramentas com schemas estritos, validacao de argumentos, retries, timeouts, idempotencia e confirmacao de acoes criticas. Por exemplo, automatizar uma tarefa institucional (consultar sistemas, montar relatorios). Construir o harness em volta: montagem de contexto, loop do agente, estado, budgets e aprovacao humana em acoes sensiveis.

Ensina: a diferenca entre definir ferramentas e torna-las confiaveis, e o componente de harness que orquestra tudo.

### 4. Harness de avaliacao (evals)

Camada: avaliacao, observabilidade e producao.

Construir um harness de avaliacao para o RAG e o agente anteriores: datasets de avaliacao, evals deterministicas e baseadas em modelo, avaliacao de trajetoria para o agente, teste de regressao ao trocar de modelo, tracing, logs estruturados e acompanhamento de custo e latencia.

Ensina: a camada que separa uma demo de um sistema real, e a mais dificil de avaliar bem.

### 5. Ponte local para Azure (foco Microsoft)

Camadas: RAG, agentes, producao. Alinhado ao objetivo de medio prazo e a certificacao AI-102.

Levar o RAG do projeto 2 para uma versao hibrida: Arc local para desenvolvimento e experimentacao, Azure para o caminho de producao (Azure OpenAI, Azure AI Search, Azure AI Foundry). Comparar as duas versoes em qualidade, custo e latencia.

Valor: conecta diretamente com o career path da Microsoft e com o ecossistema da FAI.UFSCar, sem abrir mao da base agnostica.

## Trilha de fundamentos (em paralelo)

Camadas: matematica, ML, PyTorch, transformers. Baixo consumo de VRAM, cabe folgado na Arc.

Seguir o Karpathy Zero to Hero implementando no PyTorch com backend XPU: regressao linear, uma rede neural simples, um classificador de imagens pequeno e um transformer de caracteres estilo nanoGPT. O objetivo nao sao os projetos em si, e observar dados, pesos, gradientes e memoria durante o treino.

## Observacoes honestas

- A stack Intel Arc e mais nova e tem mais arestas que a NVIDIA, e esse e justamente o motivo da escolha: e terreno de fronteira, com pouco material publicado. Documentar o que funciona (drivers, backends, limites) ja e uma contribuicao com valor real.
- Como o CUDA ja esta coberto pela RTX 5090 na FAI, da para usar a Arc local sem medo, empurrando ate quebrar, e deixar treino e fine-tuning pesado para a 5090. Na maquina local, comecar por inferencia rende mais (QLoRA de 7B fica no limite dos 12 GB e dos 16 GB de RAM).
- Versionar cada projeto como um flake do NixOS transforma o setup complexo em vantagem (ambiente reproduzivel), exatamente o rigor esperado de um AI Systems Engineer.
