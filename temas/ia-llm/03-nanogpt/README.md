# Degrau 3: nanoGPT, um LLM de caracteres

Parte da trilha [construir do zero](../construir-do-zero.md). Referencia: [nanoGPT](https://github.com/karpathy/nanoGPT).

## Objetivo

Juntar os degraus anteriores num LLM de caracteres treinado do inicio ao fim, na Arc.

## O que construir

- Um GPT pequeno (empilhando os blocos do degrau 2) treinado num corpus de texto pequeno.
- Loop de treino na Arc via torch XPU, com log de loss, VRAM e tokens por segundo.
- Geracao autoregressiva de texto a partir do modelo treinado.

## O que ensina

O caminho completo do LLM (texto, tokens, embeddings, blocos, logits, amostragem) e o treino de verdade, observando o comportamento da Arc.

## Hardware

Arc para o treino pequeno. A RTX 5090 da FAI se quiser escalar o modelo ou o corpus.

## Feito quando

- [ ] O modelo gera texto coerente no nivel de caractere.
- [ ] Voce registrou loss, VRAM de pico e tokens por segundo do treino na Arc.
- [ ] Voce sabe apontar onde a memoria e gasta durante o treino.
