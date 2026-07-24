# Passo a passo: micrograd

Objetivo: construir, do zero e em pequenos passos, um motor de autograd (diferenciacao automatica). E o mesmo mecanismo que roda por baixo do PyTorch. No fim voce tera uma classe `Value` que monta um grafo de operacoes e calcula os gradientes sozinha, por backpropagation.

A regra de ouro: em cada passo, digite o codigo voce mesmo, rode, e leia a explicacao antes de seguir. Nao copie tudo de uma vez.

Pre-requisitos: Python 3. O PyTorch so aparece no ultimo passo, para conferir o resultado.

Crie um arquivo `micrograd.py` nesta pasta e vamos construindo nele.

---

## Passo 1: um numero que lembra de onde veio

Um gradiente responde a pergunta "se eu mexer um pouquinho neste numero, quanto muda o resultado final?". Para responder isso depois, cada numero precisa lembrar de quais numeros ele nasceu. Entao nosso `Value` guarda o dado e tambem os "pais".

```python
class Value:
    def __init__(self, data, _children=(), _op=""):
        self.data = data
        self.grad = 0.0            # comeca zerado; vamos preencher no backward
        self._prev = set(_children)  # de quais Values este aqui nasceu
        self._op = _op             # qual operacao criou este Value (para debug)

    def __repr__(self):
        return f"Value(data={self.data}, grad={self.grad})"
```

Rode e confira:

```python
a = Value(2.0)
print(a)          # Value(data=2.0, grad=0.0)
```

Por enquanto `grad` e sempre 0. Ele so faz sentido depois do backward.

---

## Passo 2: soma e multiplicacao (montando o grafo)

Quando fazemos `a + b`, criamos um novo `Value` cujo resultado e a soma, e que lembra que veio de `a` e `b`. Isso vai formando um grafo: as folhas sao as entradas, e cada operacao e um no.

```python
    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), "+")
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), "*")
        return out
```

(Coloque esses metodos dentro da classe `Value`.)

Rode e confira o grafo:

```python
a = Value(2.0)
b = Value(-3.0)
c = Value(10.0)
d = a * b + c
print(d)          # Value(data=4.0, grad=0.0)
print(d._prev)    # o no da soma tem dois pais: (a*b) e c
print(d._op)      # '+'
```

Note que `a * b + c` vira `(a*b) + c`: primeiro o `*`, depois o `+`. O `d._prev` sao os dois filhos diretos do `+`.

---

## Passo 3: o que e a `grad`

`grad` de um numero e a derivada do resultado final em relacao a ele: quanto o resultado muda se este numero mudar um tiquinho. O resultado final tem `grad = 1` em relacao a si mesmo (mexer nele muda ele mesmo na mesma proporcao). A partir dai, empurramos essa informacao para tras pelo grafo. Isso e a regra da cadeia.

Ainda nao mexemos no codigo aqui. So a ideia: backward = comecar com `grad = 1` na saida e distribuir para os pais.

---

## Passo 4: como cada operacao distribui o gradiente

Cada operacao sabe a sua derivada local:

- Soma `out = a + b`: mexer em `a` muda `out` na mesma proporcao, entao a derivada local e 1 para os dois. Cada pai recebe `1 * out.grad`.
- Multiplicacao `out = a * b`: a derivada de `out` em relacao a `a` e `b` (o outro fator), e vice-versa. Entao `a` recebe `b.data * out.grad` e `b` recebe `a.data * out.grad`.

Guardamos isso como uma funcao local `_backward` dentro de cada operacao. Atualize os dois metodos:

```python
    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), "+")

        def _backward():
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), "*")

        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out
```

Detalhe importante: usamos `+=`, nao `=`. Se um mesmo `Value` for usado em mais de um lugar, os gradientes de cada caminho se somam (isso e a regra da cadeia multivariavel). Para isso funcionar, adicione um `_backward` vazio no `__init__`:

```python
        self._backward = lambda: None
```

---

## Passo 5: a ordem certa (topological sort) e o `backward()`

Para distribuir os gradientes corretamente, precisamos processar cada no so depois de ja termos o gradiente dele pronto. A ordem que garante isso e a ordem topologica: um no so aparece depois de todos os que dependem dele. Fazemos a saida ter `grad = 1` e chamamos os `_backward` na ordem inversa.

```python
    def backward(self):
        # 1) monta a ordem topologica do grafo
        topo = []
        visited = set()

        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)

        build_topo(self)

        # 2) semente: a saida tem gradiente 1 em relacao a si mesma
        self.grad = 1.0

        # 3) propaga de tras para frente
        for v in reversed(topo):
            v._backward()
```

Confira na mao. Para `d = a*b + c`:

```python
a = Value(2.0)
b = Value(-3.0)
c = Value(10.0)
d = a * b + c
d.backward()
print(a.grad)  # esperado: b.data = -3.0
print(b.grad)  # esperado: a.data = 2.0
print(c.grad)  # esperado: 1.0
```

Pare e confirme que os numeros batem com a conta que voce faria a mao. Se bateram, voce acabou de implementar backprop.

---

## Passo 6: uma nao linearidade (tanh)

Empilhar so somas e multiplicacoes da sempre uma funcao linear, e uma rede linear nao aprende relacoes complexas. Precisamos de uma funcao nao linear. Vamos de `tanh`, cuja derivada e `1 - tanh(x)^2`.

```python
import math

    def tanh(self):
        t = math.tanh(self.data)
        out = Value(t, (self,), "tanh")

        def _backward():
            self.grad += (1 - t ** 2) * out.grad
        out._backward = _backward
        return out
```

(O `import math` vai no topo do arquivo, fora da classe.)

---

## Passo 7: operacoes que faltam para o treino

Para escrever a funcao de perda vamos precisar de subtracao e potencia. Adicione:

```python
    def __pow__(self, other):
        assert isinstance(other, (int, float))
        out = Value(self.data ** other, (self,), f"**{other}")

        def _backward():
            self.grad += (other * self.data ** (other - 1)) * out.grad
        out._backward = _backward
        return out

    def __neg__(self):        # -self
        return self * -1

    def __sub__(self, other): # self - other
        return self + (-other)

    def __radd__(self, other): # other + self
        return self + other

    def __rmul__(self, other): # other * self
        return self * other
```

Os `__r...__` permitem escrever `2 * a` (e nao so `a * 2`).

---

## Passo 8: neuronio, camada e MLP

Agora montamos uma rede a partir do `Value`. Um neuronio faz `tanh(w . x + b)`.

```python
import random

class Neuron:
    def __init__(self, nin):
        self.w = [Value(random.uniform(-1, 1)) for _ in range(nin)]
        self.b = Value(random.uniform(-1, 1))

    def __call__(self, x):
        act = sum((wi * xi for wi, xi in zip(self.w, x)), self.b)
        return act.tanh()

    def parameters(self):
        return self.w + [self.b]

class Layer:
    def __init__(self, nin, nout):
        self.neurons = [Neuron(nin) for _ in range(nout)]

    def __call__(self, x):
        outs = [n(x) for n in self.neurons]
        return outs[0] if len(outs) == 1 else outs

    def parameters(self):
        return [p for n in self.neurons for p in n.parameters()]

class MLP:
    def __init__(self, nin, nouts):
        sizes = [nin] + nouts
        self.layers = [Layer(sizes[i], sizes[i + 1]) for i in range(len(nouts))]

    def __call__(self, x):
        for layer in self.layers:
            x = layer(x)
        return x

    def parameters(self):
        return [p for layer in self.layers for p in layer.parameters()]
```

---

## Passo 9: o loop de treino

Um dataset de brinquedo: 4 exemplos, cada um com 3 entradas, e um alvo (+1 ou -1). Vamos treinar a rede a acertar os alvos.

```python
xs = [
    [2.0, 3.0, -1.0],
    [3.0, -1.0, 0.5],
    [0.5, 1.0, 1.0],
    [1.0, 1.0, -1.0],
]
ys = [1.0, -1.0, -1.0, 1.0]  # alvos

model = MLP(3, [4, 4, 1])

for step in range(100):
    # forward: previsoes e perda (erro quadratico medio)
    ypred = [model(x) for x in xs]
    loss = sum((yout - ygt) ** 2 for ygt, yout in zip(ys, ypred))

    # zera os gradientes ANTES do backward (senao acumulam entre steps)
    for p in model.parameters():
        p.grad = 0.0

    # backward: preenche os gradientes de todos os parametros
    loss.backward()

    # update: anda um passo na direcao que diminui a perda
    for p in model.parameters():
        p.data += -0.05 * p.grad

    if step % 10 == 0:
        print(step, loss.data)

print("previsoes finais:", [round(y.data, 3) for y in ypred])
```

A perda deve cair a cada passo, e as previsoes finais devem chegar perto de `[1, -1, -1, 1]`.

O erro mais comum aqui e esquecer de zerar os gradientes. Sem isso, os gradientes de um step somam com os do anterior (por causa do `+=` do passo 4) e o treino desanda. Experimente comentar o `p.grad = 0.0` e veja acontecer.

---

## Passo 10: conferir com o PyTorch (criterio de "feito")

Reconstrua uma expressao pequena nos dois e compare os gradientes.

```python
import torch

# seu micrograd
a = Value(2.0); b = Value(-3.0); c = Value(10.0)
d = a * b + c
d.tanh().backward()

# pytorch
at = torch.tensor([2.0], requires_grad=True)
bt = torch.tensor([-3.0], requires_grad=True)
ct = torch.tensor([10.0], requires_grad=True)
dt = (at * bt + ct).tanh()
dt.backward()

print(a.grad, at.grad.item())  # devem bater
print(b.grad, bt.grad.item())
print(c.grad, ct.grad.item())
```

Se os numeros baterem, voce implementou autograd corretamente. Esse e o criterio de "feito" deste degrau.

---

## O que voce aprendeu

- O que e um gradiente e por que backprop e so a regra da cadeia aplicada de tras para frente num grafo.
- Por que existe `zero_grad`, por que gradientes acumulam e o papel da nao linearidade.
- O esqueleto conceitual do PyTorch: `tensor`, `.grad`, `.backward()` e o otimizador.

No proximo degrau (`../01-tensores`), trocamos os escalares por tensores (numpy e depois PyTorch) e reescrevemos esse mesmo ciclo operando em lotes de dados de uma vez.
