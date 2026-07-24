# Ideias de projeto

> Calibradas para o setup atual: Intel Arc B580 (12 GB VRAM), Intel i5-11400 (12 threads), 16 GB de RAM, NixOS 26.05. Cada projeto conecta a uma ou mais camadas do roadmap (ver `README.md`).

## O que o setup permite e limita

- Intel Arc B580, 12 GB VRAM: roda bem modelos de 7B a 14B quantizados (Q4 a Q8), embeddings e modelos pequenos de treino. Nao e CUDA: a stack e Intel (PyTorch XPU, IPEX-LLM, llama.cpp SYCL/Vulkan, OpenVINO). Boa parte dos tutoriais assume NVIDIA, entao parte do aprendizado e adaptar para a Arc.
- 16 GB de RAM: e o gargalo mais apertado. Limita offload de modelos grandes para a CPU e rodar muita coisa em paralelo. Modelos que cabem na VRAM funcionam bem; modelos que dependem de offload vao sofrer. Um upgrade de RAM e o melhor custo-beneficio futuro.
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

- A stack Intel Arc e mais nova e tem mais arestas que a NVIDIA. Espere gastar tempo com drivers e compatibilidade, o que e parte legitima do aprendizado de inferencia.
- Fine-tuning serio (QLoRA de 7B) fica no limite dos 12 GB e da RAM de 16 GB. Comecar por modelos menores ou por inferencia e mais produtivo no comeco.
- Versionar cada projeto como um flake do NixOS transforma uma limitacao (setup complexo) em vantagem (ambiente reproduzivel), que e exatamente o tipo de rigor esperado de um AI Systems Engineer.
