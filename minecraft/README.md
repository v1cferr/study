# Minecraft Server Mod Filter Automation

This script automates the process of setting up a Minecraft server modpack by filtering out client-side-only mods that cause server crashes. It uses Google's Gemini AI to analyze crash reports and identify problematic mods.

## Prerequisites

*   **Python 3.8+** installed on your system.
*   **Minecraft Forge Server** installed and ready to run.
*   **Client Modpack** installed (e.g., via CurseForge).
*   **Google Gemini API Key** (Free).

## Setup Instructions

### 1. Create a Virtual Environment (venv)

It's best practice to use a virtual environment to manage dependencies. Open your terminal in this folder and run:

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

### 2. Install Dependencies

With the virtual environment activated, install the required libraries:

```bash
pip install -r requirements.txt
```

### 3. VS Code Configuration (Optional but Recommended)

If you are using VS Code:
1.  Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2.  Type "Python: Select Interpreter".
3.  Select the interpreter that corresponds to the `venv` folder you just created (it should say something like `venv/bin/python` or `venv\Scripts\python.exe`).

### 4. Get a Gemini API Key

1.  Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Click on "Create API key".
3.  Copy the generated key.

### 5. Configure the Script

Open `main.py` and edit the **Configuration** section at the top:

*   **`GEMINI_API_KEY`**: Paste your API key here.
*   **`CLIENT_MODS_DIR`**: The full path to your client-side mods folder (e.g., inside your CurseForge instance).
*   **`SERVER_DIR`**: The full path to your Minecraft server folder.

**Example:**
```python
GEMINI_API_KEY = "AIzaSy..."
CLIENT_MODS_DIR = "C:/Users/You/curseforge/minecraft/Instances/MyModpack/mods"
SERVER_DIR = "C:/MinecraftServer"
```

## How to Run

Ensure your virtual environment is activated, then run:

```bash
python main.py
```

## What the Script Does

1.  **Syncs Mods**: Copies all mods from your Client folder to the Server `mods` folder (only if the server folder is empty).
2.  **Starts Server**: Attempts to start the Minecraft server.
3.  **Detects Crashes**: If the server crashes, it reads the crash report.
4.  **AI Analysis**: Sends the crash report to Gemini AI to identify the specific mod causing the crash.
5.  **Filters Mods**: Moves the identified problematic mod to a `disabled_mods` folder.
6.  **Repeats**: Automatically restarts the process until the server starts successfully.
7.  **Success**: Once the server starts, it keeps running. You can stop it safely with `Ctrl+C`.

## Troubleshooting

*   **"Server mods directory is empty"**: The script will automatically copy mods from your client directory.
*   **"Could not identify the bad mod"**: The AI might fail sometimes. The script has a retry mechanism, but if it persists, check the logs manually.
*   **Windows vs Linux**: The script automatically detects your OS and uses `run.bat` (Windows) or `./run.sh` (Linux) to start the server. Ensure these scripts exist in your server folder.
