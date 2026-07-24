# study

Monorepo de estudos do [@v1cferr](https://github.com/v1cferr): cursos, projetos e experimentos, organizados por origem e por tema.

## Estrutura

```
study/
├── instituicoes/    cursos ligados a uma instituicao
├── cursos/          trilhas e criadores de conteudo
└── temas/           estudos por tecnologia ou assunto
```

## Instituicoes

| Pasta | Descricao |
|-------|-----------|
| [`instituicoes/senac`](./instituicoes/senac) | Cursos e projetos do SENAC, incluindo o programa Transforme-se (automacao `auto_watch.py` e projetos da 2a fase em Next.js). |
| [`instituicoes/senai`](./instituicoes/senai) | Fundamentos de Python I do SENAI. |

## Cursos e criadores

| Pasta | Descricao |
|-------|-----------|
| [`cursos/rocketseat`](./cursos/rocketseat) | Trilhas da Rocketseat, atualmente IA para devs (`ai-dev`). |
| [`cursos/fabio-akita`](./cursos/fabio-akita) | Estudos acompanhando conteudos do Fabio Akita. |

## Temas e tecnologias

| Pasta | Descricao |
|-------|-----------|
| [`temas/assembly`](./temas/assembly) | Jornada do hardware ao `print()`, do silicio a logica de alto nivel. |
| [`temas/csharp`](./temas/csharp) | Estudos em C# e .NET, Web API `CadastroClientes`. |
| [`temas/minecraft`](./temas/minecraft) | Automacao de filtro de mods de servidor Minecraft usando IA. |

## Convencoes

- Um diretorio por curso ou tema, cada um com seu proprio `README.md`.
- Segredos ficam em `.env` locais; versione apenas `.env.example`.
- Commits seguem Conventional Commits com escopo por area, por exemplo `feat(transforme-se): ...`.
