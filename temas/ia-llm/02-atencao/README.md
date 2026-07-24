# Degrau 2: atencao do zero

Parte da trilha [construir do zero](../construir-do-zero.md).

## Objetivo

Implementar o mecanismo central dos transformers na mao.

## O que construir

- Self-attention: Q/K/V, scaled dot-product e mascara causal.
- Multi-head attention.
- Um bloco transformer completo: atencao, feed-forward, residual e layernorm.

## O que ensina

Attention, positional encoding, residual connections e normalization, e por que o custo do contexto cresce de forma quadratica.

## Hardware

Arc (torch XPU).

## Feito quando

- [ ] A saida da sua atencao bate com a do `nn.MultiheadAttention` num teste controlado.
- [ ] A mascara causal impede que uma posicao veja o futuro (verificado com um teste).
- [ ] Voce consegue desenhar o caminho de um token pelo bloco, com shapes.
