# Degrau 6: um kernel na mao (o "C" literal)

Parte da trilha [construir do zero](../construir-do-zero.md). Norte: [llm.c](https://github.com/karpathy/llm.c).

## Objetivo

Descer ate o metal: escrever o kernel de GPU que faz a conta, nos dois fornecedores.

## O que construir

- Um kernel de vector add do zero.
- Um matmul ingenuo.
- Em SYCL (oneAPI) na Arc e em CUDA na RTX 5090 da FAI.
- Comparar com a versao de biblioteca (oneMKL / cuBLAS).

## O que ensina

Como a matematica vira execucao no hardware, por que a movimentacao de memoria domina o tempo, e a diferenca Intel versus NVIDIA no nivel mais baixo. E o degrau que fecha o sentido de "linguagem C dos LLM".

## Hardware

Arc (SYCL) e RTX 5090 (CUDA), lado a lado.

## Feito quando

- [ ] O kernel roda e da o resultado certo nos dois fornecedores.
- [ ] Ha um micro-bench comparando seu matmul ingenuo com a biblioteca.
- [ ] Voce explica por que o matmul ingenuo e lento e o que a biblioteca faz de diferente.
