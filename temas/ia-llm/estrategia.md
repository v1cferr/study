# Estratégia de estudo

> Documento de contexto: a ordem de estudo mais eficiente e como alternar teoria e aplicação. Ver o [README](./README.md) para o roadmap e o checklist por camada, e [direcao.md](./direcao.md) para a justificativa.

Você não está no zero. Você já entende a camada de sistemas: contexto, RAG, tool calling, agentes, integrações e produção. O que falta é a base "por baixo do modelo", principalmente para deixar de tratar comportamento, custo e desempenho como caixa-preta.

A ordem mais eficiente seria esta:

## 1. Matemática suficiente para leitura técnica

- Álgebra linear: vetores, matrizes, produto escalar, multiplicação de matrizes e dimensões.
- Probabilidade: distribuições, média, variância, probabilidade condicional e entropia.
- Cálculo: derivadas, gradientes e regra da cadeia.
- Otimização: gradient descent, learning rate e funções de perda.

Não precisa começar por demonstrações formais. Precisa conseguir olhar para uma operação do PyTorch e entender o que os tensores representam.

## 2. Fundamentos de machine learning

Treino, validação e teste; overfitting; generalização; features e labels; classificação e regressão; métricas; data leakage; embeddings.

Aqui o objetivo é entender o ciclo completo:

```text
dados → modelo → loss → gradiente → atualização dos pesos → avaliação
```

## 3. PyTorch

Tensores, shapes, broadcasting, autograd, módulos, datasets, dataloaders, optimizer, treino e inferência.

Você deveria implementar alguns modelos pequenos, mesmo que nunca vá utilizá-los profissionalmente:

```text
regressão linear
rede neural simples
classificador de imagens pequeno
modelo básico de texto
```

O valor não está nos projetos em si. Está em observar o que acontece com os dados, pesos, gradientes e memória.

## 4. Transformers e LLMs

Tokenização, embeddings, attention, Q/K/V, positional encoding, feed-forward layers, residual connections, normalization, logits, softmax e geração autoregressiva.

Você não precisa treinar um LLM. Precisa conseguir explicar o caminho:

```text
texto
→ tokens
→ embeddings
→ blocos transformer
→ logits
→ amostragem
→ próximo token
```

## 5. Inferência e GPU

VRAM, parâmetros, precisão numérica, quantização, KV cache, batch size, context length, throughput, latência e offloading.

Essa camada conecta diretamente com suas GPUs e com modelos locais. Você começa a compreender, por exemplo, por que:

- contexto maior consome mais memória;
- quantização reduz uso de VRAM;
- batching melhora throughput, mas pode aumentar latência;
- um modelo pode caber na memória e ainda executar lentamente;
- prefill e decoding possuem perfis computacionais diferentes.

Depois disso, o conhecimento vertical fica muito mais sólido. RAG deixa de ser apenas "buscar documentos e mandar ao modelo"; você entende embeddings, representações, limites do contexto e comportamento probabilístico. Harness deixa de ser somente orquestração; você compreende o componente computacional que está sendo controlado.

## Duas linhas paralelas

A estratégia mais adequada ao seu perfil é estudar em duas linhas paralelas:

```text
Fundamentos:
matemática → ML → PyTorch → transformers → inferência

Aplicação:
contexto → RAG → agentes → harness → evals → produção
```

Cada conceito estudado na primeira linha deve ser conectado a algo que você já utiliza na segunda:

```text
produto escalar        → similaridade entre embeddings
softmax                → distribuição dos próximos tokens
cross-entropy          → treinamento de modelos
attention              → uso e limitação do contexto
quantização            → execução local em VRAM limitada
KV cache               → custo de contextos e conversas longas
batching               → desempenho de servidores de inferência
```

Você não precisa dominar tudo antes de continuar construindo. O processo correto é alternar teoria e aplicação. Estudar ML durante meses sem tocar nos seus sistemas seria ineficiente; continuar construindo somente sobre APIs, sem entender os fundamentos, também seria limitado.

## Objetivo: AI Systems Engineer

O objetivo não é virar pesquisador de modelos fundamentais. É chegar ao ponto de conseguir diagnosticar um sistema de IA em todas as camadas relevantes, desde o tensor até o comportamento da aplicação em produção. Isso caracteriza um AI Systems Engineer tecnicamente completo.

> An AI Systems Engineer builds, scales, and maintains production-ready artificial intelligence applications by combining software engineering, machine learning integration, and infrastructure design. Unlike pure researchers who build models from scratch, they focus on practical system architecture, data pipelines, and reliable API deployment.

## Referências

- [AI Engineer career path, Microsoft Learn](https://learn.microsoft.com/en-us/training/career-paths/ai-engineer)
