import os
import subprocess
import shutil
import time
import glob
import google.generativeai as genai
from pathlib import Path

# Use `pip install -r requirements.txt` to install dependencies

# --- Configuration ---
# EDIT THESE VARIABLES FOR YOUR LOCAL ENVIRONMENT

# 1. Google Gemini API Key
# Paste your key here. Since this is local, it's okay to hardcode it.
GEMINI_API_KEY = "YOUR_API_KEY_HERE"

# 2. Directories
# The directory where your client-side modpack is installed (CurseForge instance)
CLIENT_MODS_DIR = (
    "/home/v1cferr/Projects/GitHub/v1cferr/study/minecraft/testes/minecraft-client/mods"
)

# The directory of your Minecraft Server
SERVER_DIR = (
    "/home/v1cferr/Projects/GitHub/v1cferr/study/minecraft/testes/minecraft-server"
)

# 3. Server Settings
SERVER_MODS_DIR = os.path.join(SERVER_DIR, "mods")
DISABLED_MODS_DIR = os.path.join(SERVER_DIR, "disabled_mods")
# Adicionar uma verificação para saber se é windows ou linux
SERVER_START_SCRIPT = "./run.sh nogui"  # Command to start server without GUI

# --- End Configuration ---

# --- Gemini Setup ---
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Using gemini-2.0-flash as it is available in the user's list
    model = genai.GenerativeModel("gemini-2.0-flash")
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
    Runs the Minecraft server.
    Returns:
        0 if server started successfully (detected "Done!").
        1 if server crashed (detected crash keywords).
        -1 if there was an error starting the server.
    """
    print(f"Starting server in {SERVER_DIR}...")
    try:
        process = subprocess.Popen(
            SERVER_START_SCRIPT,
            cwd=SERVER_DIR,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )

        # Monitor output for success or crash
        server_started = False
        crash_detected = False

        while True:
            line = process.stdout.readline()
            if line == "" and process.poll() is not None:
                break
            if line:
                print(line.strip())

                # Detect successful server startup
                if "Done (" in line and "For help, type 'help'" in line:
                    print("\n" + "=" * 60)
                    print("  SERVER STARTED SUCCESSFULLY!")
                    print("  The server is now running. Press Ctrl+C to stop.")
                    print("=" * 60 + "\n")
                    server_started = True
                    # Don't terminate - let it keep running!
                    # Just keep reading output until the process ends

                # Detect crashes during startup (before success)
                if not server_started and (
                    "Crash report saved to" in line
                    or "Exception in thread" in line
                    or "java.lang.RuntimeException" in line
                ):
                    crash_detected = True

        # Process has ended
        return_code = process.poll()

        if server_started:
            # Server started successfully, then shut down (manually or gracefully)
            print("\nServer has shut down.")
            return 0
        elif crash_detected:
            print("\nCrash detected via log output!")
            return 1
        else:
            # Process ended without "Done!" message - treat as crash
            if return_code != 0:
                print(
                    f"\nServer exited with code {return_code} before starting successfully."
                )
                return 1
            return return_code
    except KeyboardInterrupt:
        print("\n\nReceived interrupt signal. Stopping server...")
        if process:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                print("Server did not stop gracefully. Killing process...")
                process.kill()
        return 0  # Don't treat Ctrl+C as a crash
    except Exception as e:
        print(f"Failed to run server: {e}")
        return -1


def get_latest_log():
    """
    Reads the content of logs/latest.log OR the latest crash report.
    Returns the combined content, prioritizing the crash report.
    """
    log_content = ""
    crash_content = ""

    # 1. Check for recent crash reports (modified in the last 2 minutes)
    crash_reports_dir = os.path.join(SERVER_DIR, "crash-reports")
    if os.path.exists(crash_reports_dir):
        # Get list of files with full paths
        files = [
            os.path.join(crash_reports_dir, f) for f in os.listdir(crash_reports_dir)
        ]
        if files:
            # Find the most recent file
            latest_crash = max(files, key=os.path.getmtime)
            # Check if it was modified recently (e.g. within last 5 minutes)
            if time.time() - os.path.getmtime(latest_crash) < 300:
                print(f"Found recent crash report: {latest_crash}")
                try:
                    with open(
                        latest_crash, "r", encoding="utf-8", errors="ignore"
                    ) as f:
                        crash_content = f.read()
                except Exception as e:
                    print(f"Error reading crash report: {e}")

    # 2. Read latest.log
    log_path = os.path.join(SERVER_DIR, "logs", "latest.log")
    if os.path.exists(log_path):
        try:
            with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
                # Read only the last 20000 characters if no crash report,
                # or less if we have a crash report to save context
                content = f.read()
                log_content = content[-20000:]
        except Exception as e:
            print(f"Error reading log: {e}")

    # Combine: Crash report FIRST, then recent log tail
    full_content = ""
    if crash_content:
        full_content += "--- CRASH REPORT (PRIORITY) ---\n" + crash_content + "\n\n"

    full_content += "--- LATEST LOG TAIL ---\n" + log_content

    return full_content if full_content else None


def analyze_crash(log_content, ignore_list=None):
    """Sends the log to Gemini to identify the problematic mod."""
    print("Analyzing crash log with Gemini...")

    ignore_str = ""
    if ignore_list:
        ignore_str = f"Do NOT suggest the following files as they were not found: {', '.join(ignore_list)}"

    prompt = f"""
    You are a Minecraft server expert. The server crashed. 
    Analyze the following log (which may include a crash report) and identify the ONE mod file (.jar) that caused the crash.
    
    CRITICAL INSTRUCTIONS:
    1. Look for "Mod File: ... .jar" in the crash report section. This is the definitive answer.
    2. Look for "Failure message: ... encountered an error" and the associated mod file.
    3. Look for "Attempted to load class ... for invalid dist DEDICATED_SERVER".
    
    {ignore_str}
    
    Return ONLY the filename of the problematic mod (e.g., "modname-1.0.jar"). 
    Do NOT write any explanation. Do NOT use markdown formatting like backticks. 
    Just the filename.
    
    Log content:
    """

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        # Send prompt + content, ensuring we don't exceed limits but prioritizing the start (crash report)
        response = model.generate_content(prompt + log_content[:40000])

        # Clean up response
        culprit = response.text.strip()

        # Remove markdown backticks if present
        culprit = culprit.replace("`", "")

        # If the AI is still verbose, try to find a .jar filename in the text
        import re

        match = re.search(r"[\w\-\.\+]+\.jar", culprit)
        if match:
            culprit = match.group(0)

        print(f"Identified culprit: {culprit}")
        return culprit
    except Exception as e:
        print(f"Error communicating with Gemini: {e}")
        return None


def find_mod_file(mod_filename):
    """Finds the actual file path for a given mod filename in the mods dir."""
    # Exact match
    exact_path = os.path.join(SERVER_MODS_DIR, mod_filename)
    if os.path.exists(exact_path):
        return exact_path

    # Fuzzy match: Try to find a file that contains the main part of the mod name
    # e.g. "HoldMyItems-Mod.jar" -> search for "HoldMyItems" or "holdmyitems"

    # 1. Try case-insensitive exact match
    for f in os.listdir(SERVER_MODS_DIR):
        if f.lower() == mod_filename.lower():
            return os.path.join(SERVER_MODS_DIR, f)

    # 2. Try removing version numbers/extensions and matching
    # Simple heuristic: take the first part of the name before a dash or number
    import re

    # Remove extension
    name_no_ext = os.path.splitext(mod_filename)[0]

    # Try to match the start of the filename
    # e.g. AI says "HoldMyItems-Mod", file is "holdmyitems-1.20.1..."
    # Let's try to match the first few characters or words

    # Strategy: Tokenize the AI guess and look for files containing those tokens
    # But simpler: just look for the longest common substring or similar?
    # Let's try a simpler approach: "contains" check for the base name

    # Clean up the AI guess: remove "Mod", "Forge", "Fabric", version numbers
    clean_name = re.sub(
        r"[\-\_\s]?(mod|forge|fabric|mc\d+.*|v?\d+\..*)",
        "",
        name_no_ext,
        flags=re.IGNORECASE,
    )

    if len(clean_name) < 3:  # Too short, dangerous
        return None

    print(f"Searching for mod file matching: {clean_name}")

    candidates = []
    for f in os.listdir(SERVER_MODS_DIR):
        if clean_name.lower() in f.lower():
            candidates.append(f)

    if len(candidates) == 1:
        return os.path.join(SERVER_MODS_DIR, candidates[0])
    elif len(candidates) > 1:
        print(
            f"Multiple candidates found for {mod_filename}: {candidates}. Picking the shortest one."
        )
        # Heuristic: shortest filename is often the "cleanest" match or we just pick one.
        candidates.sort(key=len)
        return os.path.join(SERVER_MODS_DIR, candidates[0])

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


def sync_mods():
    """
    Checks if server mods directory is empty.
    If so, copies all mods from client mods directory.
    """
    if not os.path.exists(SERVER_MODS_DIR):
        os.makedirs(SERVER_MODS_DIR)
        print(f"Created server mods directory: {SERVER_MODS_DIR}")

    # Check if empty
    if not os.listdir(SERVER_MODS_DIR):
        print("Server mods directory is empty. Syncing from client...")
        if not os.path.exists(CLIENT_MODS_DIR):
            print(f"Error: Client mods directory not found at {CLIENT_MODS_DIR}")
            return False

        mods = glob.glob(os.path.join(CLIENT_MODS_DIR, "*.jar"))
        print(f"Found {len(mods)} mods in client directory.")

        for mod in mods:
            shutil.copy2(mod, SERVER_MODS_DIR)

        print(f"Copied {len(mods)} mods to server directory.")
    else:
        print("Server mods directory is not empty. Skipping sync.")

    return True


def main():
    if GEMINI_API_KEY == "YOUR_API_KEY_HERE":
        print(
            "ERROR: Please set your GEMINI_API_KEY in the script configuration section."
        )
        return

    if not setup_environment():
        return

    if not sync_mods():
        return

    max_retries = 10
    retry_count = 0

    while retry_count < max_retries:
        print(f"\n--- Attempt {retry_count + 1} ---")

        # 1. Run Server
        return_code = run_server()

        # 2. Check result
        if return_code == 0:
            # Server started successfully (or was stopped with Ctrl+C)
            print("\n" + "=" * 60)
            print("  Script finished. All problematic mods have been removed!")
            print("=" * 60 + "\n")
            break
        else:
            print(f"\nServer crashed with return code {return_code}.")

            # 3. Analyze Log
            log_content = get_latest_log()
            if not log_content:
                print("Could not read log. Stopping.")
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
                            print("Mod disabled. Retrying server...")
                            retry_count += 1
                            time.sleep(2)  # Brief pause
                            break  # Break inner loop to restart server
                        else:
                            print("Could not disable mod. Stopping.")
                            return  # Fatal error
                    else:
                        print(f"Could not find file for mod: {bad_mod_name}.")
                        ignore_list.append(bad_mod_name)
                        analysis_attempts += 1
                        print(
                            f"Retrying analysis (attempt {analysis_attempts+1}/{max_analysis_attempts})..."
                        )
                else:
                    print("Could not identify the bad mod from the log. Stopping.")
                    return  # Fatal error

            if analysis_attempts >= max_analysis_attempts:
                print(
                    "Failed to identify a valid mod file after multiple attempts. Stopping."
                )
                break

    if retry_count >= max_retries:
        print("Max retries reached. Please investigate manually.")


if __name__ == "__main__":
    main()
