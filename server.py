import http.server
import socketserver
import webbrowser
import os
import sys

try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching headers and UTF-8
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

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

