import asyncio
import requests
import urllib.parse
from datetime import datetime
from playwright.async_api import async_playwright
import os


# WhatsApp <https://www.callmebot.com/blog/free-api-whatsapp-messages>
# Test0: +5516991641893
# Test1: +5516996209765
WHATSAPP_PHONE = "+5511980805097"
WHATSAPP_APIKEY = "7931506"

# Padlet Credenciais <https://adguard.com/pt_br/adguard-temp-mail/overview.html>
PADLET_EMAIL = "federal.jackal.xeyf@protectsmail.net"
PADLET_PASSWORD = "federal.jackal.xeyf"

# Padlet URLs e Textos
PADLET_HOME = "https://padlet.com/empregabilidadetransformese"
TARGET_CARD_TEXT = "Transforme-se Play - São Carlos"
WAITING_TEXT = "O LINK SERÁ DISPONIBILIZADO EM MOMENTO OPORTUNO"


def upload_image(file_path):
    """Faz upload da imagem para o tmpfiles.org e retorna a URL."""
    try:
        with open(file_path, "rb") as f:
            response = requests.post(
                "https://tmpfiles.org/api/v1/upload", files={"file": f}
            )
            if response.status_code == 200:
                data = response.json()
                # A URL retornada é a de visualização, precisamos da URL direta (dl.tmpfiles.org)
                # Ex: https://tmpfiles.org/12345/image.png -> https://tmpfiles.org/dl/12345/image.png
                url = data["data"]["url"]
                direct_url = url.replace("tmpfiles.org/", "tmpfiles.org/dl/")
                return direct_url
            else:
                print(f"[WARN] Falha no upload da imagem: {response.status_code}")
                return None
    except Exception as e:
        print(f"[ERROR] Erro ao fazer upload: {e}")
        return None


def send_whatsapp(message, image_url=None):
    if not WHATSAPP_PHONE or not WHATSAPP_APIKEY:
        print("[WARN] WhatsApp não configurado (PHONE ou APIKEY faltando).")
        return

    try:
        # Se tiver imagem, adiciona ao texto (CallMeBot renderiza o preview)
        if image_url:
            message += f"\n\nScreenshot: {image_url}"

        # Codifica a mensagem para URL
        encoded_message = urllib.parse.quote(message)

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
        print(f"[INFO] Iniciando login no Padlet com: {PADLET_EMAIL}...")
        await page.goto("https://padlet.com/auth/login", timeout=30000)
        await page.wait_for_load_state("networkidle")

        # Preenche e-mail
        await page.fill('input[type="email"]', PADLET_EMAIL)
        await page.press('input[type="email"]', "Enter")

        # Espera campo de senha aparecer
        try:
            await page.wait_for_selector('input[type="password"]', timeout=5000)
        except:
            pass

        await page.fill('input[type="password"]', PADLET_PASSWORD)
        await page.press('input[type="password"]', "Enter")

        # Espera redirecionamento para dashboard ou home
        await page.wait_for_url("**/dashboard**", timeout=30000)
        print("[SUCCESS] Login realizado com sucesso! Redirecionado para dashboard.")

    except Exception as e:
        print(f"[ERROR] Falha no login: {e}. Tentando prosseguir mesmo assim.")


async def main():
    async with async_playwright() as p:
        # Verifica se o Chromium do sistema existe (Arch Linux), caso contrário usa o do Playwright (GitHub Actions/Outros)
        sys_chromium = "/usr/bin/chromium"
        executable_path = sys_chromium if os.path.exists(sys_chromium) else None

        if executable_path:
            print(f"[INFO] Usando Chromium do sistema: {executable_path}")
        else:
            print("[INFO] Usando Chromium do Playwright (bundled)")

        browser = await p.chromium.launch(
            headless=True, executable_path=executable_path
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
                print(f"[DEBUG] Título da página Home: {await page.title()}")
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
                print(f"[DEBUG] Título da página da Missão: {await page.title()}")

                # 3. Verificar se o texto de espera AINDA existe
                content = await page.content()

                # Tenta localizar o texto para scrollar até ele
                waiting_locator = page.get_by_text(WAITING_TEXT)
                if await waiting_locator.count() > 0:
                    print("[INFO] Scrollando até o texto de espera...")
                    await waiting_locator.first.scroll_into_view_if_needed()
                    # Dá um tempinho pro scroll assentar
                    await asyncio.sleep(1)

                # Tira screenshot
                screenshot_path = "status_padlet.png"
                await page.screenshot(path=screenshot_path)
                print(f"[INFO] Screenshot salvo em {screenshot_path}")

                # Faz upload
                image_url = upload_image(screenshot_path)
                if image_url:
                    print(f"[INFO] Imagem enviada para nuvem: {image_url}")

                # Timestamp atual
                now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

                if WAITING_TEXT in content:
                    print(
                        f"[INFO] Missão AINDA NÃO disponível. Texto de espera encontrado: '{WAITING_TEXT}'"
                    )
                    # Envia notificação mesmo assim
                    msg = f"📅 {now}\nStatus Padlet: Missão AINDA NÃO disponível.\nLink: {final_url}"
                    send_whatsapp(msg, image_url)
                else:
                    print("[ALERT] !!! MISSÃO DISPONÍVEL !!!")
                    print("[INFO] O texto de espera NÃO foi encontrado na página.")
                    msg = f"📅 {now}\n🚨 A missão está disponível! Acesse agora: {final_url}"
                    send_whatsapp(msg, image_url)
            else:
                print("[ERROR] Não foi possível determinar a URL da missão.")

        except Exception as e:
            print(f"[ERROR] Erro durante execução: {e}")
        finally:
            await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
