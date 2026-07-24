# Automação de Filtro de Mods Minecraft

Este script automatiza o processo de configuração de um modpack de servidor Minecraft, filtrando mods exclusivos do cliente que causam falhas no servidor. Ele usa a IA Gemini do Google para analisar relatórios de falhas e identificar mods problemáticos.

## Pré-requisitos

* **Python 3.8+** instalado no seu sistema.
* **Servidor Minecraft Forge** instalado e pronto para rodar.
* **Modpack do Cliente** instalado (ex: via CurseForge).
* **Chave de API do Google Gemini** (Grátis).

## Instruções de Configuração

### 1. Criar um Ambiente Virtual (venv)

É uma boa prática usar um ambiente virtual para gerenciar dependências. Abra seu terminal nesta pasta e execute:

**Windows:**

```bash
python -m venv venv
.\venv\Scripts\activate
```

**Linux/Mac:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalar Dependências

Com o ambiente virtual ativado, instale as bibliotecas necessárias:

```bash
pip install -r requirements.txt
```

### 3. Obter uma Chave de API do Gemini

1. Vá para [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Clique em "Create API key".
3. Copie a chave gerada.

## Como Usar (Modo Gráfico - Recomendado)

Para facilitar a configuração, criamos um lançador com interface gráfica.

1. Execute o lançador:

    ```bash
    python gui_launcher.py
    ```

2. Preencha os campos:
    * **Gemini API Key**: Cole sua chave aqui.
    * **Pasta Mods Cliente**: Selecione a pasta `mods` do seu cliente Minecraft.
    * **Pasta do Servidor**: Selecione a pasta raiz do seu servidor Minecraft.
3. Clique em **Salvar Configuração**.
4. Clique em **INICIAR AUTOMAÇÃO**.

Uma nova janela de terminal se abrirá mostrando o progresso do script.

## Como Usar (Modo Terminal)

Se preferir, você pode editar o arquivo `config.json` manualmente (será criado após a primeira execução da GUI) ou editar as variáveis no topo do `main.py`.

Execute:

```bash
python main.py
```

## Criando um Executável (.exe) para Windows

Se você quiser criar um arquivo `.exe` para rodar em computadores sem Python instalado:

1. Instale o PyInstaller (já incluído no requirements.txt):

    ```bash
    pip install pyinstaller
    ```

2. Execute o comando de build:

    ```bash
    pyinstaller --noconfirm --onefile --windowed --name "MinecraftModAutomator" --add-data "main.py;." gui_launcher.py
    ```

    *Nota: O argumento `--add-data "main.py;."` é para Windows. No Linux/Mac use `--add-data "main.py:."`.*

3. O executável estará na pasta `dist`. Você pode mover o `MinecraftModAutomator.exe` para onde quiser, mas certifique-se de que ele tenha acesso às pastas do Minecraft.

## O que o Script Faz

1. **Sincroniza Mods**: Copia todos os mods da sua pasta do Cliente para a pasta `mods` do Servidor (apenas se a pasta do servidor estiver vazia).
2. **Inicia o Servidor**: Tenta iniciar o servidor Minecraft.
3. **Detecta Falhas**: Se o servidor crashar, ele lê o relatório de falha.
4. **Análise de IA**: Envia o relatório para o Gemini AI identificar o mod específico que causou o problema.
5. **Filtra Mods**: Move o mod problemático identificado para uma pasta `disabled_mods`.
6. **Repete**: Reinicia automaticamente o processo até que o servidor inicie com sucesso.
7. **Sucesso**: Assim que o servidor iniciar, ele continua rodando. Você pode pará-lo com segurança usando `Ctrl+C` na janela do terminal.

## Solução de Problemas

* **"Diretório de mods do servidor vazio"**: O script copiará automaticamente os mods do seu diretório de cliente.
* **"Não foi possível identificar o mod"**: A IA pode falhar às vezes. O script tem um mecanismo de repetição, mas se persistir, verifique os logs manualmente.
* **Windows vs Linux**: O script detecta automaticamente seu SO e usa `run.bat` (Windows) ou `./run.sh` (Linux). Certifique-se de que esses scripts existam na pasta do servidor.
