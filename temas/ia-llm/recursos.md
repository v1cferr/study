# Recursos

> Curadoria inicial cruzando tres trilhas contra as camadas do roadmap. Nomes de modulos e URLs mudam com o tempo; confira antes de comecar.

## Trilhas

- Microsoft Learn, AI Engineer career path (referencia-alvo, foco de medio prazo, Azure e certificacao AI-102 Azure AI Engineer Associate): <https://learn.microsoft.com/en-us/training/career-paths/ai-engineer>
- roadmap.sh/ai-engineer (foco de longo prazo, visao ampla da funcao): <https://roadmap.sh/ai-engineer>
- Fundamentos (base horizontal, agnostica de fornecedor): matematica, ML, PyTorch, transformers e inferencia.

## Mapa camada para recurso

| Camada do roadmap | Fundamentos | Microsoft / Azure | roadmap.sh / geral |
|-------------------|-------------|-------------------|--------------------|
| Matematica | 3Blue1Brown (algebra linear e calculo), Khan Academy | - | base para todo o resto |
| Fundamentos de ML | Andrew Ng ML Specialization, fast.ai | Azure Machine Learning (modulos de ML) | secao de ML do roadmap |
| PyTorch | Tutoriais oficiais do PyTorch | PyTorch no Azure ML | - |
| Transformers e LLMs | Illustrated Transformer, Karpathy Zero to Hero | Azure OpenAI (conceitos) | secao de LLMs |
| Inferencia e GPU | llama.cpp, IPEX-LLM, OpenVINO, PyTorch XPU | Azure AI model catalog, deployment | otimizacao e serving |
| Prompting e contexto | docs de engenharia de contexto da Anthropic | Azure AI prompt flow | secao de prompt engineering |
| RAG | LanceDB / Qdrant / pgvector, embeddings (bge, e5) | Azure AI Search (RAG gerenciado) | secao de RAG |
| Tool calling e agentes | docs de agentes (Anthropic, OpenAI) | Azure AI Agent Service / AI Foundry | secao de agentes |
| Harness | construir o proprio (ver `projetos.md`) | orquestracao no AI Foundry | - |
| Avaliacao e producao | evals deterministicas e por modelo | Azure AI evaluation e observabilidade | secao de deployment e monitoramento |

## Recursos por camada

### Matematica
- 3Blue1Brown, Essence of Linear Algebra e Essence of Calculus: <https://www.3blue1brown.com/>
- Khan Academy (algebra linear, probabilidade, calculo).

### Fundamentos de ML
- Andrew Ng, Machine Learning Specialization (Coursera): <https://www.coursera.org/specializations/machine-learning-introduction>
- fast.ai, Practical Deep Learning: <https://course.fast.ai/>

### PyTorch
- Tutoriais oficiais, Learn the Basics: <https://pytorch.org/tutorials/>
- Suporte a Intel GPU (backend XPU): usar `torch.xpu` no lugar de `cuda`.

### Transformers e LLMs
- Jay Alammar, The Illustrated Transformer: <https://jalammar.github.io/illustrated-transformer/>
- Andrej Karpathy, Neural Networks Zero to Hero e nanoGPT: <https://karpathy.ai/zero-to-hero.html> e <https://github.com/karpathy/nanoGPT>

### Inferencia e GPU

Stack Intel Arc (maquina local, fronteira a explorar):
- IPEX-LLM (Intel Extension for PyTorch para LLM, suporta Arc e integra llama.cpp, Ollama e vLLM): <https://github.com/intel/ipex-llm>
- OpenVINO (toolkit de inferencia da Intel, plugin de GPU para Arc): <https://docs.openvino.ai/>
- llama.cpp (backends SYCL e Vulkan funcionam na Arc): <https://github.com/ggerganov/llama.cpp>

Stack NVIDIA / CUDA (RTX 5090 na FAI, base de referencia e cargas pesadas):
- CUDA toolkit, cuDNN e TensorRT-LLM.
- vLLM para serving de alto throughput.
- llama.cpp tambem tem backend CUDA, util para comparar o mesmo binario nos dois lados.

### Microsoft / Azure (foco de medio prazo)
- AI Engineer career path (referencia-alvo): <https://learn.microsoft.com/en-us/training/career-paths/ai-engineer>
- Certificacao AI-102, Azure AI Engineer Associate (meta concreta de curto prazo dentro do ecossistema).

## Como usar

Estudar em duas linhas paralelas (ver `estrategia.md`): cada conceito de fundamentos deve ser aplicado num projeto (ver `projetos.md`). A trilha Microsoft cobre o objetivo de medio prazo e o ecossistema da FAI.UFSCar; o roadmap.sh amplia para o longo prazo. Os fundamentos sustentam as duas e nao dependem de fornecedor.
