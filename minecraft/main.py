import os
import subprocess
import shutil
import time
import glob
import google.generativeai as genai
from pathlib import Path

# --- Configuration ---
# EDIT THESE VARIABLES FOR YOUR LOCAL ENVIRONMENT

# 1. Google Gemini API Key
# Paste your key here. Since this is local, it's okay to hardcode it.
GEMINI_API_KEY = "AIzaSyBkYq1766_RqKiFoDtKbCsOMLF8GEu9wx8"

# 2. Directories
# The directory where your client-side modpack is installed (CurseForge instance)
CLIENT_MODS_DIR = "/home/v1cferr/Documents/curseforge/minecraft/Instances/Study/mods"

# The directory of your Minecraft Server
SERVER_DIR = "/home/v1cferr/minecraft-server/forge"

# 3. Server Settings
SERVER_MODS_DIR = os.path.join(SERVER_DIR, "mods")
DISABLED_MODS_DIR = os.path.join(SERVER_DIR, "disabled_mods")
SERVER_START_SCRIPT = "./run.sh"  # Command to start server (e.g. ./run.sh or run.bat)

# --- End Configuration ---

# --- Gemini Setup ---
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
else:
    print("WARNING: GEMINI_API_KEY not found. AI analysis will not work.")
    model = None


def setup_environment():
    """Ensures necessary directories exist."""
    if not os.path.exists(SERVER_DIR):
        print(f"Error: Server directory not found at {SERVER_DIR}")
        return False

    if not os.path.exists(DISABLED_MODS_DIR):
        os.makedirs(DISABLED_MODS_DIR)
        print(f"Created disabled mods directory at {DISABLED_MODS_DIR}")

    return True


def run_server():
    """
    Runs the Minecraft server and waits for it to finish.
    Returns the return code of the process.
    """
    print(f"Starting server in {SERVER_DIR}...")
    try:
        # Using Popen to potentially capture output in real-time if needed,
        # but for now just waiting for exit.
        # We assume the server script handles the java command.
        process = subprocess.Popen(SERVER_START_SCRIPT, cwd=SERVER_DIR, shell=True)
        process.wait()
        return process.returncode
    except Exception as e:
        print(f"Failed to run server: {e}")
        return -1


def get_latest_log():
    """Reads the content of logs/latest.log."""
    log_path = os.path.join(SERVER_DIR, "logs", "latest.log")
    if not os.path.exists(log_path):
        print("No latest.log found.")
        return None

    try:
        with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except Exception as e:
        print(f"Error reading log: {e}")
        return None


def analyze_crash(log_content):
    """
    Sends the log content to Gemini to identify the crashing mod.
    Returns the filename of the mod to remove, or None if not found.
    """
    if not model:
        print("Gemini model not initialized. Cannot analyze crash.")
        return None

    print("Analyzing crash log with Gemini...")

    prompt = f"""
    You are a Minecraft technical expert. I have a Minecraft server crash log. 
    The server likely crashed due to a client-side-only mod being present on the server.
    
    Please analyze the log below and identify the SPECIFIC mod filename (ending in .jar) that caused the crash.
    If multiple mods are implicated, pick the most likely culprit that is known to be client-side only (like OptiFine, Sodium, Minimaps, HUDs, etc.).
    
    Return ONLY the exact filename of the mod jar. If you cannot be sure, return "UNKNOWN".
    
    Log content:
    {log_content[-10000:]}  # Sending last 10000 chars to fit context window if log is huge
    """

    try:
        response = model.generate_content(prompt)
        result = response.text.strip()
        # Basic cleanup in case the model adds extra text
        if result.endswith(".jar"):
            return result
        else:
            # Try to find a .jar string in the response
            import re

            match = re.search(r"[\w\-\.]+\.jar", result)
            if match:
                return match.group(0)

        print(f"AI Response was not a clear filename: {result}")
        return None
    except Exception as e:
        print(f"AI Analysis failed: {e}")
        return None


def find_mod_file(mod_filename):
    """Finds the actual file path for a given mod filename in the mods dir."""
    # Exact match
    exact_path = os.path.join(SERVER_MODS_DIR, mod_filename)
    if os.path.exists(exact_path):
        return exact_path

    # Fuzzy match? (Optional, maybe dangerous)
    return None


def disable_mod(mod_path):
    """Moves the mod file to the disabled_mods directory."""
    filename = os.path.basename(mod_path)
    target_path = os.path.join(DISABLED_MODS_DIR, filename)

    try:
        shutil.move(mod_path, target_path)
        print(f"Moved {filename} to {DISABLED_MODS_DIR}")
        return True
    except Exception as e:
        print(f"Failed to move mod: {e}")
        return False


def main():
    if GEMINI_API_KEY == "YOUR_API_KEY_HERE":
        print(
            "ERROR: Please set your GEMINI_API_KEY in the script configuration section."
        )
        return

    if not setup_environment():
        return

    max_retries = 10
    retry_count = 0

    while retry_count < max_retries:
        print(f"\n--- Attempt {retry_count + 1} ---")

        # 1. Run Server
        return_code = run_server()

        # 2. Check result
        if return_code == 0:
            print("Server finished successfully (or stopped manually without error).")
            break
        else:
            print(f"Server crashed with return code {return_code}.")

            # 3. Analyze Log
            log_content = get_latest_log()
            if not log_content:
                print("Could not read log. Stopping.")
                break

            bad_mod_name = analyze_crash(log_content)

            if bad_mod_name and bad_mod_name != "UNKNOWN":
                print(f"Identified culprit: {bad_mod_name}")

                mod_path = find_mod_file(bad_mod_name)
                if mod_path:
                    if disable_mod(mod_path):
                        print("Mod disabled. Retrying server...")
                        retry_count += 1
                        time.sleep(2)  # Brief pause
                        continue
                    else:
                        print("Could not disable mod. Stopping.")
                        break
                else:
                    print(f"Could not find file for mod: {bad_mod_name}. Stopping.")
                    break
            else:
                print("Could not identify the bad mod from the log. Stopping.")
                break

    if retry_count >= max_retries:
        print("Max retries reached. Please investigate manually.")


if __name__ == "__main__":
    main()
