import os
import subprocess
import shutil
import time
import glob
import json
import platform
import google.generativeai as genai
from pathlib import Path

# Use `pip install -r requirements.txt` to install dependencies

# --- Configuração ---
CONFIG_FILE = "config.json"


def load_config():
    """Carrega as configurações do arquivo JSON ou usa valores padrão/ambiente."""
    config = {
        "GEMINI_API_KEY": "YOUR_API_KEY_HERE",
        "CLIENT_MODS_DIR": "",
        "SERVER_DIR": "",
    }

    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                loaded_config = json.load(f)
                config.update(loaded_config)
        except Exception as e:
            print(f"Erro ao ler {CONFIG_FILE}: {e}")

    return config


config = load_config()

GEMINI_API_KEY = config.get("GEMINI_API_KEY")
CLIENT_MODS_DIR = config.get("CLIENT_MODS_DIR")
SERVER_DIR = config.get("SERVER_DIR")

# --- Validação de Diretórios ---
if not SERVER_DIR:
    # Tenta adivinhar se não estiver configurado (diretório atual)
    SERVER_DIR = os.getcwd()

SERVER_MODS_DIR = os.path.join(SERVER_DIR, "mods")
DISABLED_MODS_DIR = os.path.join(SERVER_DIR, "disabled_mods")

# Detecção automática do SO para o script de inicialização
if platform.system() == "Windows":
    SERVER_START_SCRIPT = "run.bat"
else:
    SERVER_START_SCRIPT = "./run.sh"  # Linux/Mac

# --- Configuração do Gemini ---
if GEMINI_API_KEY and GEMINI_API_KEY != "YOUR_API_KEY_HERE":
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.0-flash")
else:
    model = None


def setup_environment():
    """Garante que os diretórios necessários existam."""
    if not os.path.exists(SERVER_DIR):
        print(f"Erro: Diretório do servidor não encontrado em {SERVER_DIR}")
        return False

    if not os.path.exists(DISABLED_MODS_DIR):
        os.makedirs(DISABLED_MODS_DIR)
        print(f"Criado diretório para mods desativados em {DISABLED_MODS_DIR}")

    return True


def run_server():
    """
    Executa o servidor Minecraft.
    Retorna:
        0 se o servidor iniciou com sucesso (detectou "Done!").
        1 se o servidor crashou (detectou palavras-chave de crash).
        -1 se houve erro ao iniciar o processo.
    """
    print(f"Iniciando servidor em {SERVER_DIR}...")
    try:
        process = subprocess.Popen(
            SERVER_START_SCRIPT,
            cwd=SERVER_DIR,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )

        # Monitora a saída para sucesso ou crash
        server_started = False
        crash_detected = False

        while True:
            line = process.stdout.readline()
            if line == "" and process.poll() is not None:
                break
            if line:
                print(line.strip())

                # Detecta inicialização bem-sucedida
                if "Done (" in line and "For help, type 'help'" in line:
                    print("\n" + "=" * 60)
                    print("  SERVIDOR INICIADO COM SUCESSO!")
                    print("  O servidor está rodando. Pressione Ctrl+C para parar.")
                    print("=" * 60 + "\n")
                    server_started = True

                # Detecta crashes durante a inicialização
                if not server_started and (
                    "Crash report saved to" in line
                    or "Exception in thread" in line
                    or "java.lang.RuntimeException" in line
                ):
                    crash_detected = True

        # Processo terminou
        return_code = process.poll()

        if server_started:
            print("\nServidor foi desligado.")
            return 0
        elif crash_detected:
            print("\nCrash detectado via log!")
            return 1
        else:
            if return_code != 0:
                print(
                    f"\nServidor saiu com código {return_code} antes de iniciar com sucesso."
                )
                return 1
            return return_code
    except KeyboardInterrupt:
        print("\n\nRecebido sinal de interrupção. Parando servidor...")
        if process:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                print("Servidor não parou graciosamente. Forçando encerramento...")
                process.kill()
        return 0
    except Exception as e:
        print(f"Falha ao rodar servidor: {e}")
        return -1


def get_latest_log():
    """
    Lê o conteúdo de logs/latest.log OU o relatório de crash mais recente.
    Retorna o conteúdo combinado, priorizando o relatório de crash.
    """
    log_content = ""
    crash_content = ""

    # 1. Verifica relatórios de crash recentes (modificados nos últimos 5 minutos)
    crash_reports_dir = os.path.join(SERVER_DIR, "crash-reports")
    if os.path.exists(crash_reports_dir):
        files = [
            os.path.join(crash_reports_dir, f) for f in os.listdir(crash_reports_dir)
        ]
        if files:
            latest_crash = max(files, key=os.path.getmtime)
            if time.time() - os.path.getmtime(latest_crash) < 300:
                print(f"Encontrado relatório de crash recente: {latest_crash}")
                try:
                    with open(
                        latest_crash, "r", encoding="utf-8", errors="ignore"
                    ) as f:
                        crash_content = f.read()
                except Exception as e:
                    print(f"Erro ao ler relatório de crash: {e}")

    # 2. Lê latest.log
    log_path = os.path.join(SERVER_DIR, "logs", "latest.log")
    if os.path.exists(log_path):
        try:
            with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                log_content = content[-20000:]
        except Exception as e:
            print(f"Erro ao ler log: {e}")

    full_content = ""
    if crash_content:
        full_content += "--- CRASH REPORT (PRIORITY) ---\n" + crash_content + "\n\n"

    full_content += "--- LATEST LOG TAIL ---\n" + log_content

    return full_content if full_content else None


def analyze_crash(log_content, ignore_list=None):
    """Envia o log para o Gemini identificar o mod problemático."""
    if not model:
        print("ERRO: Modelo Gemini não configurado. Verifique sua API Key.")
        return None

    print("Analisando log de crash com Gemini...")

    ignore_str = ""
    if ignore_list:
        ignore_str = f"NÃO sugira os seguintes arquivos, pois não foram encontrados: {', '.join(ignore_list)}"

    prompt = f"""
    Você é um especialista em servidores Minecraft. O servidor crashou.
    Analise o log a seguir (que pode incluir um relatório de crash) e identifique o ÚNICO arquivo de mod (.jar) que causou o crash.
    
    INSTRUÇÕES CRÍTICAS:
    1. Procure por "Mod File: ... .jar" na seção do relatório de crash. Esta é a resposta definitiva.
    2. Procure por "Failure message: ... encountered an error" e o arquivo de mod associado.
    3. Procure por "Attempted to load class ... for invalid dist DEDICATED_SERVER".
    
    {ignore_str}
    
    Retorne APENAS o nome do arquivo do mod problemático (ex: "modname-1.0.jar").
    NÃO escreva nenhuma explicação. NÃO use formatação markdown.
    Apenas o nome do arquivo.
    
    Conteúdo do Log:
    """

    try:
        response = model.generate_content(prompt + log_content[:40000])
        culprit = response.text.strip()
        culprit = culprit.replace("`", "")

        import re

        match = re.search(r"[\w\-\.\+]+\.jar", culprit)
        if match:
            culprit = match.group(0)

        print(f"Culpado identificado: {culprit}")
        return culprit
    except Exception as e:
        print(f"Erro ao comunicar com Gemini: {e}")
        return None


def find_mod_file(mod_filename):
    """Encontra o caminho real do arquivo para um nome de mod dado."""
    exact_path = os.path.join(SERVER_MODS_DIR, mod_filename)
    if os.path.exists(exact_path):
        return exact_path

    # Busca Fuzzy
    for f in os.listdir(SERVER_MODS_DIR):
        if f.lower() == mod_filename.lower():
            return os.path.join(SERVER_MODS_DIR, f)

    import re

    name_no_ext = os.path.splitext(mod_filename)[0]
    clean_name = re.sub(
        r"[\-\_\s]?(mod|forge|fabric|mc\d+.*|v?\d+\..*)",
        "",
        name_no_ext,
        flags=re.IGNORECASE,
    )

    if len(clean_name) < 3:
        return None

    print(f"Procurando por arquivo de mod contendo: {clean_name}")

    candidates = []
    for f in os.listdir(SERVER_MODS_DIR):
        if clean_name.lower() in f.lower():
            candidates.append(f)

    if len(candidates) == 1:
        return os.path.join(SERVER_MODS_DIR, candidates[0])
    elif len(candidates) > 1:
        print(
            f"Múltiplos candidatos encontrados para {mod_filename}: {candidates}. Escolhendo o mais curto."
        )
        candidates.sort(key=len)
        return os.path.join(SERVER_MODS_DIR, candidates[0])

    return None


def disable_mod(mod_path):
    """Move o arquivo do mod para o diretório disabled_mods."""
    filename = os.path.basename(mod_path)
    target_path = os.path.join(DISABLED_MODS_DIR, filename)

    try:
        shutil.move(mod_path, target_path)
        print(f"Movido {filename} para {DISABLED_MODS_DIR}")
        return True
    except Exception as e:
        print(f"Falha ao mover mod: {e}")
        return False


def sync_mods():
    """Copia mods do cliente se a pasta de mods do servidor estiver vazia."""
    if not os.path.exists(SERVER_MODS_DIR):
        os.makedirs(SERVER_MODS_DIR)
        print(f"Criado diretório de mods do servidor: {SERVER_MODS_DIR}")

    if not os.listdir(SERVER_MODS_DIR):
        print("Diretório de mods do servidor vazio. Sincronizando do cliente...")
        if not CLIENT_MODS_DIR or not os.path.exists(CLIENT_MODS_DIR):
            print(
                f"Erro: Diretório de mods do cliente não configurado ou não encontrado: {CLIENT_MODS_DIR}"
            )
            return False

        mods = glob.glob(os.path.join(CLIENT_MODS_DIR, "*.jar"))
        print(f"Encontrados {len(mods)} mods no diretório do cliente.")

        for mod in mods:
            shutil.copy2(mod, SERVER_MODS_DIR)

        print(f"Copiados {len(mods)} mods para o servidor.")
    else:
        print("Diretório de mods do servidor não está vazio. Pulando sincronização.")

    return True


def main():
    if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_API_KEY_HERE":
        print(
            "ERRO: Por favor, configure sua GEMINI_API_KEY no arquivo config.json ou no script."
        )
        print("Você pode obter sua chave aqui: https://aistudio.google.com/api-keys")
        return

    if not setup_environment():
        return

    if not sync_mods():
        return

    max_retries = 10
    retry_count = 0

    while retry_count < max_retries:
        print(f"\n--- Tentativa {retry_count + 1} ---")

        return_code = run_server()

        if return_code == 0:
            print("\n" + "=" * 60)
            print("  SCRIPT FINALIZADO. Todos os mods problemáticos foram removidos!")
            print("=" * 60 + "\n")
            break
        else:
            print(f"\nServidor crashou com código {return_code}.")

            log_content = get_latest_log()
            if not log_content:
                print("Não foi possível ler o log. Parando.")
                break

            ignore_list = []
            analysis_attempts = 0
            max_analysis_attempts = 3

            while analysis_attempts < max_analysis_attempts:
                bad_mod_name = analyze_crash(log_content, ignore_list)

                if bad_mod_name and bad_mod_name != "UNKNOWN":
                    mod_path = find_mod_file(bad_mod_name)
                    if mod_path:
                        if disable_mod(mod_path):
                            print("Mod desativado. Reiniciando servidor...")
                            retry_count += 1
                            time.sleep(2)
                            break
                        else:
                            print("Não foi possível desativar o mod. Parando.")
                            return
                    else:
                        print(
                            f"Não foi possível encontrar arquivo para o mod: {bad_mod_name}."
                        )
                        ignore_list.append(bad_mod_name)
                        analysis_attempts += 1
                        print(
                            f"Tentando análise novamente (tentativa {analysis_attempts+1}/{max_analysis_attempts})..."
                        )
                else:
                    print("Não foi possível identificar o mod problemático. Parando.")
                    return

            if analysis_attempts >= max_analysis_attempts:
                print(
                    "Falha ao identificar um arquivo de mod válido após várias tentativas. Parando."
                )
                break

    if retry_count >= max_retries:
        print("Máximo de tentativas atingido. Por favor, investigue manualmente.")


if __name__ == "__main__":
    main()
