import http.server
import socketserver
import webbrowser
import os
import sys
import json
import urllib.request
import urllib.parse
from urllib.error import URLError, HTTPError
import traceback

try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def load_env():
    env_vars = {}
    env_file = os.path.join(DIRECTORY, '.env')
    if os.path.exists(env_file):
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    if '=' in line:
                        k, v = line.split('=', 1)
                        env_vars[k.strip()] = v.strip().strip("'").strip('"')
    return env_vars

ENV = load_env()

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching headers and UTF-8
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        if self.path.startswith('/api/'):
            self.handle_api_request("GET")
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/'):
            self.handle_api_request("POST")
        else:
            super().do_POST()

    def handle_api_request(self, method):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Check endpoints
        try:
            demo_mode = ENV.get('DEMO_MODE', 'true').lower() == 'true'
            response_data = {
                "status": "success",
                "demo_mode": demo_mode,
                "message": "API received request but demo mode is active or no specific handler matched."
            }

            if self.path.startswith('/api/status'):
                response_data = {
                    "status": "success",
                    "mode": "DEMO" if demo_mode else "LIVE",
                    "services": {
                        "ai": "Connected" if ENV.get("AI_API_KEY") else "Demo/Missing Key",
                        "maps": "Connected" if ENV.get("MAPS_API_KEY") else "Demo/Missing Key",
                        "translation": "Connected" if ENV.get("TRANSLATION_API_KEY") else "Demo/Missing Key",
                        "weather": "Connected" if ENV.get("WEATHER_API_KEY") else "Demo/Missing Key"
                    }
                }
            
            # Example stub for real API passthrough
            elif self.path.startswith('/api/ai/planner') and method == "POST":
                content_length = int(self.headers.get('Content-Length', 0))
                req_body = self.rfile.read(content_length).decode('utf-8')
                req_data = json.loads(req_body) if req_body else {}
                
                if not demo_mode and ENV.get('AI_API_KEY'):
                    # Call real AI API here using urllib
                    # Since we don't have a specific provider requested, we stub the integration point
                    response_data = {"status": "error", "message": "Real API integration endpoint not fully implemented. Add provider specifics here."}
                else:
                    response_data = {"status": "demo", "message": "Using demo data fallback for AI Planner."}

            self.wfile.write(json.dumps(response_data).encode('utf-8'))
        except Exception as e:
            err = {"status": "error", "message": str(e), "trace": traceback.format_exc()}
            self.wfile.write(json.dumps(err).encode('utf-8'))


def main():
    os.chdir(DIRECTORY)
    port = PORT
    server = None

    for p in [3000, 3001, 8080, 8000]:
        try:
            server = socketserver.TCPServer(("", p), Handler)
            port = p
            break
        except OSError:
            continue

    if not server:
        print("Could not bind to any port. Please open index.html directly in your web browser.")
        sys.exit(1)

    url = f"http://localhost:{port}"
    print("=" * 65)
    print("  🇮🇳  IND TRAVEL — DIGITAL TOURISM ECOSYSTEM (SIH PROTOTYPE) ")
    print("  'One India. One Trusted Travel Ecosystem.'")
    print("=" * 65)
    print(f"\n  Server running live at: {url}")
    print(f"  Demo Mode: {'ENABLED' if ENV.get('DEMO_MODE', 'true').lower() == 'true' else 'DISABLED (Live APIs Active if keys present)'}")
    print("  Press Ctrl+C in this terminal to stop the server.\n")
    print("  Opening IND Travel web application in your default browser...")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nIND Travel Server stopped gracefully.")
        server.server_close()

if __name__ == "__main__":
    main()
