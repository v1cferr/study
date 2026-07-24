# Degrau 5: inferencia e a camada de metal

Parte da trilha [construir do zero](../construir-do-zero.md). O bench detalhado esta em [projetos.md](../projetos.md), projeto 1.

## Objetivo

Rodar um modelo real, entender o que acontece por baixo da inferencia e medir a Arc contra a 5090.

## O que construir

- Rodar um modelo de 7B quantizado via llama.cpp na Arc (backends SYCL e Vulkan).
- Implementar na mao um KV cache simples, para entender o custo de contextos longos.
- Notas sobre o formato GGUF e sobre o que a quantizacao Q4 faz de fato com os pesos.
- O bench comparativo (ver protocolo em projetos.md).

## O que ensina

Quantizacao por dentro, KV cache, prefill versus decoding e a conta de VRAM.

## Hardware

Arc local, com a RTX 5090 da FAI como base de comparacao.

## Feito quando

- [ ] Um modelo 7B roda na Arc e voce mediu prefill e decoding em tokens por segundo.
- [ ] Voce explica, com numeros, por que aumentar o contexto aumenta o VRAM.
- [ ] O relatorio do bench (Arc versus 5090) esta escrito.
