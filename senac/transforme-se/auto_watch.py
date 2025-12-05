import time
import re
import os
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

# Carrega variáveis de ambiente
load_dotenv()

# --- CONFIGURAÇÕES DE LOGIN ---
LOGIN_URL = "https://comunidadetransformese.el.hotscool.com/login"
DASHBOARD_URL = "https://comunidadetransformese.el.hotscool.com/dashboard/meus-cursos"
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")

# --- CONFIGURAÇÕES DO CURSO ---
HEADLESS_MODE = False
VIDEO_SPEED = 2.0

# XPath do botão de "Próximo".
NEXT_BUTTON_XPATH = "//a[contains(@class, 'lesson-nav-next') or contains(@class, 'next')] | //button[contains(@class, 'next')]"

def watch_course(page):
    """
    Loop de assistir aulas de um curso específico.
    Retorna quando não encontrar mais botão de próximo (fim do curso).
    """
    print("--- Iniciando Loop de Assistir ---")
    
    # Espera carregar a primeira aula
    try:
        page.wait_for_selector("video", timeout=10000)
    except:
        print("Vídeo não encontrado de imediato, verificando...")

    while True:
        try:
            print(f"--- Monitorando: {page.title()} ---")
            
            # Procura elemento de vídeo
            video_locator = page.locator("video").first
            
            # Verifica se existe vídeo na página
            if video_locator.count() > 0:
                
                # LÓGICA DE PLAYBACK INTELIGENTE
                video_state = page.evaluate("""() => {
                    const v = document.querySelector('video');
                    if (!v) return { status: 'no_video' };
                    return {
                        status: 'ok',
                        paused: v.paused,
                        ended: v.ended,
                        readyState: v.readyState, // 0=Nothing, 4=Enough Data
                        currentTime: v.currentTime
                    };
                }""")

                if video_state['status'] == 'ok':
                    if video_state['ended']:
                        print("Vídeo detectado como FINALIZADO.")
                        # Sai do loop de vídeo para ir ao próximo
                        pass 
                    
                    elif video_state['paused']:
                        print("Vídeo está pausado. Tentando iniciar...")
                        try:
                            # Tenta clicar no container do player primeiro, se existir
                            if page.locator("vg-player").count() > 0:
                                page.locator("vg-player").click(position={"x": 50, "y": 50})
                            else:
                                video_locator.click()
                            time.sleep(2)
                        except:
                            page.evaluate("document.querySelector('video').play().catch(e => {})")

                    elif video_state['readyState'] < 3:
                        print("Vídeo carregando (buffering)...")
                        time.sleep(2)

                    else:
                        # Vídeo está tocando e com dados carregados
                        page.evaluate(f"""
                            const v = document.querySelector('video');
                            if (v && v.playbackRate !== {VIDEO_SPEED}) {{
                                v.playbackRate = {VIDEO_SPEED};
                            }}
                        """)
                
                # Verificação final de término para sair do loop interno e clicar em próximo
                is_ended = page.evaluate("document.querySelector('video').ended")
                if is_ended:
                    print("\nVídeo acabou! Indo para o próximo...")
                    
                    time.sleep(2)
                    try:
                        next_btn = page.locator(NEXT_BUTTON_XPATH).first
                        if next_btn.is_visible():
                            next_btn.click()
                            page.wait_for_load_state("networkidle")
                            time.sleep(4)
                            continue
                        else:
                            print("Botão próximo não encontrado. Fim do curso?")
                            return # Retorna para o loop principal
                    except Exception as e:
                        print(f"Erro ao clicar no próximo: {e}")
                        return # Retorna em caso de erro crítico de navegação
                
            else:
                print("Procurando vídeo...")
                # Se não tem vídeo, pode ser uma página de texto ou quiz.
                # Tenta achar o botão próximo mesmo assim.
                try:
                    next_btn = page.locator(NEXT_BUTTON_XPATH).first
                    if next_btn.is_visible():
                        print("Página sem vídeo, clicando em Próximo...")
                        next_btn.click()
                        page.wait_for_load_state("networkidle")
                        time.sleep(4)
                        continue
                    else:
                        # Se não tem vídeo e nem botão próximo, talvez acabou.
                        print("Nem vídeo nem botão próximo encontrados.")
                        return
                except:
                    pass
            
            time.sleep(3)

        except Exception as e:
            print(f"Erro no loop de assistir: {e}")
            time.sleep(5)


def run():
    with sync_playwright() as p:
        print("--- Iniciando Browser ---")
        browser = p.chromium.launch(
            headless=HEADLESS_MODE, 
            args=["--start-maximized", "--autoplay-policy=no-user-gesture-required"]
        )
        context = browser.new_context(no_viewport=True)
        page = context.new_page()

        # 1. Realizar Login
        print(f"Acessando login: {LOGIN_URL}")
        page.goto(LOGIN_URL)
        
        try:
            page.wait_for_load_state("networkidle")
            time.sleep(2) 

            print("Preenchendo credenciais...")
            page.locator('input[name="email"]').fill(EMAIL)
            page.locator('input[name="senha"]').fill(PASSWORD)
            
            print("Clicando em Entrar...")
            if page.locator('button[type="submit"]').count() > 0:
                page.locator('button[type="submit"]').click()
            else:
                page.click('text="Entrar"i') 
            
            page.wait_for_url("**/dashboard/**", timeout=30000)
            print("Login realizado com sucesso!")
            
        except Exception as e:
            print(f"Erro no login: {e}")
            # Se falhar o login, talvez já esteja logado ou algo assim, mas idealmente pararia aqui.
            # Vamos tentar seguir para o dashboard.

        # 2. Loop Principal de Cursos
        while True:
            print(f"\nNavegando para Dashboard: {DASHBOARD_URL}")
            page.goto(DASHBOARD_URL)
            page.wait_for_load_state("networkidle")
            time.sleep(3) # Espera renderizar os cards

            print("Analisando cursos...")
            
            # Pega todos os cards
            # O seletor baseia-se no HTML fornecido: <app-course-card>
            course_cards = page.locator("app-course-card").all()
            
            course_found = False
            
            for card in course_cards:
                try:
                    # Extrai o título
                    title_el = card.locator(".title")
                    title = title_el.inner_text() if title_el.count() > 0 else "Sem Título"
                    
                    # Extrai o progresso
                    # HTML: <div class="col-6 text-left">Progresso: 36%</div>
                    # Note que o user disse que a classe é "sumary", mas no HTML está "sumary" mesmo (typo do site).
                    progress_el = card.locator(".sumary .text-left")
                    
                    if progress_el.count() > 0:
                        progress_text = progress_el.inner_text() # Ex: "Progresso: 36%"
                        # Extrai número
                        match = re.search(r"(\d+)%", progress_text)
                        if match:
                            percent = int(match.group(1))
                            print(f"Curso: {title} | Progresso: {percent}%")
                            
                            if percent < 100:
                                print(f"-> Iniciando curso: {title}")
                                
                                # Clica no card para entrar
                                # O user disse que clica no card. O HTML tem um <div class="photo pointer">.
                                card.locator(".photo").click()
                                
                                # Espera navegar para a aula
                                page.wait_for_load_state("networkidle")
                                time.sleep(3)
                                
                                # Chama a função de assistir
                                watch_course(page)
                                
                                # Ao voltar dessa função, significa que o curso acabou (ou deu erro/fim da lista)
                                print(f"Retornando ao dashboard após processar {title}...")
                                course_found = True
                                break # Sai do for para recarregar o dashboard e buscar o próximo
                        else:
                            print(f"Curso: {title} | Não foi possível ler porcentagem: {progress_text}")
                    else:
                        print(f"Curso: {title} | Sem barra de progresso visível.")
                        
                except Exception as e:
                    print(f"Erro ao processar card: {e}")
                    continue
            
            if not course_found:
                print("\nNenhum curso incompleto encontrado ou todos finalizados!")
                break
            
            # Se course_found for True, o loop while reinicia, recarregando o dashboard.

        print("Fim da execução geral.")

if __name__ == "__main__":
    run()