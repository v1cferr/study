# Degrau 4: tokenizacao de verdade (BPE)

Parte da trilha [construir do zero](../construir-do-zero.md). Referencia: [minbpe](https://github.com/karpathy/minbpe).

## Objetivo

Entender por que o modelo enxerga tokens, e nao caracteres ou palavras.

## O que construir

- Um tokenizador BPE do zero: treino do vocabulario (merges), encode e decode.
- Um teste de round-trip: `decode(encode(texto)) == texto`.

## O que ensina

Por que tokens definem contexto e custo, e de onde vem varios comportamentos estranhos dos modelos (numeros, espacos, idiomas raros).

## Hardware

CPU.

## Feito quando

- [ ] O round-trip encode/decode preserva o texto.
- [ ] Voce consegue explicar por que uma mesma frase pode custar numeros diferentes de tokens.
- [ ] Voce comparou seu vocabulario com o de um tokenizador real (ex.: tiktoken) num exemplo.
