# Construir do zero: a "linguagem C" dos LLM

> A ideia: aprender a IA como se aprende C, de baixo pra cima, construindo cada primitivo na mao antes de usar a abstracao pronta. Cada degrau constroi o proximo. No fim, nenhuma parte do caminho texto -> tokens -> embeddings -> blocos -> logits -> amostragem e caixa-preta, e voce chega ate o kernel que roda na GPU.

Norte da trilha: Andrej Karpathy, Neural Networks Zero to Hero (<https://karpathy.ai/zero-to-hero.html>) e o `llm.c`, que treina GPT em C e CUDA puro (<https://github.com/karpathy/llm.c>). O `llm.c` e, literalmente, a "linguagem C dos LLM".

Regra: em cada degrau, primeiro implementar na mao (Python puro ou numpy), depois refazer no PyTorch e conferir que bate. Entender vem do primeiro; produtividade, do segundo.

## Como usar a IA para aprender isto (e nao virar dependente)

Usar IA para organizar o estudo e para explicar conceitos e o uso certo. Copiar e colar solucao sem entender o porque e a armadilha. A diferenca pratica:

- Errado: pedir a solucao pronta e colar. Voce nao desenvolve leitura de codigo nem capacidade de debugar.
- Certo: usar a IA como professor. Perguntar "por que meu codigo anterior nao funcionou?", "como essa implementacao funciona por dentro?", "por que essa abordagem e melhor?". Executar cada comando novo na mao para criar memoria tecnica.

Por isso cada degrau exige digitar o codigo, tem pontos de conferencia e um criterio de "feito". Se em algum momento voce estiver so lendo e concordando, pare e escreva o codigo.

O que nao muda: ferramentas, frameworks e modelos vao mudar. Logica de programacao, estrutura de dados e entender o sistema por dentro sao a base que nao e substituivel. E o mesmo argumento do resto desta area (ver `direcao.md`).

Referencia: Victor Navarro, "usar IA para aprender a programar e trapaca?": <https://youtu.be/zaJPcehnYCw>

## Degrau 0: o neuronio e a derivada

- O que voce constroi: um motor de autograd escalar do zero, no estilo `micrograd` (<https://github.com/karpathy/micrograd>). Um `Value` que sabe fazer `backward()`, e uma MLP minima treinada so com isso.
- O que ensina: gradiente, regra da cadeia e backpropagation, a fundacao de tudo.
- Hardware: CPU. Nao precisa de GPU.
- Artefato: `micrograd.py` mais um classificador de brinquedo treinado.

## Degrau 1: tensores e o loop de treino na mao

- O que voce constroi: as operacoes centrais com numpy (matmul, broadcasting, softmax, cross-entropy) e uma rede de 2 camadas treinada com gradient descent manual. Depois, a mesma rede em PyTorch.
- O que ensina: tensores, shapes, softmax, cross-entropy e o ciclo dados -> modelo -> loss -> gradiente -> atualizacao.
- Hardware: CPU ou Arc (torch XPU) para sentir a diferenca.
- Artefato: `nn_numpy.py` e `nn_torch.py`.

## Degrau 2: atencao do zero

- O que voce constroi: self-attention na mao (Q/K/V, scaled dot-product, mascara causal, multi-head), depois um bloco transformer completo (atencao mais feed-forward mais residual mais layernorm).
- O que ensina: attention, positional encoding, residual connections e normalization, e por que o contexto tem custo quadratico.
- Hardware: Arc (torch XPU).
- Artefato: `attention.py` com testes que comparam com a implementacao do PyTorch.

## Degrau 3: nanoGPT, um LLM de caracteres

- O que voce constroi: reconstruir o nanoGPT (<https://github.com/karpathy/nanoGPT>) e treinar um GPT de caracteres num corpus pequeno, na Arc via torch XPU.
- O que ensina: o caminho completo do LLM, e o treino de verdade (observar loss, VRAM e tokens por segundo na Arc).
- Hardware: Arc para treino pequeno; a RTX 5090 da FAI se quiser escalar.
- Artefato: um GPT minusculo treinado mais amostras geradas.

## Degrau 4: tokenizacao de verdade (BPE)

- O que voce constroi: um tokenizador BPE do zero, no estilo `minbpe` (<https://github.com/karpathy/minbpe>).
- O que ensina: por que tokens (e nao caracteres ou palavras) definem contexto e custo, e onde nascem varios comportamentos estranhos dos modelos.
- Hardware: CPU.
- Artefato: `bpe.py` que treina e aplica um vocabulario.

## Degrau 5: inferencia e a camada de metal

- O que voce constroi: rodar um modelo real de 7B quantizado via llama.cpp na Arc (SYCL e Vulkan), implementar na mao um KV cache simples e entender o formato GGUF e o que a quantizacao Q4 faz de fato com os pesos.
- O que ensina: quantizacao por dentro, KV cache, prefill versus decoding e a conta de VRAM. Aqui mora o projeto de bench (ver `projetos.md`, projeto 1).
- Hardware: Arc local, com a 5090 como base de comparacao.
- Artefato: notas sobre GGUF e quantizacao mais o relatorio do bench.

## Degrau 6: um kernel na mao (o "C" literal)

- O que voce constroi: escrever um kernel de GPU do zero. Comecar por vector add, depois um matmul ingenuo, em SYCL (oneAPI) na Arc e em CUDA na RTX 5090 da FAI. Comparar com a versao de biblioteca.
- O que ensina: como a matematica vira execucao no hardware, por que movimentacao de memoria domina o tempo, e a diferenca Intel versus NVIDIA no nivel mais baixo. Este e o degrau que fecha o sentido de "linguagem C dos LLM".
- Hardware: Arc (SYCL) e 5090 (CUDA), lado a lado.
- Artefato: `matmul.sycl.cpp` e `matmul.cu` mais um micro-bench comparativo.

## Como isso se conecta ao roadmap

Os degraus 0 a 4 constroem a base horizontal (ML, PyTorch, transformers) na mao. Os degraus 5 e 6 aprofundam a camada de inferencia e GPU, que e onde seu hardware (Arc mais 5090) vira laboratorio. A partir daqui, a trilha de aplicacao (RAG, agentes, harness, evals, ver `projetos.md`) deixa de ser uso de API e passa a ser engenharia sobre algo que voce entende por dentro.

Sugestao de ritmo: um degrau por vez, cada um virando uma subpasta com codigo e um README curto do que aprendeu. Nao pular para o degrau seguinte sem o artefato do atual funcionando.
