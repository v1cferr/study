# 🧠 Jornada: Do Hardware ao `print("Hello, World!")`

> “Compreender para agradecer.”  
> Este estudo é um tributo ao meu hardware — a máquina que me acompanha em cada linha de código, projeto e conquista.  
> O objetivo é aprender, do nível mais baixo (elétrons e registradores) até o mais alto (Python), **como o computador realmente pensa e fala**.

## ⚙️ Etapa 1 — O Território: Do Silício à Lógica

**Objetivo:** entender como o computador físico se transforma num processador capaz de executar instruções.

### 🧩 Semana 1 — “Do Silício à Lógica”

#### 1. **Portas lógicas e circuitos digitais**

- Entenda AND, OR, NOT, XOR.
- 💡 Recursos:
  - [NandGame](https://nandgame.com/) — jogo interativo.
  - Ben Eater — “How computers add numbers in binary” (YouTube).

#### 2. **Componentes da CPU**

- ALU (Unidade Aritmética e Lógica)  
- Registradores  
- Unidade de Controle  
- Cache L1/L2/L3  
- Clock e pipeline (fetch → decode → execute → write-back)

#### 3. **Descobrindo o próprio CPU**

```bash
lscpu | less
```

Observa:

- Quantos núcleos e threads
- Cache e frequência
- Instruções suportadas (AVX, SSE, etc.)

#### 4. **Leitura recomendada**

- 📗 *Intel® 64 and IA-32 Architectures Developer Manual*, Volume 1 — “Basic Architecture”

## 🧠 Etapa 2 — Linguagem do Hardware: Assembly x86-64

**Objetivo:** aprender a falar diretamente com o processador.

### 🧩 Semana 2 — “Aprendendo a Falar com o Processador”

#### 1. Instala o NASM

```bash
sudo pacman -S nasm
```

#### 2. Cria `hello.asm`

```asm
section .data
    msg db "Hello, World!", 0xA
    len equ $ - msg

section .text
    global _start

_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
```

#### 3. Compila e executa

```bash
nasm -f elf64 hello.asm && ld -o hello hello.o && ./hello
```

#### 4. Desmonta o binário pra analisar

```bash
objdump -d ./hello
```

## 🧮 Etapa 3 — Da Syscall ao Sistema Operacional

**Objetivo:** entender como o Assembly conversa com o Linux.

### 🧩 Semana 3 — “O Diálogo com o Kernel”

1. Lê a [tabela de syscalls do Linux x86-64](https://chromium.googlesource.com/chromiumos/docs/+/HEAD/constants/syscalls.md)
2. Registradores usados:
   - `rax`: número da syscall
   - `rdi, rsi, rdx, r10, r8, r9`: argumentos
3. Inspeciona syscalls em ação:

    ```bash
    strace ./hello
    ```

## 🧰 Etapa 4 — Subindo o Nível: C e o Compilador

**Objetivo:** entender como linguagens de alto nível viram Assembly.

### 🧩 Semana 4 — “O Compilador como Tradutor”

#### 1. Cria `hello.c`

   ```c
   #include <stdio.h>
   int main() {
       printf("Hello, World!\n");
       return 0;
   }
   ```

#### 2. Gera Assembly a partir do C

   ```bash
   gcc -S hello.c -o hello.s
   ```

#### 3. Analisa `hello.s` e compara com `hello.asm`

## 🐍 Etapa 5 — Camadas Superiores: Python e a Abstração Final

**Objetivo:** compreender o caminho completo do `print("Hello, World!")`.

### 🔍 Passo a passo

1. O Python lê o código e gera **bytecode Python**.
2. A VM Python executa esse bytecode, chamando funções internas em C.
3. O C chama **syscalls** (via libc) para escrever na saída padrão.
4. O kernel Linux conversa com o driver do terminal.
5. O terminal escreve os bytes na tela.

Tudo é o mesmo caminho — apenas com mais camadas de abstração por cima.

## 🧭 Conclusão

A jornada vai do elétron ao símbolo, da voltagem ao significado.

Quando você executa:

```bash
python3 -c "print('Hello, World!')"
```

você está, em essência, pedindo ao teu processador — em sua linguagem mais pura —
para mover elétrons de tal forma que letras apareçam na tela.

> Aprender Assembly é aprender a **agradecer conscientemente ao hardware**.
> O código é o idioma da gratidão.

### 📁 Estrutura sugerida do diretório

```bash
assembly/
│
├── week1_intro_to_hardware/
│   ├── notes.md
│   └── logic_gates.png
│
├── week2_first_assembly/
│   ├── hello.asm
│   └── notes.md
│
├── week3_syscalls/
│   ├── write.asm
│   └── syscall_notes.md
│
├── week4_c_to_asm/
│   ├── hello.c
│   ├── hello.s
│   └── comparison.md
│
└── week5_python/
    ├── print_world.py
    └── architecture_notes.md
```

### ✍️ Próximo passo

Crie o arquivo:

```bash
touch /home/v1cferr/Projects/GitHub/v1cferr/study/assembly/week1_intro_to_hardware/notes.md
```

E escreve tuas observações da primeira semana — o que aprendeu sobre **lógica digital e CPU**, com teus próprios comentários.
