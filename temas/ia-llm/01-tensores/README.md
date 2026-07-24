# Degrau 1: tensores e o loop de treino na mao

Parte da trilha [construir do zero](../construir-do-zero.md).

## Objetivo

Sair do escalar para o tensor, e entender o ciclo completo de treino.

## O que construir

- Com numpy: matmul, broadcasting, softmax e cross-entropy na mao.
- Uma rede de 2 camadas treinada com gradient descent manual.
- A mesma rede em PyTorch, conferindo que chega a um resultado parecido.

## O que ensina

Tensores, shapes, softmax, cross-entropy e o ciclo dados, modelo, loss, gradiente, atualizacao.

## Hardware

CPU para a versao numpy. Arc (torch XPU) para a versao PyTorch, so para sentir a diferenca.

## Feito quando

- [ ] As versoes numpy e PyTorch chegam a acuracia parecida no mesmo dataset.
- [ ] Os gradientes da versao manual conferem com os do autograd.
- [ ] Voce consegue explicar cada shape que passa pela rede.
