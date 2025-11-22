import asyncio
import requests
import urllib.parse
from playwright.async_api import async_playwright

# WhatsApp (CallMeBot)
WHATSAPP_PHONE = "+5511980805097"
WHATSAPP_APIKEY = "7931506"

# Padlet Credenciais (adguard-temp-mail)
PADLET_EMAIL = "federal.jackal.xeyf@protectsmail.net"
PADLET_PASSWORD = "federal.jackal.xeyf"

# Padlet URLs e Textos
PADLET_HOME = "https://padlet.com/empregabilidadetransformese"
TARGET_CARD_TEXT = "Transforme-se Play - São Carlos"
WAITING_TEXT = "O LINK SERÁ DISPONIBILIZADO EM MOMENTO OPORTUNO"


def send_whatsapp(message):
    if not WHATSAPP_PHONE or not WHATSAPP_APIKEY:
        print("[WARN] WhatsApp não configurado (PHONE ou APIKEY faltando).")
        return

    try:
        # Codifica a mensagem para URL (ex: espaços viram %20)
        encoded_message = urllib.parse.quote(message)

        # Monta a URL usando template string (f-string)
        url = f"https://api.callmebot.com/whatsapp.php?phone={WHATSAPP_PHONE}&text={encoded_message}&apikey={WHATSAPP_APIKEY}"

        response = requests.get(url)
        if response.status_code == 200:
            print("[SUCCESS] WhatsApp enviado!")
        else:
            print(f"[ERROR] Falha WhatsApp: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"[ERROR] Falha ao enviar WhatsApp: {e}")


async def login(page):
    if not PADLET_EMAIL or not PADLET_PASSWORD:
        print("[WARN] Credenciais do Padlet não configuradas. Tentando acesso anônimo.")
        return

    try:
        print("[INFO] Iniciando login no Padlet...")
        await page.goto("https://padlet.com/auth/login", timeout=30000)
        await page.wait_for_load_state("networkidle")

        # Preenche e-mail
        await page.fill('input[type="email"]', PADLET_EMAIL)
        # Clica em continuar ou aperta enter (Padlet as vezes pede só email primeiro)
        await page.press('input[type="email"]', "Enter")

        # Espera campo de senha aparecer
        try:
            await page.wait_for_selector('input[type="password"]', timeout=5000)
        except:
            # Se não apareceu, talvez precise clicar num botão "Continuar"
            # Mas geralmente o Enter funciona. Se falhar, vamos tentar clicar no botão submit
            pass

        await page.fill('input[type="password"]', PADLET_PASSWORD)
        await page.press('input[type="password"]', "Enter")

        # Espera redirecionamento para dashboard ou home
        # Aceita qualquer URL que contenha dashboard
        await page.wait_for_url("**/dashboard**", timeout=30000)
        print("[SUCCESS] Login realizado com sucesso!")

    except Exception as e:
        print(f"[ERROR] Falha no login: {e}. Tentando prosseguir mesmo assim.")


async def main():
    async with async_playwright() as p:
        # Usa o Chromium do sistema para evitar problemas de dependência do Playwright no Arch
        browser = await p.chromium.launch(
            headless=True, executable_path="/usr/bin/chromium"
        )
        context = await browser.new_context()
        page = await context.new_page()

        try:
            # Tenta login antes de tudo
            await login(page)

            print(f"[INFO] Acessando home: {PADLET_HOME}")
            # Tenta acessar a home para buscar link atualizado
            try:
                await page.goto(PADLET_HOME, timeout=30000)
                await page.wait_for_load_state("networkidle")
            except Exception as e:
                print(f"[WARN] Falha ao carregar home ({e}). Tentando fallback.")

            # 1. Buscar o card dinamicamente pelo texto
            print(f"[INFO] Buscando card com texto: '{TARGET_CARD_TEXT}'...")

            # Busca link pelo nome acessível (texto)
            link_locator = page.get_by_role("link", name=TARGET_CARD_TEXT)

            final_url = None

            if await link_locator.count() > 0:
                # Pega o primeiro se houver duplicatas (ex: mobile/desktop views)
                href = await link_locator.first.get_attribute("href")
                if href:
                    print(f"[SUCCESS] Link encontrado dinamicamente: {href}")
                    final_url = href

            if not final_url:
                print(f"[WARN] Card não encontrado. Usando URL de fallback.")
                # https://padlet.com/padlets/fi6l7ebxo9fsad7 ou https://padlet.com/empregabilidadetransformese/transforme-se-play-s-o-carlos-fi6l7ebxo9fsad7
                final_url = "https://padlet.com/padlets/fi6l7ebxo9fsad7"

            # 2. Acessar o link da missão
            if final_url:
                print(f"[INFO] Verificando disponibilidade em: {final_url}")
                await page.goto(final_url, timeout=60000)
                await page.wait_for_load_state("networkidle")

                # 3. Verificar se o texto de espera AINDA existe
                content = await page.content()

                if WAITING_TEXT in content:
                    print(
                        "[INFO] Missão AINDA NÃO disponível (Texto de espera encontrado)."
                    )
                else:
                    print("[ALERT] !!! MISSÃO DISPONÍVEL !!!")
                    msg = f"A missão está disponível! Acesse agora: {final_url}"
                    send_whatsapp(msg)
            else:
                print("[ERROR] Não foi possível determinar a URL da missão.")

        except Exception as e:
            print(f"[ERROR] Erro durante execução: {e}")
        finally:
            await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
