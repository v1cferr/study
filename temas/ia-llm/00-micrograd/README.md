# Degrau 0: o neuronio e a derivada

Parte da trilha [construir do zero](../construir-do-zero.md). Referencia: [micrograd](https://github.com/karpathy/micrograd).

## Objetivo

Um motor de autograd escalar do zero, para entender backpropagation por dentro.

## O que construir

- Uma classe `Value` que guarda um numero, seus pais e como calcular o gradiente local.
- Operacoes: soma, multiplicacao e uma nao linearidade (tanh ou relu).
- `backward()` via ordenacao topologica do grafo.
- Uma MLP minima e um treino de classificador de brinquedo com gradient descent manual.

## O que ensina

Gradiente, regra da cadeia e backpropagation. A fundacao de tudo que vem depois.

## Hardware

CPU. Nao precisa de GPU nem de PyTorch.

## Feito quando

- [ ] O `backward()` bate com o `autograd` do PyTorch num caso pequeno.
- [ ] A MLP treina e a loss cai de forma consistente.
- [ ] Um `README` curto explica, com suas palavras, por que o gradiente flui daquele jeito.
