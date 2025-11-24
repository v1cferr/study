import customtkinter as ctk
import json
import os
import subprocess
import platform
import threading
import sys

# Configuração do tema
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

CONFIG_FILE = "config.json"


class App(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Minecraft Mod Crash Automator")
        self.geometry("600x500")

        # Carregar config existente
        self.config = self.load_config()

        # --- Layout ---
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0, weight=0)  # Title
        self.grid_rowconfigure(1, weight=0)  # Inputs
        self.grid_rowconfigure(2, weight=0)  # Buttons
        self.grid_rowconfigure(3, weight=1)  # Output/Status

        # Título
        self.label_title = ctk.CTkLabel(
            self, text="Configuração & Launcher", font=("Roboto", 24)
        )
        self.label_title.grid(row=0, column=0, padx=20, pady=20)

        # Frame de Inputs
        self.frame_inputs = ctk.CTkFrame(self)
        self.frame_inputs.grid(row=1, column=0, padx=20, pady=10, sticky="ew")
        self.frame_inputs.grid_columnconfigure(1, weight=1)

        # API Key
        self.label_api = ctk.CTkLabel(self.frame_inputs, text="Gemini API Key:")
        self.label_api.grid(row=0, column=0, padx=10, pady=10, sticky="w")
        self.entry_api = ctk.CTkEntry(
            self.frame_inputs, placeholder_text="Cole sua chave aqui..."
        )
        self.entry_api.grid(row=0, column=1, padx=10, pady=10, sticky="ew")
        self.entry_api.insert(0, self.config.get("GEMINI_API_KEY", ""))

        self.btn_api_link = ctk.CTkButton(
            self.frame_inputs, text="Obter Chave", width=100, command=self.open_api_link
        )
        self.btn_api_link.grid(row=0, column=2, padx=10, pady=10)

        # Client Dir
        self.label_client = ctk.CTkLabel(self.frame_inputs, text="Pasta Mods Cliente:")
        self.label_client.grid(row=1, column=0, padx=10, pady=10, sticky="w")
        self.entry_client = ctk.CTkEntry(
            self.frame_inputs, placeholder_text="Caminho para mods do cliente"
        )
        self.entry_client.grid(row=1, column=1, padx=10, pady=10, sticky="ew")
        self.entry_client.insert(0, self.config.get("CLIENT_MODS_DIR", ""))

        self.btn_client_browse = ctk.CTkButton(
            self.frame_inputs,
            text="Buscar",
            width=100,
            command=lambda: self.browse_folder(self.entry_client),
        )
        self.btn_client_browse.grid(row=1, column=2, padx=10, pady=10)

        # Server Dir
        self.label_server = ctk.CTkLabel(self.frame_inputs, text="Pasta do Servidor:")
        self.label_server.grid(row=2, column=0, padx=10, pady=10, sticky="w")
        self.entry_server = ctk.CTkEntry(
            self.frame_inputs, placeholder_text="Caminho para a pasta do servidor"
        )
        self.entry_server.grid(row=2, column=1, padx=10, pady=10, sticky="ew")
        self.entry_server.insert(0, self.config.get("SERVER_DIR", ""))

        self.btn_server_browse = ctk.CTkButton(
            self.frame_inputs,
            text="Buscar",
            width=100,
            command=lambda: self.browse_folder(self.entry_server),
        )
        self.btn_server_browse.grid(row=2, column=2, padx=10, pady=10)

        # Botões de Ação
        self.frame_actions = ctk.CTkFrame(self, fg_color="transparent")
        self.frame_actions.grid(row=2, column=0, padx=20, pady=20)

        self.btn_save = ctk.CTkButton(
            self.frame_actions,
            text="Salvar Configuração",
            command=self.save_config,
            fg_color="green",
        )
        self.btn_save.grid(row=0, column=0, padx=10)

        self.btn_run = ctk.CTkButton(
            self.frame_actions,
            text="INICIAR AUTOMAÇÃO",
            command=self.run_automation,
            height=40,
            font=("Roboto", 16, "bold"),
        )
        self.btn_run.grid(row=0, column=1, padx=10)

        # Status
        self.textbox_log = ctk.CTkTextbox(self, height=100)
        self.textbox_log.grid(row=3, column=0, padx=20, pady=10, sticky="nsew")
        self.textbox_log.insert(
            "0.0",
            "Pronto para iniciar.\nCertifique-se de salvar a configuração antes de rodar.",
        )

    def load_config(self):
        if os.path.exists(CONFIG_FILE):
            try:
                with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
            except:
                pass
        return {}

    def save_config(self):
        config = {
            "GEMINI_API_KEY": self.entry_api.get().strip(),
            "CLIENT_MODS_DIR": self.entry_client.get().strip(),
            "SERVER_DIR": self.entry_server.get().strip(),
        }
        try:
            with open(CONFIG_FILE, "w", encoding="utf-8") as f:
                json.dump(config, f, indent=4)
            self.log("Configuração salva com sucesso!")
        except Exception as e:
            self.log(f"Erro ao salvar configuração: {e}")

    def browse_folder(self, entry_widget):
        folder_selected = ctk.filedialog.askdirectory()
        if folder_selected:
            entry_widget.delete(0, "end")
            entry_widget.insert(0, folder_selected)

    def open_api_link(self):
        import webbrowser

        webbrowser.open("https://aistudio.google.com/api-keys")

    def log(self, message):
        self.textbox_log.insert("end", message + "\n")
        self.textbox_log.see("end")

    def run_automation(self):
        self.save_config()
        self.log("Iniciando script de automação...")

        system = platform.system()

        if system == "Windows":
            # No Windows, abre uma nova janela do CMD
            cmd = "start cmd /k python main.py"
            subprocess.Popen(cmd, shell=True)
        else:
            # No Linux, tenta abrir terminais comuns
            # Tenta gnome-terminal, xterm, ou roda no próprio terminal se não achar
            try:
                subprocess.Popen(["gnome-terminal", "--", "python3", "main.py"])
            except FileNotFoundError:
                try:
                    subprocess.Popen(["xterm", "-e", "python3 main.py"])
                except FileNotFoundError:
                    self.log(
                        "Não foi possível abrir um novo terminal automaticamente no Linux.\nPor favor, rode 'python3 main.py' no seu terminal."
                    )
                    return

        self.log("Script iniciado em nova janela!")


if __name__ == "__main__":
    app = App()
    app.mainloop()
